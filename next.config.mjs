/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds since we're using Biome
    ignoreDuringBuilds: true,
  },
  experimental: {
    // The on-demand PDF route launches headless Chrome. Keep these packages unbundled so
    // @sparticuz/chromium's compressed binary ships with the function.
    serverComponentsExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
    outputFileTracingIncludes: {
      "/api/pdf": [
        "./node_modules/.pnpm/@sparticuz+chromium@*/node_modules/@sparticuz/chromium/bin/**",
        // The PDF inlines each figure's still, read from disk.
        "./public/figures/**",
      ],
      // The chat route reads the site text from disk.
      "/api/chat": ["./lib/chat/corpus.txt"],
    },
  },
};

export default nextConfig;
