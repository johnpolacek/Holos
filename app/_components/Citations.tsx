import { citationMainSections } from "./citation-sections";

export default function Citations() {
  return (
    <div className="text-sm flex flex-col gap-4">
      <p>
        Citations are essential to this framework. They link to the important philosophical,
        scientific, and mathematical work being done by many people, both in recent years and dating
        back across a long history of ideas, experiments, and observations. What follows is a
        curated list of sources that have directly informed or inspired the views expressed here.
      </p>
      {citationMainSections.map((mainSection) => (
        <section key={mainSection.id} className="flex flex-col gap-6">
          <h2
            id={mainSection.id}
            className="text-xl font-semibold pt-6 pb-2 border-b border-black/20"
          >
            {mainSection.title}
          </h2>
          {mainSection.subsections.map((subsection) => (
            <div key={subsection.id}>
              <h4 id={subsection.id} className="font-semibold">
                {subsection.title}
              </h4>
              <div className="flex">
                <sup className="relative top-2 pr-2">{subsection.number}</sup>
                <ul className="flex flex-col gap-2">
                  {subsection.items.map((item, itemIndex) => (
                    <li key={`${subsection.id}-item-${itemIndex}`}>
                      <a className="font-normal underline mr-1" href={item.url}>
                        {item.name}
                      </a>{" "}
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
