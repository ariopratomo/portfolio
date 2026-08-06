import { useEffect, useState } from "react";
import { type Project } from "./data/portfolio";
import { Navbar } from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Features } from "./components/Features";
import { Challenges } from "./components/Challenges";
import { Architecture } from "./components/Architecture";
import { Footer } from "./components/Footer";
import { QuickTools } from "./components/QuickTools";
import { ResumeBuilder } from "./features/resume/ResumeBuilder";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export type Page = { type: "home" } | { type: "project"; project: Project } | { type: "resume-builder" };
type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function App() {
  const [page, setPage] = useState<Page>({ type: "home" });
  const [theme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const title =
      page.type === "resume-builder"
        ? "Ario | Resume Builder"
        : page.type === "project"
          ? `Ario | ${page.project.title}`
          : "Ario | Software Engineer"
    document.title = title;
  }, [page]);

  const handleViewProject = (project: Project) => {
    setPage({ type: "project", project });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setPage({ type: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoResume = () => {
    setPage({ type: "resume-builder" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "dark" ? "bg-zinc-950 text-zinc-100" : "bg-white text-slate-900"
      }`}
    >
      <Navbar page={page.type} onGoHome={handleGoHome} onOpenResume={handleGoResume} />

      {page.type === "home" && <Homepage onViewProject={handleViewProject} />}

      {page.type === "project" && (
        <>
          <Hero project={page.project} />
          <TechStack techStack={page.project.techStack} />
          <Features features={page.project.features} />
          <Challenges challenges={page.project.challenges} />
          <Architecture
            metrics={page.project.metrics}
            architecture={page.project.architecture}
            security={page.project.security}
            lessons={page.project.lessons}
          />
        </>
      )}

      {page.type === "resume-builder" && <ResumeBuilder />}

      <Footer />
      <QuickTools page={page} onGoHome={handleGoHome} />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
