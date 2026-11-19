import type { Metadata } from "next";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import LenisScroll from "@/components/LenisScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Triển Lãm Số: Tưởng Nhớ Chủ Tịch Hồ Chí Minh (1890 - 1969)",
  description:
    "Không gian triển lãm nghệ thuật số tưởng nhớ Chủ tịch Hồ Chí Minh - Tái hiện hành trình 30 năm bôn ba tìm đường cứu nước, kho tàng câu chuyện chân thực và dấu ấn lãnh đạo hai cuộc kháng chiến vĩ đại.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnamPro.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="/assets/chatbot/chatbot-widget.css" />
      </head>
      <body className="bg-[#12100E] text-[#EDE8DF] antialiased selection:bg-[#8B1E19] selection:text-[#FAF6F0]">
        <LenisScroll />
        {children}
        <script src="/assets/chatbot/chatbot-widget.js" defer></script>
      </body>
    </html>
  );
}
