"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink, X, ZoomIn, ShieldCheck } from "lucide-react";
import { IRealPhoto } from "@/models/RealPhoto";

interface RealPhotosGalleryProps {
  photos: IRealPhoto[];
}

export default function RealPhotosGallery({ photos }: RealPhotosGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<IRealPhoto | null>(null);

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full rounded-3xl bg-[#1C1917] gold-border gold-glow-lg overflow-hidden shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-white text-[#12100E] text-xs font-serif font-bold">
                    Năm {selectedPhoto.year}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#F3E5AB]">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedPhoto.location}
                  </span>
                </div>

                <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-white mb-3">
                  {selectedPhoto.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#EDE8DF]/90 leading-relaxed mb-6 font-sans">
                  {selectedPhoto.historical_context}
                </p>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#C5A059] gap-2 font-sans">
                  <span className="text-white/80">Lưu trữ: <strong>{selectedPhoto.source_name}</strong></span>
                  <a
                    href={selectedPhoto.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#F3E5AB] hover:underline"
                  >
                    <span>Kiểm chứng nguồn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
