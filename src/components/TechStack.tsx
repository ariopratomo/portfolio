import { useState } from "react";
import type { TechItem } from "../data/portfolio";
import { Section, SectionTitle } from "./Section";

export function TechStack({ techStack }: { techStack: Record<string, TechItem[]> }) {
  const categories = Object.keys(techStack);
  const [active, setActive] = useState(categories[0]);

  return (
    <Section id="tech-stack">
      <SectionTitle subtitle="Modern, production-grade tooling chosen for performance, DX, and scalability.">
        Tech Stack
      </SectionTitle>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              active === cat
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tech grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {techStack[active].map((tech) => (
          <div
            key={tech.name}
            className="group gradient-border rounded-xl bg-zinc-900/60 p-5 hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-zinc-100 font-semibold">{tech.name}</h3>
              {tech.version && (
                <span className="text-xs font-mono text-primary-light bg-primary/10 px-2 py-0.5 rounded">
                  v{tech.version}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500">
              {tech.variant ? `${tech.category} — ${tech.variant}` : tech.category}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
