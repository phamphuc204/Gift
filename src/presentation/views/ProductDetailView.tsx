
'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../application/AppContext';
import { IMAGES } from '../../infrastructure/mockData';
import { formatVND } from '../../domain/pricing';
import { Product } from '../../domain/types';

export const ProductDetailView: React.FC = () => {
  const { selectedProductId, navigateTo, addToCart } = useApp();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeImage, setActiveImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<number>(1);

  // Lấy chi tiết sản phẩm từ Backend API
  useEffect(() => {
    if (!selectedProductId) {
      setError('Không tìm thấy mã sản phẩm.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        setProduct(null);

        const response = await fetch(
          `/api/products/${encodeURIComponent(selectedProductId)}`,
          { signal: controller.signal }
        );

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || 'Không thể lấy thông tin sản phẩm.'
          );
        }

        const productData: Product = result.data;

        setProduct(productData);
        setActiveImage(productData.imageUrl);
        setSelectedVariant(
          productData.variants?.[0]?.id || 'standard'
        );
        setQuantity(1);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [selectedProductId]);

  // Lấy danh sách sản phẩm liên quan từ Products API
  useEffect(() => {
    const controller = new AbortController();

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          signal: controller.signal,
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setRelatedProducts(result.data || []);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Lỗi lấy sản phẩm liên quan:', err);
        }
      }
    };

    fetchRelatedProducts();

    return () => controller.abort();
  }, []);

  // Trạng thái đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-amber-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent mx-auto mb-4"></div>
          <p>Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Trạng thái lỗi hoặc không tìm thấy sản phẩm
  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-300 mb-4">
          {error || 'Không tìm thấy sản phẩm.'}
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-5 py-2 rounded-lg bg-amber-400 text-red-950 font-bold"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    );
  }

  const selectedVariantObj = product.variants?.find(
    (v) => v.id === selectedVariant
  );

  const variantLabel = selectedVariantObj
    ? `${selectedVariantObj.name} • ${selectedVariantObj.label}`
    : 'Phiên bản tiêu chuẩn';

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, variantLabel);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, variantLabel);
    navigateTo('cart');
  };

  const relatedProductsFiltered = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full">
      {/* Top Breadcrumb Bar */}
      <section
        className="relative bg-gradient-to-b from-[#5c0b11] via-[#750e17] to-[#4a080c] overflow-hidden pt-4 pb-6 border-b border-amber-600/20"
        style={{
          background:
            'linear-gradient(rgba(61, 10, 11, 0.9) 0%, rgba(38, 6, 7, 0.8) 60%, transparent 100%)',
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
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/70">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('home')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Trang Chủ
              </button>
              <span>/</span>
              <button
                onClick={() => navigateTo('catalog')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Hộp Quà Tết
              </button>
              <span>/</span>
              <span className="text-amber-300 font-bold tracking-wide">
                {product.name}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Sẵn Sàng Giao Ngay • Mùa Tết Đinh Mùi 2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Product Detail View */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Gallery & Previews */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image Showcase */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl bg-gradient-to-b from-[#3a070a] to-[#250406] border border-amber-500/30 gold-card-shadow overflow-hidden group">
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-black/60 pointer-events-none"></div>

              {/* Status Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-extrabold text-[11px] tracking-wider uppercase shadow-lg shadow-red-950/60 flex items-center gap-1.5">
                  <span>🔥</span> BÁN CHẠY CHO DOANH NGHIỆP
                </span>
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-black text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                  <span>✨</span> GIỚI HẠN 2027
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <button
                  type="button"
                  aria-label="Lưu yêu thích"
                  className="w-9 h-9 rounded-full bg-red-950/80 text-amber-300 hover:text-white hover:bg-red-800 transition shadow-lg flex items-center justify-center backdrop-blur-md border border-amber-500/30 cursor-pointer"
                >
                  <i className="fa-regular fa-heart text-sm"></i>
                </button>
                <button
                  type="button"
                  aria-label="Chia sẻ sản phẩm"
                  className="w-9 h-9 rounded-full bg-red-950/80 text-amber-300 hover:text-white hover:bg-red-800 transition shadow-lg flex items-center justify-center backdrop-blur-md border border-amber-500/30 cursor-pointer"
                >
                  <i className="fa-solid fa-share-nodes text-sm"></i>
                </button>
              </div>

              {/* Main Image */}
              <img
                src={activeImage || product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
              />

              {/* Bottom Control Bar */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto inline-flex items-center gap-2 bg-[#2a0406]/90 border border-amber-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-amber-200 shadow-xl">
                  <i className="fa-solid fa-arrows-rotate text-amber-400"></i>
                  <span className="font-medium text-[11px]">
                    Chạm & Phóng to chi tiết sơn mài 7 lớp
                  </span>
                </div>
                <div className="pointer-events-auto inline-flex items-center gap-1.5 bg-[#2a0406]/90 border border-amber-500/30 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-amber-300 font-semibold shadow-xl">
                  <i className="fa-solid fa-certificate text-amber-400 text-xs"></i>
                  <span className="text-[11px]">Sơn Mài Thủ Công 100%</span>
                </div>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Toàn Cảnh', url: product.gallery?.[0] || IMAGES.carousel1 },
                { label: 'Chi Tiết Set', url: product.gallery?.[1] || IMAGES.boxDetailedSet },
                { label: 'Chất Liệu Sơn Mài', url: product.gallery?.[2] || IMAGES.boxGoldLeaf },
                { label: 'Bối Cảnh', url: product.gallery?.[3] || IMAGES.carousel2 },
              ].map((thumb, idx) => {
                const isSelected = activeImage === thumb.url;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(thumb.url)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-red-950/60 transition duration-300 cursor-pointer group focus:outline-none ${
                      isSelected
                        ? 'border-2 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'border border-amber-500/30 opacity-75 hover:opacity-100 hover:border-amber-400'
                    }`}
                  >
                    <img
                      src={thumb.url}
                      alt={thumb.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute bottom-1 inset-x-1 text-[10px] text-center font-bold bg-black/75 rounded text-amber-200 py-0.5">
                      {thumb.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Video Unbox Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#320608]/90 border border-amber-500/20 text-xs shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-play text-xs ml-0.5"></i>
                </div>
                <div>
                  <span className="font-bold text-white block">
                    Video Mở Hộp Thực Tế Sơn Mài
                  </span>
                  <span className="text-amber-200/60 text-[11px]">
                    Xem cận cảnh độ bóng gương và lụa vàng hoàng gia
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  alert('Mở trình chiếu Video 4K trải nghiệm mở hộp quà sơn mài EleGift!')
                }
                className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold transition text-xs flex items-center gap-1.5 border border-amber-400/30 cursor-pointer"
              >
                <span>Xem Video</span>
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Details, Pricing, Options, CTA */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <span>🌸</span> BỘ SƯU TẬP QUÀ TẾT ĐINH MÙI 2027
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-tet text-white tracking-tight leading-snug gold-gradient-text">
                {product.name}
              </h1>
              <p className="text-xs text-red-200/80 mt-1.5 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* SKU & Enterprise Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2 py-2.5 px-3.5 rounded-xl bg-[#380608]/80 border border-amber-500/20 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-red-200/60">Mã SKU:</span>
                <span className="font-bold text-amber-300">{product.sku}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400 text-xs">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <span className="font-bold text-white">{product.rating}/5</span>
                <span className="text-red-200/60 text-[11px]">
                  ({product.reviewsCount} doanh nghiệp đã đặt)
                </span>
              </div>
            </div>

            {/* Price & Wholesale Tier Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#45080c] to-[#2d0507] border border-amber-500/30 gold-card-shadow">
              <div className="flex items-baseline gap-3 mb-1.5">
                <span className="text-3xl font-black text-amber-300 font-serif-tet">
                  {formatVND(product.price)}
                </span>

                {product.originalPrice && (
                  <span className="text-sm text-red-300/60 line-through">
                    {formatVND(product.originalPrice)}
                  </span>
                )}

                <span className="px-2 py-0.5 rounded bg-red-600/90 text-white font-bold text-xs uppercase">
                  -17%
                </span>
              </div>

              <div className="text-xs text-amber-200/80 flex items-center gap-1.5">
                <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                <span>
                  Đã bao gồm VAT 8% • Chiết khấu bậc thang đến 25% cho doanh nghiệp
                </span>
              </div>

              {/* Wholesale Tier Card */}
              <div className="mt-3 pt-3 border-t border-amber-500/20 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-red-950/60 border border-amber-500/15">
                  <div className="text-[10px] text-red-200/70">10 - 50 Hộp</div>
                  <div className="text-xs font-bold text-amber-300">CK 10%</div>
                </div>
                <div className="p-2 rounded-lg bg-red-950/60 border border-amber-500/30 bg-amber-500/10">
                  <div className="text-[10px] text-amber-200">51 - 200 Hộp</div>
                  <div className="text-xs font-bold text-amber-300">CK 18%</div>
                </div>
                <div className="p-2 rounded-lg bg-red-950/60 border border-amber-400/40 bg-amber-500/15">
                  <div className="text-[10px] text-amber-200 font-medium">
                    &gt; 200 Hộp
                  </div>
                  <div className="text-xs font-black text-amber-400">
                    CK Tối Đa 25%
                  </div>
                </div>
              </div>
            </div>

            {/* Options: Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-200">
                  Phiên Bản Sơn Mài:{' '}
                  <span className="text-amber-400 font-semibold lowercase">
                    (chọn màu hộp)
                  </span>
                </label>

                <div className="grid grid-cols-3 gap-2.5">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant === v.id;

                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v.id)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition cursor-pointer ${
                          isSelected
                            ? 'border-2 border-amber-400 bg-amber-500/15 text-white shadow-md'
                            : 'border-amber-500/25 bg-red-950/50 hover:border-amber-400/60 text-red-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-amber-300 shadow-sm mb-1"
                          style={{ backgroundColor: v.colorHex }}
                        ></span>
                        <span className="text-xs font-bold">{v.name}</span>
                        <span className="text-[10px] text-amber-300 font-medium">
                          {v.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Picker & Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-200">
                <span>Số Lượng Đặt Hàng:</span>
                <span className="text-[11px] text-emerald-400 font-normal">
                  Kho sẵn {product.stockCount} bộ tại Hà Nội & TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl bg-red-950/90 border border-amber-500/30 overflow-hidden shadow-inner">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Giảm số lượng"
                    className="w-10 h-10 flex items-center justify-center text-amber-300 hover:bg-amber-500/20 transition active:scale-95 text-base font-bold cursor-pointer"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min={1}
                    max={999}
                    className="w-14 h-10 text-center bg-transparent text-white font-bold text-sm focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Tăng số lượng"
                    className="w-10 h-10 flex items-center justify-center text-amber-300 hover:bg-amber-500/20 transition active:scale-95 text-base font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Presets */}
                <div className="flex items-center gap-1.5 flex-1">
                  {[10, 50, 100].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className="px-2.5 py-2 rounded-lg bg-red-950/60 hover:bg-amber-500/20 border border-amber-500/20 text-xs text-amber-200 transition cursor-pointer"
                    >
                      {preset} hộp
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 hover:from-amber-200 hover:to-amber-400 hover:-translate-y-0.5 active:translate-y-0 transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-cart-plus text-sm"></i>
                <span>THÊM VÀO GIỎ HÀNG</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-900/80 to-[#4a080c] border-2 border-amber-400/80 text-amber-300 font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-amber-500/20 hover:border-amber-300 hover:-translate-y-0.5 transition duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <i className="fa-solid fa-file-invoice-dollar text-sm"></i>
                <span>MUA NGAY & BÁO GIÁ SỈ</span>
              </button>
            </div>

            {/* Quick Benefits Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-amber-500/20 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15">
                <i className="fa-solid fa-box-open text-amber-400 text-sm shrink-0"></i>
                <span className="text-[11px] text-red-100/90 leading-tight">
                  Đóng gói sơn mài thủ công
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15">
                <i className="fa-solid fa-truck-fast text-amber-400 text-sm shrink-0"></i>
                <span className="text-[11px] text-red-100/90 leading-tight">
                  Giao hỏa tốc toàn quốc
                </span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/50 border border-amber-500/15">
                <i className="fa-solid fa-envelope-open-text text-amber-400 text-sm shrink-0"></i>
                <span className="text-[11px] text-red-100/90 leading-tight">
                  Tặng thiệp chúc độc quyền
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* EXPANDED TABS SECTION */}
        <div className="mt-14 pt-10 border-t border-amber-500/20">
          <div className="flex items-center justify-center gap-2 sm:gap-4 border-b border-amber-500/20 pb-4 mb-8 overflow-x-auto">
            {[
              { id: 1, label: '1. Thành Phần Hộp Quà Bên Trong' },
              { id: 2, label: '2. Nghệ Thuật Chế Tác Sơn Mài & Đóng Gói' },
              { id: 3, label: '3. Giấy Chứng Nhận & Nguồn Gốc' },
              { id: 4, label: '4. Đánh Giá Khách Hàng (128)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 shadow-md'
                    : 'bg-red-950/60 text-amber-300 hover:bg-amber-500/15 border border-amber-500/25'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Delicacies Breakdown */}
          {activeTab === 1 && (
            <div>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                  Danh Mục Sản Vật Thượng Hạng
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-tet text-white mt-1 gold-gradient-text">
                  Hội Tụ Tinh Hoa Tết Cổ Truyền & Phong Vị Đương Đại
                </h3>
                <p className="text-xs text-red-200/80 mt-1">
                  Mỗi món quà trong hộp &quot;{product.name}&quot; đều được tuyển chọn nghiêm ngặt từ những vùng đặc sản trứ danh.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(product.delicacies || []).map((del) => (
                  <div
                    key={del.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-[#45090e] to-[#2e0507] border border-amber-500/20 hover:border-amber-400/50 transition flex items-start gap-3.5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-400/30">
                      <i className={`fa-solid ${del.icon} text-xl`}></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white mb-0.5">
                        {del.name}
                      </div>
                      <div className="text-[11px] text-amber-300 font-semibold mb-1">
                        {del.weightOrVolume}
                      </div>
                      <p className="text-[11px] text-red-200/70 leading-relaxed">
                        {del.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Artisan Lacquerware Craft */}
          {activeTab === 2 && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#3e080b] via-[#520b10] to-[#3e080b] border border-amber-500/30">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-950/80 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                    <i className="fa-solid fa-crown text-[10px]"></i>
                    ĐẶC QUYỀN DOANH NGHIỆP TẾT 2027
                  </div>
                  <h4 className="text-xl font-bold font-serif-tet text-white gold-gradient-text">
                    Nghệ Thuật Chế Tác Sơn Mài & Đóng Gói Hoàng Gia
                  </h4>
                  <p className="text-xs text-red-200/80 leading-relaxed">
                    EleGift gìn giữ trọn vẹn tinh hoa làng nghề sơn mài truyền thống: Mỗi chiếc hộp đều trải qua
                    7 tầng sơn then, đánh bóng bằng tro trấu và lót lụa tơ tằm thượng hạng. Tặng kèm thiệp chúc
                    Tết in riêng lời ngỏ từ Ban Lãnh Đạo và túi xách gấm sang trọng.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-amber-200">
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-400"></i>
                      Miễn phí túi gấm & khay lụa
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-400"></i>
                      Trả mẫu thực tế tận nơi trong 24h
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fa-solid fa-check text-emerald-400"></i>
                      Hóa đơn VAT 100% hợp lệ
                    </span>
                  </div>
                </div>
                <div className="md:col-span-4 flex justify-center">
                  <img
                    src={IMAGES.boxGoldLeaf}
                    alt="Hộp sơn mài thủ công dát vàng Đinh Mùi 2027"
                    className="rounded-xl border border-amber-500/30 shadow-xl max-h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Certifications & Origin */}
          {activeTab === 3 && (
            <div className="p-6 rounded-2xl bg-red-950/60 border border-amber-500/25 space-y-4">
              <h4 className="text-lg font-bold font-serif-tet text-amber-200">
                Chứng Nhận Tiêu Chuẩn & Nguồn Gốc Xuất Xứ OCOP 2027
              </h4>
              <p className="text-xs text-red-200/80 leading-relaxed">
                Tất cả sản vật cao cấp trong từng set quà EleGift đều có đầy đủ phiếu kiểm nghiệm an toàn vệ sinh thực phẩm (ATVSTP), chứng nhận tiêu chuẩn OCOP 4-5 sao và tem truy xuất nguồn gốc QR code độc quyền.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-red-900/40 border border-amber-500/20">
                  <div className="font-bold text-amber-300 text-xs mb-1">
                    ✓ Vang Nhập Khẩu Chính Ngạch
                  </div>
                  <p className="text-[11px] text-red-200/70">
                    Có tem hải quan và chứng nhận CO/CQ xuất xứ nhà làm vang Pháp & Ý.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-900/40 border border-amber-500/20">
                  <div className="font-bold text-amber-300 text-xs mb-1">
                    ✓ Yến Sào & Đông Trùng
                  </div>
                  <p className="text-[11px] text-red-200/70">
                    Chứng nhận hàm lượng dược tính cao, không chất bảo quản, đạt chuẩn HACCP.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-red-900/40 border border-amber-500/20">
                  <div className="font-bold text-amber-300 text-xs mb-1">
                    ✓ Sơn Mài Truyền Thống
                  </div>
                  <p className="text-[11px] text-red-200/70">
                    Nghệ nhân Hạ Thái & Tương Bình Hiệp chế tác 100% bằng sơn ta tự nhiên.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Customer Reviews */}
          {activeTab === 4 && (
            <div id="customer-reviews" className="space-y-6">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <span className="text-amber-400/90 text-xs tracking-widest uppercase font-semibold text-center block mb-1">
                  ✦ BẢO CHỨNG NIỀM TIN DOANH NGHIỆP ✦
                </span>
                <h3 className="font-serif-tet text-2xl text-amber-200 text-center font-bold mb-1 gold-gradient-text">
                  Đánh Giá & Trải Nghiệm Khách Hàng
                </h3>
              </div>

              {/* Rating Summary Box */}
              <div className="bg-red-950/60 border border-amber-500/25 rounded-2xl p-6 backdrop-blur-md gold-card-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-amber-500/20 pb-6 lg:pb-0 lg:pr-6">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-5xl font-black text-amber-300 font-serif-tet">
                        4.9
                      </span>
                      <span className="text-lg text-amber-200/70 font-bold">
                        / 5
                      </span>
                    </div>
                    <div className="flex text-amber-400 text-base mb-2 gap-0.5">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <p className="text-xs text-red-200/70 mb-3">
                      Dựa trên 128 đánh giá xác thực từ doanh nghiệp
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold">
                      <i className="fa-solid fa-circle-check text-emerald-400 text-xs"></i>
                      <span>
                        100% Khách hàng B2B hài lòng về chất lượng & tiến độ
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-2 border-b lg:border-b-0 lg:border-r border-amber-500/20 pb-6 lg:pb-0 lg:pr-6 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-amber-200 font-medium shrink-0 flex items-center gap-1">
                        5 <i className="fa-solid fa-star text-[10px] text-amber-400"></i>
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-red-950/80 overflow-hidden border border-amber-500/20">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
                          style={{ width: '94%' }}
                        ></div>
                      </div>
                      <span className="w-10 text-right text-red-200/70 font-semibold text-[11px]">
                        94%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-amber-200 font-medium shrink-0 flex items-center gap-1">
                        4 <i className="fa-solid fa-star text-[10px] text-amber-400"></i>
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-red-950/80 overflow-hidden border border-amber-500/20">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"
                          style={{ width: '6%' }}
                        ></div>
                      </div>
                      <span className="w-10 text-right text-red-200/70 font-semibold text-[11px]">
                        6%
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-start space-y-3">
                    <div className="space-y-1.5 text-xs text-red-100/90">
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                        Xác thực đơn hàng 100%
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-check text-emerald-400 text-xs"></i>
                        Đánh giá người mua thực
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        alert('Cảm ơn Quý khách! Vui lòng nhập mã đơn hàng B2B để gửi nhận xét đánh giá.')
                      }
                      className="w-full sm:w-auto mt-2 inline-flex items-center justify-center gap-2 border border-amber-400 text-amber-300 rounded-xl px-5 py-2.5 hover:bg-amber-400/10 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                    >
                      <i className="fa-regular fa-heart text-xs"></i>
                      <span>Viết Đánh Giá</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Customer Reviews */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-red-950/70 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 text-red-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        HQ
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Trần Hoàng Quân
                        </h4>
                        <p className="text-[11px] text-red-200/60">
                          Giám đốc Đối ngoại • Tập đoàn V-Tech Group
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-semibold">
                      <i className="fa-solid fa-check text-[9px]"></i>
                      <span>Đã xác thực mua 350 hộp B2B</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <div className="flex text-amber-400 text-xs gap-0.5">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <span className="text-[11px] text-red-200/50">
                        15/12/2026
                      </span>
                    </div>
                    <p className="text-xs text-red-100/90 leading-relaxed">
                      &quot;Đặt 350 hộp Vạn Sự Khởi Sắc cho đối tác VIP và hội đồng quản trị. Nước sơn mài 7 lớp cực kỳ bóng và có độ sâu mỹ thuật cao, từng đường nét dát vàng truyền thống chuẩn xác và sắc sảo.&quot;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-amber-500/15 flex items-center gap-1.5 text-[11px] text-amber-300/80">
                    <i className="fa-solid fa-gift text-[10px]"></i>
                    <span>Đỏ Phú Quý • Sơn mài thủ công</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-red-950/70 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 text-red-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        MP
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Nguyễn Mai Phương
                        </h4>
                        <p className="text-[11px] text-red-200/60">
                          Trưởng phòng Mua sắm & C&B • VietBank
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-semibold">
                      <i className="fa-solid fa-check text-[9px]"></i>
                      <span>Đã xác thực mua 180 hộp B2B</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <div className="flex text-amber-400 text-xs gap-0.5">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <span className="text-[11px] text-red-200/50">
                        22/12/2026
                      </span>
                    </div>
                    <p className="text-xs text-red-100/90 leading-relaxed">
                      &quot;Khâu phục vụ cực kỳ chuyên nghiệp! Đội ngũ tư vấn mang mẫu tận nơi chỉ sau 4 tiếng, hỗ trợ xuất đầy đủ hóa đơn VAT và hợp đồng chuẩn chỉ trong ngày.&quot;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-amber-500/15 flex items-center gap-1.5 text-[11px] text-amber-300/80">
                    <i className="fa-solid fa-gift text-[10px]"></i>
                    <span>Vàng Hoàng Gia • Kèm thiệp chúc mừng</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-red-950/70 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 text-red-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                        LT
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          Lê Minh Tuấn
                        </h4>
                        <p className="text-[11px] text-red-200/60">
                          Phó TGĐ • Bất động sản SunLand
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[10px] font-semibold">
                      <i className="fa-solid fa-check text-[9px]"></i>
                      <span>Đã xác thực mua 120 hộp B2B</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <div className="flex text-amber-400 text-xs gap-0.5">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                      <span className="text-[11px] text-red-200/50">
                        05/01/2027
                      </span>
                    </div>
                    <p className="text-xs text-red-100/90 leading-relaxed">
                      &quot;Hộp gỗ sơn mài cầm rất đầm tay, bản lề và khóa mạ đồng tinh xảo, nắp đóng khít êm ái. Chai vang Bordeaux chính ngạch, yến sào chưng đông trùng nguyên sợi.&quot;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-amber-500/15 flex items-center gap-1.5 text-[11px] text-amber-300/80">
                    <i className="fa-solid fa-gift text-[10px]"></i>
                    <span>Đỏ Phú Quý • Sơn mài dát vàng</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Gợi Ý Mùa Tết 2027
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-tet text-white mt-0.5 gold-gradient-text">
                Các Bộ Sưu Tập Quà Tết Cùng Phân Khúc
              </h3>
            </div>
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs text-amber-300 hover:text-amber-100 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả hộp quà Tết</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProductsFiltered.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigateTo('product-detail', rel.id);
                }}
                className="rounded-xl bg-gradient-to-b from-[#3a070a] to-[#250406] border border-amber-500/20 overflow-hidden hover:border-amber-400/60 transition group shadow-lg cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-red-950">
                  <img
                    src={rel.imageUrl}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {rel.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-amber-500 text-red-950 font-bold text-[10px]">
                      {rel.badge}
                    </span>
                  )}
                </div>
                <div className="p-3.5 space-y-1.5">
                  <div className="text-[11px] text-red-200/60">
                    {rel.subtitle}
                  </div>
                  <h5 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                    {rel.name}
                  </h5>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-sm font-extrabold text-amber-300">
                      {formatVND(rel.price)}
                    </span>
                    <span className="text-[10px] text-red-200/60">
                      CK đến 25%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
