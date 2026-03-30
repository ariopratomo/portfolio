import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clipboard,
  Command,
  Gauge,
  Link2,
  Moon,
  Search,
  Share,
  Sparkles,
  Sun,
  WifiOff,
} from "lucide-react";
import type { Page } from "../App";
import { profile } from "../data/portfolio";

type Theme = "light" | "dark";

type QuickToolsProps = {
  page: Page;
  theme: Theme;
  onToggleTheme: () => void;
  onGoHome: () => void;
};

type PaletteAction = {
  id: string;
  label: string;
  hint?: string;
  shortcut?: string;
  hotKey?: string; // single-letter trigger when palette is open
  onSelect: () => void;
};

type ToastTone = "success" | "warning" | "info";
type ToastState = { message: string; tone: ToastTone } | null;

const connectionIsSlow = () => {
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: any }).connection;
  if (!connection) return false;

  const downlinkSlow = typeof connection.downlink === "number" && connection.downlink < 1.5;
  const highRtt = typeof connection.rtt === "number" && connection.rtt > 500;
  const lowType = typeof connection.effectiveType === "string" && connection.effectiveType.includes("2g");
  return downlinkSlow || highRtt || lowType;
};

const scrollToId = (id: string) => {
  const target = document.querySelector(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export function QuickTools({ page, theme, onToggleTheme, onGoHome }: QuickToolsProps) {
  const [isPaletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  const [isSlow, setIsSlow] = useState(() => connectionIsSlow());
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((message: string, tone: ToastTone = "success") => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    setToast({ message, tone });
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const copyLink = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      showToast("Clipboard is unavailable in this browser", "warning");
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied", "success");
    } catch (error) {
      showToast("Failed to copy link", "warning");
      console.error("Clipboard error", error);
    }
  }, [showToast]);

  const copySnippet = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      showToast("Clipboard is unavailable in this browser", "warning");
      return;
    }

    const url = typeof window !== "undefined" ? window.location.href : "";
    const snippet =
      page.type === "project"
        ? `${page.project.title} — ${page.project.subtitle}\n${page.project.description}\n${url}`
        : `${profile.name} — ${profile.tagline}\n${url}`;

    try {
      await navigator.clipboard.writeText(snippet);
      showToast("Share snippet copied", "success");
    } catch (error) {
      showToast("Failed to copy snippet", "warning");
      console.error("Clipboard error", error);
    }
  }, [page, showToast]);

  // Theme toggle disabled to keep resume builder in dark mode.

  useEffect(() => {
    const handleConnectionChange = () => setIsSlow(connectionIsSlow());
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const connection = (navigator as Navigator & { connection?: any }).connection;
    if (connection?.addEventListener) {
      connection.addEventListener("change", handleConnectionChange);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (connection?.removeEventListener) {
        connection.removeEventListener("change", handleConnectionChange);
      }
    };
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (isMeta && key === "k") {
        event.preventDefault();
        setPaletteOpen(true);
        setShareOpen(false);
      }
      if (isMeta && event.shiftKey && key === "p") {
        event.preventDefault();
        setPaletteOpen(true);
        setShareOpen(false);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const actions = useMemo<PaletteAction[]>(() => {
    const items: PaletteAction[] = [
      {
        id: "copy-link",
        label: "Copy current link",
        hint: "Shareable URL",
        shortcut: "Copy",
        onSelect: copyLink,
      },
      {
        id: "copy-snippet",
        label: "Copy share snippet",
        hint: "Summary + link",
        onSelect: copySnippet,
      },
      {
        id: "top",
        label: "Scroll to page top",
        hint: "Smooth scroll",
        onSelect: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      },
    ];

    if (page.type === "project") {
      items.unshift({
        id: "home",
        label: "Back to homepage",
        hint: "Switch to profile view",
        shortcut: "H",
        hotKey: "h",
        onSelect: onGoHome,
      });
      items.push(
        { id: "tech", label: "Go to Tech Stack", shortcut: "T", hotKey: "t", onSelect: () => scrollToId("#tech-stack") },
        { id: "features", label: "Go to Features", shortcut: "F", hotKey: "f", onSelect: () => scrollToId("#features") },
        { id: "challenges", label: "Go to Challenges", shortcut: "C", hotKey: "c", onSelect: () => scrollToId("#challenges") },
        { id: "architecture", label: "Go to Architecture", shortcut: "A", hotKey: "a", onSelect: () => scrollToId("#architecture") }
      );
    } else if (page.type === "resume-builder") {
      items.unshift({
        id: "home",
        label: "Back to homepage",
        hint: "Switch to profile view",
        shortcut: "H",
        hotKey: "h",
        onSelect: onGoHome,
      });
      items.push(
        { id: "resume-form", label: "Go to Form", shortcut: "F", hotKey: "f", onSelect: () => scrollToId("#resume-form") },
        { id: "resume-preview", label: "Go to Preview", shortcut: "P", hotKey: "p", onSelect: () => scrollToId("#resume-preview") }
      );
    } else {
      items.push(
        { id: "about", label: "About section", shortcut: "A", hotKey: "a", onSelect: () => scrollToId("#about") },
        { id: "skills", label: "Skills section", shortcut: "S", hotKey: "s", onSelect: () => scrollToId("#skills") },
        { id: "experience", label: "Experience section", shortcut: "E", hotKey: "e", onSelect: () => scrollToId("#experience") },
        { id: "education", label: "Education section", shortcut: "D", hotKey: "d", onSelect: () => scrollToId("#education") },
        { id: "certifications", label: "Certifications", shortcut: "C", hotKey: "c", onSelect: () => scrollToId("#certifications") },
        { id: "projects", label: "Featured project", shortcut: "P", hotKey: "p", onSelect: () => scrollToId("#projects") }
      );
    }

    return items;
  }, [copyLink, copySnippet, onGoHome, page.type]);

  const filtered = useMemo(() => {
    if (!query) return actions;
    const lowered = query.toLowerCase();
    return actions.filter((action) =>
      action.label.toLowerCase().includes(lowered) || action.hint?.toLowerCase().includes(lowered)
    );
  }, [actions, query]);

  useEffect(() => {
    setHighlighted(0);
  }, [query, filtered.length]);

  useEffect(() => {
    if (!isPaletteOpen) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPaletteOpen(false);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlighted((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlighted((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const action = filtered[highlighted];
        if (action) {
          action.onSelect();
          setPaletteOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, highlighted, isPaletteOpen]);

  const paletteActions = filtered.map((action, index) => (
    <button
      key={action.id}
      onMouseEnter={() => setHighlighted(index)}
      onClick={() => {
        action.onSelect();
        setPaletteOpen(false);
      }}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-900/60 transition-colors text-left ${
        index === highlighted
          ? "bg-primary/10 border-primary/30 text-zinc-100"
          : "hover:bg-zinc-900/50 text-zinc-300"
      }`}
    >
      <div>
        <div className="text-sm font-medium">{action.label}</div>
        {action.hint && <div className="text-xs text-zinc-500 mt-0.5">{action.hint}</div>}
      </div>
      {(action.shortcut || action.hotKey) && (
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          {action.hotKey && (
            <span className="border border-zinc-800 rounded-md px-2 py-1">{action.hotKey.toUpperCase()}</span>
          )}
          {action.shortcut && (
            <span className="border border-zinc-800 rounded-md px-2 py-1">{action.shortcut}</span>
          )}
        </div>
      )}
    </button>
  ));

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        {!isOnline && (
          <div className="flex items-center gap-2 rounded-full bg-red-500/15 text-red-200 border border-red-500/30 px-3 py-2 text-sm">
            <WifiOff size={14} />
            Offline mode
          </div>
        )}
        {isOnline && isSlow && (
          <div className="flex items-center gap-2 rounded-full bg-amber-500/15 text-amber-200 border border-amber-500/30 px-3 py-2 text-sm">
            <Gauge size={14} />
            Slow network detected
          </div>
        )}

        {toast && (
          <div
            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-lg ${
              toast.tone === "success"
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : toast.tone === "warning"
                ? "border-amber-400/40 bg-amber-500/10 text-amber-100"
                : "border-zinc-500/40 bg-zinc-500/10 text-zinc-100"
            }`}
          >
            {toast.tone === "success" ? <Check size={14} /> : toast.tone === "warning" ? <AlertTriangle size={14} /> : <Sparkles size={14} />}
            {toast.message}
          </div>
        )}

        <div className="relative flex items-center gap-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl shadow-lg px-2 py-1">

          <div className="relative">
            <ToolButton
              label="Share"
              onClick={() => setShareOpen((open) => !open)}
              icon={<Share size={16} />}
              shortcut="Copy link/snippet"
            />
            {shareOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 rounded-xl bg-zinc-950/90 border border-zinc-800 shadow-xl overflow-hidden">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/70"
                  onClick={() => {
                    copyLink();
                    setShareOpen(false);
                  }}
                >
                  <Link2 size={14} /> Copy link
                </button>
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900/70"
                  onClick={() => {
                    copySnippet();
                    setShareOpen(false);
                  }}
                >
                  <Clipboard size={14} /> Copy snippet
                </button>
              </div>
            )}
          </div>

          <ToolButton
            label="Command palette"
            onClick={() => {
              setPaletteOpen(true);
              setShareOpen(false);
            }}
            icon={<Command size={16} />}
            shortcut="Ctrl/Cmd + K or Ctrl/Cmd + Shift + P"
          />
        </div>
      </div>

      {isPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4" onClick={() => setPaletteOpen(false)}>
          <div
            className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <Search size={16} className="text-zinc-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(event) => {
                  if (!event.metaKey && !event.ctrlKey && !event.altKey && event.key.length === 1) {
                    const letter = event.key.toLowerCase();
                    const action = filtered.find((a) => a.hotKey === letter);
                    if (action) {
                      event.preventDefault();
                      action.onSelect();
                      setPaletteOpen(false);
                    }
                  }
                }}
                placeholder="Search commands or sections"
                className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
              />
              <span className="text-[11px] text-zinc-500 border border-zinc-800 rounded-md px-2 py-1">Esc</span>
            </div>

            <div className="max-h-[340px] overflow-y-auto">
              {paletteActions.length > 0 ? (
                paletteActions
              ) : (
                <div className="px-4 py-6 text-sm text-zinc-500 flex items-center gap-2">
                  <Search size={14} /> No results found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToolButton({
  label,
  icon,
  shortcut,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  shortcut?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full px-3 py-2 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
      title={shortcut ? `${label} (${shortcut})` : label}
      aria-label={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
