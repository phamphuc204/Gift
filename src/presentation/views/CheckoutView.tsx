'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';
import { formatVND } from '../../domain/pricing';
import type { Order } from '../../domain/types';

export const CheckoutView: React.FC = () => {
  const { cartItems, cartTotals, navigateTo, showToast, clearCart, couponCode, couponApplied, } = useApp();

  const [form, setForm] = useState({
    recipientName: 'Nguyễn Hoàng Nam',
    phone: '0988 234 567',
    email: 'hoangnam.b2b@vietcorp.vn',
    city: 'Hà Nội',
    district: 'Quận Hoàn Kiếm',
    address: 'Tầng 15, Tòa tháp Capital Tower, 109 Trần Hưng Đạo',
    deliveryTime: 'Giao trước ngày 23 Tháng Chạp (Tết Ông Táo) - Ưu tiên hàng đầu',
    // Corporate Requirements
    requireVat: true,
    companyName: 'Công Ty CP Tập Đoàn Đầu Tư & Thương Mại Việt Nam',
    taxCode: '0108928392',
    companyAddress: '109 Trần Hưng Đạo, P. Cửa Nam, Quận Hoàn Kiếm, TP. Hà Nội',
    invoiceEmail: 'ketoan@vietcorp.vn',
    giftCard: true,
    customNotes:
      'Giao kèm 25 túi xách lụa đỏ đồng bộ và phong bao lì xì Đinh Mùi 2027.',
    paymentMethod: 'vietqr' as 'vietqr' | 'cod' | 'b2b-contract',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderCode, setCompletedOrderCode] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast('Giỏ hàng đang trống. Vui lòng chọn sản phẩm.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Lấy sessionId đã được AppContext lưu trong localStorage
      const sessionId = localStorage.getItem('elegift_session_id');

      if (!sessionId) {
        throw new Error('Không tìm thấy phiên giỏ hàng. Vui lòng tải lại trang.');
      }

      // Gửi thông tin đặt hàng đến Backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,

          // Thông tin người nhận
          recipientName: form.recipientName,
          phone: form.phone,
          email: form.email,

          // Địa chỉ giao hàng
          city: form.city,
          district: form.district,
          address: form.address,

          // Thời gian giao hàng
          deliveryTime: form.deliveryTime,

          // Hóa đơn VAT
          requireVat: form.requireVat,
          companyName: form.companyName,
          taxCode: form.taxCode,
          companyAddress: form.companyAddress,
          invoiceEmail: form.invoiceEmail,

          // Thiệp chúc Tết
          giftCard: form.giftCard,

          // Ghi chú
          customNotes: form.customNotes,

          // Thanh toán
          paymentMethod: form.paymentMethod,
          couponCode: couponApplied ? couponCode : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Đặt hàng thất bại. Vui lòng thử lại.'
        );
      }

      // Backend trả về thông tin đơn hàng
      const order = result.data?.order ?? result.data;

      if (!order?.orderCode) {
        throw new Error('Đơn hàng đã được xử lý nhưng không nhận được mã đơn.');
      }
      // Xóa giỏ hàng trên Frontend sau khi Backend xác nhận thành công
      clearCart();
      setCompletedOrder(order);
      // Cập nhật giao diện thành công
      setCompletedOrderCode(order.orderCode);

      showToast('Đặt hàng thành công!', 'success');

    } catch (error) {
      console.error('Lỗi đặt hàng:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Có lỗi xảy ra khi đặt hàng.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrderCode) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-b from-red-950/90 via-[#45090e]/90 to-red-950/95 border border-amber-400/40 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl gold-card-shadow">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-500 text-red-950 text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
            <i className="fa-solid fa-check"></i>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full">
            ĐẶT HÀNG THÀNH CÔNG • MÙA TẾT ĐINH MÙI 2027
          </span>
          <h2 className="text-3xl font-black font-serif-tet gold-gradient-text mt-3 mb-2">
            Thành Kính Tri Ân Quý Doanh Nghiệp!
          </h2>
          <p className="text-sm text-red-100/90 max-w-xl mx-auto leading-relaxed mb-6">
            Đơn quà Tết của Quý khách đã được tiếp nhận với mã đơn{' '}
            <strong className="text-amber-300 font-mono text-base">{completedOrderCode}</strong>. Chuyên viên
            tư vấn VIP EleGift sẽ liên hệ xác nhận lịch giao nhận và mẫu thiệp chúc Tết trong vòng 15 phút.
          </p>

          <div className="p-4 rounded-xl bg-red-950/60 border border-amber-500/20 max-w-md mx-auto mb-8 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-red-200/70">Người nhận:</span>
              <span className="font-bold text-white">{form.recipientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200/70">Số điện thoại:</span>
              <span className="font-bold text-white">{form.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-200/70">Địa chỉ giao:</span>
              <span className="font-bold text-white truncate max-w-[240px]">{form.address}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-amber-500/15">
              <span className="text-amber-300 font-semibold">Tổng thanh toán:</span>
              <span className="font-bold text-amber-300 font-serif-tet">
                {formatVND(completedOrder?.grandTotal ?? 0)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('account')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:from-amber-300 hover:to-amber-400 transition cursor-pointer"
            >
              <i className="fa-solid fa-box-archive mr-2"></i>
              Xem Quản Lý Đơn Hàng
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-red-950/80 border border-amber-500/30 text-amber-200 hover:text-white font-semibold text-xs transition cursor-pointer"
            >
              Về Trang Chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                className="text-amber-200/60 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Trang Chủ
              </button>
              <span className="text-amber-200/60">/</span>
              <button
                onClick={() => navigateTo('cart')}
                className="text-amber-200/60 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Giỏ Hàng
              </button>
              <span className="text-amber-200/60">/</span>
              <span className="text-amber-300 font-semibold tracking-wide">Thanh Toán Đơn Hàng</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
              <i className="fa-solid fa-shield-halved text-emerald-400"></i>
              <span>Bảo Mật Giao Dịch SSL 256-Bit • Sẵn Sàng Giao Ngay</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8">
        <form onSubmit={handleSubmit} className="flex flex-col w-full text-red-50">
          {/* Header Banner */}
          <div className="relative w-full mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/80 via-[#5a0c12]/80 to-red-950/80 p-6 md:p-8 shadow-2xl backdrop-blur-md border border-amber-500/20">
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
                  TIẾN HÀNH ĐẶT QUÀ TẾT ĐINH MÙI 2027
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-tet tracking-tight gold-gradient-text leading-tight">
                  Thanh Toán & Đặt Quà Tết An Khang
                </h1>
                <p className="text-xs sm:text-sm text-red-200/80 mt-1.5 max-w-2xl font-light leading-relaxed">
                  Vui lòng điền đầy đủ thông tin nhận quà và yêu cầu doanh nghiệp để chúng tôi phục vụ chu đáo nhất.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="px-4 py-2.5 rounded-xl bg-red-900/40 text-right backdrop-blur-sm shadow-inner border border-amber-500/20">
                  <div className="text-[11px] uppercase tracking-wider text-amber-300/80 font-medium">
                    Trạng Thái Đơn Hàng
                  </div>
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

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Sections (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-red-950/60 border border-amber-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-xl space-y-8">
                {/* 1. Recipient Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/20">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-truck-fast text-sm"></i>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-amber-200 font-serif-tet uppercase tracking-wide">
                        1. Thông Tin Người Nhận & Địa Chỉ Giao Quà
                      </h2>
                      <p className="text-xs text-red-200/70">
                        Đơn vị hỗ trợ chia tách giao nhiều chi nhánh hoặc giao trực tiếp văn phòng
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                        <i className="fa-regular fa-user text-[11px] text-amber-400"></i>
                        Họ và tên người đặt / Đại diện nhận quà <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.recipientName}
                        onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 placeholder-red-300/40 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                        <i className="fa-solid fa-phone-volume text-[11px] text-amber-400"></i>
                        Số điện thoại / Zalo nhận đơn <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Ví dụ: 0912 345 678"
                        className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 placeholder-red-300/40 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                      <i className="fa-regular fa-envelope text-[11px] text-amber-400"></i>
                      Email nhận xác nhận & hợp đồng B2B <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Ví dụ: corporate@company.com.vn"
                      className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 placeholder-red-300/40 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-amber-200">
                        Tỉnh / Thành phố <span className="text-amber-400">*</span>
                      </label>
                      <select
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner cursor-pointer"
                      >
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Bình Dương">Bình Dương</option>
                        <option value="Tỉnh thành khác">Tỉnh thành khác...</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-amber-200">
                        Quận / Huyện <span className="text-amber-400">*</span>
                      </label>
                      <select
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner cursor-pointer"
                      >
                        <option value="Quận Hoàn Kiếm">Quận Hoàn Kiếm</option>
                        <option value="Quận Ba Đình">Quận Ba Đình</option>
                        <option value="Quận Hai Bà Trưng">Quận Hai Bà Trưng</option>
                        <option value="Quận Cầu Giấy">Quận Cầu Giấy</option>
                        <option value="Quận 1 (TP.HCM)">Quận 1 (TP.HCM)</option>
                        <option value="Quận 3 (TP.HCM)">Quận 3 (TP.HCM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-amber-200">
                      Địa chỉ cụ thể (Số nhà, tòa nhà, tên công ty) <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Ví dụ: Tầng 12, Tòa nhà Vincom Center, 191 Bà Triệu"
                      className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 placeholder-red-300/40 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-amber-200 flex items-center gap-1.5">
                      <i className="fa-regular fa-clock text-[11px] text-amber-400"></i>
                      Khung thời gian nhận quà Tết mong muốn
                    </label>
                    <select
                      value={form.deliveryTime}
                      onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                      className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner cursor-pointer"
                    >
                      <option value="Giao trước ngày 23 Tháng Chạp (Tết Ông Táo) - Ưu tiên hàng đầu">
                        Giao trước ngày 23 Tháng Chạp (Tết Ông Táo) - Ưu tiên hàng đầu
                      </option>
                      <option value="Giao giai đoạn 24 - 27 Tháng Chạp (Đúng đợt tổng kết năm)">
                        Giao giai đoạn 24 - 27 Tháng Chạp (Đúng đợt tổng kết năm)
                      </option>
                      <option value="Giao hỏa tốc trong 24 giờ">Giao hỏa tốc trong 24 giờ</option>
                      <option value="Giao định kỳ theo danh sách nhiều chi nhánh (Hotline sẽ liên hệ)">
                        Giao định kỳ theo danh sách nhiều chi nhánh (Hotline sẽ liên hệ)
                      </option>
                    </select>
                  </div>
                </div>

                {/* 2. Enterprise Requirements */}
                <div className="space-y-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/20">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-stamp text-sm"></i>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-amber-200 font-serif-tet uppercase tracking-wide">
                        2. Yêu Cầu Doanh Nghiệp & Dịch Vụ Quà Tết
                      </h2>
                      <p className="text-xs text-red-200/70">
                        Đặc quyền tối ưu dành riêng cho các đơn vị, tổ chức đặt quà số lượng lớn
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {/* VAT Checkbox */}
                    <div className="p-3.5 rounded-xl bg-red-900/30 border border-amber-500/20 space-y-3">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.requireVat}
                          onChange={(e) => setForm({ ...form, requireVat: e.target.checked })}
                          className="mt-1 rounded border-amber-400 text-amber-500 focus:ring-0 bg-red-950/90 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-amber-100">
                            Xuất hóa đơn giá trị gia tăng (VAT 8%) cho công ty
                          </span>
                          <p className="text-[11px] text-red-200/70 mt-0.5">
                            Phát hành hóa đơn điện tử hợp lệ ngay trong ngày giao dịch thành công.
                          </p>
                        </div>
                      </label>

                      {form.requireVat && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-amber-200">
                              Tên Công Ty / Doanh Nghiệp
                            </span>
                            <input
                              type="text"
                              value={form.companyName}
                              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                              className="w-full bg-red-950/80 border border-amber-500/20 text-amber-100 px-3 py-2 rounded-lg text-xs focus:outline-none"
                            />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] font-semibold text-amber-200">
                              Mã Số Thuế (MST)
                            </span>
                            <input
                              type="text"
                              value={form.taxCode}
                              onChange={(e) => setForm({ ...form, taxCode: e.target.value })}
                              className="w-full bg-red-950/80 border border-amber-500/20 text-amber-100 px-3 py-2 rounded-lg text-xs focus:outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <span className="text-[11px] font-semibold text-amber-200">
                              Địa Chỉ Đăng Ký Kinh Doanh
                            </span>
                            <input
                              type="text"
                              value={form.companyAddress}
                              onChange={(e) => setForm({ ...form, companyAddress: e.target.value })}
                              className="w-full bg-red-950/80 border border-amber-500/20 text-amber-100 px-3 py-2 rounded-lg text-xs focus:outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2 space-y-1">
                            <span className="text-[11px] font-semibold text-amber-200">
                              Email Nhận Hóa Đơn Điện Tử (E-Invoice)
                            </span>
                            <input
                              type="email"
                              value={form.invoiceEmail}
                              onChange={(e) => setForm({ ...form, invoiceEmail: e.target.value })}
                              className="w-full bg-red-950/80 border border-amber-500/20 text-amber-100 px-3 py-2 rounded-lg text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Executive Gift Card */}
                    <div className="p-3.5 rounded-xl bg-red-900/20 border border-amber-500/20">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.giftCard}
                          onChange={(e) => setForm({ ...form, giftCard: e.target.checked })}
                          className="mt-1 rounded border-amber-400 text-amber-500 focus:ring-0 bg-red-950/90 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-amber-100">
                              Kèm thiệp chúc Tết thiết kế riêng & in lời chúc từ Ban Lãnh Đạo
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded">
                              Tặng Kèm
                            </span>
                          </div>
                          <p className="text-[11px] text-red-200/70 mt-0.5">
                            Chất liệu giấy mỹ thuật ánh trai cao cấp dập nổi hoa văn mùa xuân Đinh Mùi 2027.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Notes / Special Instructions */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-amber-200">
                        Lời chúc mừng năm mới hoặc ghi chú giao hàng
                      </label>
                      <textarea
                        rows={2}
                        value={form.customNotes}
                        onChange={(e) => setForm({ ...form, customNotes: e.target.value })}
                        placeholder="Ví dụ: Chia 15 hộp chuyển địa chỉ trụ sở Hà Nội, 10 hộp chuyển chi nhánh Đà Nẵng..."
                        className="w-full bg-red-950/90 border border-amber-500/25 text-amber-100 placeholder-red-300/40 p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Methods */}
                <div className="space-y-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/20">
                    <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-lock text-sm"></i>
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-amber-200 font-serif-tet uppercase tracking-wide">
                        3. Phương Thức Thanh Toán Linh Hoạt
                      </h2>
                      <p className="text-xs text-red-200/70">
                        Hệ thống thanh toán bảo mật chuẩn SSL 256-bit & hợp đồng kinh tế minh bạch
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Method 1: VietQR */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition cursor-pointer shadow-md ${
                        form.paymentMethod === 'vietqr'
                          ? 'bg-gradient-to-r from-red-900/60 to-red-950/80 border-amber-400'
                          : 'bg-red-950/40 border-amber-500/20 hover:border-amber-400/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={form.paymentMethod === 'vietqr'}
                        onChange={() => setForm({ ...form, paymentMethod: 'vietqr' })}
                        className="mt-1 text-amber-400 focus:ring-0 bg-red-950 w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-amber-100">
                              Chuyển khoản ngân hàng qua mã QR (VietQR / Napas 247)
                            </span>
                            <span className="text-[10px] font-bold bg-amber-400 text-red-950 px-2 py-0.5 rounded-full">
                              Khuyên dùng
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-amber-300">
                            <i className="fa-solid fa-qrcode"></i>
                            <i className="fa-solid fa-building-columns"></i>
                          </div>
                        </div>
                        <p className="text-xs text-red-200/70 mt-1">
                          Quét mã QR tự động điền số tiền và nội dung, xác nhận đơn lập tức không cần chụp sao kê.
                        </p>
                      </div>
                    </label>

                    {/* Method 2: COD */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border transition cursor-pointer ${
                        form.paymentMethod === 'cod'
                          ? 'bg-gradient-to-r from-red-900/60 to-red-950/80 border-amber-400'
                          : 'bg-red-950/40 border-amber-500/20 hover:border-amber-400/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={form.paymentMethod === 'cod'}
                        onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                        className="mt-1 text-amber-400 focus:ring-0 bg-red-950 w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs sm:text-sm font-bold text-amber-100">
                            Thanh toán khi nhận hàng (COD)
                          </span>
                          <span className="text-xs text-amber-300/80 font-medium">
                            <i className="fa-solid fa-truck-fast mr-1"></i>Giao tận nơi
                          </span>
                        </div>
                        <p className="text-xs text-red-200/70 mt-1">
                          Kiểm tra tem bảo chứng, độ hoàn thiện nước sơn mài và số lượng hộp quà trước khi thanh toán.
                        </p>
                      </div>
                    </label>

                    {/* Method 3: B2B Contract */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-xl border transition cursor-pointer ${
                        form.paymentMethod === 'b2b-contract'
                          ? 'bg-gradient-to-r from-red-900/60 to-red-950/80 border-amber-400'
                          : 'bg-red-950/40 border-amber-500/20 hover:border-amber-400/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        checked={form.paymentMethod === 'b2b-contract'}
                        onChange={() => setForm({ ...form, paymentMethod: 'b2b-contract' })}
                        className="mt-1 text-amber-400 focus:ring-0 bg-red-950 w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-amber-100">
                              Thanh toán công nợ / Hợp đồng Doanh Nghiệp (B2B Priority)
                            </span>
                            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                              Dành cho Tập đoàn
                            </span>
                          </div>
                          <i className="fa-solid fa-file-contract text-sm text-amber-400"></i>
                        </div>
                        <p className="text-xs text-red-200/70 mt-1">
                          Ký kết hợp đồng thương mại điện tử, thanh toán đặt cọc 30% - 50% và quyết toán sau khi nghiệm thu.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (4 Cols) */}
            <div className="lg:col-span-4 sticky top-20 space-y-4">
              <div className="bg-gradient-to-b from-red-950/95 via-[#4e090e]/95 to-red-950/95 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-400/15 blur-2xl pointer-events-none"></div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                    <h2 className="text-base font-extrabold uppercase tracking-wider text-amber-200 font-serif-tet flex items-center gap-2">
                      <i className="fa-solid fa-receipt text-amber-400 text-sm"></i>
                      <span>Tóm Tắt Đơn Quà Tết</span>
                    </h2>
                    <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-full">
                      {cartTotals.totalBoxes} Hộp Tổng
                    </span>
                  </div>

                  {/* Mini Items List */}
                  <div className="space-y-3 pb-3 border-b border-amber-500/20 text-xs">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-red-900/60 border border-amber-500/20 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-amber-100 truncate font-serif-tet">
                            {item.product.name}
                          </div>
                          <div className="text-[11px] text-red-200/70 truncate">
                            SL: {item.quantity} hộp • {item.selectedVariantLabel || 'Đỏ Phú Quý'}
                          </div>
                        </div>
                        <div className="text-right font-bold text-amber-300 font-serif-tet">
                          {formatVND(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-2.5 text-xs text-red-100/80">
                    <div className="flex items-center justify-between">
                      <span>Tạm tính ({cartTotals.totalBoxes} hộp):</span>
                      <span className="font-bold text-amber-100">
                        {formatVND(cartTotals.subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400">
                      <span>Chiết khấu B2B ({cartTotals.discountPercentage}% mã TET2027):</span>
                      <span className="font-bold">
                        - {formatVND(cartTotals.discountAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Phí vận chuyển hỏa tốc:</span>
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <i className="fa-solid fa-bolt text-xs text-amber-400"></i> Miễn phí (0 ₫)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Thiệp chúc mừng Đinh Mùi 2027:</span>
                      <span className="font-semibold text-amber-300">Tặng kèm (0 ₫)</span>
                    </div>
                  </div>

                  {/* Total Box */}
                  <div className="pt-2">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-900/60 to-red-950/80 border border-amber-500/25 shadow-inner text-center">
                      <div className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold mb-1">
                        Tổng Tiền Thanh Toán (Đã bao gồm VAT 8%)
                      </div>
                      <div className="text-2xl sm:text-3xl font-black font-serif-tet gold-gradient-text tracking-tight">
                        {formatVND(cartTotals.grandTotal)}
                      </div>
                      <div className="text-[10px] text-amber-200/60 mt-1 italic">
                        (Tiết kiệm {formatVND(cartTotals.discountAmount)} • Hỗ trợ xuất HĐĐT trong ngày)
                      </div>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || cartItems.length === 0}
                      className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <i className="fa-solid fa-lock text-xs"></i>
                        <span>{isSubmitting ? 'ĐANG XỬ LÝ...' : 'HOÀN TẤT ĐẶT HÀNG'}</span>
                      </div>
                      <span className="text-[10px] font-normal opacity-80 mt-0.5 lowercase font-sans">
                        bảo chứng chất lượng & bảo mật tuyệt đối
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateTo('cart')}
                      className="w-full py-2.5 px-4 rounded-full bg-red-950/80 hover:bg-red-900/80 border border-amber-500/30 text-amber-200 hover:text-white text-xs font-semibold text-center block transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-arrow-left mr-1.5 text-[10px]"></i>
                      Quay lại chỉnh sửa giỏ hàng
                    </button>
                  </div>

                  {/* Assurances */}
                  <div className="pt-3 space-y-2 text-[11px] text-red-200/70 border-t border-amber-500/15">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>Tư vấn viên gọi điện xác nhận đơn & lịch giao nhận trong 15 phút.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>Miễn phí đổi trả 1:1 ngay tận nơi nếu có bất kỳ lỗi vận chuyển.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400">✔</span>
                      <span>Hỗ trợ gửi hợp đồng kinh tế và hóa đơn đỏ bản cứng tận văn phòng.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Helpline Card */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-sm shrink-0">
                    <i className="fa-solid fa-phone-volume animate-pulse"></i>
                  </span>
                  <div>
                    <div className="text-[11px] text-amber-200/80">Cần hỗ trợ hợp đồng B2B gấp?</div>
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

          {/* Bottom 3 Commitments */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10">
            <div className="p-5 rounded-2xl bg-red-950/50 border border-amber-500/20 backdrop-blur-sm flex items-start gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0 text-base">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200 font-serif-tet">
                  Bảo Mật Thông Tin Doanh Nghiệp
                </div>
                <div className="text-xs text-red-200/70 leading-relaxed mt-1">
                  Cam kết bảo mật 100% dữ liệu đối tác, danh sách khách hàng và thông tin dự án B2B.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-950/50 border border-amber-500/20 backdrop-blur-sm flex items-start gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0 text-base">
                <i className="fa-solid fa-file-contract"></i>
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200 font-serif-tet">
                  Xuất Hóa Đơn VAT Chuẩn Chỉnh
                </div>
                <div className="text-xs text-red-200/70 leading-relaxed mt-1">
                  Hóa đơn điện tử hợp lệ 8% xuất theo danh mục quà tặng doanh nghiệp gửi trong ngày.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-950/50 border border-amber-500/20 backdrop-blur-sm flex items-start gap-3.5 shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 text-amber-300 flex items-center justify-center shrink-0 text-base">
                <i className="fa-solid fa-clock"></i>
              </div>
              <div>
                <div className="text-sm font-bold text-amber-200 font-serif-tet">
                  Tư Vấn Xác Nhận Trong 15 Phút
                </div>
                <div className="text-xs text-red-200/70 leading-relaxed mt-1">
                  Hotline VIP và chuyên viên phục vụ xuyên suốt mùa Tết Đinh Mùi 2027 24/7.
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
