import { useState } from "react";
import { type Project } from "./data/portfolio";
import { Navbar } from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { Features } from "./components/Features";
import { Challenges } from "./components/Challenges";
import { Architecture } from "./components/Architecture";
import { Footer } from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";

type Page = { type: "home" } | { type: "project"; project: Project };

function App() {
  const [page, setPage] = useState<Page>({ type: "home" });

  const handleViewProject = (project: Project) => {
    setPage({ type: "project", project });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoHome = () => {
    setPage({ type: "home" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <Navbar page={page.type} onGoHome={handleGoHome} />

      {page.type === "home" ? (
        <Homepage onViewProject={handleViewProject} />
      ) : (
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

      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
