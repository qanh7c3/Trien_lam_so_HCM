"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Globe, MapPin, Calendar, ExternalLink, ChevronRight, CheckCircle2 } from "lucide-react";
import { IFiveContinentsJourney } from "@/models/FiveContinentsJourney";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FiveContinentsProps {
  journey: IFiveContinentsJourney[];
}

export default function FiveContinentsScrollytelling({ journey }: FiveContinentsProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop GSAP pin/fade effects
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 30%",
        onUpdate: (self) => {
          const stepIndex = Math.min(
            journey.length - 1,
            Math.floor(self.progress * journey.length)
          );
          setActiveStep(stepIndex);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [journey.length]);

  const currentStop = journey[activeStep] || journey[0];

  return (
    <section id="journey" ref={containerRef} className="py-24 relative bg-[#12100E] border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] gold-border text-xs text-[#D4AF37] mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Phân Khu II — Scrollytelling</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
            Hành Trình Bôn Ba 5 Châu (1911 – 1941)
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/80">
            Theo chân người thanh niên Nguyễn Tất Thành — Nguyễn Ái Quốc suốt 30 năm qua các đại dương và lục địa
            để tìm ra chân lý giải phóng dân tộc Việt Nam.
          </p>
        </div>

        {/* Desktop Interactive Layout (Left timeline navigation, Right detailed stage card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Stepper / Milestones List */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
            {journey.map((item, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-xl transition-all border flex items-center justify-between ${
                    isActive
                      ? "bg-[#1C1917] border-[#D4AF37] gold-glow shadow-md"
                      : "bg-[#171412]/60 border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#1C1917]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-serif text-xs font-bold ${
                        isActive
                          ? "red-lacquer-gradient text-[#FAF6F0] border border-[#D4AF37]"
                          : "bg-[#24201D] text-[#EDE8DF]/60"
                      }`}
                    >
                      {item.order}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isActive ? "text-[#F3E5AB]" : "text-[#EDE8DF]/70"}`}>
                          {item.year_range}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-[#D4AF37]">
                          {item.continent}
                        </span>
                      </div>
                      <div className={`font-serif-title text-sm font-bold mt-0.5 ${isActive ? "text-[#FAF6F0]" : "text-[#EDE8DF]/90"}`}>
                        {item.country} — {item.city}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-[#D4AF37] translate-x-1" : "text-[#EDE8DF]/30"}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Presentation Card for Current Milestone */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#1C1917] gold-border gold-glow-lg flex flex-col justify-between shadow-2xl relative overflow-hidden"
            >
              {/* Background accent badge */}
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Globe className="w-48 h-48 text-[#D4AF37]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-md red-lacquer-gradient text-xs font-serif font-bold text-[#F3E5AB]">
                    Chặng {currentStop.order} / {journey.length}
                  </span>
                  <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {currentStop.year_range}
                  </span>
                  <span className="text-xs text-[#EDE8DF]/70 px-2 py-0.5 rounded bg-[#24201D]">
                    {currentStop.continent}
                  </span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#F3E5AB] mb-4">
                  {currentStop.city}, {currentStop.country}
                </h3>

                <div className="flex items-center gap-2 text-xs text-[#C5A059] mb-6">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Tọa độ địa lý: {currentStop.coordinates.lat}° B, {currentStop.coordinates.lng}° Đ</span>
                </div>

                <div className="space-y-5 mb-8">
                  <div className="p-4 rounded-xl bg-[#24201D]/70 border border-[#D4AF37]/20">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2 flex items-center gap-1.5 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>Hoạt động cách mạng:</span>
                    </h4>
                    <p className="text-sm text-[#FAF6F0] leading-relaxed font-sans">
                      {currentStop.activities}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#8B1E19]/15 border border-[#8B1E19]/40">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-2 font-sans">
                      Ý nghĩa lịch sử đối với cách mạng Việt Nam:
                    </h4>
                    <p className="text-sm text-[#EDE8DF] leading-relaxed italic font-serif">
                      “{currentStop.historical_significance}”
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-wrap items-center justify-between text-xs text-[#C5A059] gap-2">
                <span>Nguồn kiểm chứng: {currentStop.source_name}</span>
                <a
                  href={currentStop.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F3E5AB] hover:underline"
                >
                  <span>Cổng tư liệu</span>
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
