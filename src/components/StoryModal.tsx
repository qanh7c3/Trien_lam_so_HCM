"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Quote, ShieldCheck, ExternalLink, Bookmark, Calendar } from "lucide-react";
import { IStoryMilestone } from "@/models/StoryMilestone";
import { useIsolatedScroll, useLockBodyScroll } from "@/hooks/useIsolatedScroll";

interface StoryModalProps {
  story: IStoryMilestone | null;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  const storyScrollRef = useIsolatedScroll<HTMLDivElement>();

  // Lock body and Lenis scroll when story modal is open
  useLockBodyScroll(!!story);

  useEffect(() => {
    if (!story) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [story, onClose]);

  if (!story) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          ref={storyScrollRef}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          className="relative max-w-4xl w-full max-h-[92vh] overflow-y-auto overscroll-contain custom-scrollbar rounded-3xl bg-[#FAF8F5] text-[#1A1614] p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col justify-between cursor-default"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#1A1614] transition-colors z-20"
            aria-label="Đóng cuốn sách"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full bg-[#8B1E19] text-white text-xs font-serif font-bold shadow-sm">
                {story.date_label}
              </span>
              <span className="text-xs font-sans text-[#8B1E19] font-bold flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" />
                Thời kỳ {story.period}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-800 ml-auto font-sans font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Tư liệu chuẩn xác 100%
              </span>
            </div>

            {/* Book Title */}
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#5C1410] mb-6 leading-tight border-b-2 border-[#D4AF37]/30 pb-4">
              {story.title}
            </h2>

            {/* Layout: Tall Archival Image + Full Story Text */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              {/* Tall Image Frame */}
              <div className="md:col-span-5 relative">
                <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg bg-black">
                  <Image
                    src={story.image_url || "/images/archive/portrait-1946.jpg"}
                    alt={story.title}
                    fill
                    className="object-cover object-top filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-sm text-center">
                    <p className="text-[11px] text-white font-sans font-medium">
                      Hình ảnh tư liệu lịch sử thời kỳ {story.period}
                    </p>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div className="text-[#2C241E] text-sm sm:text-base leading-relaxed space-y-4 font-serif">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#8B1E19] first-letter:leading-none">
                    {story.full_story}
                  </p>
                </div>

                {/* Authentic Quote Box */}
                <div className="mt-6 p-4 rounded-2xl bg-[#EDE4D5] border-l-4 border-[#8B1E19] shadow-inner">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-[#8B1E19] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase font-sans font-bold tracking-wider text-[#8B1E19] mb-1">
                        Bài học & Lời dạy của Bác:
                      </div>
                      <p className="font-serif text-xs sm:text-sm italic font-semibold text-[#1A1614] leading-relaxed">
                        {story.lesson_or_quote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Footer / Archival Source */}
          <div className="pt-4 border-t border-[#D4AF37]/40 flex flex-wrap items-center justify-between text-xs text-[#5C1410] gap-2 font-sans">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#8B1E19]" />
              <span>Nguồn trích dẫn: <strong>{story.source_name}</strong></span>
            </div>
            <a
              href={story.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#8B1E19] hover:underline font-bold"
            >
              <span>Xem tài liệu gốc</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
