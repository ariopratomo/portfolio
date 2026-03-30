import { Code2, Briefcase, Mail } from "lucide-react";
import { profile } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-zinc-400 text-sm">
            Built with React + TypeScript + Tailwind CSS
          </p>
          <p className="text-zinc-600 text-xs mt-1">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <SocialLink href={profile.github} icon={<Code2 size={18} />} label="GitHub" />
          <SocialLink href={profile.linkedin} icon={<Briefcase size={18} />} label="LinkedIn" />
          <SocialLink href={`mailto:${profile.email}`} icon={<Mail size={18} />} label="Email" />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-primary-light hover:border-primary/40 transition-all"
    >
      {icon}
    </a>
  );
}
