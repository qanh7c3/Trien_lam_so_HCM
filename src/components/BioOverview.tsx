"use client";

import { motion } from "framer-motion";
import { BookMarked, HeartHandshake, Lightbulb, Users } from "lucide-react";

export default function BioOverview() {
  const pillars = [
    {
      icon: <Lightbulb className="w-6 h-6 text-[#D4AF37]" />,
      title: "Độc Lập Dân Tộc & CNXH",
      desc: "Con đường duy nhất giải phóng dân tộc, xóa bỏ bất công áp bức, đưa nhân dân tới tự do, ấm no và hạnh phúc trọn vẹn.",
    },
    {
      icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
      title: "Đại Đoàn Kết Toàn Dân",
      desc: "'Đoàn kết, đoàn kết, đại đoàn kết — Thành công, thành công, đại thành công'. Sức mạnh vô địch làm nên mọi thắng lợi của cách mạng.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
      title: "Lấy Dân Làm Gốc",
      desc: "Bao nhiêu lợi ích đều vì dân, bao nhiêu quyền hạn đều của dân. Cán bộ, đảng viên là người đầy tớ trung thành của nhân dân.",
    },
    {
      icon: <BookMarked className="w-6 h-6 text-[#D4AF37]" />,
      title: "Cần, Kiệm, Liêm, Chính",
      desc: "Nền tảng đạo đức cách mạng cao đẹp, chí công vô tư, nêu gương suốt đời sống giản dị, thanh bạch giữa muôn dân.",
    },
  ];

  return (
    <section id="bio" className="py-20 relative border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] block mb-2">
            Di sản Tinh thần Bất diệt
          </span>
          <h2 className="font-serif-title text-2xl sm:text-4xl font-bold text-[#FAF6F0]">
            Tiểu Sử Tổng Quan & Tư Tưởng Cốt Lõi
          </h2>
          <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto mt-4 mb-6" />
          <p className="text-[#EDE8DF]/80 text-sm sm:text-base leading-relaxed">
            Chủ tịch Hồ Chí Minh (tên khai sinh Nguyễn Sinh Cung, thuở đi học mang tên Nguyễn Tất Thành) sinh ngày 19/5/1890 
            tại làng Hoàng Trù (quê ngoại) và lớn lên ở làng Sen (quê nội), xã Kim Liên, huyện Nam Đàn, tỉnh Nghệ An. 
            Người là hiện thân ngời sáng của tinh thần yêu nước quật cường, lòng nhân ái bao la và trí tuệ mẫn tiệp của dân tộc Việt Nam.
          </p>
        </div>

        {/* 4 Pillars of Thought */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#1C1917]/80 gold-border hover:border-[#D4AF37]/60 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#24201D] flex items-center justify-center border border-[#D4AF37]/20 mb-4 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#F3E5AB] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EDE8DF]/75 leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
