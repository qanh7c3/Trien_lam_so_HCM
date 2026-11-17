"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { IStoryMilestone } from "@/models/StoryMilestone";
import StoryModal from "./StoryModal";

interface StoriesSectionProps {
  stories: IStoryMilestone[];
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  const [selectedStory, setSelectedStory] = useState<IStoryMilestone | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<string>("all");

  const periods = [
    { id: "all", label: "Tất cả giai đoạn" },
    { id: "1911 - 1920", label: "1911 - 1920" },
    { id: "1921 - 1930", label: "1921 - 1930" },
    { id: "1931 - 1945", label: "1931 - 1945" },
    { id: "1945 - 1954", label: "1945 - 1954" },
    { id: "1954 - 1969", label: "1954 - 1969" },
  ];

  const filteredStories =
    filterPeriod === "all"
      ? stories
      : stories.filter((s) => s.period.trim() === filterPeriod.trim());

  return (
    <section id="stories" className="py-24 relative bg-[#171412] border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] gold-border text-xs text-[#D4AF37] mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Phân Khu III — Ký Ức & Bài Học</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
            Kho Tàng Những Câu Chuyện Về Bác
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/80">
            Những câu chuyện chân thực, cảm động và sâu sắc được kiểm chứng qua các hồi ký và văn kiện lịch sử, 
            khắc họa trọn vẹn nhân cách cao đẹp và tình yêu thương vô bờ bến của Người.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilterPeriod(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                filterPeriod === p.id
                  ? "red-lacquer-gradient text-[#FAF6F0] border border-[#D4AF37] shadow-md"
                  : "bg-[#1C1917] text-[#EDE8DF]/70 border border-white/5 hover:border-[#D4AF37]/30 hover:text-[#F3E5AB]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-[#1C1917] gold-border hover:border-[#D4AF37] hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="flex items-center gap-1 text-xs text-[#D4AF37] font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {story.date_label}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#24201D] text-[#C5A059] border border-[#D4AF37]/20">
                    {story.period}
                  </span>
                </div>

                <h3 className="font-serif-title text-lg font-bold text-[#F3E5AB] mb-3 line-clamp-2 group-hover:text-[#FAF6F0] transition-colors">
                  {story.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#EDE8DF]/75 leading-relaxed mb-6 line-clamp-3 font-sans">
                  {story.summary}
                </p>
              </div>

              <div>
                <div className="p-3 rounded-xl bg-[#24201D]/60 border border-[#D4AF37]/15 mb-4 text-xs italic text-[#C5A059] line-clamp-2 font-serif">
                  {story.lesson_or_quote}
                </div>

                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#FAF6F0] bg-[#24201D] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#8B1E19] transition-all"
                >
                  <span>Đọc chi tiết câu chuyện</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Book Reading Modal */}
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </section>
  );
}
