import { profile, projects, type Project } from "../data/portfolio";
import { Section, SectionTitle } from "./Section";
import {
  MapPin,
  Mail,
  ChevronDown,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Award,
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

export function Homepage({ onViewProject }: { onViewProject: (p: Project) => void }) {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden pt-20">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />

        <div className="relative max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-sm text-zinc-400 mb-8">
            <MapPin size={14} />
            {profile.location}
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4">
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-400 font-medium mb-6">
            {profile.title}
          </p>

          <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex justify-center gap-3 mb-16">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              <Mail size={16} />
              Contact
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 text-sm font-medium hover:bg-zinc-800/50 transition-colors"
            >
              View Project
              <ArrowRight size={16} />
            </a>
          </div>

          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} className="animate-bounce" />
          </a>
        </div>
      </section>

      {/* ===== About ===== */}
      <Section id="about">
        <SectionTitle subtitle="A brief introduction">About</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <p className="text-zinc-400 text-lg leading-relaxed">{profile.about}</p>
        </div>
      </Section>

      {/* ===== Skills ===== */}
      <Section id="skills">
        <SectionTitle subtitle="Technologies and tools I work with">
          Skills
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(profile.skills).map(([category, items]) => (
            <div
              key={category}
              className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Experience ===== */}
      <Section id="experience">
        <SectionTitle subtitle="Professional work history">
          Experience
        </SectionTitle>
        <div className="max-w-3xl mx-auto space-y-8">
          {profile.experience.map((exp) => (
            <div
              key={exp.company + exp.period}
              className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={18} className="text-primary-light" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <span>{exp.company}</span>
                    <span className="text-zinc-700">|</span>
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 text-sm mb-4">{exp.description}</p>
              <ul className="space-y-2">
                {exp.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-zinc-400"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Education ===== */}
      <Section id="education">
        <SectionTitle subtitle="Academic background">Education</SectionTitle>
        <div className="max-w-3xl mx-auto space-y-6">
          {profile.education.map((edu) => (
            <div
              key={edu.institution + edu.period}
              className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                    <span>{edu.institution}</span>
                    <span className="text-zinc-700">|</span>
                    <span>{edu.period}</span>
                  </div>
                  {edu.description && (
                    <p className="text-zinc-400 text-sm mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Certifications ===== */}
      <Section id="certifications">
        <SectionTitle subtitle="Professional certifications">
          Certifications
        </SectionTitle>
        <div className="max-w-3xl mx-auto space-y-4">
          {profile.certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-center gap-4 rounded-xl bg-zinc-900/60 border border-zinc-800 p-5 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Award size={18} className="text-amber-400" />
              </div>
              <span className="text-zinc-300 text-sm">{cert}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== Featured Project ===== */}
      <Section id="projects">
        <SectionTitle subtitle="Production project I built end-to-end">
          Featured Project
        </SectionTitle>
        <div className="max-w-3xl mx-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onViewProject(project)}
              className="w-full text-left rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 hover:border-primary/40 transition-all group cursor-pointer"
            >
              {project.coverImage && (
                <div className="mb-5 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/70">
                  <img
                    src={project.coverImage}
                    alt={project.coverImageAlt || `${project.title} screenshot`}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-primary-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">
                    {project.subtitle}
                  </p>
                </div>
                <ArrowRight
                  size={20}
                  className="text-zinc-600 group-hover:text-primary-light group-hover:translate-x-1 transition-all mt-1 flex-shrink-0"
                />
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                {renderBold(project.description)}
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                  {project.role}
                </span>
                <span className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                  {project.duration}
                </span>
                <span className="px-2.5 py-1 text-xs rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                  Solo Developer
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/50">
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">
                    {project.features.length}
                  </div>
                  <div className="text-xs text-zinc-500">Features</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">
                    {project.challenges.length}
                  </div>
                  <div className="text-xs text-zinc-500">Challenges</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">
                    {Object.keys(project.techStack).reduce(
                      (sum, k) => sum + project.techStack[k].length,
                      0
                    )}
                  </div>
                  <div className="text-xs text-zinc-500">Technologies</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}
