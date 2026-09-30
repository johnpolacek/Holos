// The site footer's own text, set on the grid, over a wordmark that runs the full width.

export default function Footer({ base }: { base: string }) {
  return (
    <footer className="r4-foot">
      <div className="r4-foot-grid">
        <p className="r4-foot-text">
          Holos is an independent research project by a{" "}
          <a href="https://johnpolacek.com">software engineer</a> exploring reality through systems,
          observation, and experience, written in public as part of an ongoing process of thinking,
          not as a finalized doctrine.
        </p>
        <ul className="r4-foot-links">
          <li>
            <a href="https://github.com/johnpolacek/Holos/discussions">Discuss</a>
          </li>
          <li>
            <a href="https://github.com/johnpolacek/Holos">Contribute</a>
          </li>
          <li>
            <a href={base}>Overview</a>
          </li>
          <li>
            <a href={`${base}/logic`}>Logic</a>
          </li>
        </ul>
      </div>
      <p className="r4-foot-mark" aria-hidden="true">
        Holos
      </p>
    </footer>
  );
}
