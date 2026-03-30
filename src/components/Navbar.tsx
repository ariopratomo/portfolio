import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "lucide-react";

const homeNavItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
];

const projectNavItems = [
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Features", href: "#features" },
  { label: "Challenges", href: "#challenges" },
  { label: "Architecture", href: "#architecture" },
];

const resumeNavItems = [
  { label: "Form", href: "#resume-form" },
  { label: "Preview", href: "#resume-preview" },
];

export function Navbar({
  page,
  onGoHome,
  onOpenResume,
}: {
  page: "home" | "project" | "resume-builder";
  onGoHome: () => void;
  onOpenResume: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = page === "home" ? homeNavItems : page === "project" ? projectNavItems : resumeNavItems;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Left side */}
        {page === "project" ? (
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-lg font-bold gradient-text">Ario</span>
          </button>
        ) : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-lg font-bold gradient-text"
          >
            Ario
          </a>
        )}

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onOpenResume}
            className="ml-2 px-3 py-2 text-sm rounded-lg border border-zinc-800 text-zinc-200 hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
          >
            Resume Builder
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-zinc-400 hover:text-zinc-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-4 pb-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm text-zinc-400 hover:text-zinc-100 border-b border-zinc-800/50 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              onOpenResume();
              setMobileOpen(false);
            }}
            className="mt-2 w-full text-left px-3 py-3 text-sm text-zinc-200 rounded-lg bg-primary/10 border border-primary/30"
          >
            Resume Builder
          </button>
        </div>
      )}
    </nav>
  );
}
