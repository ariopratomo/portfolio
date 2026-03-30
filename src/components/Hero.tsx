import type { Project } from "../data/portfolio";
import {
  Code2,
  Briefcase,
  Users,
  Calendar,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

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

export function Hero({ project }: { project: Project }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto text-center animate-fade-in-up">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {project.status}
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">{project.title}</span>
        </h1>

        <p className="text-xl sm:text-2xl text-zinc-400 font-medium mb-6">
          {project.subtitle}
        </p>

        <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          {renderBold(project.description)}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <MetaPill icon={<Briefcase size={16} />} label="Role" value={project.role} />
          <MetaPill icon={<Calendar size={16} />} label="Duration" value={project.duration} />
          <MetaPill icon={<Users size={16} />} label="Team" value={`${project.teamSize} people`} />
          <MetaPill icon={<Code2 size={16} />} label="Type" value={project.status} />
        </div>

        {project.coverImage && (
          <div className="relative mx-auto mb-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 shadow-2xl">
            <img
              src={project.coverImage}
              alt={project.coverImageAlt || `${project.title} screenshot`}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Live links */}
        {project.links && project.links.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary-light text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <ExternalLink size={14} />
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Scroll hint */}
        <a
          href="#tech-stack"
          className="inline-flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}

function MetaPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 border border-zinc-800">
      <span className="text-primary-light">{icon}</span>
      <span className="text-zinc-500 text-sm">{label}:</span>
      <span className="text-zinc-200 text-sm font-medium">{value}</span>
    </div>
  );
}
