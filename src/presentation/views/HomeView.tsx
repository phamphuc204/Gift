'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { HERO_SLIDES } from '../../infrastructure/mockData';

export const HomeView: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = HERO_SLIDES[currentSlideIndex];

  return (
    <div className="w-full">
      {/* Hero Section with Deep Imperial Vietnamese Red Glow */}
      <section
        className="relative bg-gradient-to-b from-[#5c0b11] via-[#750e17] to-[#4a080c] overflow-hidden pt-10 pb-28 lg:pt-14 lg:pb-36 border-b border-amber-600/20"
        style={{
          background:
            'linear-gradient(rgba(61, 10, 11, 0.85) 0%, rgba(38, 6, 7, 0.7) 60%, transparent 100%)',
          borderBottomColor: 'rgba(245, 158, 11, 0.15)',
        }}
      >
        {/* Ambient decorative lighting */}
        <div className="absolute inset-0 radial-lantern-glow pointer-events-none"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Traditional Imperial Corner Flourishes */}
        <div className="absolute top-4 left-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>
        <div className="absolute top-4 right-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:w-7/12 text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-950/70 border border-amber-400/40 shadow-inner mb-6 backdrop-blur-sm">
              <span className="text-sm">🌸</span>
              <span className="text-xs lg:text-sm font-semibold tracking-widest text-amber-300 uppercase">
                TẾT ĐINH MÙI 2027 • TRAO TRỌN YÊU THƯƠNG
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.18] mb-6 tracking-tight font-serif-tet gold-gradient-text">
              Gửi Trọn Thành Ý <br className="hidden sm:inline" />
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(245,197,66,0.3)]">
                Khai Xuân Đắc Lộc
              </span>
            </h1>

            {/* Subtitle Copy */}
            <p className="text-amber-100/85 text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Tuyển chọn những tuyệt phẩm hộp quà Tết sơn mài & gỗ mộc thượng hạng, phối ngẫu tinh hoa trà cổ thụ
              Shan Tuyết, hạt dinh dưỡng cao cấp và rượu vang danh tiếng từ các nhà làm vang trứ danh thế giới.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase text-red-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <i className="fa-solid fa-sparkles text-amber-800"></i>
                <span>KHÁM PHÁ BỘ SƯU TẬP</span>
              </button>
              <button
                onClick={() => navigateTo('corporate')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm tracking-wide text-amber-200 border border-amber-400/40 hover:bg-amber-500/10 hover:border-amber-300 hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm cursor-pointer"
              >
                <i className="fa-solid fa-file-arrow-down text-amber-400"></i>
                <span>TẢI CATALOGUE TẾT</span>
              </button>
            </div>

            {/* 4 Trust Badges */}
            <div className="pt-6 border-t border-amber-500/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs shrink-0">
                  <i className="fa-solid fa-certificate"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200">100% Tuyển Chọn</div>
                  <div className="text-[11px] text-red-200/60">Nguồn gốc chuẩn vị</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs shrink-0">
                  <i className="fa-solid fa-box-open"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200">Đóng Gói Cung Đình</div>
                  <div className="text-[11px] text-red-200/60">Sơn mài & khay lụa</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs shrink-0">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200">Giao Hỏa Tốc</div>
                  <div className="text-[11px] text-red-200/60">Đúng hẹn toàn quốc</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-xs shrink-0">
                  <i className="fa-solid fa-receipt"></i>
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-200">Hóa Đơn VAT</div>
                  <div className="text-[11px] text-red-200/60">Minh bạch đầy đủ</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Luxury Tết Hamper Carousel */}
          <div className="lg:w-5/12 relative mt-4 lg:mt-0 flex justify-center items-center px-4 sm:px-6">
            {/* Glow backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/25 via-red-500/20 to-transparent rounded-3xl blur-2xl"></div>

            {/* Carousel Outer Frame */}
            <div className="relative w-full max-w-md lg:max-w-lg p-2.5 sm:p-3.5 bg-gradient-to-b from-amber-400/30 via-red-900/50 to-amber-500/20 rounded-3xl border border-amber-400/40 shadow-2xl backdrop-blur-md">
              {/* Dynamic Badge Tag */}
              <div className="absolute -top-3.5 left-6 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5 z-20">
                <i className="fa-solid fa-crown text-red-900 text-xs"></i>
                <span>{activeSlide.badge}</span>
              </div>

              {/* Viewport Frame */}
              <div
                className="overflow-hidden rounded-2xl relative bg-[#2a0407] select-none group/slider"
                id="carousel-viewport"
              >
                {/* Slides Track */}
                <div
                  className="flex transition-transform duration-500 ease-out w-full"
                  style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
                >
                  {HERO_SLIDES.map((slide, idx) => (
                    <div
                      key={idx}
                      className="min-w-full flex items-center justify-center relative aspect-square cursor-pointer"
                      onClick={() => navigateTo('product-detail', slide.productId)}
                    >
                      <img
                        src={slide.image}
                        alt={slide.name}
                        className="w-full h-full object-cover relative z-10 drop-shadow-2xl transition-transform duration-700 ease-out group-hover/slider:scale-105"
                      />
                    </div>
                  ))}
                </div>

                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Xem quà trước"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-red-950/75 hover:bg-amber-500 text-amber-300 hover:text-red-950 border border-amber-400/50 flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-left text-sm"></i>
                </button>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Xem quà kế tiếp"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-red-950/75 hover:bg-amber-500 text-amber-300 hover:text-red-950 border border-amber-400/50 flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-right text-sm"></i>
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 transition-all duration-300 cursor-pointer rounded-full ${
                        currentSlideIndex === idx
                          ? 'w-6 bg-gradient-to-r from-amber-300 to-amber-500'
                          : 'w-2 bg-white/40 hover:bg-amber-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Dynamic Bottom Product Info Bar */}
              <div
                onClick={() => navigateTo('product-detail', activeSlide.productId)}
                className="mt-3 px-4 py-2.5 bg-red-950/90 rounded-xl border border-amber-500/30 flex flex-wrap sm:flex-row items-center justify-between gap-2 text-xs backdrop-blur-sm cursor-pointer hover:border-amber-400/60 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="text-amber-200/90 font-medium tracking-wide">
                    {activeSlide.name}
                  </span>
                </div>
                <span className="font-bold text-amber-300 whitespace-nowrap">
                  {activeSlide.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Enterprise Quick Filter Bar */}
      <div className="relative max-w-6xl mx-auto px-6 z-20 -mt-16 mb-20">
        <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-3xl gold-card-shadow p-6 lg:p-8 border border-amber-400/40 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-6">
            {/* Title Callout */}
            <div className="flex items-center space-x-4 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-amber-200 text-xl shadow-lg shadow-red-700/40 shrink-0">
                <i className="fa-solid fa-gifts"></i>
              </div>
              <div className="min-w-0">
                <h3 className="text-base lg:text-lg font-bold text-white font-serif-tet leading-snug">
                  Đặt Quà Doanh Nghiệp
                </h3>
                <p className="text-xs text-amber-200/70 truncate">Báo giá cá nhân hóa trong 15p</p>
              </div>
            </div>

            {/* Destination Selection */}
            <div className="flex flex-col w-full">
              <label className="text-xs font-bold text-amber-300/90 mb-2 flex items-center gap-1.5">
                <i className="fa-solid fa-location-dot text-amber-400 text-xs"></i>
                <span>Giao đến tỉnh / thành</span>
              </label>
              <select className="w-full text-white font-medium bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition cursor-pointer text-sm">
                <option className="bg-red-950 text-white">Hà Nội (Giao nhanh nội thành)</option>
                <option className="bg-red-950 text-white">TP. Hồ Chí Minh</option>
                <option className="bg-red-950 text-white">Đà Nẵng & Miền Trung</option>
                <option className="bg-red-950 text-white">Toàn quốc (Hỏa tốc 63 tỉnh)</option>
              </select>
            </div>

            {/* Delivery Date Selection */}
            <div className="flex flex-col w-full">
              <label className="text-xs font-bold text-amber-300/90 mb-2 flex items-center gap-1.5">
                <i className="fa-regular fa-calendar-check text-amber-400 text-xs"></i>
                <span>Thời gian giao hàng</span>
              </label>
              <select className="w-full text-white font-medium bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition cursor-pointer text-sm">
                <option className="bg-red-950 text-white">Giao ngay trong 2 giờ</option>
                <option className="bg-red-950 text-white">Trước 23 Tháng Chạp (Tết Ông Táo)</option>
                <option className="bg-red-950 text-white">Trước 28 Tháng Chạp (Tất Niên)</option>
                <option className="bg-red-950 text-white">Theo lịch hẹn riêng của doanh nghiệp</option>
              </select>
            </div>

            {/* Action CTA Button */}
            <div className="w-full flex items-end">
              <button
                onClick={() => navigateTo('catalog')}
                className="h-11 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-red-950 px-6 rounded-xl font-bold tracking-wider text-sm shadow-lg shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all w-full cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
                <span>TÌM HỘP QUÀ TẾT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
