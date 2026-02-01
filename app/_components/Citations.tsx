import { citationSections } from "./citation-sections";

export default function Citations() {
  return (
    <div className="text-sm flex flex-col gap-4">
      <p className="mb-6">
        Citations are essential to this framework. They link to the important philosophical,
        scientific, and mathematical work being done by many people, both in recent years and dating
        back across a long history of ideas, experiments, and observations. What follows is a
        curated list of sources that have directly informed or inspired the views expressed here.
      </p>
      {/* Citation sections */}
      {citationSections.map((section) => (
        <div key={section.id}>
          <h4 id={section.id} className="font-semibold pt-4">
            {section.title}
          </h4>
          <div className="flex">
            <sup className="relative top-2 pr-2">{section.number}</sup>
            <ul className="flex flex-col gap-2">
              {section.items.map((item, itemIndex) => (
                <li key={`${section.id}-item-${itemIndex}`}>
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
    </div>
  );
}
