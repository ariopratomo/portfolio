import { useState } from "react";
import type { Challenge } from "../data/portfolio";
import { Section, SectionTitle } from "./Section";
import { ChevronRight } from "lucide-react";

export function Challenges({ challenges }: { challenges: Challenge[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="challenges">
      <SectionTitle subtitle="Real engineering problems solved with thoughtful architecture decisions.">
        Technical Challenges
      </SectionTitle>

      <div className="space-y-4">
        {challenges.map((ch, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={ch.title}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? "border-primary/40 bg-zinc-900/80 shadow-lg shadow-primary/5"
                  : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
              >
                <ChevronRight
                  size={18}
                  className={`text-primary-light flex-shrink-0 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
                <span className="text-zinc-100 font-semibold">{ch.title}</span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 space-y-4">
                    <div className="pl-[34px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-red-400/80">
                          Problem
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {ch.problem}
                      </p>
                    </div>

                    <div className="pl-[34px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80">
                          Solution
                        </span>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {ch.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
