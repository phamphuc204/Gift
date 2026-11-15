'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { PRODUCTS, IMAGES } from '../../infrastructure/mockData';
import { formatVND } from '../../domain/pricing';
import { Product } from '../../domain/types';

export const LacquerwareView: React.FC = () => {
  const { navigateTo, addToCart } = useApp();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchWord, setSearchWord] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('bestseller');

  // Lacquerware products are those in category 'son-mai' or with lacquerware tags
  const lacquerProducts = PRODUCTS.filter((p) => p.category === 'son-mai');

  const filtered = lacquerProducts.filter((p) => {
    if (filterType === 'gold-leaf' && !p.badge?.includes('THẾP VÀNG') && !p.badge?.includes('ĐẶC BIỆT')) {
      return false;
    }
    if (filterType === 'eggshell' && !p.badge?.includes('VỎ TRỨNG')) {
      return false;
    }
    if (filterType === 'mother-pearl' && !p.badge?.includes('XÀ CỪ')) {
      return false;
    }
    if (filterType === 'vip' && !p.badge?.includes('VIP') && p.price < 3000000) {
      return false;
    }
    if (searchWord.trim()) {
      const term = searchWord.toLowerCase();
      return p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
    }
    return true;
  }).sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    return b.reviewsCount - a.reviewsCount;
  });

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    navigateTo('cart');
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
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
            <span className="text-amber-300 font-semibold">Bộ Sưu Tập Sơn Mài Tết Đinh Mùi 2027</span>
          </div>

          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-amber-400/40 shadow-inner mb-3 backdrop-blur-sm">
              <span className="text-xs">🏮</span>
              <span className="text-[11px] lg:text-xs font-semibold tracking-widest text-amber-300 uppercase">
                KIỆT TÁC SƠN MÀI MỸ NGHỆ CUNG ĐÌNH 2027
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight font-serif-tet gold-gradient-text">
              Tinh Hoa Sơn Mài Mỹ Nghệ Việt{' '}
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(245,197,66,0.3)]">
                Dấu Ấn Hoàng Gia
              </span>
            </h1>
            <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed">
              Sự kết tinh kỳ công từ bàn tay nghệ nhân làng nghề Hạ Thái và Tương Bình Hiệp. Hơn 54 công đoạn mài
              nước, thếp vàng 24K và cẩn xà cừ tự nhiên tạo nên món bảo vật Tết đỉnh cao trao gửi đối tác tôn quý.
            </p>
          </div>

          {/* 4 Craft Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-5xl mx-auto pt-6 border-t border-amber-500/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-stamp"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">100% Sơn Mài Thủ Công</div>
                <div className="text-[10px] text-red-200/60">Ủ tự nhiên 54 công đoạn</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-percent"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Cẩn Xà Cừ & Thếp Vàng 24K</div>
                <div className="text-[10px] text-red-200/60">Vỏ ốc cửu khổng & vàng lá thật</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-gift"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Sản Vật Nhập Khẩu</div>
                <div className="text-[10px] text-red-200/60">Grand Cru & Tổ yến, Đông trùng</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Thiết Kế Độc Bản</div>
                <div className="text-[10px] text-red-200/60">Dấu ấn vương giả cho Doanh Nghiệp</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 z-20 space-y-16">
        {/* Section: Filter & Catalog */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-amber-400/30 text-[10px] font-bold text-amber-300 uppercase tracking-widest mb-2">
              DANH MỤC TUYỆT PHẨM SƠN MÀI
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-tet text-white">
              Bộ Sưu Tập Hộp Quà Tết Sơn Mài Cao Cấp
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/75 mt-2">
              Đẳng cấp nghệ thuật cung đình hòa quyện cùng mỹ vị trứ danh, tôn vinh vị thế người trao và lòng trân quý người nhận.
            </p>
          </div>

          {/* Filters and Search Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-red-950/60 p-3 rounded-2xl border border-amber-500/20 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'Tất Cả Kiệt Tác' },
                { id: 'gold-leaf', label: 'Thếp Vàng 24K' },
                { id: 'eggshell', label: 'Khảm Vỏ Trứng' },
                { id: 'mother-pearl', label: 'Khảm Xà Cừ Cổ Điển' },
                { id: 'vip', label: 'Set Quà VIP Doanh Nghiệp' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilterType(btn.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    filterType === btn.id
                      ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-red-950 font-bold uppercase tracking-wider shadow-md'
                      : 'bg-red-950/80 border border-amber-500/30 text-amber-200 hover:text-white hover:bg-amber-500/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="relative flex-1 md:w-56">
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  placeholder="Tìm hộp sơn mài..."
                  className="w-full text-xs text-white bg-red-950/70 border border-amber-500/30 rounded-xl pl-3 pr-8 py-1.5 outline-none focus:border-amber-400 transition placeholder:text-amber-200/40"
                />
                <i className="fa-solid fa-bolt absolute right-3 top-1/2 -translate-y-1/2 text-amber-400 text-xs"></i>
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-xs text-amber-200 bg-red-950/80 border border-amber-500/30 rounded-xl px-3 py-1.5 outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="bestseller" className="bg-red-950 text-white">Mặc định: Bán chạy nhất</option>
                <option value="price-high" className="bg-red-950 text-white">Giá: Từ cao đến thấp</option>
                <option value="price-low" className="bg-red-950 text-white">Giá: Từ thấp đến cao</option>
              </select>
            </div>
          </div>

          {/* Lacquer Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-3xl border border-amber-500/30 overflow-hidden gold-card-shadow group hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className="relative aspect-video overflow-hidden bg-[#2a0407] cursor-pointer"
                    onClick={() => navigateTo('product-detail', prod.id)}
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {prod.badge && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                        {prod.badge}
                      </span>
                    )}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-red-950/80 text-[10px] text-amber-300 font-semibold border border-amber-400/30">
                      54 Bước Thủ Công
                    </div>
                  </div>

                  <div className="p-6 pb-2">
                    <div className="flex items-center justify-between text-xs text-amber-300/80 mb-2">
                      <span className="uppercase font-bold tracking-wider text-[11px] text-amber-400">
                        {prod.subtitle}
                      </span>
                      <div className="flex items-center gap-1 text-amber-300 text-[11px]">
                        <i className="fa-solid fa-gift text-xs"></i>
                        <span>★ 5.0 ({prod.reviewsCount} đánh giá)</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigateTo('product-detail', prod.id)}
                      className="text-lg font-bold text-white font-serif-tet group-hover:text-amber-300 transition-colors mb-2 cursor-pointer"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-amber-100/80 leading-relaxed mb-4 line-clamp-2">
                      {prod.description}
                    </p>
                    <div className="text-2xl font-black text-amber-300 font-serif-tet mb-3">
                      {formatVND(prod.price)}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => handleBuyNow(prod)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 font-bold text-xs uppercase tracking-wider hover:from-amber-200 hover:to-amber-400 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-gift text-xs"></i>
                    <span>Đặt Mua Ngay</span>
                  </button>
                  <button
                    onClick={() => addToCart(prod, 1)}
                    aria-label="Thêm vào giỏ"
                    className="py-2.5 px-3 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-bold transition-all cursor-pointer"
                    title="Thêm vào giỏ"
                  >
                    <i className="fa-solid fa-cart-plus text-xs"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Craftsmanship Story */}
        <section className="bg-gradient-to-r from-[#5c0b11] via-[#750e17] to-[#3a060a] rounded-3xl p-6 lg:p-12 border border-amber-400/40 gold-card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-400/30 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                <i className="fa-solid fa-stamp text-amber-400 text-xs"></i> DI SẢN MỸ NGHỆ VIỆT NAM
              </div>
              <h2 className="text-2xl lg:text-3xl font-black font-serif-tet text-white leading-tight">
                Câu Chuyện Kỳ Công Của Nghệ Thuật Sơn Mài
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                Không giống bất kỳ chất liệu công nghiệp nào khác, sơn mài truyền thống đòi hỏi sự nhẫn nại và
                tâm huyết tột độ. Mỗi chiếc hộp quà EleGift phải trải qua từ 45 đến 60 ngày ủ ẩm, mài nước liên
                tục 54 lớp sơn ta tự nhiên để đạt được độ sâu thẳm, bóng gương không tì vết.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-red-950/60 border border-amber-500/20">
                  <div className="text-lg font-black text-amber-300 font-serif-tet">54+</div>
                  <div className="text-[11px] text-amber-100/80 font-medium">Công đoạn thủ công khắt khe</div>
                </div>
                <div className="p-3 rounded-xl bg-red-950/60 border border-amber-500/20">
                  <div className="text-lg font-black text-amber-300 font-serif-tet">100%</div>
                  <div className="text-[11px] text-amber-100/80 font-medium">Nhựa cây sơn tự nhiên miền Bắc</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-amber-400/30 shadow-2xl">
              <img
                src={IMAGES.artisanWorkshop}
                alt="Nghệ thuật chế tác sơn mài thủ công"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section: B2B Volume Order Callout */}
        <section className="rounded-3xl p-8 bg-gradient-to-r from-red-950 via-[#4a080c] to-red-950 border border-amber-400/40 text-center flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            DÀNH RIÊNG CHO DOANH NGHIỆP & TẬP ĐOÀN
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-serif-tet text-white">
            Đặt Hàng Hộp Sơn Mài Thiết Kế Riêng Số Lượng Lớn?
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl mx-auto">
            Chế tác sơn mài đa lớp thủ công, lót lụa tơ tằm thượng hạng và sản xuất mẫu hộp quà độc quyền theo tiêu
            chuẩn hoàng gia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="tel:19008888"
              className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider text-red-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 shadow-md transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-phone text-xs"></i>
              <span>Yêu Cầu Báo Giá Nhanh: 1900 8888</span>
            </a>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 rounded-full font-semibold text-xs text-amber-200 border border-amber-400/40 hover:bg-amber-500/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-file-arrow-down text-xs text-amber-400"></i>
              <span>Tải Catalogue PDF</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
