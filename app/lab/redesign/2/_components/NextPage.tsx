import Link from "next/link";

// The hand-off at the end of a page: where the reading goes next.
export default function NextPage({
  href,
  title,
  sub,
  external = false,
}: {
  href: string;
  title: string;
  sub: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="n-label">Continue</span>
      <span className="n-next-title">
        {title}
        <svg viewBox="0 0 40 16" aria-hidden="true">
          <path d="M0 8h38M31 1l7 7-7 7" />
        </svg>
      </span>
      <span className="n-next-sub">{sub}</span>
    </>
  );
  return (
    <nav className="n-next n-wrap" aria-label="Next page" data-reveal>
      {external ? <a href={href}>{inner}</a> : <Link href={href}>{inner}</Link>}
    </nav>
  );
}
