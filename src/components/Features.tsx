import type { Feature } from "../data/portfolio";
import { Section, SectionTitle } from "./Section";

export function Features({ features }: { features: Feature[] }) {
  return (
    <Section id="features">
      <SectionTitle subtitle={`${features.length} major features built from scratch, handling complex state, real-time data, and cross-platform integrations.`}>
        Key Features
      </SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feature, i) => (
          <div
            key={feature.name}
            className="group rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary-light flex items-center justify-center text-sm font-bold font-mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-zinc-100 font-semibold text-lg leading-snug pt-1">
                {feature.name}
              </h3>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-4 pl-11">
              {feature.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pl-11">
              {feature.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
