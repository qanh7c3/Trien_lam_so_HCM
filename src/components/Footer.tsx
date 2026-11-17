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
    <footer className="bg-[#0D0B0A] border-t border-[#D4AF37]/25 text-[#EDE8DF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Main Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full red-lacquer-gradient flex items-center justify-center border border-[#D4AF37]/40 shadow-md">
                <span className="font-serif-title font-bold text-lg text-[#F3E5AB]">HCM</span>
              </div>
              <div>
                <span className="block font-serif-title text-lg font-bold text-[#F3E5AB]">
                  TRIỂN LÃM SỐ CHỦ TỊCH HỒ CHÍ MINH
                </span>
                <span className="block text-xs text-[#C5A059] uppercase tracking-wider font-sans">
                  Không Gian Văn Hóa Nghệ Thuật & Lịch Sử
                </span>
              </div>
            </div>

            <p className="text-sm text-[#EDE8DF]/75 leading-relaxed font-sans max-w-lg">
              Dự án được xây dựng với mục tiêu tôn vinh và tưởng nhớ công lao trời biển của Chủ tịch Hồ Chí Minh — 
              Người đã cống hiến trọn đời mình cho sự nghiệp giải phóng dân tộc, vì độc lập, tự do và hạnh phúc của nhân dân.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C1917] border border-[#D4AF37]/30 text-xs text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Toàn bộ tư liệu, mốc thời gian và trích dẫn kiểm chứng 100%</span>
            </div>
          </div>

          {/* Official Verification Sources */}
          <div className="md:col-span-6 space-y-3">
            <h4 className="font-serif-title text-base font-bold text-[#F3E5AB] uppercase tracking-wider">
              Nguồn Tư Liệu Chính Thống Được Kiểm Chứng:
            </h4>
            <ul className="space-y-2">
              {sources.map((s, idx) => (
                <li key={idx}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs sm:text-sm text-[#EDE8DF]/80 hover:text-[#D4AF37] transition-colors py-1 border-b border-white/5"
                  >
                    <span>{idx + 1}. {s.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C5A059]">
          <div>
            © 2026 Triển lãm số Chủ tịch Hồ Chí Minh. Đời đời nhớ ơn Bác Hồ vĩ đại.
          </div>
          <div className="font-serif italic text-[#EDE8DF]/60">
            “Non sông Việt Nam có trở nên tươi đẹp hay không... chính là nhờ một phần lớn ở công học tập của các em.”
          </div>
        </div>
      </div>
    </footer>
  );
}
