import type { ProjectMetrics, ProjectArchitecture } from "../data/portfolio";
import { Section, SectionTitle } from "./Section";
import { Shield, Lightbulb } from "lucide-react";

export function Architecture({
  metrics,
  architecture,
  security,
  lessons,
}: {
  metrics: ProjectMetrics;
  architecture: ProjectArchitecture;
  security: string[];
  lessons?: string[];
}) {
  const metricItems = Object.entries(metrics).map(([label, value]) => ({
    label,
    value,
  }));

  return (
    <Section id="architecture">
      <SectionTitle subtitle="Production-grade architecture designed for scalability and team collaboration.">
        Architecture & Metrics
      </SectionTitle>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {metricItems.map((m) => (
          <div
            key={m.label}
            className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 text-center hover:border-primary/30 transition-colors"
          >
            <div className="text-3xl font-bold gradient-text mb-1">
              {m.value}+
            </div>
            <div className="text-sm text-zinc-500">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Architecture details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4">
            Architecture Decisions
          </h3>
          <div className="space-y-3">
            {Object.entries(architecture).map(([key, value]) => (
              <div key={key}>
                <span className="text-xs font-mono text-primary-light uppercase tracking-wider">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <p className="text-sm text-zinc-400 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
            <Shield size={18} className="text-emerald-400" />
            Security Measures
          </h3>
          <ul className="space-y-2.5">
            {security.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lessons Learned */}
      {lessons && lessons.length > 0 && (
        <div className="mt-6 rounded-xl bg-zinc-900/60 border border-zinc-800 p-6">
          <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-amber-400" />
            Lessons Learned
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lessons.map((lesson) => (
              <li key={lesson} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400/60 flex-shrink-0" />
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
