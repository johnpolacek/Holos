export default function Header() {
  return (
    <header
      id="home"
      className="flex flex-col items-center justify-center sm:gap-2 relative p-8 lg:px-16 border-b border-black/30 border-dashed xl:h-[160px] animate pointer-events-none"
    >
      <img
        src="/icon.svg"
        alt="⊛"
        title="⊛"
        className="xl:hidden w-4 h-4 lg:w-5 lg:h-5 opacity-60 relative -top-2"
      />
      <h1 className="text-center text-balance scale-[0.8] sm:scale-90 md:scale-100 -ml-2 xl:ml-0 xl:text-left text-3xl lg:text-4xl xl:text-5xl font-extralight xl:font-thin">
        Holos: An Interpretive Framework for Understanding Reality, Bounded by Physics
      </h1>
    </header>
  );
}
