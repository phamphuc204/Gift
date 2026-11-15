'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { PRODUCTS } from '../../infrastructure/mockData';
import { Product } from '../../domain/types';
import { formatVND } from '../../domain/pricing';

export const AIGiftModal: React.FC = () => {
  const { isAIModalOpen, closeAIModal, navigateTo, addToCart } = useApp();
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [aiError, setAiError] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('vip');
  const [budget, setBudget] = useState<string>('2000-3500');
  const [priority, setPriority] = useState<string>('luxury-box');
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(() => PRODUCTS[0]);
  const [reason, setReason] = useState<string>(
    'Hộp sơn mài thủ công 54 công đoạn, cẩn nhũ vàng 24K biểu trưng cho sự tôn kính và phát tài phát lộc đầu xuân.'
  );

  if (!isAIModalOpen) return null;

  const handleGenerate = () => {
    let matched: Product = PRODUCTS[0];
    let note = '';

    if (budget === 'under-1000') {
      matched = PRODUCTS.find((p) => p.id === 'doan-vien-am-ap') || PRODUCTS[6];
      note = 'Lựa chọn ngọt ngào, tinh tế với nông sản OCOP Việt Nam, mứt quả sấy dẻo và trà thảo mộc thanh nhiệt cho nhân sự & đại lý.';
    } else if (budget === '1000-2000') {
      if (recipient === 'employee') {
        matched = PRODUCTS.find((p) => p.id === 'hoa-mai-nghenh-xuan') || PRODUCTS[4];
        note = 'Thiết kế hộp mộc hoa mai ấm áp, phối cùng trà Ô Long và hạt dinh dưỡng cao cấp, tối ưu ngân sách công ty.';
      } else {
        matched = PRODUCTS.find((p) => p.id === 'van-su-khoi-sac') || PRODUCTS[0];
        note = 'Mẫu hộp sơn mài đỏ phú quý bán chạy nhất mùa Tết Đinh Mùi, phối ngẫu Vang Bordeaux và yến sào bồi bổ.';
      }
    } else if (budget === '2000-3500') {
      if (recipient === 'vip') {
        matched = PRODUCTS.find((p) => p.id === 'long-phung-hoa-minh') || PRODUCTS[1];
        note = 'Rương gỗ mun khắc laser độc bản, rượu Single Malt Whisky 18 năm thượng hạng dâng tặng đối tác chiến lược và ban điều hành.';
      } else {
        matched = PRODUCTS.find((p) => p.id === 'luc-giac-dai-cat') || PRODUCTS[5];
        note = 'Hộp sơn mài lục giác hoàng gia với hồng sâm 6 năm tuổi và đông trùng hạ thảo tự nhiên quý giá.';
      }
    } else {
      matched = PRODUCTS.find((p) => p.id === 'cuu-long-trieu-nhat') || PRODUCTS[11];
      note = 'Đỉnh cao sơn mài dát vàng 24K 12 lớp bóng gương với vang niên vụ cổ dành riêng cho Chủ tịch & CEO.';
    }

    setRecommendedProduct(matched);
    setReason(note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#3d080c] via-[#280507] to-[#1a0405] border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden gold-card-shadow">
        {/* Decorative corner glows */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-3 left-5 text-amber-500/20 text-3xl font-serif select-none pointer-events-none">❖</div>

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center text-red-950 font-black text-lg shadow-md shadow-amber-500/30">
              ✨
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                TRỢ LÝ THÔNG MINH ELEGIFT 2027
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif-tet gold-gradient-text">
                AI Chọn Quà Tết Theo Ngân Sách & Yêu Cầu
              </h3>
            </div>
          </div>
          <button
            onClick={closeAIModal}
            aria-label="Đóng cửa sổ"
            className="w-8 h-8 rounded-full bg-red-950/70 border border-amber-500/30 text-amber-300 hover:text-white hover:bg-red-900 transition flex items-center justify-center cursor-pointer text-sm"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Selection Controls */}
        <div className="py-4 space-y-4 text-xs">
          {/* 1. Recipient */}
          <div>
            <label className="block text-[11px] font-bold text-amber-200 uppercase tracking-wider mb-1.5">
              1. Quý khách muốn tặng cho ai?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'vip', label: 'Khách Hàng VIP / C-Level' },
                { id: 'partner', label: 'Đối Tác Kinh Doanh' },
                { id: 'employee', label: 'Cán Bộ Nhân Viên' },
                { id: 'family', label: 'Ngoại Giao / Gia Đình' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRecipient(item.id)}
                  className={`p-2 rounded-xl text-center transition cursor-pointer border ${
                    recipient === item.id
                      ? 'bg-amber-400 text-red-950 font-bold border-amber-300 shadow'
                      : 'bg-red-950/60 text-amber-100/80 border-amber-500/20 hover:border-amber-400/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Budget Range */}
          <div>
            <label className="block text-[11px] font-bold text-amber-200 uppercase tracking-wider mb-1.5">
              2. Ngân sách dự kiến cho mỗi phần quà:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'under-1000', label: 'Dưới 1.000.000₫' },
                { id: '1000-2000', label: '1.000.000₫ - 2.000.000₫' },
                { id: '2000-3500', label: '2.000.000₫ - 3.500.000₫' },
                { id: 'above-3500', label: 'Trên 3.500.000₫ (VIP)' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBudget(item.id)}
                  className={`p-2 rounded-xl text-center transition cursor-pointer border ${
                    budget === item.id
                      ? 'bg-amber-400 text-red-950 font-bold border-amber-300 shadow'
                      : 'bg-red-950/60 text-amber-100/80 border-amber-500/20 hover:border-amber-400/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Special Requirement */}
          <div>
            <label className="block text-[11px] font-bold text-amber-200 uppercase tracking-wider mb-1.5">
              3. Ưu tiên đặc quyền doanh nghiệp:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'luxury-box', label: 'Hộp Sơn Mài Cao Cấp' },
                { id: 'shipping', label: 'Giao Toàn Quốc 63 Tỉnh' },
                { id: 'vat', label: 'Hóa Đơn VAT 8% Trong Ngày' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPriority(item.id)}
                  className={`p-2 rounded-xl text-center transition cursor-pointer border ${
                    priority === item.id
                      ? 'bg-amber-400 text-red-950 font-bold border-amber-300 shadow'
                      : 'bg-red-950/60 text-amber-100/80 border-amber-500/20 hover:border-amber-400/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Find Gift Button */}
          <button
            onClick={handleGenerate}
            type="button"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-bold uppercase tracking-wider shadow-lg shadow-amber-500/25 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-sparkles text-xs"></i>
            <span>AI Đề Xuất Quà Phù Hợp Nhất</span>
          </button>

          {/* Recommended Result Box */}
          {recommendedProduct && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#4d090e] to-[#300508] border border-amber-400/50 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full">
                  LỰA CHỌN TỐI ƯU CHO DOANH NGHIỆP
                </span>
                <span className="text-amber-300 font-serif-tet font-bold text-sm">
                  {formatVND(recommendedProduct.price)}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <img
                  src={recommendedProduct.imageUrl}
                  alt={recommendedProduct.name}
                  className="w-16 h-16 rounded-xl object-cover bg-red-950 border border-amber-500/30 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm font-serif-tet truncate">
                    {recommendedProduct.name}
                  </h4>
                  <p className="text-[11px] text-amber-100/80 line-clamp-2 mt-0.5">{reason}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={() => {
                    addToCart(recommendedProduct, 1);
                    closeAIModal();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-400 text-red-950 font-bold text-xs hover:bg-amber-300 transition text-center cursor-pointer"
                >
                  Thêm Vào Giỏ Ngay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('product-detail', recommendedProduct.id);
                    closeAIModal();
                  }}
                  className="py-2 px-3 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-semibold transition text-center cursor-pointer"
                >
                  Xem Chi Tiết Hộp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
