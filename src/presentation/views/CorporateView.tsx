'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { IMAGES, PARTNERS } from '../../infrastructure/mockData';

export const CorporateView: React.FC = () => {
  const { navigateTo, showToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    company: '',
    email: '',
    quantity: '50 - 100 set quà',
    budget: '1.000.000đ - 1.800.000đ',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      `Cảm ơn Quý doanh nghiệp ${formData.company || ''}! Chuyên viên EleGift sẽ liên hệ và đem mẫu hộp qua trong 15 phút.`,
      'success'
    );
    setFormData({
      fullName: '',
      phone: '',
      company: '',
      email: '',
      quantity: '50 - 100 set quà',
      budget: '1.000.000đ - 1.800.000đ',
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section for Corporate Gifts */}
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
        <div className="absolute top-10 right-16 text-amber-500/20 text-6xl font-serif select-none hidden lg:block pointer-events-none">
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
            <span className="text-amber-300 font-semibold">Quà Doanh Nghiệp Tết Đinh Mùi 2027</span>
          </div>

          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-amber-400/40 shadow-inner mb-3 backdrop-blur-sm">
              <span className="text-xs">🏮</span>
              <span className="text-[11px] lg:text-xs font-semibold tracking-widest text-amber-300 uppercase">
                GIẢI PHÁP QUÀ TẾT DOANH NGHIỆP TOÀN DIỆN 2027
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight font-serif-tet gold-gradient-text">
              Nâng Tầm Vị Thế Thương Hiệu{' '}
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(245,197,66,0.3)]">
                Cùng EleGift
              </span>
            </h1>
            <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed">
              Bộ sưu tập quà tặng Tết B2B thiết kế riêng cho Tập đoàn & Doanh nghiệp. Tinh tế từ hộp gỗ mộc khắc
              chữ, sơn mài thượng hạng đến sản vật trứ danh, khẳng định dấu ấn tri ân trọn vẹn.
            </p>
          </div>

          {/* 4 Golden Commitments for B2B */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-5xl mx-auto pt-6 border-t border-amber-500/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-percent"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Chiết Khấu Đến 25%</div>
                <div className="text-[10px] text-red-200/60">Bậc thang theo số lượng</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Đóng Gói Sơn Mài Cao Cấp</div>
                <div className="text-[10px] text-red-200/60">Lót lụa tơ tằm & thiệp riêng</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Giao Hàng 63 Tỉnh Thành</div>
                <div className="text-[10px] text-red-200/60">Phân tán hỏa tốc đúng hẹn</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Hợp Đồng & VAT</div>
                <div className="text-[10px] text-red-200/60">Minh bạch pháp lý 100%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 z-20 space-y-16">
        {/* Section: Customization Services (3 Columns) */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-2">
              ĐẶC QUYỀN DOANH NGHIỆP
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-tet text-white">
              Dịch Vụ Cá Nhân Hóa Doanh Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/75 mt-2">
              Mỗi hộp quà được tinh chỉnh chỉn chu, phản ánh đẳng cấp thương hiệu và tấm lòng trân quý đối tác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-2xl border border-amber-400/30 overflow-hidden gold-card-shadow group hover:border-amber-300 transition-all duration-300 flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-[#2a0407]">
                <img
                  src={IMAGES.boxGoldLeaf}
                  alt="Nghệ Thuật Đóng Gói Sơn Mài & Lụa Tơ Tằm"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                  CHẾ TÁC THỦ CÔNG
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif-tet group-hover:text-amber-300 transition-colors mb-2">
                    Nghệ Thuật Đóng Gói Sơn Mài & Lụa Tơ Tằm
                  </h3>
                  <p className="text-xs text-amber-100/80 leading-relaxed">
                    Kỹ thuật sơn mài truyền thống 7 lớp phủ bóng mờ cùng khay lụa tơ tằm nâng đỡ sản vật, tạo
                    nên tác phẩm quà tặng vương giả xứng tầm doanh nghiệp.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                  <span>Tiêu chuẩn đóng gói hoàng gia</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-2xl border border-amber-400/30 overflow-hidden gold-card-shadow group hover:border-amber-300 transition-all duration-300 flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-[#2a0407]">
                <img
                  src={IMAGES.boxEggshell}
                  alt="Thiết Kế Hộp & Khay Quà May Đo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                  MAY ĐO THEO YÊU CẦU
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif-tet group-hover:text-amber-300 transition-colors mb-2">
                    Thiết Kế Hộp & Khay Quà May Đo
                  </h3>
                  <p className="text-xs text-amber-100/80 leading-relaxed">
                    Tùy biến khay lót lụa tơ tằm, nhung dạ cao cấp, phối hợp bảng màu theo chuẩn bộ nhận diện
                    thương hiệu công ty (CI/Brand Guidelines).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                  <span>Chuẩn bộ nhận diện thương hiệu</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-2xl border border-amber-400/30 overflow-hidden gold-card-shadow group hover:border-amber-300 transition-all duration-300 flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-[#2a0407]">
                <img
                  src={IMAGES.boxDetailedSet}
                  alt="Phối Trộn Sản Vật Theo Yêu Cầu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                  TUYỂN CHỌN THƯỢNG HẠNG
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif-tet group-hover:text-amber-300 transition-colors mb-2">
                    Phối Trộn Sản Vật Theo Yêu Cầu
                  </h3>
                  <p className="text-xs text-amber-100/80 leading-relaxed">
                    Linh hoạt kết hợp rượu vang Grand Cru danh tiếng, đông trùng hạ thảo, tổ yến đảo tự nhiên,
                    trà Shan tuyết cổ thụ và các loại hạt dinh dưỡng organic chuẩn vị.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                  <span>100% chứng nhận nguồn gốc xuất xứ</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Gift Packages by Budget */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-2">
              PHÂN KHÚC NGÂN SÁCH LINH HOẠT
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-tet text-white">
              Các Gói Quà Tết Theo Ngân Sách Doanh Nghiệp
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/75 mt-2">
              Tối ưu chi phí, nâng tầm giá trị món quà tặng cán bộ nhân viên, đối tác kinh doanh & khách hàng trọng yếu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Package 1 */}
            <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-3xl border border-amber-500/30 p-6 lg:p-7 gold-card-shadow flex flex-col justify-between relative hover:border-amber-300 transition-all duration-300">
              <div>
                <div className="text-xs font-bold tracking-wider text-amber-400 uppercase mb-2">
                  GÓI NHÂN VIÊN & ĐẠI LÝ
                </div>
                <h3 className="text-xl font-black font-serif-tet text-white mb-2">Gói Khởi Sắc</h3>
                <div className="text-2xl font-black text-amber-300 font-serif-tet mb-3">
                  650.000₫ - 950.000₫
                </div>
                <p className="text-xs text-amber-100/80 leading-relaxed mb-6">
                  Lựa chọn lý tưởng nhằm tri ân cán bộ nhân viên công ty, chuỗi nhà phân phối và các đại lý kinh
                  doanh toàn quốc.
                </p>
                <ul className="space-y-3 text-xs text-amber-100/90 pb-6 border-b border-amber-500/20">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Hộp cứng cao cấp ép kim họa tiết hoa văn Tết truyền thống</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Trà hoa cúc, hạt điều Bình Phước, mứt sen Huế & nho Chile</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Miễn phí khay lụa tơ tằm & túi xách cao cấp từ 50 set</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Tặng kèm thiệp chúc Tết in lời chúc riêng của công ty</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href="#b2b-form"
                  className="w-full py-2.5 px-4 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Yêu Cầu Báo Giá Gói Này</span>
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </a>
              </div>
            </div>

            {/* Package 2 (Featured) */}
            <div className="bg-gradient-to-b from-[#4d090e] via-[#3a060a] to-[#250305] rounded-3xl border-2 border-amber-400 p-6 lg:p-7 gold-card-shadow flex flex-col justify-between relative transform lg:-translate-y-2 hover:border-amber-300 transition-all duration-300 shadow-amber-500/15">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md whitespace-nowrap">
                ĐƯỢC CHỌN NHIỀU NHẤT
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider text-amber-400 uppercase mb-2">
                  GÓI ĐỐI TÁC THÂN THIẾT
                </div>
                <h3 className="text-xl font-black font-serif-tet text-white mb-2">Gói Hưng Thịnh</h3>
                <div className="text-2xl font-black text-amber-300 font-serif-tet mb-3">
                  1.200.000₫ - 1.850.000₫
                </div>
                <p className="text-xs text-amber-100/80 leading-relaxed mb-6">
                  Thiết kế rương gỗ mộc tinh tế sang trọng, dành tặng đối tác chiến lược thân thiết và đội ngũ
                  cấp quản lý.
                </p>
                <ul className="space-y-3 text-xs text-amber-100/90 pb-6 border-b border-amber-500/20">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Rương gỗ khắc laser tên thương hiệu tinh tế, khóa đồng cổ</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Rượu vang đỏ Bordeaux, Trà Shan Tuyết cổ thụ & yến chưng sâm</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Hạt Macca sấy nứt vỏ, hạnh nhân Mỹ rang bơ thượng hạng</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Khay lót lụa tơ tằm theo màu sắc thương hiệu chỉ định</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href="#b2b-form"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 font-black text-xs uppercase tracking-wide hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Yêu Cầu Báo Giá Gói Này</span>
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </a>
              </div>
            </div>

            {/* Package 3 */}
            <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-3xl border border-amber-500/30 p-6 lg:p-7 gold-card-shadow flex flex-col justify-between relative hover:border-amber-300 transition-all duration-300">
              <div>
                <div className="text-xs font-bold tracking-wider text-amber-400 uppercase mb-2">
                  GÓI VIP & CHỦ TỊCH / CEO
                </div>
                <h3 className="text-xl font-black font-serif-tet text-white mb-2">Gói Đại Cát Hoàng Gia</h3>
                <div className="text-2xl font-black text-amber-300 font-serif-tet mb-3">
                  2.500.000₫ - 5.000.000₫+
                </div>
                <p className="text-xs text-amber-100/80 leading-relaxed mb-6">
                  Hộp sơn mài thủ công dát vàng thượng hạng, đặc quyền quý phái dâng tặng khách hàng VIP, Chủ tịch & CEO.
                </p>
                <ul className="space-y-3 text-xs text-amber-100/90 pb-6 border-b border-amber-500/20">
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Hộp sơn mài thủ công truyền thống 12 lớp bóng gương dát vàng</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Tổ yến đảo nguyên tổ, đông trùng hạ thảo & hồng sâm 6 năm tuổi</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Rượu vang Gran Reserva phiên bản giới hạn khắc tên người nhận</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <i className="fa-solid fa-circle-check text-amber-400 text-xs mt-0.5 shrink-0"></i>
                    <span>Giao tận tay bảo mật bằng chuyên xa riêng của EleGift</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <a
                  href="#b2b-form"
                  className="w-full py-2.5 px-4 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Yêu Cầu Báo Giá Gói Này</span>
                  <i className="fa-solid fa-arrow-right text-[11px]"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: B2B Quote Form & Sample Request */}
        <section
          className="bg-gradient-to-r from-[#5c0b11] via-[#750e17] to-[#3a060a] rounded-3xl p-6 lg:p-12 border border-amber-400/40 gold-card-shadow"
          id="b2b-form"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Intro Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-400/30 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                <i className="fa-solid fa-bolt text-amber-400 text-xs"></i> BÁO GIÁ NHANH TRONG 15 PHÚT
              </div>
              <h2 className="text-2xl lg:text-3xl font-black font-serif-tet text-white leading-tight">
                Đăng Ký Nhận Báo Giá & Mẫu Hộp Quà Tết Tận Nơi
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                Chuyên viên tư vấn doanh nghiệp của EleGift sẽ mang trực tiếp hộp quà mẫu, chất liệu sơn mài và
                mẫu sản vật đến văn phòng quý công ty thẩm định chất lượng thực tế.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-amber-200">
                  <i className="fa-solid fa-box-open text-amber-400 w-4 text-center"></i>
                  <span>Xem hộp mẫu thực tế miễn phí tại văn phòng</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-amber-200">
                  <i className="fa-solid fa-file-pdf text-amber-400 w-4 text-center"></i>
                  <span>Nhận phối cảnh 3D set quà Tết theo nhận diện doanh nghiệp</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-amber-200">
                  <i className="fa-solid fa-headset text-amber-400 w-4 text-center"></i>
                  <span>
                    Tư vấn viên riêng hỗ trợ trực tiếp 24/7: <strong>1900 8888</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7 bg-[#250305]/90 border border-amber-500/30 rounded-2xl p-6 lg:p-8 backdrop-blur-md">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Họ và Tên Phụ Trách *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition placeholder:text-amber-200/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Số Điện Thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition placeholder:text-amber-200/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Tên Doanh Nghiệp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Tập đoàn / Công ty..."
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition placeholder:text-amber-200/40"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Email Nhận Báo Giá *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition placeholder:text-amber-200/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Số Lượng Dự Kiến
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition cursor-pointer"
                    >
                      <option className="bg-red-950 text-white">50 - 100 set quà</option>
                      <option className="bg-red-950 text-white">100 - 300 set quà</option>
                      <option className="bg-red-950 text-white">300 - 500 set quà</option>
                      <option className="bg-red-950 text-white">Trên 500 set (Chiết khấu VIP 25%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-amber-200 mb-1.5">
                      Ngân Sách Dự Kiến / Set
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full text-xs text-white bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2.5 outline-none focus:border-amber-400 transition cursor-pointer"
                    >
                      <option className="bg-red-950 text-white">650.000đ - 1.000.000đ</option>
                      <option className="bg-red-950 text-white">1.000.000đ - 1.800.000đ</option>
                      <option className="bg-red-950 text-white">1.800.000đ - 3.000.000đ</option>
                      <option className="bg-red-950 text-white">Trên 3.000.000đ (Dòng Sơn Mài VIP)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-5 rounded-full font-bold text-xs uppercase tracking-wider text-red-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                    <span>Gửi Yêu Cầu & Đăng Ký Xem Mẫu Quà Thật</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Đang tải tài liệu Catalogue B2B 2027 (PDF)...', 'info')}
                    className="w-full sm:w-auto py-3 px-5 rounded-full font-semibold text-xs text-amber-200 border border-amber-400/40 hover:bg-amber-500/10 hover:border-amber-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <i className="fa-solid fa-file-arrow-down text-xs text-amber-400"></i>
                    <span>Tải Catalogue B2B 2027 (PDF)</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Section: Partners / Trust Logos */}
        <section className="border-t border-amber-500/20 pt-10">
          <div className="text-center mb-7">
            <span className="text-[11px] font-bold text-amber-300/80 uppercase tracking-widest">
              ĐỐI TÁC DOANH NGHIỆP ĐỒNG HÀNH TIÊU BIỂU
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif-tet text-white mt-1">
              Hơn 1,200+ Doanh Nghiệp & Tập Đoàn Tin Chọn EleGift
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="h-14 rounded-xl bg-red-950/40 border border-amber-500/20 flex items-center justify-center px-4 hover:border-amber-400/50 transition-colors"
              >
                <span className="font-black text-amber-200/90 text-sm tracking-widest font-serif-tet">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
