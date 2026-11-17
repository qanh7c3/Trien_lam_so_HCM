"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Quote, ShieldCheck, ExternalLink, Bookmark } from "lucide-react";
import { IStoryMilestone } from "@/models/StoryMilestone";

interface StoryModalProps {
  story: IStoryMilestone | null;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  if (!story) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl book-paper p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/40 flex flex-col justify-between"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-[#1C1917]/10 hover:bg-[#1C1917]/20 text-[#1A1614] transition-colors"
            aria-label="Đóng cuốn sách"
          >
            <X className="w-5 h-5" />
          </button>

          <div>
            {/* Header info */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#8B1E19] text-[#FAF6F0] text-xs font-serif font-bold">
                {story.date_label}
              </span>
              <span className="text-xs font-sans text-[#8B1E19] font-semibold flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5" />
                Thời kỳ {story.period}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-800 ml-auto font-sans">
                <ShieldCheck className="w-3.5 h-3.5" />
                Tư liệu chuẩn xác 100%
              </span>
            </div>

            {/* Book Title */}
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#5C1410] mb-6 leading-tight border-b-2 border-[#D4AF37]/30 pb-4">
              {story.title}
            </h2>

            {/* Full Story Content formatted with literary elegance */}
            <div className="prose prose-stone max-w-none text-[#2C241E] text-base leading-relaxed space-y-4 mb-8 font-serif">
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-[#8B1E19] first-letter:leading-none">
                {story.full_story}
              </p>
            </div>

            {/* Authentic Quote Box */}
            <div className="p-5 rounded-2xl bg-[#EDE4D5] border-l-4 border-[#8B1E19] shadow-inner mb-6">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-[#8B1E19] shrink-0 mt-1" />
                <div>
                  <div className="text-xs uppercase font-sans font-bold tracking-wider text-[#8B1E19] mb-1">
                    Bài học & Lời dạy của Bác:
                  </div>
                  <p className="font-serif text-sm sm:text-base italic font-semibold text-[#1A1614] leading-relaxed">
                    {story.lesson_or_quote}
                  </p>
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
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
