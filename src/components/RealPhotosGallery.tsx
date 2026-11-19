"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, X, ZoomIn, ShieldCheck } from "lucide-react";
import { IRealPhoto } from "@/models/RealPhoto";
import { useIsolatedScroll, useLockBodyScroll } from "@/hooks/useIsolatedScroll";

interface RealPhotosGalleryProps {
  photos: IRealPhoto[];
}

export default function RealPhotosGallery({ photos }: RealPhotosGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<IRealPhoto | null>(null);
  const modalScrollRef = useIsolatedScroll<HTMLDivElement>();

  // Lock main body and lenis scrolling when modal is open
  useLockBodyScroll(!!selectedPhoto);

  return (
    <section id="portrait" className="py-24 relative bg-[#171412] border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-semibold mb-3 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B1E19]" />
            <span>Phân Khu I — Tư Liệu Gốc</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-white">
            Triển Lãm Ảnh Đời Thật Về Bác
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/90 font-sans">
            Tập hợp những khoảnh khắc đời thường và những mốc son lịch sử của Chủ tịch Hồ Chí Minh,
            được lưu trữ tại các cơ quan tư liệu quốc gia và viện bảo tàng chính thống.
          </p>
        </div>

        {/* Gallery Grid with Tall Museum Portrait Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, idx) => (
            <motion.div
              key={idx}
              layoutId={`photo-card-${idx}`}
              onClick={() => setSelectedPhoto(photo)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="cursor-pointer group relative rounded-3xl overflow-hidden bg-[#1C1917] gold-border hover:border-[#D4AF37] hover:shadow-2xl transition-all flex flex-col border border-white/10"
            >
              {/* Tall Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <Image
                  src={photo.image_url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/20" />

                {/* White Year Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-serif font-bold shadow-md">
                  Năm {photo.year}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#12100E] text-xs font-bold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-[#8B1E19]" />
                    <span>Xem chi tiết</span>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-base font-bold text-white line-clamp-2 mb-2 group-hover:text-[#F3E5AB] transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#EDE8DF]/80 mb-2 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-[#C5A059] flex items-center justify-between font-sans">
                  <span className="truncate max-w-[200px]">{photo.source_name}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              className="relative max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-[#1C1917] gold-border gold-glow-lg overflow-hidden shadow-2xl border border-white/20 cursor-default"
            >
              {/* Prominent, Non-clipped Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#D4AF37] border border-white/25 shadow-2xl transition-all cursor-pointer"
                aria-label="Đóng cửa sổ chi tiết"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Flexible, Viewport-constrained Image Container (Larger & Taller) */}
              <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px] max-h-[55vh] shrink-0 bg-black flex items-center justify-center border-b border-[#D4AF37]/25 overflow-hidden">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1100px"
                  className="object-contain p-1.5 sm:p-2"
                  priority
                />
              </div>

              {/* Scrollable Content Area: Isolated Wheel Scrolling */}
              <div
                ref={modalScrollRef}
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                className="p-5 sm:p-7 overflow-y-auto overscroll-contain flex-1 flex flex-col justify-between custom-scrollbar"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3.5 py-1 rounded-full bg-white text-[#12100E] text-xs sm:text-sm font-serif font-bold shadow-sm">
                      Năm {selectedPhoto.year}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#F3E5AB]">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span>{selectedPhoto.location}</span>
                    </span>
                  </div>

                  <h3 className="font-serif-title text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#EDE8DF]/95 leading-relaxed mb-5 font-sans">
                    {selectedPhoto.historical_context}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between text-xs sm:text-sm text-[#C5A059] gap-3 font-sans shrink-0">
                  <span className="text-white/80">Lưu trữ: <strong className="text-white">{selectedPhoto.source_name}</strong></span>
                  <a
                    href={selectedPhoto.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F3E5AB] hover:underline font-medium"
                  >
                    <span>Kiểm chứng nguồn</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
