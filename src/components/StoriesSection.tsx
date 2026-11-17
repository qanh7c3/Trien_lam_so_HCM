"use client";

import { useState } from "react";
import Image from "next/image";
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-semibold mb-3 shadow-md">
            <BookOpen className="w-3.5 h-3.5 text-[#8B1E19]" />
            <span>Phân Khu III — Ký Ức & Bài Học</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white">
            Kho Tàng Những Câu Chuyện Về Bác
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/90 font-sans">
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
                  ? "bg-white text-[#12100E] border border-[#D4AF37] shadow-lg font-bold"
                  : "bg-[#1C1917] text-[#EDE8DF]/80 border border-white/10 hover:border-[#D4AF37]/40 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Stories Cards Grid with Tall Archival Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-3xl bg-[#1C1917] gold-border hover:border-[#D4AF37] hover:shadow-2xl transition-all flex flex-col justify-between overflow-hidden group border border-white/10"
            >
              <div>
                {/* Tall Archival Image Container */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-black border-b border-[#D4AF37]/20">
                  <Image
                    src={story.image_url || "/images/archive/portrait-1946.jpg"}
                    alt={story.title}
                    fill
                    className="object-cover object-top filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/30" />
                  
                  {/* Date Badge Overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-[#12100E] text-xs font-semibold border border-[#D4AF37] shadow-md flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#8B1E19]" />
                    <span>{story.date_label}</span>
                  </div>

                  <div className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-[#12100E]/80 backdrop-blur-sm text-[#F3E5AB] border border-white/10">
                    {story.period}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif-title text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F3E5AB] transition-colors">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#EDE8DF]/80 leading-relaxed mb-4 line-clamp-3 font-sans">
                    {story.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-[#24201D]/80 border border-white/5 text-xs italic text-[#F3E5AB] line-clamp-2 font-serif">
                    “{story.lesson_or_quote}”
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white hover:text-[#12100E] border border-white/15 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 group-hover:bg-[#8B1E19] group-hover:text-white"
                >
                  <span>Mở trang tư liệu</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </section>
  );
}
