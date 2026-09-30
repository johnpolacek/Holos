import Link from "next/link";

const BASE = "/lab/redesign/2";

export default function Footer() {
  return (
    <footer className="n-footer">
      <div className="n-wrap n-footer-in">
        <p className="n-footer-mark" aria-hidden="true">
          Holos<span>⊛</span>
        </p>
        <div className="n-footer-cols">
          <p className="n-footer-about">
            Holos is an independent research project by a{" "}
            <a href="https://johnpolacek.com">software engineer</a> exploring reality through
            systems, observation, and experience, written in public as part of an ongoing process of
            thinking, not as a finalized doctrine.
          </p>
          <nav className="n-footer-nav" aria-label="Footer">
            <Link href={BASE}>Overview</Link>
            <Link href={`${BASE}/logic`}>Logic</Link>
            <a href="/predictions">Predictions</a>
            <a href="/citations">Citations</a>
            <a href="/revisions">Revisions</a>
          </nav>
          <nav className="n-footer-nav" aria-label="Community">
            <a href="https://github.com/johnpolacek/Holos/discussions">Discuss</a>
            <a href="https://github.com/johnpolacek/Holos">Contribute</a>
            <a href="/holos.pdf" download="holos.pdf">
              Download
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
