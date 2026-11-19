"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { EXHIBITION_CHAPTERS } from "../types";

interface Museum3DHudProps {
  activeChapter: number;
  scrollPercent: number;
  enablePostEffects: boolean;
  onTogglePostEffects: () => void;
  onNavigateAnchor: (anchorId: string) => void;
}

export default function Museum3DHud({
  activeChapter,
  scrollPercent,
  enablePostEffects,
  onTogglePostEffects,
  onNavigateAnchor,
}: Museum3DHudProps) {
  const currentChapter = EXHIBITION_CHAPTERS[activeChapter] || EXHIBITION_CHAPTERS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto museum-glass rounded-2xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#8B1E1E] border border-[#C5A059] flex items-center justify-center shrink-0 shadow-md">
            <span className="font-serif-title font-bold text-[11px] sm:text-xs text-[#FAF6F0]">
              HCM
            </span>
          </div>
          <div className="min-w-0">
            <div className="font-serif-title text-xs sm:text-base font-bold text-[#FAF6F0] truncate">
              TRIỂN LÃM SỐ 3D
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#C5A059] tracking-wider sm:tracking-widest uppercase truncate">
              {currentChapter.label} · {currentChapter.era}
            </div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {EXHIBITION_CHAPTERS.map((chapter) => {
            const active = chapter.index === activeChapter;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => onNavigateAnchor(chapter.anchorId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-[#8B1E1E] text-[#FAF6F0] border border-[#C5A059]/70 shadow"
                    : "text-[#FAF6F0]/75 hover:text-[#FAF6F0] hover:bg-white/5"
                }`}
              >
                {chapter.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onTogglePostEffects}
            title="Bật hoặc tắt hiệu ứng ánh sáng hậu kỳ 3D"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all border cursor-pointer ${
              enablePostEffects
                ? "bg-[#C5A059]/20 text-[#FAF6F0] border-[#C5A059]/60"
                : "bg-white/5 text-[#FAF6F0]/70 border-white/15"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{enablePostEffects ? "Ánh sáng 3D: Bật" : "Ánh sáng 3D: Tắt"}</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-[#12100E] bg-[#FAF6F0] hover:bg-white border border-[#C5A059] transition-all shadow whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Bản Cổ Điển</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-1.5 px-2">
        <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#8B1E1E] via-[#C5A059] to-[#FAF6F0] transition-transform duration-150 origin-left"
            style={{ transform: `scaleX(${Math.max(0.02, scrollPercent / 100)})` }}
          />
        </div>
      </div>
    </header>
  );
}
