"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookMarked,
  BookOpen,
  Calendar,
  Compass,
  ExternalLink,
  Flag,
  Flame,
  Globe,
  HeartHandshake,
  Lightbulb,
  MapPin,
  Quote,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import type { IRealPhoto } from "@/models/RealPhoto";
import type { IStoryMilestone } from "@/models/StoryMilestone";
import StoryModal from "@/components/StoryModal";
import { useIsolatedScroll, useLockBodyScroll } from "@/hooks/useIsolatedScroll";
import type { Exhibition3DData } from "../types";

interface ShowcaseSectionsProps {
  data: Exhibition3DData;
  activeStop: number;
  onSelectStop: (index: number) => void;
  onNavigateAnchor: (anchorId: string) => void;
}

const OFFICIAL_SOURCES = [
  { name: "Bảo tàng Hồ Chí Minh", url: "https://baotanghochiminh.vn" },
  {
    name: "Khu di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch",
    url: "https://ditichhochiminhphuchutich.gov.vn",
  },
  {
    name: "Cổng TTĐT Đảng Cộng sản Việt Nam — Tư liệu Văn kiện",
    url: "https://tulieuvankien.dangcongsan.vn",
  },
  { name: "Báo Nhân Dân", url: "https://nhandan.vn" },
  { name: "Thông tấn xã Việt Nam", url: "https://vnanet.vn" },
];

const IDEOLOGY_PILLARS = [
  {
    icon: Lightbulb,
    title: "Độc Lập Dân Tộc & CNXH",
    desc: "Con đường duy nhất giải phóng dân tộc, xóa bỏ bất công áp bức, đưa nhân dân tới tự do, ấm no và hạnh phúc trọn vẹn.",
  },
  {
    icon: Users,
    title: "Đại Đoàn Kết Toàn Dân",
    desc: "'Đoàn kết, đoàn kết, đại đoàn kết — Thành công, thành công, đại thành công'. Sức mạnh vô địch làm nên mọi thắng lợi của cách mạng.",
  },
  {
    icon: HeartHandshake,
    title: "Lấy Dân Làm Gốc",
    desc: "Bao nhiêu lợi ích đều vì dân, bao nhiêu quyền hạn đều của dân. Cán bộ, đảng viên là người đầy tớ trung thành của nhân dân.",
  },
  {
    icon: BookMarked,
    title: "Cần, Kiệm, Liêm, Chính",
    desc: "Nền tảng đạo đức cách mạng cao đẹp, chí công vô tư, nêu gương suốt đời sống giản dị, thanh bạch giữa muôn dân.",
  },
];

const STORY_PERIODS = [
  { id: "all", label: "Tất cả giai đoạn" },
  { id: "1911 - 1920", label: "1911 - 1920" },
  { id: "1921 - 1930", label: "1921 - 1930" },
  { id: "1931 - 1945", label: "1931 - 1945" },
  { id: "1945 - 1954", label: "1945 - 1954" },
  { id: "1954 - 1969", label: "1954 - 1969" },
];

