"use client";

import { useState, useEffect } from "react";
import { BookOpen, Compass, Image as ImageIcon, Shield, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#12100E]/95 backdrop-blur-md border-b border-[#D4AF37]/30 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
            <span className="font-serif-title font-bold text-base text-[#8B1E19]">HCM</span>
          </div>
          <div>
            <span className="block font-serif-title text-base sm:text-lg font-bold text-white tracking-wide">
              HỒ CHÍ MINH
            </span>
            <span className="block text-[11px] text-[#F3E5AB] uppercase tracking-widest font-sans font-medium">
              Triển lãm số (1890 - 1969)
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <a
            href="#portrait"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
          >
            <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Chân dung & Tư liệu</span>
          </a>
          <a
            href="#journey"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Hành trình 5 Châu</span>
          </a>
          <a
            href="#stories"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Kho tàng Câu chuyện</span>
          </a>
          <a
            href="#resistance"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Lịch sử Kháng chiến</span>
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
          <a
            href="#journey"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#12100E] bg-white hover:bg-[#FAF8F5] border border-[#D4AF37] transition-all shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B1E19]" />
            <span>Vào Triển Lãm</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#F3E5AB]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#12100E] border-b border-[#D4AF37]/30 px-6 py-4 flex flex-col gap-3">
          <a
            href="#portrait"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-sm text-white hover:text-[#F3E5AB]"
          >
            <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Chân dung & Tư liệu</span>
          </a>
          <a
            href="#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-sm text-white hover:text-[#F3E5AB]"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Hành trình 5 Châu</span>
          </a>
          <a
            href="#stories"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-sm text-white hover:text-[#F3E5AB]"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>Kho tàng Câu chuyện</span>
          </a>
          <a
            href="#resistance"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 py-2 text-sm text-white hover:text-[#F3E5AB]"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Lịch sử Kháng chiến</span>
          </a>
        </div>
      )}
    </header>
  );
}
