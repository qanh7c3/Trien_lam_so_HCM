"use client";

import { motion } from "framer-motion";
import { ArrowDown, Award, Calendar, Globe, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B1E19]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Verification badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1917] gold-border text-xs text-[#D4AF37] mb-8 shadow-sm"
        >
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-medium tracking-wide">Tư liệu Lịch sử Chính thống 100% — Bảo tàng Hồ Chí Minh</span>
        </motion.div>

        {/* Grand Title with Serif & Gold Shimmer */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF6F0] leading-tight sm:leading-snug mb-6"
        >
          TRIỂN LÃM SỐ TƯỞNG NHỚ
          <span className="block mt-2 gold-gradient-text">
            CHỦ TỊCH HỒ CHÍ MINH
          </span>
        </motion.h1>

        {/* Life span & Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-[#C5A059] font-light max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
        >
          (19 tháng 5 năm 1890 — 2 tháng 9 năm 1969)
          <span className="block text-sm sm:text-base text-[#EDE8DF]/80 mt-2 font-normal">
            Anh hùng giải phóng dân tộc — Nhà văn hóa kiệt xuất của Việt Nam được UNESCO tôn vinh
          </span>
        </motion.p>

        {/* Historic Quote callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#1C1917]/90 gold-border gold-glow mb-12 relative"
        >
          <div className="text-3xl text-[#D4AF37]/40 font-serif absolute -top-3 left-6">“</div>
          <p className="font-serif-title text-base sm:text-lg italic text-[#F3E5AB] leading-relaxed">
            Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập,
            dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.
          </p>
          <div className="mt-3 text-xs text-[#C5A059] uppercase tracking-widest font-sans">
            — Chủ tịch Hồ Chí Minh (Tháng 1 năm 1946)
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          <div className="p-4 rounded-xl bg-[#1C1917]/60 border border-[#D4AF37]/20">
            <Globe className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-[#F3E5AB]">30 Năm</div>
            <div className="text-xs text-[#EDE8DF]/70 mt-1">Bôn ba tìm đường cứu nước</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/60 border border-[#D4AF37]/20">
            <Calendar className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-[#F3E5AB]">79 Mùa Xuân</div>
            <div className="text-xs text-[#EDE8DF]/70 mt-1">Trọn đời vì nước vì dân</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/60 border border-[#D4AF37]/20">
            <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-[#F3E5AB]">2 Kháng Chiến</div>
            <div className="text-xs text-[#EDE8DF]/70 mt-1">Chống Pháp & Chống Mỹ</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/60 border border-[#D4AF37]/20">
            <Award className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-[#F3E5AB]">1987</div>
            <div className="text-xs text-[#EDE8DF]/70 mt-1">UNESCO ra Nghị quyết tôn vinh</div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#portrait"
            className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-[#FAF6F0] red-lacquer-gradient border border-[#D4AF37]/40 hover:brightness-110 shadow-lg transition-all"
          >
            Bắt đầu tham quan
          </a>
          <a
            href="#journey"
            className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-[#F3E5AB] bg-[#1C1917] gold-border hover:bg-[#24201D] transition-all"
          >
            Hành trình 30 năm
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <a href="#bio" aria-label="Cuộn xuống" className="inline-block text-[#D4AF37]/60 hover:text-[#D4AF37]">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
