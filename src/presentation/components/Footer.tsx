'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../application/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="relative bg-[#140203] border-t border-amber-500/20 pt-16 pb-12 text-gray-300 text-sm z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-amber-500/15">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 flex items-center justify-center text-red-950 shadow-md">
                <i className="fa-solid fa-gift text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white font-serif-tet tracking-tight">EleGift</span>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
                  Quà Tết Cao Cấp Đinh Mùi 2027
                </span>
              </div>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed">
              Đơn vị tiên phong sáng tạo bộ sưu tập quà Tết sơn mài, gốm mộc và phong vị thảo mộc tự nhiên thượng hạng cho hàng ngàn tập đoàn, doanh nghiệp Việt.
            </p>
            <div className="pt-1">
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                Tổng Đài Tư Vấn Doanh Nghiệp:
              </div>
              <div className="text-lg font-black text-white font-serif-tet flex items-center gap-2">
                <i className="fa-solid fa-phone text-amber-400 text-sm"></i>
                <a href="tel:19008888" className="hover:text-amber-300 transition">1900 8888</a>
                <span className="text-xs text-amber-400/70 font-sans font-normal">• 0912 345 678</span>
              </div>
            </div>
          </div>

          {/* Showroom System */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-amber-400 text-xs"></i>
              <span>Hệ Thống Showroom</span>
            </h4>
            <ul className="space-y-3 text-xs text-amber-100/80">
              <li className="leading-relaxed">
                <strong className="text-white block font-medium">Hà Nội:</strong>
                88 Phố Huế, Q. Hai Bà Trưng
              </li>
              <li className="leading-relaxed">
                <strong className="text-white block font-medium">TP. Hồ Chí Minh:</strong>
                126 Nguyễn Thị Minh Khai, Phường 6, Quận 3
              </li>
              <li className="leading-relaxed">
                <strong className="text-white block font-medium">Đà Nẵng:</strong>
                45 Bạch Đằng, Q. Hải Châu
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-amber-400 text-xs"></i>
              <span>Chính Sách & Hỗ Trợ</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-amber-100/80">
              <li>
                <button onClick={() => navigateTo('corporate')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Chính sách đặt cọc & chiết khấu B2B
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('corporate')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Đóng gói hoàng gia & thiệp chúc mừng riêng
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Vận chuyển hỏa tốc & giao nhiều điểm
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Cam kết chất lượng & đổi trả 100%
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-amber-300 transition-colors text-left cursor-pointer">
                  Chính sách bảo mật thông tin dự án
                </button>
              </li>
            </ul>
          </div>

          {/* Working Hours & Payment */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <i className="fa-regular fa-clock text-amber-400 text-xs"></i>
              <span>Thời Gian Phục Vụ</span>
            </h4>
            <p className="text-xs text-amber-100/80 leading-relaxed mb-4">
              Từ thứ Hai đến Chủ Nhật: <span className="text-white font-semibold">08:00 - 21:30</span>
              <br />
              <span className="text-amber-300 font-medium">(Phục vụ xuyên Tết Nguyên Đán 2027)</span>
            </p>
            <div className="pt-2">
              <div className="text-xs font-bold text-amber-300/90 uppercase tracking-wider mb-2">
                Phương Thức Thanh Toán:
              </div>
              <div className="flex flex-wrap items-center gap-2 text-base text-amber-200/90">
                <span className="px-2.5 py-1 rounded bg-red-950/80 border border-amber-500/30 text-xs font-bold">
                  VISA / MASTER
                </span>
                <span className="px-2.5 py-1 rounded bg-red-950/80 border border-amber-500/30 text-xs font-bold">
                  CHUYỂN KHOẢN
                </span>
                <span className="px-2.5 py-1 rounded bg-red-950/80 border border-amber-500/30 text-xs font-bold">
                  VNPAY-QR
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-amber-200/60 text-center md:text-left">
          <p>© 2027 EleGift. Bản quyền thuộc về Công ty Quà Tặng Cao Cấp EleGift Việt Nam.</p>
          <p className="text-amber-300/80 font-medium">Tuyệt tác quà tết cổ truyền & phong vị tân xuân Đinh Mùi.</p>
        </div>
      </div>
    </footer>
  );
};
