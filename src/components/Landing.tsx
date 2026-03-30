import type { Project } from "../data/portfolio";
import {
  Code2,
  Briefcase,
  Users,
  ArrowRight,
} from "lucide-react";

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    text: "text-indigo-400",
    glow: "hover:shadow-indigo-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "hover:shadow-emerald-500/10",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    glow: "hover:shadow-amber-500/10",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    glow: "hover:shadow-rose-500/10",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    glow: "hover:shadow-cyan-500/10",
  },
};

const renderBold = (text: string) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });

export function Landing({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (project: Project) => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background effects */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

        <div className="relative max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Portfolio
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">Ario</span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 font-medium mb-4">
            Frontend Developer
          </p>

          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Building modern, performant web applications with React, TypeScript, and modern tooling.
            Here are some projects I've worked on.
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="flex-1 px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-zinc-100 mb-8">
            Projects
            <span className="text-zinc-600 text-lg font-normal ml-3">
              {projects.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const colors = colorMap[project.color] || colorMap.indigo;
              const techCount = Object.values(project.techStack).flat().length;
              const metricTotal = Object.values(project.metrics).reduce(
                (sum, v) => sum + v,
                0
              );

              return (
                <button
                  key={project.id}
                  onClick={() => onSelect(project)}
                  className={`group text-left rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 transition-all hover:border-zinc-700 hover:shadow-xl ${colors.glow} cursor-pointer`}
                >
                  {project.coverImage && (
                    <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
                      <img
                        src={project.coverImage}
                        alt={project.coverImageAlt || `${project.title} preview`}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Status + Color accent */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {project.status}
                    </span>
                    <ArrowRight
                      size={18}
                      className="text-zinc-600 group-hover:text-zinc-300 group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-1 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <p className={`text-sm font-medium ${colors.text} mb-3`}>
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {renderBold(project.description)}
                  </p>

                  {/* Meta row */}
                  <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} />
                      {project.role}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users size={13} />
                      {project.teamSize} people
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Code2 size={13} />
                      {techCount} technologies
                    </span>
                  </div>

                  {/* Stats bar */}
                  <div className="mt-5 pt-5 border-t border-zinc-800/60 grid grid-cols-3 gap-4">
                    <div>
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {project.features.length}
                      </div>
                      <div className="text-xs text-zinc-600">Features</div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {project.challenges.length}
                      </div>
                      <div className="text-xs text-zinc-600">Challenges</div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold ${colors.text}`}>
                        {metricTotal}+
                      </div>
                      <div className="text-xs text-zinc-600">Components</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
