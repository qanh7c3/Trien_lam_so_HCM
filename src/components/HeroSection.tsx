"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Award, Calendar, Globe, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Archival Photo Backdrop with Vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/images/archive/ba-dinh-1945.jpg"
          alt="Tư liệu Quảng trường Ba Đình 1945"
          fill
          priority
          className="object-cover opacity-15 filter grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12100E]/90 via-[#12100E]/75 to-[#12100E]" />
      </div>

      {/* Ambient glow lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B1E19]/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Verification badge with pure white highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 text-[#12100E] border border-[#D4AF37] text-xs font-semibold mb-8 shadow-lg"
        >
          <Award className="w-3.5 h-3.5 text-[#8B1E19]" />
          <span className="tracking-wide">Tư liệu Lịch sử Chính thống 100% — Bảo tàng Hồ Chí Minh</span>
        </motion.div>

        {/* Grand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-snug mb-6"
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
          className="text-base sm:text-xl text-[#F3E5AB] font-light max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
        >
          (19 tháng 5 năm 1890 — 2 tháng 9 năm 1969)
          <span className="block text-sm sm:text-base text-white/90 mt-2 font-normal">
            Anh hùng giải phóng dân tộc — Nhà văn hóa kiệt xuất của Việt Nam được UNESCO tôn vinh
          </span>
        </motion.p>

        {/* Historic Quote callout with White Card accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#1C1917]/90 gold-border gold-glow mb-12 relative"
        >
          <div className="text-3xl text-[#D4AF37]/50 font-serif absolute -top-3 left-6">“</div>
          <p className="font-serif-title text-base sm:text-lg italic text-white leading-relaxed">
            Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập,
            dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.
          </p>
          <div className="mt-3 text-xs text-[#F3E5AB] uppercase tracking-widest font-sans font-medium">
            — Chủ tịch Hồ Chí Minh (Tháng 1 năm 1946)
          </div>
        </motion.div>

        {/* Stats Strip with White Accents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          <div className="p-4 rounded-xl bg-[#1C1917]/80 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <Globe className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-white">30 Năm</div>
            <div className="text-xs text-[#EDE8DF]/80 mt-1">Bôn ba tìm đường cứu nước</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/80 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <Calendar className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-white">79 Mùa Xuân</div>
            <div className="text-xs text-[#EDE8DF]/80 mt-1">Trọn đời vì nước vì dân</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/80 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-white">2 Kháng Chiến</div>
            <div className="text-xs text-[#EDE8DF]/80 mt-1">Chống Pháp & Chống Mỹ</div>
          </div>
          <div className="p-4 rounded-xl bg-[#1C1917]/80 border border-white/10 hover:border-[#D4AF37]/40 transition-all">
            <Award className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
            <div className="font-serif-title text-2xl font-bold text-white">1987</div>
            <div className="text-xs text-[#EDE8DF]/80 mt-1">UNESCO ra Nghị quyết tôn vinh</div>
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
            href="#journey"
            className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-[#FAF6F0] red-lacquer-gradient border border-[#D4AF37]/50 hover:brightness-110 shadow-lg transition-all"
          >
            Hành trình 5 Châu
          </a>
          <a
            href="#stories"
            className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-[#12100E] bg-white hover:bg-[#FAF6F0] border border-[#D4AF37] shadow-md transition-all font-sans"
          >
            Kho tàng Câu chuyện
          </a>
          <a
            href="#resistance"
            className="px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider text-[#F3E5AB] bg-[#1C1917] gold-border hover:bg-[#24201D] transition-all"
          >
            Lịch sử Kháng chiến
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex flex-col items-center justify-center text-[#D4AF37]/70"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-light text-white/70">Cuộn để khám phá</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </motion.div>
      </div>
    </section>
  );
}
