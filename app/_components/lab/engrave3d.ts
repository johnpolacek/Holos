// Shared engraved line renderer, lifted from the eraser scene. One pass writes normals,
// depth, and light into a render target; a full-screen pass turns creases and silhouettes
// into ink and shadow into hatching. Lines and solid ink objects write a marker the post
// pass paints as ink. Colors are raw sRGB so the paper stays warm.

import * as THREE from "three";

export const PAPER = new THREE.Vector3(251 / 255, 250 / 255, 245 / 255);
export const INK = new THREE.Vector3(29 / 255, 33 / 255, 38 / 255);

// Everything on the far side of the sweep plane is clipped: the draw-in.
export type Kit = {
  clip: THREE.Plane;
  lightView: { value: THREE.Vector3 };
  surface: (tone?: number) => THREE.ShaderMaterial;
  ink: THREE.ShaderMaterial;
  soft: THREE.ShaderMaterial;
};

export function makeKit(): Kit {
  const clip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 100);
  const lightView = { value: new THREE.Vector3() };
  const surface = (tone = 0) =>
    new THREE.ShaderMaterial({
      clipping: true,
      clippingPlanes: [clip],
      side: THREE.DoubleSide,
      uniforms: { lightDir: lightView, tone: { value: tone } },
      vertexShader: /* glsl */ `
        #include <clipping_planes_pars_vertex>
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          #include <clipping_planes_vertex>
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: /* glsl */ `
        #include <clipping_planes_pars_fragment>
        uniform vec3 lightDir;
        uniform float tone;
        varying vec3 vN;
        void main() {
          #include <clipping_planes_fragment>
          vec3 n = normalize(vN);
          if (!gl_FrontFacing) n = -n;
          // Positive tone darkens a body; negative tone lifts it so only its darkest side hatches.
          float l = clamp(dot(n, lightDir) * 0.75 + 0.35, 0.0, 1.0) * (1.0 - max(tone, 0.0));
          l = max(l, -min(tone, 0.0) * 0.5);
          gl_FragColor = vec4(n * 0.5 + 0.5, 0.2 + 0.8 * l);
        }`,
    });
  const marker = (alpha: number) =>
    new THREE.ShaderMaterial({
      clipping: true,
      clippingPlanes: [clip],
      vertexShader: /* glsl */ `
        #include <clipping_planes_pars_vertex>
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          #include <clipping_planes_vertex>
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: /* glsl */ `
        #include <clipping_planes_pars_fragment>
        void main() {
          #include <clipping_planes_fragment>
          gl_FragColor = vec4(0.5, 0.5, 1.0, ${alpha.toFixed(2)});
        }`,
    });
  // 0.1 paints full ink; 0.13 paints soft ink (unlit structure).
  return { clip, lightView, surface, ink: marker(0.1), soft: marker(0.13) };
}

