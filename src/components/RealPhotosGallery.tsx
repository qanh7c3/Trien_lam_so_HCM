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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1917] gold-border text-xs text-[#D4AF37] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Phân Khu I — Tư Liệu Gốc</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
            Triển Lãm Ảnh Đời Thật Về Bác
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#EDE8DF]/80">
            Tập hợp những khoảnh khắc đời thường và những mốc son lịch sử của Chủ tịch Hồ Chí Minh,
            được lưu trữ tại các cơ quan tư liệu quốc gia và viện bảo tàng chính thống.
          </p>
        </div>

        {/* Gallery Grid */}
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
              className="cursor-pointer group relative rounded-2xl overflow-hidden bg-[#1C1917] gold-border hover:border-[#D4AF37] hover:shadow-2xl transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
                <Image
                  src={photo.image_url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-transparent opacity-80" />

                {/* Year Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#12100E]/85 backdrop-blur-sm border border-[#D4AF37]/30 text-xs font-serif font-bold text-[#F3E5AB]">
                  {photo.year}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1E19] text-[#FAF6F0] text-xs font-medium">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Xem chi tiết</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-title text-base font-bold text-[#F3E5AB] line-clamp-2 mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#EDE8DF]/70 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/15 text-[11px] text-[#C5A059] flex items-center justify-between">
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
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[#1C1917] gold-border gold-glow-lg flex flex-col md:flex-row shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#12100E]/80 text-[#EDE8DF] hover:text-[#FAF6F0] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo representation */}
              <div className="relative md:w-1/2 min-h-[300px] md:min-h-[500px] bg-black">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>

              {/* Information Details */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-md red-lacquer-gradient text-xs font-serif font-bold text-[#F3E5AB]">
                      Năm {selectedPhoto.year}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#C5A059]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Đã kiểm chứng chính thống</span>
                    </span>
                  </div>

                  <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#F3E5AB] mb-4 leading-snug">
                    {selectedPhoto.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#EDE8DF]/80 mb-5">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{selectedPhoto.location}</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-2 font-sans">
                      Bối cảnh lịch sử:
                    </h4>
                    <p className="text-sm text-[#EDE8DF]/90 leading-relaxed font-sans">
                      {selectedPhoto.historical_context}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/20">
                  <div className="text-xs text-[#C5A059] mb-1">Nguồn tư liệu lưu trữ:</div>
                  <a
                    href={selectedPhoto.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#F3E5AB] hover:underline"
                  >
                    <span>{selectedPhoto.source_name}</span>
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
