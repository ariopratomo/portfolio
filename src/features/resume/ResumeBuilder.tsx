import { useMemo, useState } from "react";
import { Clipboard, Download, Eye, FileDown, LayoutTemplate, Plus, Sparkles, Trash2 } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

interface ProjectItem {
  name: string;
  role: string;
  period: string;
  bullets: string[];
  link?: string;
}

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  detail: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

interface AchievementItem {
  title: string;
  detail: string;
}

interface OpenSourceItem {
  name: string;
  role: string;
  link: string;
  bullets: string[];
}

interface LanguageItem {
  name: string;
  level: string;
}

interface ResumeData {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  skills: string[];
  experiences: Experience[];
  projects: ProjectItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  openSource: OpenSourceItem[];
  languages: LanguageItem[];
}

type SectionKey = "skills" | "experience" | "projects" | "education";
type TemplateKey = "modern" | "minimal" | "ats" | "creative";
type SummaryMode = "manual" | "short" | "long" | "ai";

const defaultData: ResumeData = {
  name: "Your Name",
  title: "Software Engineer",
  summary: "Experienced engineer focused on building reliable products with TypeScript and Go."
    + " Skilled in system design, delivery, and mentoring.",
  email: "you@example.com",
  phone: "+62 xxx xxx",
  location: "Jakarta, Indonesia",
  website: "https://example.com",
  skills: ["TypeScript", "React", "Node.js", "Go", "PostgreSQL", "Docker", "CI/CD"],
  experiences: [
    {
      company: "Acme Corp",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      bullets: [
        "Led migration to React + Vite with shared UI kits.",
        "Improved checkout latency by 25% through API batching.",
      ],
    },
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      role: "Fullstack Engineer",
      period: "2023",
      bullets: ["Built product search, cart, and checkout with React + Go APIs."],
      link: "https://example.com",
    },
  ],
  education: [
    { school: "Tech University", degree: "B.Sc. Computer Science", period: "2016 - 2020", detail: "GPA 3.6/4.0" },
  ],
  certifications: [
    { name: "AWS Certified Developer", issuer: "Amazon", year: "2022" },
  ],
  achievements: [
    { title: "Hackathon Winner", detail: "1st place at Fintech Hackathon 2021." },
  ],
  openSource: [
    {
      name: "OSS CLI Tool",
      role: "Maintainer",
      link: "https://github.com/you/oss-cli",
      bullets: ["Implemented plugin system and release automation."],
    },
  ],
  languages: [
    { name: "English", level: "Fluent" },
    { name: "Bahasa Indonesia", level: "Native" },
  ],
};

const emptyExperience: Experience = {
  company: "",
  role: "",
  period: "",
  bullets: [""],
};

const emptyProject: ProjectItem = { name: "", role: "", period: "", bullets: [""], link: "" };
const emptyEducation: EducationItem = { school: "", degree: "", period: "", detail: "" };
const emptyCertification: CertificationItem = { name: "", issuer: "", year: "" };
const emptyAchievement: AchievementItem = { title: "", detail: "" };
const emptyOpenSource: OpenSourceItem = { name: "", role: "", link: "", bullets: [""] };
const emptyLanguage: LanguageItem = { name: "", level: "" };

const improveBullet = (text: string) => {
  if (!text.trim()) return "Drove [action] to achieve [result]";
  return text.replace(/^(\w)/, (c) => c.toUpperCase()).replace(/\.$/, "") + " — improved clarity and impact.";
};

const makeImpactfulBullet = (text: string) => {
  const base = text.trim() || "Improved [metric] by [X%]";
  return `${base}${base.endsWith(".") ? "" : "."} Quantified: +[X%]/-[X%] on [metric].`;
};

