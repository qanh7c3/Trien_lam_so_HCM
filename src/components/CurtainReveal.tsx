"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export default function CurtainReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftCurtainX = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "-100%"]);
  const rightCurtainX = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "100%"]);
  const sealOpacity = useTransform(scrollYProgress, [0.1, 0.35], [1, 0]);
  const sealScale = useTransform(scrollYProgress, [0.1, 0.35], [1, 1.3]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0.3, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[140vh] -mt-16 z-20 pointer-events-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Left Curtain Panel */}
        <motion.div
          style={{ x: leftCurtainX }}
          className="absolute top-0 left-0 w-1/2 h-full red-lacquer-gradient border-r-2 border-[#D4AF37] shadow-2xl z-30 flex items-center justify-end pr-4 pointer-events-auto"
        >
          <div className="h-full w-4 bg-gradient-to-r from-transparent to-black/40" />
        </motion.div>

        {/* Right Curtain Panel */}
        <motion.div
          style={{ x: rightCurtainX }}
          className="absolute top-0 right-0 w-1/2 h-full red-lacquer-gradient border-l-2 border-[#D4AF37] shadow-2xl z-30 flex items-center justify-start pl-4 pointer-events-auto"
        >
          <div className="h-full w-4 bg-gradient-to-l from-transparent to-black/40" />
        </motion.div>

        {/* Center Seal / Embellishment */}
        <motion.div
          style={{ opacity: sealOpacity, scale: sealScale }}
          className="absolute z-40 flex flex-col items-center justify-center text-center p-6 rounded-full bg-[#1C1917] border-2 border-[#D4AF37] gold-glow-lg max-w-xs shadow-2xl"
        >
          <Sparkles className="w-8 h-8 text-[#D4AF37] mb-2 animate-pulse" />
          <span className="font-serif-title text-sm uppercase tracking-widest text-[#F3E5AB] font-bold">
            Triển Lãm Số
          </span>
          <span className="text-[11px] text-[#FFFFFF] tracking-wider mt-1">
            Cuộn xuống để mở màn
          </span>
        </motion.div>

        {/* Revealed Space under the curtain */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1C1917] via-[#12100E] to-[#0A0908]"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#12100E] bg-white border border-[#D4AF37] shadow-md mb-4">
            Không Gian Trưng Bày Lịch Sử
          </span>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white max-w-2xl leading-tight">
            Hành Trình Bất Diệt Của Chủ Tịch Hồ Chí Minh
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/80 max-w-xl mt-3 font-sans">
            Tài liệu ảnh và sử liệu lưu trữ chính thống qua từng thời kỳ lịch sử hào hùng.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
