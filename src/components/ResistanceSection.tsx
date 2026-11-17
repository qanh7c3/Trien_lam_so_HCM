"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Flame, Flag, Quote, ExternalLink, Calendar, CheckCircle, Award } from "lucide-react";
import { IResistanceHistory } from "@/models/ResistanceHistory";

interface ResistanceSectionProps {
  resistanceHistory: IResistanceHistory[];
}

export default function ResistanceSection({ resistanceHistory }: ResistanceSectionProps) {
  const [activeTab, setActiveTab] = useState<"chong-phap" | "chong-my">("chong-phap");

  const currentEvents = resistanceHistory.filter((item) => item.war_period === activeTab);

  return (
    <section id="resistance" className="py-24 relative bg-[#12100E] border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] gold-border text-xs text-[#D4AF37] mb-3">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Phân Khu IV — Hai Cuộc Kháng Chiến Vĩ Đại</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
            Dấu Ấn Lãnh Đạo & Lời Hiệu Triệu Non Sông
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/80">
            Hai bản trường ca lịch sử chống thực dân Pháp (1945–1954) và chống đế quốc Mỹ (1954–1975) 
            gắn liền với tư tưởng quân sự thiên tài và ý chí gang thép của Chủ tịch Hồ Chí Minh.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 rounded-full bg-[#1C1917] border border-[#D4AF37]/30 flex gap-2">
            <button
              onClick={() => setActiveTab("chong-phap")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                activeTab === "chong-phap"
                  ? "red-lacquer-gradient text-[#FAF6F0] shadow-lg border border-[#D4AF37]/50"
                  : "text-[#EDE8DF]/70 hover:text-[#F3E5AB]"
              }`}
            >
              <Flame className="w-4 h-4 text-[#F3E5AB]" />
              <span>Chương I: Chống Thực Dân Pháp (1945–1954)</span>
            </button>
            <button
              onClick={() => setActiveTab("chong-my")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                activeTab === "chong-my"
                  ? "bg-gradient-to-r from-[#946B12] via-[#D4AF37] to-[#7A5609] text-[#12100E] shadow-lg border border-[#FAF6F0]/40"
                  : "text-[#EDE8DF]/70 hover:text-[#F3E5AB]"
              }`}
            >
              <Flag className="w-4 h-4" />
              <span>Chương II: Chống Đế Quốc Mỹ (1954–1975)</span>
            </button>
          </div>
        </div>

        {/* Golden Quote Spotlight Banner for the active era */}
        <motion.div
          key={`quote-${activeTab}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 p-8 rounded-3xl bg-[#1C1917] gold-border gold-glow relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Award className="w-36 h-36 text-[#D4AF37]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Quote className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 opacity-70" />
            <h3 className="font-serif-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#F3E5AB] leading-relaxed mb-4">
              {activeTab === "chong-phap"
                ? "“Thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ!”"
                : "“Không có gì quý hơn độc lập, tự do!”"}
            </h3>
            <p className="text-xs sm:text-sm text-[#C5A059] uppercase tracking-widest font-sans font-semibold">
              {activeTab === "chong-phap"
                ? "Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)"
                : "Lời kêu gọi đồng bào và chiến sĩ cả nước chống Mỹ cứu nước (17/7/1966)"}
            </p>
          </div>
        </motion.div>

        {/* Events Timeline */}
        <div className="space-y-8">
          {currentEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#1C1917] gold-border hover:border-[#D4AF37] transition-all shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  {event.date_label}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#24201D] text-xs font-serif font-bold text-[#F3E5AB] border border-[#D4AF37]/30">
                  Năm {event.year}
                </span>
              </div>

              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0] mb-4">
                {event.event_title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-xl bg-[#24201D]/70 border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2 font-sans">
                    Bối cảnh & Tác chiến:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-sans">
                    {event.campaign_or_context}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#24201D]/70 border border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2 font-sans">
                    Vai trò chỉ đạo của Chủ tịch Hồ Chí Minh:
                  </h4>
                  <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-sans">
                    {event.ho_chi_minh_role}
                  </p>
                </div>
              </div>

              {/* Authentic Quote block */}
              <div className="p-4 rounded-xl bg-[#8B1E19]/15 border-l-4 border-[#8B1E19] mb-4">
                <div className="text-[11px] uppercase tracking-wider text-[#F3E5AB] font-bold mb-1 font-sans">
                  Trích dẫn nguyên văn:
                </div>
                <p className="text-xs sm:text-sm italic font-serif text-[#FAF6F0] leading-relaxed">
                  {event.authentic_quote}
                </p>
              </div>

              {/* Outcome & Source */}
              <div className="pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-3 text-xs text-[#C5A059]">
                <div className="flex items-center gap-1.5 text-emerald-400 font-sans">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span><strong>Kết quả:</strong> {event.outcome}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span>Nguồn: {event.source_name}</span>
                  <a
                    href={event.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3E5AB] hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