function makePost() {
  return new THREE.ShaderMaterial({
    uniforms: {
      tNormal: { value: null },
      tDepth: { value: null },
      texel: { value: new THREE.Vector2() },
      near: { value: 0.1 },
      far: { value: 200 },
      dpr: { value: 1 },
      paper: { value: PAPER },
      ink: { value: INK },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: /* glsl */ `
      #include <packing>
      uniform sampler2D tNormal;
      uniform sampler2D tDepth;
      uniform vec2 texel;
      uniform float near;
      uniform float far;
      uniform float dpr;
      uniform vec3 paper;
      uniform vec3 ink;
      varying vec2 vUv;

      float viewZ(vec2 uv) {
        return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, near, far);
      }
      bool isInk(float a) { return a > 0.05 && a < 0.115; }
      bool isSoft(float a) { return a >= 0.115 && a < 0.15; }
      bool isSurface(float a) { return a >= 0.15; }

      void main() {
        vec4 c = texture2D(tNormal, vUv);
        if (isInk(c.a)) { gl_FragColor = vec4(ink, 1.0); return; }
        if (isSoft(c.a)) { gl_FragColor = vec4(mix(paper, ink, 0.45), 1.0); return; }

        vec3 n0 = c.rgb * 2.0 - 1.0;
        float z0 = viewZ(vUv);
        float edge = 0.0;
        vec2 offs[4];
        offs[0] = vec2(texel.x, 0.0); offs[1] = vec2(-texel.x, 0.0);
        offs[2] = vec2(0.0, texel.y); offs[3] = vec2(0.0, -texel.y);
        for (int i = 0; i < 4; i++) {
          vec4 s = texture2D(tNormal, vUv + offs[i]);
          if (isSurface(c.a) != isSurface(s.a)) { edge = 1.0; continue; }
          if (!isSurface(c.a)) continue;
          if (length(n0 - (s.rgb * 2.0 - 1.0)) > 0.35) edge = 1.0;
          if (abs(z0 - viewZ(vUv + offs[i])) / z0 > 0.025) edge = 1.0;
        }

        vec3 col = paper;
        if (isSurface(c.a)) {
          float shade = (c.a - 0.2) / 0.8;
          vec2 p = gl_FragCoord.xy / dpr;
          float h1 = abs(fract((p.x + p.y) / 4.5) - 0.5);
          float h2 = abs(fract((p.x - p.y) / 4.5) - 0.5);
          float lineW = 0.16;
          if (shade < 0.55 && h1 < lineW) col = mix(paper, ink, 0.85);
          if (shade < 0.3 && h2 < lineW) col = mix(paper, ink, 0.85);
        }
        if (edge > 0.0) col = ink;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
}

export type Rig = { target: THREE.Vector3; offset: THREE.Vector3 };

export class Engraver {
  renderer: THREE.WebGLRenderer;
  camera = new THREE.PerspectiveCamera(32, 16 / 10, 0.1, 200);
  rig: Rig = { target: new THREE.Vector3(), offset: new THREE.Vector3(0, 2, 10) };
  width = 1;
  height = 1;
  private rt: THREE.WebGLRenderTarget;
  private post = makePost();
  private postScene = new THREE.Scene();
  private postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private lightWorld = new THREE.Vector3(-0.5, 1, 0.7).normalize();

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    this.renderer.localClippingEnabled = true;
    this.renderer.setClearColor(0x000000, 0);
    this.rt = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
    this.rt.depthTexture = new THREE.DepthTexture(1, 1);
    this.post.uniforms.tNormal.value = this.rt.texture;
    this.post.uniforms.tDepth.value = this.rt.depthTexture;
    this.postScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.post));
  }

  setSize(width: number, height: number, dpr = 2) {
    this.width = width;
    this.height = height;
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.rt.setSize(width * dpr, height * dpr);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.post.uniforms.texel.value.set(1 / (width * dpr), 1 / (height * dpr));
    this.post.uniforms.dpr.value = dpr;
  }

  render(scene: THREE.Scene, kit: Kit) {
    const { camera, rig } = this;
    camera.position.copy(rig.target).add(rig.offset);
    camera.lookAt(rig.target);
    camera.updateMatrixWorld();
    kit.lightView.value.copy(this.lightWorld).transformDirection(camera.matrixWorldInverse);
    this.renderer.setRenderTarget(this.rt);
    this.renderer.clear();
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.postScene, this.postCam);
  }

  // Screen position of a world point in CSS pixels; z > 1 means behind the camera.
  project(p: THREE.Vector3, out = new THREE.Vector3()) {
    out.copy(p).project(this.camera);
    return {
      x: (out.x * 0.5 + 0.5) * this.width,
      y: (-out.y * 0.5 + 0.5) * this.height,
      z: out.z,
    };
  }

  dispose() {
    this.rt.dispose();
    this.renderer.dispose();
  }
}

export function disposeScene(scene: THREE.Scene) {
  scene.traverse((o) => {
    if (o instanceof THREE.Mesh || o instanceof THREE.Line || o instanceof THREE.Points) {
      o.geometry.dispose();
      const m = o.material;
      if (Array.isArray(m)) for (const x of m) x.dispose();
      else m.dispose();
    }
  });
}
