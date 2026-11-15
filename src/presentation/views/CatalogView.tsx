'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../../application/AppContext';
import { PRODUCTS } from '../../infrastructure/mockData';
import { formatVND } from '../../domain/pricing';
import { Product } from '../../domain/types';

export const CatalogView: React.FC = () => {
  const { navigateTo, addToCart } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('bestseller');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = [
    { id: 'all', label: `Tất Cả Mẫu Hộp (${PRODUCTS.length})` },
    { id: 'son-mai', label: 'Hộp Gỗ Sơn Mài' },
    { id: 'ruong-go', label: 'Rương Gỗ Khắc Chữ' },
    { id: 'yen-sam', label: 'Hộp Quà Yến Sào & Sâm' },
    { id: 'truyen-thong', label: 'Bộ Quà Rượu Vang & Trà Shan Tuyết' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(term);
        const matchesDesc = item.description.toLowerCase().includes(term);
        const matchesSku = item.sku.toLowerCase().includes(term);
        if (!matchesName && !matchesDesc && !matchesSku) return false;
      }
      // Price range
      if (priceRange === 'under-1m' && item.price >= 1000000) return false;
      if (priceRange === '1m-2m' && (item.price < 1000000 || item.price > 2000000)) return false;
      if (priceRange === '2m-3.5m' && (item.price < 2000000 || item.price > 3500000)) return false;
      if (priceRange === 'above-3.5m' && item.price <= 3500000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // default bestseller
    });
  }, [activeCategory, searchTerm, priceRange, sortBy]);

  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    navigateTo('cart');
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
            <span className="text-amber-300  font-semibold">Tuyển Tập Hộp Quà Tết Đinh Mùi 2027</span>
          </div>

          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/70 border border-amber-400/40 shadow-inner mb-3 backdrop-blur-sm">
              <span className="text-xs">🌸</span>
              <span className="text-[11px] lg:text-xs font-semibold tracking-widest text-amber-300 uppercase">
                BỘ SƯU TẬP TẾT ĐINH MÙI 2027
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight font-serif-tet gold-gradient-text">
              Tuyển Tập{' '}
              <br />
              <span className="gold-gradient-text drop-shadow-[0_4px_16px_rgba(245,197,66,0.3)]">
                Hộp Quà Tết Đinh Mùi 2027
              </span>
            </h1>
            <p className="text-amber-100/85 text-sm sm:text-base leading-relaxed">
              Mỗi hộp quà là một tác phẩm nghệ thuật sơn mài & rương gỗ mộc quý giá, kết tinh phong vị cổ
              truyền cùng sản vật thượng hạng từ các vùng đất danh tiếng.
            </p>
          </div>

          {/* 4 Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-5xl mx-auto pt-6 border-t border-amber-500/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-certificate"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">100% Tuyển Chọn</div>
                <div className="text-[10px] text-red-200/60">Nguồn gốc chuẩn vị</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Đóng Gói Sơn Mài</div>
                <div className="text-[10px] text-red-200/60">Chế tác thủ công tinh xảo</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Giao Hỏa Tốc</div>
                <div className="text-[10px] text-red-200/60">Đúng hẹn toàn quốc</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
              <div className="w-9 h-9 rounded-full bg-red-900/60 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm shrink-0">
                <i className="fa-solid fa-receipt"></i>
              </div>
              <div>
                <div className="text-xs font-bold text-amber-200">Hóa Đơn VAT</div>
                <div className="text-[10px] text-red-200/60">Minh bạch đầy đủ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Catalog Area */}
      <main className="relative max-w-7xl mx-auto px-6 lg:px-12 py-10 z-20">
        {/* Category Filter Pills & Search / Sort Toolbar */}
        <div className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-2xl gold-card-shadow p-5 lg:p-6 border border-amber-400/30 backdrop-blur-xl mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pb-5 border-b border-amber-500/20">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'font-bold uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 shadow-md shadow-amber-500/25'
                      : 'font-semibold text-amber-200 bg-red-950/70 border border-amber-500/30 hover:border-amber-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input, Price Range, and Sort Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5 items-center">
            {/* Search Input */}
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/70 text-xs"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm kiếm tên hộp quà, sản vật..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-red-950/60 border border-amber-500/30 rounded-xl text-white placeholder-amber-200/50 outline-none focus:border-amber-400 transition"
              />
            </div>

            {/* Price Range Dropdown */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs text-white font-medium bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2 outline-none focus:border-amber-400 transition cursor-pointer"
              >
                <option value="all" className="bg-red-950 text-white">Mức giá: Tất cả mức giá</option>
                <option value="under-1m" className="bg-red-950 text-white">Dưới 1.000.000₫</option>
                <option value="1m-2m" className="bg-red-950 text-white">1.000.000₫ - 2.000.000₫</option>
                <option value="2m-3.5m" className="bg-red-950 text-white">2.000.000₫ - 3.500.000₫</option>
                <option value="above-3.5m" className="bg-red-950 text-white">Trên 3.500.000₫ (VIP)</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-xs text-white font-medium bg-red-950/60 border border-amber-500/30 rounded-xl px-3.5 py-2 outline-none focus:border-amber-400 transition cursor-pointer"
              >
                <option value="bestseller" className="bg-red-950 text-white">Sắp xếp: Bán chạy nhất Tết 2027</option>
                <option value="price-low" className="bg-red-950 text-white">Giá từ thấp đến cao</option>
                <option value="price-high" className="bg-red-950 text-white">Giá từ cao đến thấp</option>
                <option value="rating" className="bg-red-950 text-white">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid: 6 Luxury Tet Gift Boxes */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-red-950/40 rounded-2xl border border-amber-500/20">
            <i className="fa-solid fa-box-open text-4xl text-amber-400/50 mb-3"></i>
            <h3 className="text-lg font-bold text-white font-serif-tet">Không tìm thấy hộp quà phù hợp</h3>
            <p className="text-xs text-red-200/70 mt-1">Vui lòng điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchTerm('');
                setPriceRange('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-red-950 font-bold text-xs uppercase cursor-pointer"
            >
              Xem tất cả hộp quà
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-gradient-to-b from-[#3a060a] to-[#250305] rounded-2xl border border-amber-400/30 overflow-hidden gold-card-shadow flex flex-col group hover:border-amber-300 transition-all duration-300"
              >
                {/* Product Image Frame */}
                <div
                  className="relative aspect-square overflow-hidden bg-[#2a0407] cursor-pointer"
                  onClick={() => navigateTo('product-detail', prod.id)}
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star text-[11px]"></i>
                      ))}
                      <span className="text-[11px] text-amber-200/70 ml-1">
                        ({prod.reviewsCount} đánh giá)
                      </span>
                    </div>

                    <h3
                      onClick={() => navigateTo('product-detail', prod.id)}
                      className="text-base font-bold text-white font-serif-tet group-hover:text-amber-300 transition-colors mb-1.5 cursor-pointer leading-snug"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-amber-100/75 leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-3.5">
                      <span className="text-lg font-black text-amber-300 font-serif-tet">
                        {formatVND(prod.price)}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <i className="fa-solid fa-shield-halved text-[10px]"></i>
                        Có sẵn giao ngay
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="py-2 px-3 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-gift text-[11px]"></i>
                        <span>Thêm vào giỏ</span>
                      </button>
                      <button
                        onClick={() => handleBuyNow(prod)}
                        className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 text-xs font-bold tracking-wide hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Đặt mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-2 mb-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Trang trước"
            className="w-9 h-9 rounded-xl bg-red-950/70 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-red-950 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer text-xs"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isCurrent = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 shadow-md shadow-amber-500/30'
                    : 'bg-red-950/70 border border-amber-500/30 text-amber-200 hover:border-amber-400 hover:text-white'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Trang kế tiếp"
            className="w-9 h-9 rounded-xl bg-red-950/70 border border-amber-500/30 text-amber-300 hover:bg-amber-500 hover:text-red-950 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer text-xs"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* B2B Corporate Banner */}
        <div className="bg-gradient-to-r from-[#5c0b11] via-[#750e17] to-[#3a060a] rounded-3xl p-6 lg:p-10 border border-amber-400/40 gold-card-shadow flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-amber-400/30 text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <i className="fa-solid fa-crown text-[10px]"></i> GIẢI PHÁP QUÀ TẾT DOANH NGHIỆP 2027
            </div>
            <h2 className="text-2xl lg:text-3xl font-black font-serif-tet text-white">
              Đặt Hàng Quà Tết Doanh Nghiệp Số Lượng Lớn?
            </h2>
            <p className="text-xs lg:text-sm text-amber-100/80 max-w-xl leading-relaxed">
              Chiết khấu đặc quyền đến 25%, đóng gói sơn mài thượng hạng, in thiệp chúc riêng từng đối tác và
              giao hàng tận nơi 63 tỉnh thành.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-red-950 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-phone-volume text-xs"></i>
              <span>YÊU CẦU BÁO GIÁ NHANH</span>
            </button>
            <button
              onClick={() => navigateTo('corporate')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-xs text-amber-200 border border-amber-400/40 hover:bg-amber-500/10 hover:border-amber-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-file-arrow-down text-xs text-amber-400"></i>
              <span>TẢI CATALOGUE PDF</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