export default function ShowcaseSections({
  data,
  activeStop,
  onSelectStop,
  onNavigateAnchor,
}: ShowcaseSectionsProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<IRealPhoto | null>(null);
  const [selectedStory, setSelectedStory] = useState<IStoryMilestone | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<string>("all");
  const [resistanceTab, setResistanceTab] = useState<"chong-phap" | "chong-my">("chong-phap");

  const photoModalScrollRef = useIsolatedScroll<HTMLDivElement>();
  const journeyListScrollRef = useIsolatedScroll<HTMLDivElement>();
  useLockBodyScroll(!!selectedPhoto);

  useEffect(() => {
    if (!selectedPhoto) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedPhoto]);

  const filteredStories =
    filterPeriod === "all"
      ? data.stories
      : data.stories.filter((s) => s.period.trim() === filterPeriod.trim());

  const currentResistance = data.resistanceHistory.filter(
    (item) => item.war_period === resistanceTab
  );

  return (
    <div className="relative pointer-events-auto">
      <section
        id="stage-opening"
        data-chapter-index="0"
        className="relative z-10 min-h-screen flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold mb-8 shadow-lg"
          >
            <Award className="w-3.5 h-3.5 text-[#8B1E1E]" />
            <span>Tư liệu Lịch sử Chính thống 100% — Bảo tàng Hồ Chí Minh</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
            className="museum-glass rounded-3xl p-7 sm:p-11 mb-10"
          >
            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF6F0] leading-tight mb-4">
              TRIỂN LÃM SỐ TƯỞNG NHỚ
              <span className="block mt-2 gold-gradient-text">
                CHỦ TỊCH HỒ CHÍ MINH
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#F3E5AB] font-light max-w-3xl mx-auto mb-8 leading-relaxed font-sans">
              (19 tháng 5 năm 1890 — 2 tháng 9 năm 1969)
              <span className="block text-sm sm:text-base text-[#FAF6F0]/90 mt-2 font-normal">
                Anh hùng giải phóng dân tộc — Nhà văn hóa kiệt xuất của Việt Nam được UNESCO tôn vinh
              </span>
            </p>

            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#12100E]/70 border border-[#C5A059]/40 mb-8 relative text-left sm:text-center">
              <p className="font-serif-title text-base sm:text-lg italic text-[#FAF6F0] leading-relaxed">
                “Tôi chỉ có một sự ham muốn, ham muốn tột bậc, là làm sao cho nước ta được hoàn toàn độc lập,
                dân ta được hoàn toàn tự do, đồng bào ai cũng có cơm ăn áo mặc, ai cũng được học hành.”
              </p>
              <div className="mt-3 text-xs text-[#C5A059] uppercase tracking-widest font-sans font-semibold">
                — Chủ tịch Hồ Chí Minh (Tháng 1 năm 1946)
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-[#C5A059]/25">
                <Globe className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  30 Năm
                </div>
                <div className="text-xs text-[#FAF6F0]/75 mt-1">Bôn ba tìm đường cứu nước</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-[#C5A059]/25">
                <Calendar className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  79 Mùa Xuân
                </div>
                <div className="text-xs text-[#FAF6F0]/75 mt-1">Trọn đời vì nước vì dân</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-[#C5A059]/25">
                <Sparkles className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  2 Kháng Chiến
                </div>
                <div className="text-xs text-[#FAF6F0]/75 mt-1">Chống Pháp & Chống Mỹ</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-[#C5A059]/25">
                <Award className="w-5 h-5 text-[#C5A059] mx-auto mb-2" />
                <div className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                  1987
                </div>
                <div className="text-xs text-[#FAF6F0]/75 mt-1">UNESCO ra Nghị quyết tôn vinh</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-8">
              {IDEOLOGY_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-4 rounded-2xl bg-[#12100E]/55 border border-white/10"
                  >
                    <Icon className="w-5 h-5 text-[#C5A059] mb-2" />
                    <h2 className="font-serif-title text-sm font-bold text-[#FAF6F0] mb-1">
                      {pillar.title}
                    </h2>
                    <p className="text-xs text-[#FAF6F0]/75 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateAnchor("stage-photos")}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#FAF6F0] bg-[#8B1E1E] hover:bg-[#a12525] border border-[#C5A059]/70 shadow-lg transition-all cursor-pointer"
              >
                Bắt Đầu Tham Quan Không Gian 3D
              </button>
              <button
                type="button"
                onClick={() => onNavigateAnchor("stage-journey")}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#12100E] bg-[#FAF6F0] hover:bg-white border border-[#C5A059] shadow-md transition-all cursor-pointer"
              >
                Hành Trình 5 Châu (1911–1941)
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col items-center text-[#C5A059]">
            <span className="text-xs uppercase tracking-widest mb-2 text-[#FAF6F0]/75">
              Cuộn để bay dọc trục thời gian
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      <section
        id="stage-photos"
        data-chapter-index="1"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="museum-glass rounded-3xl p-6 sm:p-10 mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Phân Khu I — Tư Liệu Ảnh Gốc</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
              Triển Lãm Ảnh Đời Thật Về Bác
            </h2>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-4" />
            <p className="text-sm sm:text-base text-[#FAF6F0]/90 font-sans">
              Tập hợp {data.photos.length} khoảnh khắc lịch sử nguyên bản được lưu trữ tại các bảo tàng
              và cơ quan tư liệu chính thống, giữ nguyên tỷ lệ và nội dung gốc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.photos.map((photo, idx) => (
              <motion.article
                key={`${photo.year}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: Math.min(idx * 0.03, 0.25) }}
                onClick={() => setSelectedPhoto(photo)}
                className="cursor-pointer group rounded-3xl overflow-hidden museum-glass-card hover:border-[#C5A059] transition-all flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <Image
                    src={photo.image_url}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/90 via-transparent to-black/20" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-serif font-bold shadow">
                    Năm {photo.year}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF6F0] text-[#12100E] text-xs font-bold shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5 text-[#8B1E1E]" />
                      <span>Xem tư liệu gốc</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-title text-base font-bold text-[#FAF6F0] line-clamp-2 mb-2 group-hover:text-[#F3E5AB] transition-colors">
                      {photo.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#FAF6F0]/80 mb-2 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-[11px] text-[#C5A059] flex items-center justify-between font-sans">
                    <span className="truncate max-w-[200px]">{photo.source_name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stage-journey"
        data-chapter-index="2"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="museum-glass rounded-3xl p-6 sm:p-10 mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Phân Khu II — Hành Trình Tìm Đường Cứu Nước</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
              Hành Trình Bôn Ba 5 Châu (1911 – 1941)
            </h2>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-4" />
            <p className="text-sm sm:text-base text-[#FAF6F0]/90 font-sans">
              Cuộn qua từng chặng lịch sử để đồng bộ điểm sáng trên dải quỹ đạo 3D, theo dấu chân người
              thanh niên Nguyễn Tất Thành — Nguyễn Ái Quốc suốt 30 năm qua các châu lục.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 museum-glass rounded-3xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                  12 Cột Mốc Trên Trục 3D
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8B1E1E] text-[#FAF6F0] border border-[#C5A059]/60 font-semibold">
                  {activeStop + 1} / {data.journey.length}
                </span>
              </div>

              <div
                ref={journeyListScrollRef}
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto overscroll-contain custom-scrollbar pr-1"
              >
                {data.journey.map((stop, idx) => {
                  const isActive = idx === activeStop;
                  return (
                    <button
                      key={stop.order}
                      type="button"
                      onClick={() => {
                        onSelectStop(idx);
                        const el = document.getElementById(`journey-stop-${stop.order}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`text-left px-3.5 py-2.5 rounded-xl transition-all border flex items-center gap-3 cursor-pointer ${
                        isActive
                          ? "bg-[#FAF6F0] text-[#12100E] border-[#C5A059] shadow-lg"
                          : "bg-[#12100E]/60 text-[#FAF6F0]/85 border-white/10 hover:border-[#C5A059]/45"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif font-bold shrink-0 ${
                          isActive
                            ? "bg-[#8B1E1E] text-[#FAF6F0]"
                            : "bg-white/10 text-[#C5A059]"
                        }`}
                      >
                        {stop.order}
                      </span>
                      <div className="min-w-0">
                        <div
                          className={`text-[11px] font-semibold ${
                            isActive ? "text-[#8B1E1E]" : "text-[#C5A059]"
                          }`}
                        >
                          {stop.year_range} · {stop.continent}
                        </div>
                        <div className="font-serif-title text-xs sm:text-sm font-bold truncate">
                          {stop.city}, {stop.country}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-8">
              {data.journey.map((stop, idx) => {
                const isActive = idx === activeStop;
                return (
                  <article
                    key={stop.order}
                    id={`journey-stop-${stop.order}`}
                    data-journey-stop={idx}
                    onMouseEnter={() => onSelectStop(idx)}
                    className={`museum-glass-card rounded-3xl p-6 sm:p-8 transition-all ${
                      isActive ? "border-[#C5A059] ring-1 ring-[#C5A059]/40" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] text-xs font-serif font-bold border border-[#C5A059]">
                        Chặng {stop.order} / {data.journey.length}
                      </span>
                      <span className="text-xs text-[#F3E5AB] font-semibold flex items-center gap-1.5 bg-[#12100E]/70 px-3 py-1 rounded-full border border-white/10">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{stop.year_range}</span>
                      </span>
                      <span className="text-xs text-[#FAF6F0]/90 px-3 py-1 rounded-full bg-[#12100E]/70 border border-white/10">
                        {stop.continent}
                      </span>
                    </div>

                    <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#FAF6F0] mb-1.5">
                      {stop.city}, {stop.country}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#C5A059] mb-5">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          Tọa độ: {stop.coordinates.lat}° B, {stop.coordinates.lng}° Đ
                        </span>
                      </span>
                      {stop.alias && (
                        <span>Bí danh / Tên gọi: {stop.alias}</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-5">
                      <div className="md:col-span-5">
                        <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-[#C5A059]/45 bg-black">
                          <Image
                            src={stop.image_url}
                            alt={`${stop.city} - ${stop.country}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 320px"
                            className="object-cover object-center"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-7 flex flex-col justify-between gap-4">
                        <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-white/10">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-2">
                            Hoạt động cách mạng
                          </h4>
                          <p className="text-xs sm:text-sm text-[#FAF6F0]/95 leading-relaxed font-sans">
                            {stop.activities}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#8B1E1E]/25 border border-[#8B1E1E]/60">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                            Ý nghĩa lịch sử
                          </h4>
                          <p className="text-xs sm:text-sm text-[#FAF6F0] leading-relaxed italic font-serif">
                            “{stop.historical_significance}”
                          </p>
                        </div>

                        {(stop.historical_address || stop.key_document) && (
                          <div className="p-3.5 rounded-xl bg-[#12100E]/55 border border-white/10 text-xs text-[#FAF6F0]/85 space-y-1">
                            {stop.historical_address && (
                              <div>
                                <span className="text-[#C5A059] font-semibold">Địa danh: </span>
                                <span>{stop.historical_address}</span>
                              </div>
                            )}
                            {stop.key_document && (
                              <div>
                                <span className="text-[#C5A059] font-semibold">Văn kiện / Dấu ấn: </span>
                                <span>{stop.key_document}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3.5 border-t border-[#C5A059]/25 flex flex-wrap items-center justify-between text-xs text-[#C5A059] gap-2">
                      <span className="text-[#FAF6F0]/85">
                        Nguồn kiểm chứng: <strong>{stop.source_name}</strong>
                      </span>
                      <a
                        href={stop.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#F3E5AB] hover:underline font-semibold"
                      >
                        <span>Cổng tư liệu chính thống</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        id="stage-stories"
        data-chapter-index="3"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="museum-glass rounded-3xl p-6 sm:p-10 mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Phân Khu III — Ký Ức & Bài Học</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
              Kho Tàng Những Câu Chuyện Về Bác
            </h2>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-4" />
            <p className="text-sm sm:text-base text-[#FAF6F0]/90 font-sans">
              Những câu chuyện chân thực được kiểm chứng qua hồi ký và văn kiện lịch sử, khắc họa nhân
              cách cao đẹp và tình yêu thương vô bờ bến của Người.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {STORY_PERIODS.map((period) => (
              <button
                key={period.id}
                type="button"
                onClick={() => setFilterPeriod(period.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filterPeriod === period.id
                    ? "bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] shadow-lg font-bold"
                    : "museum-glass-pill text-[#FAF6F0]/80 hover:text-[#FAF6F0]"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredStories.map((story, idx) => (
              <motion.article
                key={`${story.year}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.2) }}
                className="museum-glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:border-[#C5A059] transition-all"
              >
                <div>
                  <div className="relative w-full h-56 overflow-hidden bg-black border-b border-[#C5A059]/25">
                    <Image
                      src={story.image_url}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12100E]/85 via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] text-xs font-semibold border border-[#C5A059] flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#8B1E1E]" />
                      <span>{story.date_label}</span>
                    </div>
                    <div className="absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded-full bg-[#12100E]/85 text-[#F3E5AB] border border-white/15">
                      {story.period}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif-title text-lg font-bold text-[#FAF6F0] mb-2.5 group-hover:text-[#F3E5AB] transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed line-clamp-3 font-sans">
                      {story.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#C5A059] truncate max-w-[170px]">
                    {story.source_name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedStory(story)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8B1E1E] hover:bg-[#a12525] text-[#FAF6F0] border border-[#C5A059]/60 text-xs font-semibold transition-all cursor-pointer shrink-0"
                  >
                    <span>Đọc trọn vẹn</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="stage-resistance"
        data-chapter-index="4"
        className="relative z-10 py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="museum-glass rounded-3xl p-6 sm:p-10 mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5 text-[#8B1E1E]" />
              <span>Phân Khu IV — Hai Cuộc Kháng Chiến Vĩ Đại</span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
              Dấu Ấn Lãnh Đạo & Lời Hiệu Triệu Non Sông
            </h2>
            <div className="w-20 h-0.5 bg-[#C5A059] mx-auto mt-4 mb-4" />
            <p className="text-sm sm:text-base text-[#FAF6F0]/90 font-sans">
              Hai bản trường ca lịch sử chống thực dân Pháp (1945–1954) và chống đế quốc Mỹ
              (1954–1975) gắn liền với tư tưởng quân sự và ý chí gang thép của Chủ tịch Hồ Chí Minh.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="museum-glass-pill p-1.5 rounded-full flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setResistanceTab("chong-phap")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer ${
                  resistanceTab === "chong-phap"
                    ? "bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] shadow-lg"
                    : "text-[#FAF6F0]/80 hover:text-[#FAF6F0]"
                }`}
              >
                <Flame className="w-4 h-4 text-[#8B1E1E]" />
                <span>Chương I: Chống Thực Dân Pháp (1945–1954)</span>
              </button>
              <button
                type="button"
                onClick={() => setResistanceTab("chong-my")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-serif font-bold transition-all cursor-pointer ${
                  resistanceTab === "chong-my"
                    ? "bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] shadow-lg"
                    : "text-[#FAF6F0]/80 hover:text-[#FAF6F0]"
                }`}
              >
                <Flag className="w-4 h-4 text-[#8B1E1E]" />
                <span>Chương II: Chống Đế Quốc Mỹ (1954–1975)</span>
              </button>
            </div>
          </div>

          <div className="museum-glass rounded-3xl p-7 sm:p-9 mb-10 text-center max-w-4xl mx-auto">
            <Quote className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-85" />
            <h3 className="font-serif-title text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF6F0] leading-relaxed mb-3">
              {resistanceTab === "chong-phap"
                ? "“Thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ!”"
                : "“Không có gì quý hơn độc lập, tự do!”"}
            </h3>
            <p className="text-xs sm:text-sm text-[#C5A059] uppercase tracking-widest font-sans font-semibold">
              {resistanceTab === "chong-phap"
                ? "Lời kêu gọi Toàn quốc kháng chiến (19/12/1946)"
                : "Lời kêu gọi đồng bào và chiến sĩ cả nước chống Mỹ cứu nước (17/7/1966)"}
            </p>
          </div>

          <div className="space-y-7 mb-16">
            {currentResistance.map((event, idx) => (
              <article
                key={`${event.war_period}-${event.year}-${idx}`}
                className="museum-glass-card rounded-3xl p-6 sm:p-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4">
                    <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#C5A059]/45 bg-black">
                      <Image
                        src={event.image_url}
                        alt={event.event_title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 380px"
                        className="object-cover object-top"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-serif font-bold">
                        {event.date_label}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-4">
                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0]">
                      {event.event_title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FAF6F0]/85 leading-relaxed font-sans">
                      {event.campaign_or_context}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-[#12100E]/65 border border-white/10">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-1.5">
                          Vai trò Chủ tịch Hồ Chí Minh
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF6F0]/90 leading-relaxed">
                          {event.ho_chi_minh_role}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#8B1E1E]/20 border border-[#8B1E1E]/55">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#F3E5AB] mb-1.5">
                          Kết quả & Ý nghĩa
                        </div>
                        <p className="text-xs sm:text-sm text-[#FAF6F0]/95 leading-relaxed">
                          {event.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF6F0]/5 border-l-4 border-[#C5A059]">
                      <p className="font-serif italic text-xs sm:text-sm text-[#FAF6F0] leading-relaxed">
                        “{event.authentic_quote}”
                      </p>
                      {event.directive_or_order && (
                        <div className="mt-2 text-[11px] text-[#C5A059]">
                          Văn kiện / Chỉ thị: {event.directive_or_order}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-[#C5A059] gap-2">
                      <span className="text-[#FAF6F0]/80">
                        Nguồn lưu trữ: <strong>{event.source_name}</strong>
                      </span>
                      <a
                        href={event.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#F3E5AB] hover:underline font-semibold"
                      >
                        <span>Kiểm chứng nguồn</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <footer className="museum-glass rounded-3xl p-6 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] border border-[#C5A059] text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Toàn bộ tư liệu kiểm chứng 100%</span>
                </div>
                <h4 className="font-serif-title text-lg sm:text-xl font-bold text-[#FAF6F0]">
                  TRIỂN LÃM SỐ CHỦ TỊCH HỒ CHÍ MINH — PHIÊN BẢN 3D SHOWCASE
                </h4>
                <p className="text-xs sm:text-sm text-[#FAF6F0]/80 leading-relaxed">
                  Không gian bảo tàng số đương đại tôn vinh cuộc đời và sự nghiệp cách mạng của Chủ
                  tịch Hồ Chí Minh (1890–1969). Mọi thông tin, hình ảnh và trích dẫn được đối chiếu
                  nghiêm ngặt từ các cơ quan lưu trữ chính thống của Việt Nam.
                </p>
              </div>

              <div className="md:col-span-6 space-y-2">
                <h5 className="font-serif-title text-sm font-bold text-[#C5A059] uppercase tracking-wider">
                  Nguồn Tư Liệu Chính Thống Được Kiểm Chứng
                </h5>
                <ul className="space-y-1.5">
                  {OFFICIAL_SOURCES.map((source, idx) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-xs sm:text-sm text-[#FAF6F0]/85 hover:text-[#FAF6F0] py-1.5 border-b border-white/10 hover:border-[#C5A059]/45 transition-colors"
                      >
                        <span>
                          {idx + 1}. {source.name}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </section>

      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-[#1C1917] border border-[#C5A059]/50 overflow-hidden shadow-2xl cursor-default"
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-black/80 hover:bg-black text-white hover:text-[#C5A059] border border-white/25 transition-all cursor-pointer"
                aria-label="Đóng cửa sổ chi tiết"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[280px] sm:h-[420px] max-h-[55vh] shrink-0 bg-black flex items-center justify-center border-b border-[#C5A059]/25">
                <Image
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 960px"
                  className="object-contain p-2"
                  priority
                />
              </div>

              <div
                ref={photoModalScrollRef}
                data-lenis-prevent="true"
                data-lenis-prevent-wheel="true"
                className="p-5 sm:p-7 overflow-y-auto overscroll-contain flex-1 custom-scrollbar"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#12100E] text-xs font-serif font-bold">
                    Năm {selectedPhoto.year}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs sm:text-sm text-[#F3E5AB]">
                    <MapPin className="w-4 h-4 text-[#C5A059]" />
                    <span>{selectedPhoto.location}</span>
                  </span>
                </div>

                <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-[#FAF6F0] mb-3">
                  {selectedPhoto.title}
                </h3>

                <p className="text-sm sm:text-base text-[#FAF6F0]/90 leading-relaxed mb-5 font-sans">
                  {selectedPhoto.historical_context}
                </p>

                <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between text-xs sm:text-sm text-[#C5A059] gap-3">
                  <span className="text-[#FAF6F0]/80">
                    Lưu trữ: <strong className="text-[#FAF6F0]">{selectedPhoto.source_name}</strong>
                  </span>
                  <a
                    href={selectedPhoto.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F3E5AB] hover:underline font-medium"
                  >
                    <span>Kiểm chứng nguồn</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}
