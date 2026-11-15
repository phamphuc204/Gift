'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { formatVND } from '../../domain/pricing';

export const CartView: React.FC = () => {
  const {
    cartItems,
    cartTotals,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    couponCode,
    couponApplied,
    navigateTo,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState<string>(couponCode);

  const handleApplyCoupon = () => {
    applyCoupon(inputCoupon);
  };

  const handleClearCart = () => {
    if (window.confirm('Quý khách có chắc chắn muốn làm trống giỏ quà Tết hiện tại?')) {
      clearCart();
    }
  };

  return (
    <div className="w-full">
      {/* Top Hero Breadcrumb */}
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
                className="text-amber-500/70 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Trang Chủ
              </button>
              <span>/</span>
              <span className="text-amber-400 font-semibold tracking-wide">Giỏ Hàng</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Sẵn Sàng Giao Ngay • Mùa Tết Đinh Mùi 2027</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8">
        <div className="flex flex-col w-full text-red-50">
          {/* Page Header Banner */}
          <div className="relative w-full mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-[#5a0c12]/80 to-red-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-md">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>
            <div className="absolute top-2 left-6 text-amber-400/20 text-3xl font-serif select-none pointer-events-none">
              ❖
            </div>
            <div className="absolute bottom-2 right-6 text-amber-400/20 text-3xl font-serif select-none pointer-events-none">
              ❖
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Đơn Hàng Mùa Xuân Đinh Mùi 2027
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-tet tracking-tight gold-gradient-text leading-tight">
                  Giỏ Hàng & Tóm Tắt Đơn Quà Tết
                </h1>
                <p className="text-xs sm:text-sm text-red-200/80 mt-1.5 max-w-2xl font-light leading-relaxed">
                  Kiểm tra lại các tuyệt phẩm hộp quà và số lượng trước khi tiến hành đặt hàng. Ưu đãi chiết
                  khấu theo số lượng sẽ tự động áp dụng.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2.5 rounded-xl bg-red-900/40 text-right backdrop-blur-sm shadow-inner">
                  <div className="text-[11px] uppercase tracking-wider text-amber-300/80">Số món chọn lọc</div>
                  <div className="text-lg font-bold text-amber-200 flex items-center justify-end gap-1.5 font-serif-tet">
                    <span>{cartItems.length} Kiểu Hộp</span>
                    <span className="text-xs text-amber-400/60 font-sans font-normal">
                      • {cartTotals.totalBoxes} Hộp tổng
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Empty State */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-red-950/60 rounded-2xl border border-amber-500/20 p-8">
              <i className="fa-solid fa-gift text-5xl text-amber-400/40 mb-4"></i>
              <h3 className="text-xl font-bold font-serif-tet text-white mb-2">
                Giỏ quà Tết của Quý khách đang trống
              </h3>
              <p className="text-xs text-red-200/70 mb-6 max-w-md mx-auto">
                Hãy khám phá các tuyệt phẩm hộp quà Tết sơn mài thượng hạng và nông sản OCOP tinh hoa để gửi gắm thành ý tri ân.
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:from-amber-300 hover:to-amber-400 cursor-pointer"
              >
                Khám Phá Tuyển Tập Quà Tết
              </button>
            </div>
          ) : (
            /* Main 2-Column Cart Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Product Table & Promos (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-red-950/60 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
                  {/* Table Column Titles */}
                  <div className="hidden sm:grid grid-cols-12 text-[11px] font-bold uppercase tracking-wider text-amber-300/80 pb-4 px-2 border-b border-amber-500/20">
                    <div className="col-span-5">Tuyệt Phẩm Hộp Quà</div>
                    <div className="col-span-2 text-center">Đơn Giá</div>
                    <div className="col-span-2 text-center">Số Lượng</div>
                    <div className="col-span-2 text-right">Tổng Tiền</div>
                    <div className="col-span-1 text-center">Xóa</div>
                  </div>

                  {/* Cart Item Rows */}
                  <div className="divide-y divide-amber-500/15">
                    {cartItems.map((item) => {
                      const itemSubtotal = item.unitPrice * item.quantity;
                      return (
                        <div key={item.id} className="py-5 sm:py-6 group transition-all duration-300">
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                            {/* Product Info */}
                            <div className="sm:col-span-5 flex items-start gap-4">
                              <div
                                onClick={() => navigateTo('product-detail', item.productId)}
                                className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0 rounded-xl overflow-hidden bg-red-900/60 shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer"
                              >
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-1 left-1 bg-amber-400 text-red-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow">
                                  B2B
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-amber-400/90 mb-0.5">
                                  {item.product.subtitle}
                                </span>
                                <h3
                                  onClick={() => navigateTo('product-detail', item.productId)}
                                  className="text-sm sm:text-base font-bold text-amber-100 font-serif-tet leading-snug hover:text-amber-300 transition-colors cursor-pointer"
                                >
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-red-200/70 mt-1 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
                                  <span>{item.selectedVariantLabel || 'Đỏ Phú Quý • Hộp sơn mài cao cấp'}</span>
                                </p>
                                <div className="sm:hidden mt-2 flex items-center justify-between">
                                  <span className="text-xs text-amber-300/80 font-semibold">
                                    {formatVND(item.unitPrice)}
                                  </span>
                                  <span className="text-xs font-bold text-amber-300">
                                    Tổng: {formatVND(itemSubtotal)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Unit Price */}
                            <div className="hidden sm:flex sm:col-span-2 flex-col items-center justify-center">
                              <span className="text-sm font-bold text-amber-100">
                                {formatVND(item.unitPrice)}
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-[11px] line-through text-red-300/50">
                                  {formatVND(item.product.originalPrice)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="sm:col-span-2 flex items-center justify-between sm:justify-center">
                              <span className="sm:hidden text-xs text-red-200/70">Số lượng:</span>
                              <div className="inline-flex items-center rounded-xl bg-red-950/90 p-1 shadow-inner border border-amber-500/20">
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, -1)}
                                  aria-label="Giảm số lượng"
                                  className="w-7 h-7 rounded-lg bg-red-900/50 hover:bg-amber-500/20 text-amber-300 flex items-center justify-center transition-all duration-200 active:scale-95 text-xs font-bold cursor-pointer"
                                >
                                  <i className="fa-solid fa-minus"></i>
                                </button>
                                <span className="w-10 text-center bg-transparent text-sm font-bold text-amber-200 select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQuantity(item.id, 1)}
                                  aria-label="Tăng số lượng"
                                  className="w-7 h-7 rounded-lg bg-red-900/50 hover:bg-amber-500/20 text-amber-300 flex items-center justify-center transition-all duration-200 active:scale-95 text-xs font-bold cursor-pointer"
                                >
                                  <i className="fa-solid fa-plus"></i>
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="hidden sm:block sm:col-span-2 text-right">
                              <span className="text-base font-bold text-amber-300 tracking-tight font-serif-tet">
                                {formatVND(itemSubtotal)}
                              </span>
                              <div className="text-[10px] text-emerald-400 font-medium">Bảo hiểm 100%</div>
                            </div>

                            {/* Delete Action */}
                            <div className="sm:col-span-1 flex justify-end sm:justify-center">
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Xóa sản phẩm"
                                className="w-8 h-8 rounded-full flex items-center justify-center text-red-300/60 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer"
                                title="Xóa tuyệt phẩm này"
                              >
                                <i className="fa-regular fa-trash-can text-sm"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Back to Catalog & Clear Cart Actions */}
                  <div className="pt-5 flex flex-wrap items-center justify-between gap-4 border-t border-amber-500/20">
                    <button
                      onClick={() => navigateTo('catalog')}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 hover:text-amber-100 transition-colors group cursor-pointer"
                    >
                      <span className="w-7 h-7 rounded-full bg-amber-400/10 flex items-center justify-center group-hover:-translate-x-1 transition-transform">
                        <i className="fa-solid fa-arrow-left text-xs"></i>
                      </span>
                      <span>Tiếp tục chọn thêm tuyệt phẩm quà Tết</span>
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="text-xs text-red-300/60 hover:text-red-200 transition-colors underline decoration-red-400/30 underline-offset-4 cursor-pointer"
                    >
                      Làm trống giỏ hàng
                    </button>
                  </div>
                </div>

                {/* Voucher Section */}
                <div className="bg-gradient-to-br from-red-950/70 via-red-900/40 to-red-950/70 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md border border-amber-500/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300">
                        <i className="fa-solid fa-tag text-sm"></i>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-amber-200 tracking-wide uppercase">
                          Mã Ưu Đãi Doanh Nghiệp & Tri Ân
                        </h4>
                        <p className="text-xs text-red-200/70">
                          Nhập mã ưu đãi B2B để hưởng chính sách chiết khấu tối đa
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                      Mùa Tết Đinh Mùi 2027
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        placeholder="Nhập mã ưu đãi doanh nghiệp (VD: TET2027, B2BVIP)..."
                        className="w-full bg-red-950/90 text-amber-100 placeholder-red-300/40 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium tracking-wider focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner uppercase border border-amber-500/20"
                      />
                      {couponApplied && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <i className="fa-solid fa-circle-check"></i> ĐÃ NHẬP
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-red-950 font-bold text-xs uppercase tracking-wider hover:from-amber-300 hover:to-amber-200 active:scale-95 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap cursor-pointer"
                    >
                      Áp Dụng
                    </button>
                  </div>

                  {cartTotals.isB2BDiscountActive && (
                    <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-transparent flex items-start gap-3 border border-amber-500/20">
                      <span className="text-base text-amber-300 leading-none mt-0.5">🏮</span>
                      <div className="text-xs text-amber-200 leading-relaxed">
                        <span className="font-bold text-amber-300">Đã kích hoạt ưu đãi doanh nghiệp:</span>{' '}
                        Chiết khấu bậc thang{' '}
                        <span className="font-extrabold text-amber-100 bg-amber-500/20 px-1.5 py-0.5 rounded">
                          {cartTotals.discountPercentage}%
                        </span>{' '}
                        cho đơn hàng từ {cartTotals.totalBoxes >= 50 ? '50' : '20'} hộp trở lên (Đã áp dụng tự động cho giỏ hàng).
                      </div>
                    </div>
                  )}
                </div>

                {/* Assurance Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  <div className="p-4 rounded-xl bg-red-950/40 backdrop-blur-sm flex items-start gap-3 border border-amber-500/15">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0 text-sm">
                      <i className="fa-solid fa-certificate"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-200">100% Chính Hãng</div>
                      <div className="text-[11px] text-red-200/60 leading-snug mt-0.5">
                        Nông sản OCOP, thảo mộc tuyển chọn và rượu nhập khẩu nguyên chai.
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-950/40 backdrop-blur-sm flex items-start gap-3 border border-amber-500/15">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0 text-sm">
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-200">Đóng Gói Cung Đình</div>
                      <div className="text-[11px] text-red-200/60 leading-snug mt-0.5">
                        Sơn mài đa lớp và khay lụa tơ tằm nâng niu trọn vẹn từng phẩm vật Tết.
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-950/40 backdrop-blur-sm flex items-start gap-3 border border-amber-500/15">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center shrink-0 text-sm">
                      <i className="fa-solid fa-truck-fast"></i>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-200">Giao Toàn Quốc</div>
                      <div className="text-[11px] text-red-200/60 leading-snug mt-0.5">
                        Phân phối nhiều điểm cho nhân sự và đối tác theo danh sách yêu cầu.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary Card (4 cols) */}
              <div className="lg:col-span-4 sticky top-20">
                <div className="relative bg-gradient-to-b from-red-950/90 via-[#4e090e]/90 to-red-950/95 rounded-2xl p-6 shadow-2xl backdrop-blur-xl overflow-hidden border border-amber-500/30">
                  <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
                      <h2 className="text-base font-extrabold uppercase tracking-wider text-amber-200 font-serif-tet flex items-center gap-2">
                        <i className="fa-solid fa-receipt text-amber-400 text-sm"></i>
                        <span>Tóm Tắt Đơn Hàng</span>
                      </h2>
                      <span className="text-[10px] uppercase font-bold text-amber-400/90 bg-amber-400/15 px-2 py-0.5 rounded-full">
                        {cartItems.length} Mục Quà
                      </span>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-3.5 py-4 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-red-100/80">
                        <span>Tạm tính ({cartTotals.totalBoxes} hộp):</span>
                        <span className="font-bold text-amber-100">
                          {formatVND(cartTotals.subtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <i className="fa-solid fa-tag text-[11px]"></i>
                          Chiết khấu doanh nghiệp ({cartTotals.discountPercentage}%):
                        </span>
                        <span className="font-bold">
                          - {formatVND(cartTotals.discountAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-red-100/80">
                        <span>Phí vận chuyển:</span>
                        <span className="font-bold text-amber-300 flex items-center gap-1">
                          <i className="fa-solid fa-bolt text-xs text-amber-400"></i> Miễn phí (0 ₫)
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-red-100/80">
                        <span>Thiệp chúc mừng Đinh Mùi 2027:</span>
                        <span className="font-semibold text-amber-300">Tặng kèm (0 ₫)</span>
                      </div>
                    </div>

                    {/* Total Box */}
                    <div className="pt-4 pb-2">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/60 to-red-950/80 shadow-inner border border-amber-500/20 text-center">
                        <div className="text-[11px] uppercase tracking-wider text-amber-300/70 font-semibold mb-1">
                          Tổng Tiền Thanh Toán (Đã bao gồm VAT)
                        </div>
                        <div className="text-2xl sm:text-3xl font-black font-serif-tet gold-gradient-text tracking-tight">
                          {formatVND(cartTotals.grandTotal)}
                        </div>
                        <div className="text-[11px] text-amber-200/60 mt-1 italic leading-snug">
                          (Đã bao gồm thuế VAT 8% • Hỗ trợ xuất hóa đơn điện tử trong ngày)
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-5">
                      <button
                        onClick={() => navigateTo('checkout')}
                        className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <i className="fa-solid fa-lock text-sm"></i>
                        <span>Tiến Hành Thanh Toán</span>
                      </button>

                      <button
                        onClick={() => navigateTo('corporate')}
                        className="w-full py-3.5 px-6 rounded-full bg-red-950/80 hover:bg-red-900/80 text-amber-200 hover:text-amber-100 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2 border border-amber-500/20 cursor-pointer"
                      >
                        <i className="fa-solid fa-file-contract text-amber-400"></i>
                        <span>Yêu Cầu Báo Giá & Hợp Đồng B2B</span>
                      </button>
                    </div>

                    {/* Guarantees */}
                    <div className="mt-6 pt-5 space-y-2 text-[11px] text-red-200/70 border-t border-amber-500/15">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400">✔</span>
                        <span>Bảo chứng hoàn hảo 100% từng hộp quà trao tay</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400">✔</span>
                        <span>Đổi trả minh bạch 1:1 tận nơi nếu có phát sinh</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400">✔</span>
                        <span>Hỗ trợ thiết kế thiệp Tết & túi xách cao cấp miễn phí</span>
                      </div>
                    </div>

                    {/* Secure stamp */}
                    <div className="mt-5 pt-4 text-center">
                      <div className="text-[10px] uppercase tracking-widest text-amber-400/70 font-semibold mb-2">
                        Thanh toán bảo mật chuẩn SSL 256-bit
                      </div>
                      <div className="inline-flex items-center gap-3 text-red-200/60 text-base">
                        <i className="fa-brands fa-cc-visa hover:text-amber-300 transition-colors"></i>
                        <i className="fa-brands fa-cc-mastercard hover:text-amber-300 transition-colors"></i>
                        <i className="fa-solid fa-qrcode hover:text-amber-300 transition-colors"></i>
                        <i className="fa-solid fa-building-columns hover:text-amber-300 transition-colors"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Hotline Card */}
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 flex items-center justify-between gap-3 text-xs border border-amber-500/20">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-phone-volume animate-pulse"></i>
                    </span>
                    <div>
                      <div className="text-[11px] text-amber-200/80">Cần tư vấn cho đơn trên 50 hộp?</div>
                      <div className="font-bold text-amber-300 text-sm">Hotline: 1900 8866</div>
                    </div>
                  </div>
                  <a
                    href="tel:19008866"
                    className="px-3 py-1.5 rounded-lg bg-amber-400 text-red-950 font-bold text-[11px] hover:bg-amber-300 transition-colors uppercase whitespace-nowrap"
                  >
                    Gọi Ngay
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