function buildSummaryFromData(mode: SummaryMode, data: ResumeData) {
  const role = data.title || "Software Engineer";
  const location = data.location ? ` based in ${data.location}` : "";
  const topSkills = data.skills.filter(Boolean).slice(0, 6);
  const skillsLine = topSkills.length ? `Stack: ${topSkills.join(", ")}.` : "";

  const primaryExp = data.experiences.find((exp) => exp.company || exp.role) || data.experiences[0];
  const primaryImpact = primaryExp?.bullets?.filter(Boolean).slice(0, 2) || [];
  const project = data.projects.find((p) => p.name) || data.projects[0];

  const currentLine = primaryExp
    ? `${primaryExp.role || role} at ${primaryExp.company || "current team"}${primaryExp.period ? ` (${primaryExp.period})` : ""}`
    : "";

  const impactLine = primaryImpact.length ? `Notable wins: ${primaryImpact.join("; ")}.` : "";
  const projectLine = project ? `Built ${project.name}${project.role ? ` as ${project.role}` : ""}${project.period ? ` (${project.period})` : ""}.` : "";

  if (mode === "short") {
    return [
      `${role}${location} with focus on delivery and reliability.`,
      currentLine ? `Now ${currentLine}, driving measurable outcomes.` : "",
      topSkills.length ? `Expertise: ${topSkills.slice(0, 5).join(", ")}.` : "",
    ]
      .filter(Boolean)
      .slice(0, 3)
      .join(" ");
  }

  if (mode === "long") {
    return [
      `${role}${location} who blends engineering discipline with product sense.`,
      currentLine ? `Most recently ${currentLine}, shipping resilient features end-to-end.` : "",
      impactLine || projectLine,
      skillsLine,
      "I enjoy mentoring, system design, and making releases calm and predictable.",
    ]
      .filter(Boolean)
      .join(" ");
  }

  if (mode === "ai") {
    const expNarrative = primaryImpact.length
      ? `At ${primaryExp?.company || "my current team"}, I ${primaryImpact[0].toLowerCase()}.`
      : currentLine
        ? `At ${primaryExp?.company || "my current team"}, I drive delivery and reliability.`
        : "I align product goals with engineering execution.";

    return [
      `${role} turning requirements into reliable launches with crisp comms and steady delivery.${location}`,
      expNarrative,
      projectLine,
      skillsLine,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return data.summary;
}

const buildStarBullet = (s: string, t: string, a: string, r: string) => {
  const parts = [a, t ? `to ${t}` : "", r ? `result: ${r}` : "", s ? `(context: ${s})` : ""].filter(Boolean);
  return parts.join(" ").trim() || "Delivered [action] to [result] (context: ... )";
};

export function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(defaultData);
  const [skillInput, setSkillInput] = useState("");
  const [previewMode, setPreviewMode] = useState<"markdown" | "styled">("styled");
  const [starDrafts, setStarDrafts] = useState<Record<string, { s: string; t: string; a: string; r: string; open: boolean }>>({});
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(["skills", "experience", "projects", "education"]);
  const [dragging, setDragging] = useState<SectionKey | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("modern");
  const [summaryMode, setSummaryMode] = useState<SummaryMode>("manual");
  const [aiState, setAiState] = useState<{ task: "summary" | "bullet" | "skills" | null; target?: string }>({ task: null });
  const [aiError, setAiError] = useState<string | null>(null);

  const sectionLabels: Record<SectionKey, string> = {
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
  };

  const templateLabels: Record<TemplateKey, string> = {
    modern: "Modern",
    minimal: "Minimal",
    ats: "ATS-friendly",
    creative: "Creative",
  };
  const templateOptions: TemplateKey[] = ["modern", "minimal", "ats", "creative"];

  const reorderSections = (from: SectionKey, to: SectionKey) => {
    if (from === to) return;
    setSectionOrder((prev) => {
      const next = [...prev];
      const fromIndex = next.indexOf(from);
      const toIndex = next.indexOf(to);
      if (fromIndex === -1 || toIndex === -1) return prev;
      next.splice(fromIndex, 1);
      next.splice(toIndex, 0, from);
      return next;
    });
  };

  const updateField = (key: keyof ResumeData, value: string | string[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateExperience = (index: number, updater: (exp: Experience) => Experience) => {
    setData((prev) => {
      const next = [...prev.experiences];
      next[index] = updater(next[index]);
      return { ...prev, experiences: next };
    });
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    setData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const addExperience = () => {
    setData((prev) => ({ ...prev, experiences: [...prev.experiences, { ...emptyExperience, bullets: [""] }] }));
  };

  const removeExperience = (index: number) => {
    setData((prev) => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
  };

  const updateProjects = (index: number, updater: (p: ProjectItem) => ProjectItem) => {
    setData((prev) => {
      const next = [...prev.projects];
      next[index] = updater(next[index]);
      return { ...prev, projects: next };
    });
  };

  const addProject = () => setData((prev) => ({ ...prev, projects: [...prev.projects, { ...emptyProject, bullets: [""] }] }));
  const removeProject = (index: number) => setData((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));

  const addEducation = () => setData((prev) => ({ ...prev, education: [...prev.education, { ...emptyEducation }] }));
  const removeEducation = (index: number) => setData((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));

  const addCertification = () => setData((prev) => ({ ...prev, certifications: [...prev.certifications, { ...emptyCertification }] }));
  const removeCertification = (index: number) => setData((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== index) }));

  const addAchievement = () => setData((prev) => ({ ...prev, achievements: [...prev.achievements, { ...emptyAchievement }] }));
  const removeAchievement = (index: number) => setData((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));

  const updateOpenSource = (index: number, updater: (p: OpenSourceItem) => OpenSourceItem) => {
    setData((prev) => {
      const next = [...prev.openSource];
      next[index] = updater(next[index]);
      return { ...prev, openSource: next };
    });
  };
  const addOpenSource = () => setData((prev) => ({ ...prev, openSource: [...prev.openSource, { ...emptyOpenSource, bullets: [""] }] }));
  const removeOpenSource = (index: number) => setData((prev) => ({ ...prev, openSource: prev.openSource.filter((_, i) => i !== index) }));

  const addLanguage = () => setData((prev) => ({ ...prev, languages: [...prev.languages, { ...emptyLanguage }] }));
  const removeLanguage = (index: number) => setData((prev) => ({ ...prev, languages: prev.languages.filter((_, i) => i !== index) }));

  const copyMarkdown = async () => {
    const md = buildMarkdown(data, sectionOrder);
    if (!navigator.clipboard?.writeText) return;
    await navigator.clipboard.writeText(md);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPdf = () => {
    const html = buildPrintHtml(data, sectionOrder, template);
    const printWindow = window.open("", "_blank", "width=900,height=1200");
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const aiConfig = {
    geminiKey: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
    geminiModel: (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || "gemini-1.5-flash-latest",
    openaiKey: (import.meta.env.VITE_OPENAI_API_KEY as string | undefined) || (import.meta.env.VITE_OPENAI_COMPAT_API_KEY as string | undefined),
    openaiBase: (import.meta.env.VITE_OPENAI_BASE_URL as string | undefined) || "https://api.openai.com/v1",
    openaiModel: (import.meta.env.VITE_OPENAI_MODEL as string | undefined) || "gpt-4o-mini",
    claudeKey: import.meta.env.VITE_CLAUDE_API_KEY as string | undefined,
    claudeModel: (import.meta.env.VITE_CLAUDE_MODEL as string | undefined) || "claude-3-haiku-20240307",
  };

  const callAi = async (prompt: string) => {
    const providers: Array<"gemini" | "openai" | "claude"> = [];
    if (aiConfig.geminiKey) providers.push("gemini");
    if (aiConfig.openaiKey) providers.push("openai");
    if (aiConfig.claudeKey) providers.push("claude");

    if (!providers.length) {
      throw new Error("Tambahkan VITE_GEMINI_API_KEY atau VITE_OPENAI_API_KEY/VITE_OPENAI_COMPAT_API_KEY atau VITE_CLAUDE_API_KEY di .env.");
    }

    const provider = providers[0];

    if (provider === "gemini") {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.geminiModel}:generateContent?key=${aiConfig.geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.35 } }),
        }
      );
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "Gemini request failed");
      const text = json?.candidates?.[0]?.content?.parts?.map((p: { text: string }) => p.text).join(" ").trim();
      if (!text) throw new Error("Gemini responded without content");
      return text;
    }

    if (provider === "openai") {
      const res = await fetch(`${aiConfig.openaiBase}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${aiConfig.openaiKey}`,
        },
        body: JSON.stringify({
          model: aiConfig.openaiModel,
          messages: [
            { role: "system", content: "You rewrite resume content. Keep it concise and factual." },
            { role: "user", content: prompt },
          ],
          temperature: 0.35,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message || "OpenAI request failed");
      const text = json?.choices?.[0]?.message?.content?.trim();
      if (!text) throw new Error("OpenAI responded without content");
      return text;
    }

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": aiConfig.claudeKey || "",
      },
      body: JSON.stringify({
        model: aiConfig.claudeModel,
        max_tokens: 300,
        temperature: 0.35,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Claude request failed");
    const text = json?.content?.map((c: { text: string }) => c.text).join(" ").trim();
    if (!text) throw new Error("Claude responded without content");
    return text;
  };

  const handleGenerateSummary = async () => {
    setAiError(null);
    setAiState({ task: "summary" });
    try {
      const prompt = `You are rewriting a resume professional summary. Keep it 2-4 sentences, direct, outcome-oriented, and free of fluff. Focus on delivery, reliability, and measurable impact. Data: ${JSON.stringify({
        name: data.name,
        title: data.title,
        location: data.location,
        summary: data.summary,
        skills: data.skills,
        experiences: data.experiences.map((e) => ({ company: e.company, role: e.role, period: e.period, bullets: e.bullets })),
        projects: data.projects.map((p) => ({ name: p.name, role: p.role, period: p.period, bullets: p.bullets })),
      })}`;
      const generated = await callAi(prompt);
      updateField("summary", generated);
      setSummaryMode("manual");
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI summary gagal";
      setAiError(message);
    } finally {
      setAiState({ task: null });
    }
  };

  const handleImproveBulletAi = async (kind: "experience" | "project", index: number, bIndex: number, text: string) => {
    setAiError(null);
    const targetId = `${kind}-${index}-${bIndex}`;
    setAiState({ task: "bullet", target: targetId });
    try {
      const prompt = `Rewrite this resume bullet to be concise, impact-first, with a metric if present. Keep it one sentence. Bullet: ${text}`;
      const improved = await callAi(prompt);
      if (kind === "experience") {
        updateExperience(index, (e) => ({ ...e, bullets: e.bullets.map((b, i) => (i === bIndex ? improved : b)) }));
      } else {
        updateProjects(index, (p) => ({ ...p, bullets: p.bullets.map((b, i) => (i === bIndex ? improved : b)) }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI bullet gagal";
      setAiError(message);
    } finally {
      setAiState({ task: null });
    }
  };

  const handleSuggestSkills = async () => {
    setAiError(null);
    setAiState({ task: "skills" });
    try {
      const prompt = `Suggest 6-10 hard skills (short, lowercase/Title Case, comma-separated) for this resume. Avoid duplicates. Data: ${JSON.stringify({
        title: data.title,
        summary: data.summary,
        skills: data.skills,
        experiences: data.experiences.map((e) => ({ role: e.role, bullets: e.bullets })),
        projects: data.projects.map((p) => ({ name: p.name, bullets: p.bullets })),
      })}`;
      const text = await callAi(prompt);
        const suggestions = text
          .split(/\n|,|;/)
          .map((s: string) => s.trim())
          .filter(Boolean)
          .map((s: string) => s.replace(/^[-•]\s*/, ""));
      const deduped = Array.from(new Set([...data.skills, ...suggestions]));
      setData((prev) => ({ ...prev, skills: deduped.slice(0, 24) }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI skills gagal";
      setAiError(message);
    } finally {
      setAiState({ task: null });
    }
  };

  const previewMarkdown = useMemo(() => buildMarkdown(data, sectionOrder), [data, sectionOrder]);

  return (
    <section id="resume-builder" className="py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900/40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div id="resume-form" className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6 shadow-lg shadow-primary/5">
          <header className="flex flex-col gap-4 justify-between">
            <div>
              <p className="text-sm text-primary-light">Resume Builder (isolated)</p>
              <h2 className="text-2xl font-bold text-zinc-100">Fill your details</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyMarkdown}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-primary/40 hover:bg-primary/10"
              >
                <Clipboard size={14} /> Copy Markdown
              </button>
              <button
                onClick={downloadJson}
                className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-3 py-2 text-sm hover:bg-primary-dark"
              >
                <Download size={14} /> JSON
              </button>
              <button
                onClick={exportPdf}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-primary/40 hover:bg-primary/10"
              >
                <FileDown size={14} /> PDF
              </button>
            </div>
          </header>

          {aiError && <p className="text-sm text-red-400">AI assist error: {aiError}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Name" value={data.name} onChange={(v) => updateField("name", v)} />
            <Input label="Title" value={data.title} onChange={(v) => updateField("title", v)} />
            <Input label="Email" value={data.email} onChange={(v) => updateField("email", v)} />
            <Input label="Phone" value={data.phone} onChange={(v) => updateField("phone", v)} />
            <Input label="Location" value={data.location} onChange={(v) => updateField("location", v)} />
            <Input label="Website" value={data.website} onChange={(v) => updateField("website", v)} />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Professional Summary</p>
            <Textarea label="Summary" value={data.summary} onChange={(v) => updateField("summary", v)} />
            <p className="text-xs text-zinc-500">
              Short keeps it 2–3 lines for ATS. Long tells a story. AI uses your experience + projects to draft a fresh summary.
            </p>
            <div className="flex flex-wrap gap-2">
              {([
                { key: "short", label: "Short (ATS)" },
                { key: "long", label: "Long" },
                { key: "ai", label: "AI from experience" },
              ] as const).map((option) => (
                <button
                  key={option.key}
                  onClick={() => {
                    setSummaryMode(option.key);
                    const generated = buildSummaryFromData(option.key, data);
                    updateField("summary", generated);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border ${
                    summaryMode === option.key ? "border-primary/60 text-primary-light" : "border-zinc-700 text-zinc-300"
                  } hover:border-primary/40 hover:text-primary-light`}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
              <button
                onClick={() => setSummaryMode("manual")}
                className={`text-xs px-3 py-1.5 rounded-lg border ${
                  summaryMode === "manual" ? "border-primary/60 text-primary-light" : "border-zinc-700 text-zinc-300"
                } hover:border-primary/40 hover:text-primary-light`}
                type="button"
              >
                Manual
              </button>
              <button
                onClick={handleGenerateSummary}
                disabled={aiState.task === "summary"}
                className={`inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border bg-primary/10 text-primary-light hover:border-primary/60 hover:text-primary disabled:opacity-60 disabled:cursor-not-allowed`}
                type="button"
              >
                <Sparkles size={14} />
                {aiState.task === "summary" ? "Generating..." : "Generate summary"}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
            <p className="text-sm text-zinc-400 mb-2">Urutkan section (drag & drop)</p>
            <div className="flex flex-col gap-2">
              {sectionOrder.map((section) => (
                <div
                  key={section}
                  draggable
                  onDragStart={() => setDragging(section)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dragging) reorderSections(dragging, section);
                    setDragging(null);
                  }}
                  onDragEnd={() => setDragging(null)}
                  className={`flex items-center justify-between rounded-lg border border-dashed border-zinc-800 px-3 py-2 text-sm text-zinc-200 bg-zinc-900/70 ${
                    dragging === section ? "border-primary/60" : "hover:border-primary/40"
                  }`}
                >
                  <span className="text-zinc-200">{sectionLabels[section]}</span>
                  <span className="text-xs text-zinc-500">⇅</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-zinc-400">Skills</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-sm text-zinc-200"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label={`Remove ${skill}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Add a skill"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
              />
              <button
                onClick={addSkill}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700 w-full sm:w-auto"
              >
                <Plus size={14} /> Add
              </button>
              <button
                onClick={handleSuggestSkills}
                disabled={aiState.task === "skills"}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:border-primary/40 hover:bg-primary/10 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {aiState.task === "skills" ? "Suggesting..." : "Suggest skills"}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Experiences</label>
              <button
                onClick={addExperience}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add experience
              </button>
            </div>

            {data.experiences.map((exp, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">Entry {index + 1}</p>
                  <button
                    onClick={() => removeExperience(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove experience"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="Company" value={exp.company} onChange={(v) => updateExperience(index, (e) => ({ ...e, company: v }))} />
                  <Input label="Role" value={exp.role} onChange={(v) => updateExperience(index, (e) => ({ ...e, role: v }))} />
                  <Input label="Period" value={exp.period} onChange={(v) => updateExperience(index, (e) => ({ ...e, period: v }))} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Highlights</p>
                  {exp.bullets.map((bullet, bIndex) => (
                    <div key={bIndex} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={bullet}
                          onChange={(event) =>
                            updateExperience(index, (expEntry) => {
                              const next = [...expEntry.bullets];
                              next[bIndex] = event.target.value;
                              return { ...expEntry, bullets: next };
                            })
                          }
                          placeholder="Achievement/impact"
                          className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
                        />
                        <button
                          onClick={() =>
                            updateExperience(index, (e) => ({ ...e, bullets: e.bullets.filter((_, i) => i !== bIndex) }))
                          }
                          className="text-zinc-500 hover:text-red-400"
                          aria-label="Remove bullet"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            updateExperience(index, (e) => ({
                              ...e,
                              bullets: e.bullets.map((b, i) => (i === bIndex ? improveBullet(b) : b)),
                            }))
                          }
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40"
                        >
                          Improve
                        </button>
                        <button
                          onClick={() => handleImproveBulletAi("experience", index, bIndex, bullet)}
                          disabled={aiState.task === "bullet" && aiState.target === `experience-${index}-${bIndex}`}
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {aiState.task === "bullet" && aiState.target === `experience-${index}-${bIndex}` ? "AI..." : "AI Improve"}
                        </button>
                        <button
                          onClick={() =>
                            updateExperience(index, (e) => ({
                              ...e,
                              bullets: e.bullets.map((b, i) => (i === bIndex ? makeImpactfulBullet(b) : b)),
                            }))
                          }
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40"
                        >
                          Impact
                        </button>
                        <button
                          onClick={() =>
                            setStarDrafts((prev) => {
                              const key = `${index}-${bIndex}`;
                              const current = prev[key] || { s: "", t: "", a: "", r: "", open: false };
                              return { ...prev, [key]: { ...current, open: !current.open } };
                            })
                          }
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40"
                        >
                          STAR
                        </button>
                      </div>
                      {(() => {
                        const key = `${index}-${bIndex}`;
                        const draft = starDrafts[key];
                        if (!draft?.open) return null;
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                            <input
                              value={draft.s}
                              onChange={(e) =>
                                setStarDrafts((prev) => ({
                                  ...prev,
                                  [key]: { ...(prev[key] || { s: "", t: "", a: "", r: "", open: true }), s: e.target.value, open: true },
                                }))
                              }
                              placeholder="Situation"
                              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-100"
                            />
                            <input
                              value={draft.t}
                              onChange={(e) =>
                                setStarDrafts((prev) => ({
                                  ...prev,
                                  [key]: { ...(prev[key] || { s: "", t: "", a: "", r: "", open: true }), t: e.target.value, open: true },
                                }))
                              }
                              placeholder="Task"
                              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-100"
                            />
                            <input
                              value={draft.a}
                              onChange={(e) =>
                                setStarDrafts((prev) => ({
                                  ...prev,
                                  [key]: { ...(prev[key] || { s: "", t: "", a: "", r: "", open: true }), a: e.target.value, open: true },
                                }))
                              }
                              placeholder="Action"
                              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-100"
                            />
                            <input
                              value={draft.r}
                              onChange={(e) =>
                                setStarDrafts((prev) => ({
                                  ...prev,
                                  [key]: { ...(prev[key] || { s: "", t: "", a: "", r: "", open: true }), r: e.target.value, open: true },
                                }))
                              }
                              placeholder="Result"
                              className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs text-zinc-100"
                            />
                            <div className="flex gap-2 text-[11px] sm:col-span-2">
                              <button
                                onClick={() => {
                                  const composed = buildStarBullet(draft.s, draft.t, draft.a, draft.r);
                                  updateExperience(index, (e) => ({
                                    ...e,
                                    bullets: e.bullets.map((b, i) => (i === bIndex ? composed : b)),
                                  }));
                                  setStarDrafts((prev) => ({ ...prev, [key]: { s: "", t: "", a: "", r: "", open: false } }));
                                }}
                                className="px-2 py-1 rounded-md bg-primary text-white"
                              >
                                Apply STAR
                              </button>
                              <button
                                onClick={() => setStarDrafts((prev) => ({ ...prev, [key]: { s: "", t: "", a: "", r: "", open: false } }))}
                                className="px-2 py-1 rounded-md border border-zinc-800 text-zinc-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  ))}
                  <button
                    onClick={() => updateExperience(index, (e) => ({ ...e, bullets: [...e.bullets, ""] }))}
                    className="text-xs text-primary-light hover:text-primary"
                  >
                    + Add bullet
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Projects</label>
              <button
                onClick={addProject}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add project
              </button>
            </div>

            {data.projects.map((proj, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">Project {index + 1}</p>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="Name" value={proj.name} onChange={(v) => updateProjects(index, (p) => ({ ...p, name: v }))} />
                  <Input label="Role" value={proj.role} onChange={(v) => updateProjects(index, (p) => ({ ...p, role: v }))} />
                  <Input label="Period" value={proj.period} onChange={(v) => updateProjects(index, (p) => ({ ...p, period: v }))} />
                </div>
                <Input label="Link" value={proj.link || ""} onChange={(v) => updateProjects(index, (p) => ({ ...p, link: v }))} />
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Highlights</p>
                  {proj.bullets.map((bullet, bIndex) => (
                    <div key={bIndex} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={bullet}
                          onChange={(event) =>
                            updateProjects(index, (p) => {
                              const next = [...p.bullets];
                              next[bIndex] = event.target.value;
                              return { ...p, bullets: next };
                            })
                          }
                          placeholder="Impact / metric"
                          className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
                        />
                        <button
                          onClick={() => updateProjects(index, (p) => ({ ...p, bullets: p.bullets.filter((_, i) => i !== bIndex) }))}
                          className="text-zinc-500 hover:text-red-400"
                          aria-label="Remove bullet"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleImproveBulletAi("project", index, bIndex, bullet)}
                          disabled={aiState.task === "bullet" && aiState.target === `project-${index}-${bIndex}`}
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {aiState.task === "bullet" && aiState.target === `project-${index}-${bIndex}` ? "AI..." : "AI Improve"}
                        </button>
                        <button
                          onClick={() =>
                            updateProjects(index, (p) => ({
                              ...p,
                              bullets: p.bullets.map((b, i) => (i === bIndex ? makeImpactfulBullet(b) : b)),
                            }))
                          }
                          className="text-[11px] px-2 py-1 rounded border border-zinc-800 text-zinc-300 hover:border-primary/40"
                        >
                          Impact
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => updateProjects(index, (p) => ({ ...p, bullets: [...p.bullets, ""] }))}
                    className="text-xs text-primary-light hover:text-primary"
                  >
                    + Add bullet
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Education</label>
              <button
                onClick={addEducation}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add education
              </button>
            </div>
            {data.education.map((edu, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-500">Education {index + 1}</p>
                  <button
                    onClick={() => removeEducation(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove education"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="School" value={edu.school} onChange={(v) => setData((prev) => ({ ...prev, education: prev.education.map((e, i) => i === index ? { ...e, school: v } : e) }))} />
                  <Input label="Degree" value={edu.degree} onChange={(v) => setData((prev) => ({ ...prev, education: prev.education.map((e, i) => i === index ? { ...e, degree: v } : e) }))} />
                  <Input label="Period" value={edu.period} onChange={(v) => setData((prev) => ({ ...prev, education: prev.education.map((e, i) => i === index ? { ...e, period: v } : e) }))} />
                </div>
                <Textarea label="Detail" value={edu.detail} onChange={(v) => setData((prev) => ({ ...prev, education: prev.education.map((e, i) => i === index ? { ...e, detail: v } : e) }))} />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Certifications</label>
              <button
                onClick={addCertification}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add certification
              </button>
            </div>
            {data.certifications.map((cert, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="Name" value={cert.name} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c, i) => i === index ? { ...c, name: v } : c) }))} />
                  <Input label="Issuer" value={cert.issuer} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c, i) => i === index ? { ...c, issuer: v } : c) }))} />
                  <Input label="Year" value={cert.year} onChange={(v) => setData((prev) => ({ ...prev, certifications: prev.certifications.map((c, i) => i === index ? { ...c, year: v } : c) }))} />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeCertification(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove certification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Achievements</label>
              <button
                onClick={addAchievement}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add achievement
              </button>
            </div>
            {data.achievements.map((ach, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <Input label="Title" value={ach.title} onChange={(v) => setData((prev) => ({ ...prev, achievements: prev.achievements.map((a, i) => i === index ? { ...a, title: v } : a) }))} />
                <Textarea label="Detail" value={ach.detail} onChange={(v) => setData((prev) => ({ ...prev, achievements: prev.achievements.map((a, i) => i === index ? { ...a, detail: v } : a) }))} />
                <div className="flex justify-end">
                  <button
                    onClick={() => removeAchievement(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove achievement"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Open Source / GitHub</label>
              <button
                onClick={addOpenSource}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add repo
              </button>
            </div>
            {data.openSource.map((repo, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="Name" value={repo.name} onChange={(v) => updateOpenSource(index, (r) => ({ ...r, name: v }))} />
                  <Input label="Role" value={repo.role} onChange={(v) => updateOpenSource(index, (r) => ({ ...r, role: v }))} />
                  <Input label="Link" value={repo.link} onChange={(v) => updateOpenSource(index, (r) => ({ ...r, link: v }))} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Highlights</p>
                  {repo.bullets.map((bullet, bIndex) => (
                    <div key={bIndex} className="flex gap-2">
                      <input
                        value={bullet}
                        onChange={(event) =>
                          updateOpenSource(index, (r) => {
                            const next = [...r.bullets];
                            next[bIndex] = event.target.value;
                            return { ...r, bullets: next };
                          })
                        }
                        placeholder="Contribution / impact"
                        className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
                      />
                      <button
                        onClick={() => updateOpenSource(index, (r) => ({ ...r, bullets: r.bullets.filter((_, i) => i !== bIndex) }))}
                        className="text-zinc-500 hover:text-red-400"
                        aria-label="Remove bullet"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => updateOpenSource(index, (r) => ({ ...r, bullets: [...r.bullets, ""] }))}
                    className="text-xs text-primary-light hover:text-primary"
                  >
                    + Add bullet
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeOpenSource(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove repo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Languages</label>
              <button
                onClick={addLanguage}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
              >
                <Plus size={14} /> Add language
              </button>
            </div>
            {data.languages.map((lang, index) => (
              <div key={index} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Language" value={lang.name} onChange={(v) => setData((prev) => ({ ...prev, languages: prev.languages.map((l, i) => i === index ? { ...l, name: v } : l) }))} />
                  <Input label="Level" value={lang.level} onChange={(v) => setData((prev) => ({ ...prev, languages: prev.languages.map((l, i) => i === index ? { ...l, level: v } : l) }))} />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => removeLanguage(index)}
                    className="text-zinc-500 hover:text-red-400"
                    aria-label="Remove language"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="resume-preview" className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 space-y-6 shadow-lg shadow-primary/5">
          <header>
            <p className="text-sm text-primary-light">Live preview</p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">Preview</h2>
                <p className="text-sm text-zinc-500">Switch between Markdown/styled and pick a template</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/70 p-1">
                  <button
                    onClick={() => setPreviewMode("markdown")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition-colors ${
                      previewMode === "markdown"
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    aria-pressed={previewMode === "markdown"}
                  >
                    <LayoutTemplate size={14} /> Markdown
                  </button>
                  <button
                    onClick={() => setPreviewMode("styled")}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition-colors ${
                      previewMode === "styled"
                        ? "bg-primary text-white"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    aria-pressed={previewMode === "styled"}
                  >
                    <Eye size={14} /> Styled
                  </button>
                </div>
                {previewMode === "styled" && (
                  <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950/70 p-1">
                    {templateOptions.map((key) => (
                      <button
                        key={key}
                        onClick={() => setTemplate(key)}
                        className={`px-3 py-1.5 text-[11px] rounded-md transition-colors ${
                          template === key ? "bg-primary text-white" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                        aria-pressed={template === key}
                      >
                        {templateLabels[key]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </header>
            {previewMode === "markdown" ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                <pre className="whitespace-pre-wrap text-sm text-zinc-200 font-mono leading-relaxed">{previewMarkdown}</pre>
              </div>
            ) : (
              <StyledPreview data={data} order={sectionOrder} template={template} />
            )}
        </div>
      </div>
    </section>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-400">
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-400">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
      />
    </label>
  );
}

function buildMarkdown(data: ResumeData, order: SectionKey[]) {
  const header = `# ${data.name}\n${data.title}\n${data.location} • ${data.email} • ${data.phone} • ${data.website}\n`;
  const summary = data.summary ? `\n## Summary\n${data.summary}\n` : "";

  const sections: Record<SectionKey, string> = {
    skills: data.skills.length ? `\n## Skills\n- ${data.skills.join("\n- ")}\n` : "",
    experience: data.experiences
      .map((exp) => {
        const bullets = exp.bullets.filter(Boolean).map((b) => `- ${b}`).join("\n");
        return `\n### ${exp.role} — ${exp.company}\n${exp.period}\n${bullets}`;
      })
      .join("\n"),
    projects: data.projects
      .map((p) => {
        const bullets = p.bullets.filter(Boolean).map((b) => `- ${b}`).join("\n");
        const link = p.link ? `\nLink: ${p.link}` : "";
        return `\n### ${p.name} — ${p.role}\n${p.period}${link}\n${bullets}`;
      })
      .join("\n"),
    education: data.education.map((edu) => `\n### ${edu.school}\n${edu.degree} (${edu.period})\n${edu.detail}`).join("\n"),
  };

  const orderedSections = order
    .map((key) => {
      const content = sections[key];
      if (!content) return "";
      const title = sectionTitleForMarkdown(key);
      return `\n## ${title}\n${content}`;
    })
    .join("");

  const certifications = data.certifications.map((c) => `- ${c.name} — ${c.issuer} (${c.year})`).join("\n");
  const achievements = data.achievements.map((a) => `- ${a.title}: ${a.detail}`).join("\n");
  const openSource = data.openSource
    .map((repo) => {
      const bullets = repo.bullets.filter(Boolean).map((b) => `  - ${b}`).join("\n");
      const link = repo.link ? ` (${repo.link})` : "";
      return `- ${repo.name} — ${repo.role}${link}\n${bullets}`;
    })
    .join("\n");
  const languages = data.languages.map((l) => `- ${l.name}: ${l.level}`).join("\n");

  return [
    header,
    summary,
    orderedSections,
    certifications ? `\n## Certifications\n${certifications}` : "",
    achievements ? `\n## Achievements\n${achievements}` : "",
    openSource ? `\n## Open Source / GitHub\n${openSource}` : "",
    languages ? `\n## Languages\n${languages}` : "",
    "",
  ].join("");
}

function sectionTitleForMarkdown(key: SectionKey) {
  switch (key) {
    case "skills":
      return "Skills";
    case "experience":
      return "Experience";
    case "projects":
      return "Projects";
    case "education":
      return "Education";
    default:
      return "";
  }
}

function buildPrintHtml(data: ResumeData, order: SectionKey[], template: TemplateKey) {
  const themes: Record<TemplateKey, {
    body: string;
    text: string;
    muted: string;
    card: string;
    cardBorder: string;
    pill: string;
    pillText: string;
    accent: string;
  }> = {
    modern: {
      body: "#f8fafc",
      text: "#0f172a",
      muted: "#475569",
      card: "#ffffff",
      cardBorder: "#e2e8f0",
      pill: "#e2e8f0",
      pillText: "#0f172a",
      accent: "#2563eb",
    },
    minimal: {
      body: "#0b1220",
      text: "#e2e8f0",
      muted: "#94a3b8",
      card: "rgba(255,255,255,0.04)",
      cardBorder: "#1f2937",
      pill: "transparent",
      pillText: "#e2e8f0",
      accent: "#e2e8f0",
    },
    ats: {
      body: "#0b1220",
      text: "#e5e7eb",
      muted: "#9ca3af",
      card: "#0f172a",
      cardBorder: "#1f2937",
      pill: "#111827",
      pillText: "#e5e7eb",
      accent: "#e5e7eb",
    },
    creative: {
      body: "linear-gradient(135deg, #0b1120, #1f2937, #312e81)",
      text: "#e0f2fe",
      muted: "#cbd5e1",
      card: "rgba(255,255,255,0.06)",
      cardBorder: "rgba(56,189,248,0.4)",
      pill: "rgba(255,255,255,0.12)",
      pillText: "#e0f2fe",
      accent: "#7dd3fc",
    },
  };

  const theme = themes[template];

  const style = `
    :root {
      --body: ${theme.body};
      --text: ${theme.text};
      --muted: ${theme.muted};
      --card: ${theme.card};
      --card-border: ${theme.cardBorder};
      --pill: ${theme.pill};
      --pill-text: ${theme.pillText};
      --accent: ${theme.accent};
    }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: var(--body); background-color: var(--body); color: var(--text); margin: 32px; }
    h1 { margin: 0; font-size: 26px; color: var(--text); }
    h2 { margin: 18px 0 6px; font-size: 16px; color: var(--text); }
    .muted { color: var(--muted); font-size: 12px; }
    .card { background: var(--card); border: 1px solid var(--card-border); border-radius: 12px; padding: 16px; margin-top: 12px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .pill { display: inline-block; background: var(--pill); color: var(--pill-text); border-radius: 999px; padding: 4px 10px; font-size: 12px; margin: 4px 6px 0 0; border: 1px solid var(--card-border); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    ul { padding-left: 18px; margin: 6px 0; }
    li { margin-bottom: 4px; }
    .header { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .section { margin-top: 18px; }
    .section h2 { margin-bottom: 8px; color: var(--accent); }
    .accent { color: var(--accent); }
    @page { margin: 24px; }
    @media print {
      body { background: var(--body); background-color: var(--body); color: var(--text); }
    }
  `;

  const script = `
    window.onload = () => {
      window.focus();
      window.print();
      setTimeout(() => window.close(), 300);
    };
  `;

  const safe = (v: string) => v || "";

  const sectionHtml: Record<SectionKey, string> = {
    skills: data.skills.map((s) => `<span class="pill">${escapeHtml(s)}</span>`).join(""),
    experience: data.experiences
      .map((exp) => {
        const bullets = exp.bullets
          .filter(Boolean)
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join("");
        return `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
              <div>
                <div style="font-weight:600;">${escapeHtml(exp.role || "Role")}</div>
                <div class="muted">${escapeHtml(exp.company || "Company")}</div>
              </div>
              <div class="muted">${escapeHtml(exp.period || "")}</div>
            </div>
            ${bullets ? `<ul>${bullets}</ul>` : ""}
          </div>
        `;
      })
      .join(""),
    projects: data.projects
      .map((p) => {
        const bullets = p.bullets
          .filter(Boolean)
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join("");
        return `
          <div class="card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
              <div>
                <div style="font-weight:600;">${escapeHtml(p.name || "Project")}</div>
                <div class="muted">${escapeHtml(p.role || "Role")}</div>
                ${p.link ? `<div class="muted">${escapeHtml(p.link)}</div>` : ""}
              </div>
              <div class="muted">${escapeHtml(p.period || "")}</div>
            </div>
            ${bullets ? `<ul>${bullets}</ul>` : ""}
          </div>
        `;
      })
      .join(""),
    education: data.education
      .map(
        (edu) => `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
            <div>
              <div style="font-weight:600;">${escapeHtml(edu.school || "School")}</div>
              <div class="muted">${escapeHtml(edu.degree || "Degree")}</div>
            </div>
            <div class="muted">${escapeHtml(edu.period || "")}</div>
          </div>
          ${edu.detail ? `<div style="margin-top:6px;" class="muted">${escapeHtml(edu.detail)}</div>` : ""}
        </div>
      `
      )
      .join(""),
  };

  const certifications = data.certifications
    .map((c) => `<li>${escapeHtml(c.name || "Certification")} — ${escapeHtml(c.issuer || "Issuer")} (${escapeHtml(c.year || "")})</li>`)
    .join("");

  const achievements = data.achievements
    .map((a) => `<li>${escapeHtml(a.title || "Achievement")}: ${escapeHtml(a.detail || "")}</li>`)
    .join("");

  const openSource = data.openSource
    .map((repo) => {
      const bullets = repo.bullets
        .filter(Boolean)
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("");
      const link = repo.link ? `<div class="muted">${escapeHtml(repo.link)}</div>` : "";
      return `
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
            <div>
              <div style="font-weight:600;">${escapeHtml(repo.name || "Repo")}</div>
              <div class="muted">${escapeHtml(repo.role || "Role")}</div>
              ${link}
            </div>
          </div>
          ${bullets ? `<ul>${bullets}</ul>` : ""}
        </div>
      `;
    })
    .join("");

  const languages = data.languages.map((l) => `<span class="pill">${escapeHtml(l.name || "Language")}: ${escapeHtml(l.level || "")}</span>`).join("");

  const orderedPrimarySections = order
    .map((key) => {
      const content = sectionHtml[key];
      if (!content) return "";
      const title = sectionTitleForMarkdown(key); // same labels as markdown
      return `<div class="section"><h2>${title}</h2>${key === "skills" ? `<div>${content}</div>` : content}</div>`;
    })
    .join("");

  return `
    <html>
      <head>
        <title>Resume</title>
        <style>${style}</style>
        <script>${script}</script>
      </head>
      <body>
          <div class="header">
            <h1>${escapeHtml(safe(data.name) || "Your Name")}</h1>
            <div style="font-weight:600; color:var(--text);">${escapeHtml(safe(data.title))}</div>
            <div class="muted">${[data.location, data.email, data.phone, data.website].filter(Boolean).map(escapeHtml).join(" • ")}</div>
          </div>

        ${data.summary ? `<p style="font-size:14px; line-height:1.6; color:var(--text);">${escapeHtml(data.summary)}</p>` : ""}

        ${orderedPrimarySections}
        ${certifications ? `<div class="section"><h2>Certifications</h2><ul>${certifications}</ul></div>` : ""}
        ${achievements ? `<div class="section"><h2>Achievements</h2><ul>${achievements}</ul></div>` : ""}
        ${openSource ? `<div class="section"><h2>Open Source / GitHub</h2>${openSource}</div>` : ""}
        ${languages ? `<div class="section"><h2>Languages</h2>${languages}</div>` : ""}
      </body>
    </html>
  `;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function StyledPreview({ data, order, template }: { data: ResumeData; order: SectionKey[]; template: TemplateKey }) {
  const palettes: Record<TemplateKey, {
    container: string;
    headerName: string;
    headerRole: string;
    headerMeta: string;
    sectionTitle: string;
    card: string;
    list: string;
    pill: string;
    link: string;
  }> = {
    modern: {
      container: "rounded-xl border border-zinc-800 bg-zinc-950/70 p-6 space-y-4 text-zinc-100",
      headerName: "text-2xl font-bold",
      headerRole: "text-sm text-primary-light",
      headerMeta: "text-xs text-zinc-500 mt-1",
      sectionTitle: "text-sm font-semibold text-zinc-200",
      card: "rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 space-y-2",
      list: "list-disc list-outside pl-4 space-y-1 text-xs text-zinc-300",
      pill: "px-2.5 py-1 text-xs rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200",
      link: "text-[11px] text-primary-light hover:text-primary",
    },
    minimal: {
      container: "rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4 text-zinc-100",
      headerName: "text-2xl font-semibold",
      headerRole: "text-sm text-zinc-300",
      headerMeta: "text-xs text-zinc-500 mt-1",
      sectionTitle: "text-sm font-semibold text-zinc-200",
      card: "rounded-md border border-zinc-800/70 bg-transparent p-3 space-y-2",
      list: "list-disc list-outside pl-4 space-y-1 text-xs text-zinc-200",
      pill: "px-2.5 py-1 text-xs rounded-md border border-zinc-700 text-zinc-200",
      link: "text-[11px] text-zinc-300 hover:text-white",
    },
    ats: {
      container: "rounded-xl border border-zinc-800 bg-zinc-950/70 p-6 space-y-4 text-zinc-100",
      headerName: "text-2xl font-bold text-zinc-100",
      headerRole: "text-sm text-primary-light",
      headerMeta: "text-xs text-zinc-500 mt-1",
      sectionTitle: "text-sm font-semibold text-zinc-200",
      card: "rounded-md border border-zinc-800 bg-zinc-900/70 p-3 space-y-2",
      list: "list-disc list-outside pl-4 space-y-1 text-sm text-zinc-200",
      pill: "px-2.5 py-1 text-xs rounded-sm border border-zinc-700 text-zinc-200",
      link: "text-[11px] text-primary-light hover:text-primary",
    },
    creative: {
      container: "rounded-xl border border-primary/50 bg-gradient-to-br from-indigo-950/70 via-zinc-900/70 to-purple-900/60 p-6 space-y-4 text-zinc-100",
      headerName: "text-2xl font-bold text-white drop-shadow-sm",
      headerRole: "text-sm text-primary-light",
      headerMeta: "text-xs text-zinc-200/80 mt-1",
      sectionTitle: "text-sm font-semibold text-primary-light",
      card: "rounded-lg border border-primary/40 bg-white/5 p-3 space-y-2 backdrop-blur-sm shadow-lg shadow-primary/10",
      list: "list-disc list-outside pl-4 space-y-1 text-xs text-zinc-100",
      pill: "px-2.5 py-1 text-xs rounded-md bg-white/10 border border-primary/40 text-white",
      link: "text-[11px] text-sky-200 hover:text-white",
    },
  };

  const palette = palettes[template];

  const renderSection = (key: SectionKey) => {
    switch (key) {
      case "skills":
        return (
          data.skills.length > 0 && (
            <div key="skills">
              <h4 className={palette.sectionTitle}>Skills</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.skills.map((skill) => (
                  <span key={skill} className={palette.pill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )
        );
      case "experience":
        return (
          data.experiences.length > 0 && (
            <div key="experience" className="space-y-3">
              <h4 className={palette.sectionTitle}>Experience</h4>
              {data.experiences.map((exp, idx) => (
                <div key={idx} className={palette.card}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{exp.role || "Role"}</p>
                      <p className="text-xs opacity-80">{exp.company || "Company"}</p>
                    </div>
                    <p className="text-xs opacity-70">{exp.period}</p>
                  </div>
                  <ul className={palette.list}>
                    {exp.bullets.filter(Boolean).map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        );
      case "projects":
        return (
          data.projects.length > 0 && (
            <div key="projects" className="space-y-3">
              <h4 className={palette.sectionTitle}>Projects</h4>
              {data.projects.map((proj, idx) => (
                <div key={idx} className={palette.card}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{proj.name || "Project"}</p>
                      <p className="text-xs opacity-80">{proj.role || "Role"}</p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={palette.link}
                        >
                          {proj.link}
                        </a>
                      )}
                    </div>
                    <p className="text-xs opacity-70">{proj.period}</p>
                  </div>
                  <ul className={palette.list}>
                    {proj.bullets.filter(Boolean).map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        );
      case "education":
        return (
          data.education.length > 0 && (
            <div key="education" className="space-y-2">
              <h4 className={palette.sectionTitle}>Education</h4>
              {data.education.map((edu, idx) => (
                <div key={idx} className={palette.card}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{edu.school || "School"}</p>
                      <p className="text-xs opacity-80">{edu.degree || "Degree"}</p>
                    </div>
                    <p className="text-xs opacity-70">{edu.period}</p>
                  </div>
                  {edu.detail && <p className="text-xs opacity-80 mt-1">{edu.detail}</p>}
                </div>
              ))}
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className={palette.container}>
      <div>
        <h3 className={palette.headerName}>{data.name || "Your Name"}</h3>
        <p className={palette.headerRole}>{data.title || "Role"}</p>
        <p className={palette.headerMeta}>
          {[data.location, data.email, data.phone, data.website].filter(Boolean).join(" • ")}
        </p>
      </div>

      {data.summary && (
        <div>
          <p className="text-sm leading-relaxed opacity-90">{data.summary}</p>
        </div>
      )}

      {order.map((key) => renderSection(key))}

      {data.certifications.length > 0 && (
        <div className="space-y-2">
          <h4 className={palette.sectionTitle}>Certifications</h4>
          <ul className={palette.list}>
            {data.certifications.map((c, idx) => (
              <li key={idx}>{c.name || "Certification"} — {c.issuer} {c.year && `(${c.year})`}</li>
            ))}
          </ul>
        </div>
      )}

      {data.achievements.length > 0 && (
        <div className="space-y-2">
          <h4 className={palette.sectionTitle}>Achievements</h4>
          <ul className={palette.list}>
            {data.achievements.map((a, idx) => (
              <li key={idx}>{a.title}: {a.detail}</li>
            ))}
          </ul>
        </div>
      )}

      {data.openSource.length > 0 && (
        <div className="space-y-3">
          <h4 className={palette.sectionTitle}>Open Source / GitHub</h4>
          {data.openSource.map((repo, idx) => (
            <div key={idx} className={palette.card}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{repo.name || "Repo"}</p>
                  <p className="text-xs opacity-80">{repo.role || "Role"}</p>
                  {repo.link && (
                    <a
                      href={repo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={palette.link}
                    >
                      {repo.link}
                    </a>
                  )}
                </div>
              </div>
              <ul className={palette.list}>
                {repo.bullets.filter(Boolean).map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {data.languages.length > 0 && (
        <div>
          <h4 className={`${palette.sectionTitle} mb-2`}>Languages</h4>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((lang, idx) => (
              <span key={idx} className={palette.pill}>
                {lang.name}: {lang.level}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
