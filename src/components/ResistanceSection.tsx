"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Flame, Flag, Quote, ExternalLink, Calendar, CheckCircle, Award, Compass } from "lucide-react";
import { IResistanceHistory } from "@/models/ResistanceHistory";

interface ResistanceSectionProps {
  resistanceHistory: IResistanceHistory[];
}

export default function ResistanceSection({ resistanceHistory }: ResistanceSectionProps) {
  const [activeTab, setActiveTab] = useState<"chong-phap" | "chong-my">("chong-phap");

  const currentEvents = resistanceHistory.filter((item) => item.war_period === activeTab);

  return (
    <section id="resistance" className="py-24 relative bg-[#12100E] border-t border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8B1E19]/30 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-semibold mb-3 shadow-md">
            <Shield className="w-3.5 h-3.5 text-[#8B1E19]" />
            <span>Phân Khu IV — Hai Cuộc Kháng Chiến Vĩ Đại</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white">
            Dấu Ấn Lãnh Đạo & Lời Hiệu Triệu Non Sông
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/90 font-sans">
            Hai bản trường ca lịch sử chống thực dân Pháp (1945–1954) và chống đế quốc Mỹ (1954–1975) 
            gắn liền với tư tưởng quân sự thiên tài và ý chí gang thép của Chủ tịch Hồ Chí Minh.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-16">
          <div className="p-1.5 rounded-full bg-[#1C1917] border border-white/10 flex gap-2 shadow-xl">
            <button
              onClick={() => setActiveTab("chong-phap")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                activeTab === "chong-phap"
                  ? "bg-white text-[#12100E] shadow-xl border border-[#D4AF37]"
                  : "text-[#EDE8DF]/75 hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4 text-[#8B1E19]" />
              <span>Chương I: Chống Thực Dân Pháp (1945–1954)</span>
            </button>
            <button
              onClick={() => setActiveTab("chong-my")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-serif font-bold transition-all ${
                activeTab === "chong-my"
                  ? "bg-white text-[#12100E] shadow-xl border border-[#D4AF37]"
                  : "text-[#EDE8DF]/75 hover:text-white"
              }`}
            >
              <Flag className="w-4 h-4 text-[#8B1E19]" />
              <span>Chương II: Chống Đế Quốc Mỹ (1954–1975)</span>
            </button>
          </div>
        </div>

        {/* Historic Quote Banner */}
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
            <Quote className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 opacity-80" />
            <h3 className="font-serif-title text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed mb-4">
              {activeTab === "chong-phap"
                ? "“Thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ!”"
                : "“Không có gì quý hơn độc lập, tự do!”"}
            </h3>
            <p className="text-xs sm:text-sm text-[#F3E5AB] uppercase tracking-widest font-sans font-semibold">
              {activeTab === "chong-phap"
                ? "Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)"
                : "Lời kêu gọi đồng bào và chiến sĩ cả nước chống Mỹ cứu nước (17/7/1966)"}
            </p>
          </div>
        </motion.div>

        {/* Events Timeline with Tall Documentary Photos */}
        <div className="space-y-10">
          {currentEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#1C1917] gold-border hover:border-[#D4AF37] transition-all shadow-xl border border-white/10"
            >
              {/* Event Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold bg-[#24201D] px-3.5 py-1 rounded-full border border-white/5">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  {event.date_label}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white text-xs font-serif font-bold text-[#12100E] border border-[#D4AF37] shadow-sm">
                  Năm {event.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white mb-6">
                {event.event_title}
              </h3>

              {/* Grid: Tall Archival Image (left) + Context & Directives (right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
                {/* Tall Archival Image */}
                <div className="lg:col-span-5 relative">
                  <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-lg bg-black">
                    <Image
                      src={event.image_url || "/images/archive/dong-khe-1950.jpg"}
                      alt={event.event_title}
                      fill
                      className="object-cover object-center filter contrast-110 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 p-2 rounded-xl bg-black/75 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-[11px] text-white font-sans font-medium line-clamp-2">
                        Tư liệu lịch sử: {event.event_title} ({event.year})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Historical Details */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#24201D]/80 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-2 font-sans">
                        Bối cảnh & Tác chiến:
                      </h4>
                      <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-sans">
                        {event.campaign_or_context}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#24201D]/80 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-2 font-sans">
                        Vai trò lãnh đạo của Bác:
                      </h4>
                      <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed font-sans">
                        {event.ho_chi_minh_role}
                      </p>
                    </div>
                  </div>

                  {/* Authentic Quote block */}
                  <div className="p-4 rounded-2xl bg-[#8B1E19]/20 border-l-4 border-[#8B1E19]">
                    <div className="text-[11px] uppercase tracking-wider text-[#F3E5AB] font-bold mb-1 font-sans">
                      Lời hiệu triệu / Trích dẫn lịch sử:
                    </div>
                    <p className="text-xs sm:text-sm italic font-serif text-white leading-relaxed">
                      “{event.authentic_quote}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Outcome & Source */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#C5A059] font-sans">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span><strong>Kết quả lịch sử:</strong> {event.outcome}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-white/80">Nguồn: {event.source_name}</span>
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
