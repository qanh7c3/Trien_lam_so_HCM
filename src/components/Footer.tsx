import { ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const sources = [
    { name: "Bảo tàng Hồ Chí Minh", url: "https://baotanghochiminh.vn" },
    { name: "Khu di tích Chủ tịch Hồ Chí Minh tại Phủ Chủ tịch", url: "https://ditichhochiminhphuchutich.gov.vn" },
    { name: "Cổng TTĐT Đảng Cộng sản Việt Nam — Tư liệu Văn kiện", url: "https://tulieuvankien.dangcongsan.vn" },
    { name: "Báo Nhân Dân", url: "https://nhandan.vn" },
    { name: "Thông tấn xã Việt Nam", url: "https://vnanet.vn" },
  ];

  return (
    <footer className="bg-[#0A0908] border-t border-[#D4AF37]/30 text-[#EDE8DF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Main Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-[#D4AF37] shadow-md">
                <span className="font-serif-title font-bold text-base text-[#8B1E19]">HCM</span>
              </div>
              <div>
                <span className="block font-serif-title text-lg font-bold text-white">
                  TRIỂN LÃM SỐ CHỦ TỊCH HỒ CHÍ MINH
                </span>
                <span className="block text-xs text-[#F3E5AB] uppercase tracking-wider font-sans font-medium">
                  Không Gian Văn Hóa Nghệ Thuật & Lịch Sử
                </span>
              </div>
            </div>

            <p className="text-sm text-[#EDE8DF]/80 leading-relaxed font-sans max-w-lg">
              Dự án được xây dựng với mục tiêu tôn vinh và tưởng nhớ công lao trời biển của Chủ tịch Hồ Chí Minh — 
              Người đã cống hiến trọn đời mình cho sự nghiệp giải phóng dân tộc, vì độc lập, tự do và hạnh phúc của nhân dân.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#12100E] border border-[#D4AF37] text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Toàn bộ tư liệu, mốc thời gian và trích dẫn kiểm chứng 100%</span>
            </div>
          </div>

          {/* Official Verification Sources */}
          <div className="md:col-span-6 space-y-3">
            <h4 className="font-serif-title text-base font-bold text-white uppercase tracking-wider">
              Nguồn Tư Liệu Chính Thống Được Kiểm Chứng:
            </h4>
            <ul className="space-y-2">
              {sources.map((s, idx) => (
                <li key={idx}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs sm:text-sm text-white/80 hover:text-white transition-colors py-1.5 border-b border-white/5 hover:border-[#D4AF37]/40"
                  >
                    <span>{idx + 1}. {s.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 font-sans">
          <div>
            © 2026 Triển lãm số Chủ tịch Hồ Chí Minh. Đời đời nhớ ơn Bác Hồ vĩ đại.
          </div>
          <div className="font-serif italic text-white/60">
            “Không có gì quý hơn độc lập, tự do!”
          </div>
        </div>
      </div>
    </footer>
  );
}
