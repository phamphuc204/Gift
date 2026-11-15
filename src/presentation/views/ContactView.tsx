'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { SHOWROOMS, FAQS } from '../../infrastructure/mockData';

export const ContactView: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    giftCategory: 'son-mai',
    quantityTier: '101-300',
    premiumPackaging: true,
    sampleDelivery: true,
    vatContract: true,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      'Cảm ơn Quý khách! Chuyên viên EleGift sẽ liên hệ báo giá chiết khấu trong vòng 15 phút.',
      'success'
    );
    setContactForm({
      name: '',
      phone: '',
      company: '',
      email: '',
      giftCategory: 'son-mai',
      quantityTier: '101-300',
      premiumPackaging: true,
      sampleDelivery: true,
      vatContract: true,
      notes: '',
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-b from-[#5c0b11] via-[#750e17] to-[#4a080c] overflow-hidden pt-8 pb-12 border-b border-amber-600/20"
        style={{
          background:
            'linear-gradient(rgba(61, 10, 11, 0.9) 0%, rgba(38, 6, 7, 0.8) 60%, transparent 100%)',
          borderBottomColor: 'rgba(245, 158, 11, 0.2)',
        }}
      >
        <div className="absolute inset-0 radial-lantern-glow pointer-events-none"></div>
        <div className="absolute top-4 left-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>
        <div className="absolute top-4 right-6 text-amber-500/20 text-5xl font-serif select-none hidden lg:block pointer-events-none">
          ❖
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-amber-200/70 mb-5">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trang Chủ
            </button>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Liên Hệ & Hỗ Trợ Doanh Nghiệp</span>
          </div>

          {/* Badge & Main Title Centered */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-semibold tracking-wider uppercase mb-3 shadow-inner">
              <span>🌸</span>
              <span>TRUNG TÂM PHỤC VỤ KHÁCH HÀNG & DOANH NGHIỆP 2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif-tet gold-gradient-text tracking-tight leading-tight mb-3">
              Kết Nối Cùng EleGift - <br className="hidden sm:inline" />
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(245,197,66,0.3)]">Đồng Hành Cùng Mùa Tri Ân</span>
            </h1>
            <p className="text-red-200/80 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
              Đội ngũ chuyên viên tư vấn quà Tết B2B & hộp quà sơn mài cao cấp của EleGift luôn sẵn sàng hỗ trợ
              quý khách hàng 24/7, mang đến giải pháp trọn gói sang trọng, thiết kế theo yêu cầu và báo giá chiết
              khấu tối ưu.
            </p>
          </div>

          {/* Quick Benefit Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <i className="fa-solid fa-headset text-xs"></i>
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80">Tư Vấn 24/7</div>
                <div className="text-xs font-bold text-white">Hotline 1900 8888</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <i className="fa-solid fa-clock text-xs"></i>
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80">Phản Hồi Siêu Tốc</div>
                <div className="text-xs font-bold text-white">Báo giá trong 15'</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <i className="fa-solid fa-box-open text-xs"></i>
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80">Mẫu Tận Nơi</div>
                <div className="text-xs font-bold text-white">Xem set mẫu trực tiếp</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <i className="fa-solid fa-file-invoice-dollar text-xs"></i>
              </div>
              <div>
                <div className="text-[10px] text-amber-300/80">Hóa Đơn & Hợp Đồng</div>
                <div className="text-xs font-bold text-white">Minh bạch 100% VAT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Channels + Showrooms + Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Contact Channels Card */}
            <div className="p-5 rounded-2xl bg-[#4A0D0D]/75 border border-amber-500/20 shadow-xl backdrop-blur-sm gold-border gold-card-shadow">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-500/15">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-red-950 text-xs shadow-md">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-tet text-white">Đường Dây Nóng Hỗ Trợ</h3>
                  <p className="text-xs text-amber-300/80">Phục vụ liên tục từ 08:00 - 21:30 cả thứ 7 & CN</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                {/* Hotline Item */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-red-900/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-phone-volume text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold">
                      Tổng Đài Khách Hàng Doanh Nghiệp B2B
                    </div>
                    <div className="text-sm font-bold text-amber-300">
                      1900 8888 <span className="text-[11px] font-normal text-red-200/70">(Bấm phím 1)</span>
                    </div>
                    <div className="text-xs text-red-200/70">
                      Hotline VIP Trực Tiếp: <span className="text-white font-medium">0912 345 678</span>
                    </div>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-red-900/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-envelope text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold">
                      Email Tiếp Nhận Dự Án & Báo Giá
                    </div>
                    <div className="text-xs font-bold text-white hover:text-amber-300 transition-colors">
                      b2b@elegift.vn
                    </div>
                    <div className="text-[11px] text-red-200/70">Bộ phận CSKH: cskh@elegift.vn</div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3 p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15">
                  <div className="w-6 h-6 rounded-lg bg-red-900/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-business-time text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold">
                      Thời Gian Làm Việc Mùa Tết
                    </div>
                    <div className="text-xs font-semibold text-white">Thứ 2 - Chủ Nhật: 08:00 - 21:30</div>
                    <div className="text-[11px] text-amber-400/90 italic">
                      Trực hotline xử lý đơn hàng khẩn đến 29 Tết
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showroom List Card */}
            <div className="p-5 rounded-2xl bg-[#4A0D0D]/75 border border-amber-500/20 shadow-xl backdrop-blur-sm gold-border gold-card-shadow">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-amber-500/15">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-red-950 text-xs shadow-md">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif-tet text-white">
                    Hệ Thống Showroom Trải Nghiệm
                  </h3>
                  <p className="text-xs text-amber-300/80">Kính mời Quý khách ghé thăm & thưởng trà nếm mứt</p>
                </div>
              </div>

              <div className="space-y-3">
                {SHOWROOMS.map((sr) => (
                  <div
                    key={sr.id}
                    className="p-3 rounded-xl bg-red-950/60 border border-amber-500/15 hover:border-amber-400/40 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
                        {sr.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-400/20">
                        {sr.badge}
                      </span>
                    </div>
                    <p className="text-xs text-red-100/90 leading-relaxed mb-1">{sr.address}</p>
                    <div className="text-[11px] text-amber-300/80 flex items-center gap-3">
                      <span>
                        <i className="fa-solid fa-phone text-[10px] mr-1"></i>
                        {sr.phone}
                      </span>
                      <span>•</span>
                      <span>{sr.features}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Visual Frame */}
            <div className="p-3.5 rounded-2xl bg-[#4A0D0D]/75 border border-amber-500/20 shadow-xl overflow-hidden relative group">
              <div className="h-40 w-full rounded-xl bg-[#2e0507] border border-amber-500/20 flex flex-col items-center justify-center text-center p-3.5 relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                ></div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-sm mb-1.5 relative z-10 animate-bounce">
                  <i className="fa-solid fa-map-location-dot"></i>
                </div>
                <h4 className="text-xs font-bold text-white relative z-10 mb-0.5">
                  Bản Đồ Chỉ Đường Trực Tuyến
                </h4>
                <p className="text-[11px] text-amber-200/70 relative z-10 max-w-xs mb-1.5">
                  Tìm lộ trình ngắn nhất đến Showroom EleGift gần bạn tại Hà Nội, TP.HCM & Đà Nẵng
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-200 underline relative z-10"
                >
                  <span>Mở Google Maps chỉ đường</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Luxury Consultation & Quote Request Form (7 Cols) */}
          <div className="lg:col-span-7" id="consultation-form">
            <div className="p-5 sm:p-7 rounded-2xl bg-[#4A0D0D]/90 border border-amber-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden gold-border gold-card-shadow">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Form Header */}
              <div className="mb-6">
                <span className="text-[11px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 mb-1.5">
                  <i className="fa-solid fa-sparkles text-[10px]"></i> Dành Riêng Khách Hàng Doanh Nghiệp & Cá Nhân
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-tet text-white tracking-tight">
                  Gửi Yêu Cầu Tư Vấn & Nhận Báo Giá Chiết Khấu
                </h2>
                <p className="text-xs text-red-200/80 mt-1.5 leading-relaxed">
                  Điền thông tin dự án quà Tết bên dưới, chuyên viên EleGift sẽ liên hệ phản hồi báo giá chiết khấu bậc thang và gửi bộ mẫu thực tế trong vòng{' '}
                  <span className="text-amber-300 font-semibold">15 phút</span>.
                </p>
              </div>

              {/* Form Fields */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Họ và Tên Quý Khách <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/60 text-xs">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full pl-8 pr-3 py-2 bg-red-950/70 border border-amber-500/25 rounded-xl text-white placeholder-red-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Số Điện Thoại / Zalo <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/60 text-xs">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="0912 xxx xxx"
                        className="w-full pl-8 pr-3 py-2 bg-red-950/70 border border-amber-500/25 rounded-xl text-white placeholder-red-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Company Name & Corporate Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Tên Doanh Nghiệp / Tổ Chức <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/60 text-xs">
                        <i className="fa-solid fa-building"></i>
                      </div>
                      <input
                        type="text"
                        required
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Tập đoàn / Công ty ABC..."
                        className="w-full pl-8 pr-3 py-2 bg-red-950/70 border border-amber-500/25 rounded-xl text-white placeholder-red-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Email Nhận Catalogue & Báo Giá
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-400/60 text-xs">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="contact@company.com"
                        className="w-full pl-8 pr-3 py-2 bg-red-950/70 border border-amber-500/25 rounded-xl text-white placeholder-red-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Select Gift Type & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Chọn Loại Quà Quan Tâm <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={contactForm.giftCategory}
                      onChange={(e) => setContactForm({ ...contactForm, giftCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-[#2d0507] border border-amber-500/25 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer"
                    >
                      <option value="son-mai">Bộ Sưu Tập Sơn Mài Đinh Mùi 2027 (Cao Cấp Nhất)</option>
                      <option value="truyen-thong">Hộp Quà Tết Truyền Thống & Trà Thượng Hạng</option>
                      <option value="ruou-vang">Set Rượu Vang Nhập Khẩu & Hạt Dinh Dưỡng</option>
                      <option value="yen-sam">Hộp Quà Yến Sào - Nhân Sâm Bồi Bổ Sức Khỏe</option>
                      <option value="custom">Thiết Kế Hộp Quà Theo Yêu Cầu Riêng (Custom)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                      Số Lượng Dự Kiến (Nhận Chiết Khấu) <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={contactForm.quantityTier}
                      onChange={(e) => setContactForm({ ...contactForm, quantityTier: e.target.value })}
                      className="w-full px-3 py-2 bg-[#2d0507] border border-amber-500/25 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all cursor-pointer"
                    >
                      <option value="10-30">10 - 30 Hộp (Chiết khấu 10%)</option>
                      <option value="31-50">31 - 50 Hộp (Chiết khấu 15%)</option>
                      <option value="51-100">51 - 100 Hộp (Chiết khấu 18% + Miễn phí vận chuyển)</option>
                      <option value="101-300">101 - 300 Hộp (Chiết khấu 20% + Thiệp chúc)</option>
                      <option value="300+">Trên 300 Hộp (Chiết khấu đặc quyền đến 25%)</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Perks Checkboxes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90">
                    Đặc Quyền Doanh Nghiệp Cần Hỗ Trợ:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-red-100">
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15 cursor-pointer hover:border-amber-400/40">
                      <input
                        type="checkbox"
                        checked={contactForm.premiumPackaging}
                        onChange={(e) => setContactForm({ ...contactForm, premiumPackaging: e.target.checked })}
                        className="rounded border-amber-500/30 text-amber-500 focus:ring-0 bg-transparent"
                      />
                      <span className="text-[11px] sm:text-xs">Đóng gói sơn mài & lụa</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15 cursor-pointer hover:border-amber-400/40">
                      <input
                        type="checkbox"
                        checked={contactForm.sampleDelivery}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, sampleDelivery: e.target.checked })
                        }
                        className="rounded border-amber-500/30 text-amber-500 focus:ring-0 bg-transparent"
                      />
                      <span className="text-[11px] sm:text-xs">Mang mẫu thực tế đến tận nơi</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15 cursor-pointer hover:border-amber-400/40">
                      <input
                        type="checkbox"
                        checked={contactForm.vatContract}
                        onChange={(e) => setContactForm({ ...contactForm, vatContract: e.target.checked })}
                        className="rounded border-amber-500/30 text-amber-500 focus:ring-0 bg-transparent"
                      />
                      <span className="text-[11px] sm:text-xs">Xuất hóa đơn VAT & Hợp đồng</span>
                    </label>
                  </div>
                </div>

                {/* Row 5: Notes */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-amber-200/90 mb-1">
                    Ghi Chú Yêu Cầu Riêng (Ngân sách, thời gian nhận hàng, địa điểm phân tán...)
                  </label>
                  <textarea
                    rows={3}
                    value={contactForm.notes}
                    onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                    placeholder="Ví dụ: Ngân sách khoảng 1.200.000đ - 1.800.000đ/set. Cần giao trước ngày 20 Tháng Chạp về 3 chi nhánh Hà Nội, TP.HCM và Hải Phòng..."
                    className="w-full px-3 py-2 bg-red-950/70 border border-amber-500/25 rounded-xl text-white placeholder-red-300/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm tracking-wider uppercase text-red-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                    <span>GỬI YÊU CẦU BÁO GIÁ NHANH (PHẢN HỒI TRONG 15 PHÚT)</span>
                  </button>
                </div>

                {/* Privacy Guarantee */}
                <div className="text-center text-[10px] sm:text-[11px] text-amber-300/70 flex items-center justify-center gap-1.5 pt-0.5">
                  <i className="fa-solid fa-lock text-[10px]"></i>
                  <span>Thông tin của Quý công ty được cam kết bảo mật 100% theo quy chuẩn B2B chuyên nghiệp.</span>
                </div>
              </form>
            </div>

            {/* Corporate Assurances Grid */}
            <div className="mt-5 p-5 rounded-2xl bg-[#4A0D0D]/75 border border-amber-500/20 shadow-xl backdrop-blur-sm gold-border gold-card-shadow relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/15">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-red-950 text-xs shadow-md">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold font-serif-tet text-white tracking-wide uppercase">
                      Đặc Quyền & Cam Kết Doanh Nghiệp 2027
                    </h3>
                    <p className="text-[10px] text-amber-300/80">Quy chuẩn dịch vụ quà tặng Tết B2B chuyên nghiệp số 1</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <i className="fa-solid fa-sparkles text-[9px]"></i> 100% Yên Tâm
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 flex items-start gap-2.5 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-box-open text-xs"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] mb-0.5">Mẫu Thực Tế Tận Nơi</div>
                    <p className="text-[10px] text-red-200/70 leading-relaxed">
                      Gửi hộp mẫu thực tế & catalogue tận văn phòng trong 24h hoàn toàn miễn phí.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 flex items-start gap-2.5 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-box-open text-xs"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] mb-0.5">Đóng Gói Sơn Mài Thủ Công</div>
                    <p className="text-[10px] text-red-200/70 leading-relaxed">
                      Chế tác sơn mài đa lớp truyền thống và khay lụa tơ tằm nâng niu từng phẩm vật.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 flex items-start gap-2.5 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-file-invoice-dollar text-xs"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] mb-0.5">Hóa Đơn VAT & Hợp Đồng</div>
                    <p className="text-[10px] text-red-200/70 leading-relaxed">
                      Đầy đủ hợp đồng kinh tế, biên bản nghiệm thu và hóa đơn VAT điện tử trong ngày.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-red-950/50 border border-amber-500/15 flex items-start gap-2.5 hover:border-amber-400/40 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <i className="fa-solid fa-shield-halved text-xs"></i>
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px] mb-0.5">Bảo Hiểm Hàng Hóa 100%</div>
                    <p className="text-[10px] text-red-200/70 leading-relaxed">
                      Cam kết đổi trả 1:1 ngay lập tức nếu vỡ hỏng do vận chuyển giao tận nơi toàn quốc.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-gradient-to-r from-red-950/80 to-[#2d0507] p-2.5 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-2 text-center sm:text-left">
                  <span className="animate-pulse text-amber-400 text-sm">💎</span>
                  <div className="text-[11px] text-red-100">
                    <span className="text-amber-300 font-semibold">Đơn hàng số lượng lớn &gt; 500 hộp?</span>
                    <span className="text-red-200/70 block sm:inline sm:ml-1">
                      Hỗ trợ thiết kế độc quyền theo nhận diện thương hiệu.
                    </span>
                  </div>
                </div>
                <a
                  href="tel:0912345678"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 to-yellow-500 text-red-950 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                >
                  <i className="fa-solid fa-phone text-[10px]"></i>
                  <span>VIP: 0912 345 678</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enterprise FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border-t border-amber-500/15 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
            Hỏi Đáp Nhanh Dành Cho Doanh Nghiệp
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-tet text-white mt-1 gold-gradient-text">
            Chính Sách & Quy Trình Đặt Hàng Tết 2027
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq) => (
            <div key={faq.id} className="p-5 rounded-xl bg-[#4A0D0D]/60 border border-amber-500/15">
              <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center shrink-0">
                  {faq.id}
                </span>
                <span>{faq.question}</span>
              </h4>
              <p className="text-xs text-red-200/80 leading-relaxed pl-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
