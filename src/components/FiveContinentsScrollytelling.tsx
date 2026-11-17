"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Globe, MapPin, Calendar, ExternalLink, ChevronRight, CheckCircle2, Bookmark } from "lucide-react";
import { IFiveContinentsJourney } from "@/models/FiveContinentsJourney";

interface FiveContinentsProps {
  journey: IFiveContinentsJourney[];
}

export default function FiveContinentsScrollytelling({ journey }: FiveContinentsProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const currentStop = journey[activeStep] || journey[0];

  return (
    <section id="journey" className="py-24 relative bg-[#12100E] border-t border-[#D4AF37]/15">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-semibold mb-3 shadow-md">
            <Compass className="w-3.5 h-3.5 text-[#8B1E19]" />
            <span>Phân Khu II — Hành Trình Tìm Đường Cứu Nước</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white">
            Hành Trình Bôn Ba 5 Châu (1911 – 1941)
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/90 font-sans">
            Theo chân người thanh niên yêu nước Văn Ba — Nguyễn Ái Quốc suốt 30 năm qua các đại dương và châu lục
            để tìm ra chân lý giải phóng dân tộc Việt Nam.
          </p>
        </div>

        {/* 3-Part Layout: Stepper List (left) + Detailed Card with Tall Image (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Navigation List (left) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between px-2 mb-2 text-xs text-[#F3E5AB]">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#C5A059]">
                12 Chặng Lịch Sử (Cuộn bên trong)
              </span>
              <span className="text-[11px] bg-[#1C1917] px-2 py-0.5 rounded border border-white/10">
                {activeStep + 1} / {journey.length}
              </span>
            </div>

            {/* Scrollable list: only scrolls when cursor is inside (overscroll-contain) */}
            <div className="flex flex-col gap-2.5 max-h-[640px] overflow-y-auto overscroll-contain pr-2 custom-scrollbar p-1 rounded-2xl bg-[#171412]/60 border border-white/5">
              {journey.map((item, idx) => {
                const isActive = idx === activeStep;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-3.5 rounded-xl transition-all border flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-white text-[#12100E] border-[#D4AF37] shadow-xl"
                        : "bg-[#1C1917]/70 text-[#EDE8DF] border-white/5 hover:border-[#D4AF37]/40 hover:bg-[#1C1917]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-serif text-xs font-bold shrink-0 ${
                          isActive
                            ? "red-lacquer-gradient text-white border border-[#D4AF37]"
                            : "bg-[#24201D] text-[#EDE8DF]/70"
                        }`}
                      >
                        {item.order}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${isActive ? "text-[#8B1E19]" : "text-[#F3E5AB]"}`}>
                            {item.year_range}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${isActive ? "bg-[#EDE4D5] text-[#5C1410]" : "bg-black/40 text-[#D4AF37]"}`}>
                            {item.continent}
                          </span>
                        </div>
                        <div className={`font-serif-title text-sm font-bold mt-0.5 line-clamp-1 ${isActive ? "text-[#12100E]" : "text-white"}`}>
                          {item.country} — {item.city}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "text-[#8B1E19] translate-x-1" : "text-[#EDE8DF]/30"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Presentation Card with Tall Historical Photo (right) */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#1C1917] gold-border gold-glow-lg shadow-2xl relative overflow-hidden"
            >
              {/* Decorative watermarked globe */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Globe className="w-64 h-64 text-[#D4AF37]" />
              </div>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <span className="px-3.5 py-1 rounded-full bg-white text-[#12100E] text-xs font-serif font-bold border border-[#D4AF37] shadow-sm">
                  Chặng {currentStop.order} / {journey.length}
                </span>
                <span className="text-xs text-[#F3E5AB] font-semibold flex items-center gap-1 bg-[#24201D] px-3 py-1 rounded-full border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {currentStop.year_range}
                </span>
                <span className="text-xs text-white/90 px-3 py-1 rounded-full bg-[#24201D] border border-white/10">
                  {currentStop.continent}
                </span>
              </div>

              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white mb-2">
                {currentStop.city}, {currentStop.country}
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-6">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Tọa độ địa lý: {currentStop.coordinates.lat}° B, {currentStop.coordinates.lng}° Đ</span>
              </div>

              {/* Grid: Tall Archival Image (left/top) + Enriched Information (right/bottom) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
                {/* Tall Archival Image Container */}
                <div className="md:col-span-5 relative">
                  <div className="relative w-full h-[360px] md:h-[460px] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl bg-black">
                    <Image
                      src={currentStop.image_url || "/images/archive/marseille-1921.jpg"}
                      alt={`${currentStop.city} - ${currentStop.country}`}
                      fill
                      className="object-cover object-center filter contrast-110 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    
                    {/* Caption badge overlay */}
                    <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/75 backdrop-blur-sm border border-white/10 text-center">
                      <p className="text-[11px] text-white font-medium font-sans line-clamp-2">
                        Tư liệu lịch sử chặng {currentStop.order}: {currentStop.city} ({currentStop.year_range})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enriched Details */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  {/* Revolutionary Activities */}
                  <div className="p-4 rounded-2xl bg-[#24201D]/80 border border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-2 flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>Hoạt động cách mạng:</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-sans">
                      {currentStop.activities}
                    </p>
                  </div>

                  {/* Historical Significance */}
                  <div className="p-4 rounded-2xl bg-[#8B1E19]/20 border border-[#8B1E19]/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5 font-sans">
                      Ý nghĩa lịch sử đối với cách mạng Việt Nam:
                    </h4>
                    <p className="text-xs sm:text-sm text-[#FAF6F0] leading-relaxed italic font-serif">
                      “{currentStop.historical_significance}”
                    </p>
                  </div>

                  {/* Archival metadata strip */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/80 space-y-1">
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span className="font-semibold">Mốc son: {currentStop.year_range}</span>
                    </div>
                    <p>Địa bàn hoạt động quốc tế kết nối phong trào công nhân và phong trào giải phóng thuộc địa.</p>
                  </div>
                </div>
              </div>

              {/* Source Verification Footer */}
              <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between text-xs text-[#C5A059] gap-2 font-sans">
                <span className="text-white/80">Nguồn kiểm chứng: <strong>{currentStop.source_name}</strong></span>
                <a
                  href={currentStop.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F3E5AB] hover:underline font-semibold"
                >
                  <span>Cổng tư liệu chính thống</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
