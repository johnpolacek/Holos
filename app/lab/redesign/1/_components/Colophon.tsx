import Emblem from "./Emblem";

// The end of every page: the next page as a ruled plate, then the site's own footer text.
export default function Colophon({ next }: { next: { href: string; label: string } }) {
  return (
    <footer className="r1-colophon">
      <nav className="r1-next" aria-label="Next page">
        <span className="r1-next-label">Next</span>
        <a href={next.href}>
          {next.label}
          <span aria-hidden="true">→</span>
        </a>
      </nav>
      <p className="r1-colophon-text">
        Holos is an independent research project by a{" "}
        <a href="https://johnpolacek.com">software engineer</a> exploring reality through systems,
        observation, and experience, written in public as part of an ongoing process of thinking,
        not as a finalized doctrine.
      </p>
      <p className="r1-colophon-links">
        <a href="https://github.com/johnpolacek/Holos/discussions">Discuss</a>
        <a href="https://github.com/johnpolacek/Holos">Contribute</a>
      </p>
      <div className="r1-endmark">
        <Emblem size={22} />
      </div>
    </footer>
  );
}
