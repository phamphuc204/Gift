'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../application/AppContext';

export const AuthView: React.FC = () => {
  const { currentUser, login, register, logout, navigateTo, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'b2b' | 'personal'>('b2b');

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState<string>('van.a@vingroup.net');
  const [loginPassword, setLoginPassword] = useState<string>('EleGift@2027');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Form states - Register
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regCompanyName, setRegCompanyName] = useState<string>('');
  const [regTaxCode, setRegTaxCode] = useState<string>('');
  const [regPosition, setRegPosition] = useState<string>('');
  const [regCity, setRegCity] = useState<string>('Hà Nội');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [showRegPassword, setShowRegPassword] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  // Forgot Password modal state
  const [isForgotModalOpen, setIsForgotModalOpen] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      showToast('Vui lòng nhập Email hoặc Mã số thuế của bạn!', 'error');
      return;
    }
    login(loginEmail, loginPassword, role, rememberMe);
    navigateTo('account');
  };

  const handleQuickDemoLogin = () => {
    login('van.a@vingroup.net', 'EleGift@2027', 'b2b', true);
    navigateTo('account');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên và Email!', 'error');
      return;
    }
    if (role === 'b2b' && (!regCompanyName.trim() || !regTaxCode.trim())) {
      showToast('Quý doanh nghiệp vui lòng nhập Tên công ty và Mã số thuế!', 'error');
      return;
    }
    if (regPassword.length < 6) {
      showToast('Mật khẩu cần tối thiểu 6 ký tự để bảo mật!', 'error');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast('Mật khẩu xác nhận không khớp, vui lòng kiểm tra lại!', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('Vui lòng đồng ý với Điều khoản dịch vụ và chính sách của EleGift!', 'error');
      return;
    }

    register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      role: role,
      companyName: regCompanyName,
      taxCode: regTaxCode,
      position: regPosition || (role === 'b2b' ? 'Đại diện thu mua' : undefined),
      city: regCity,
    });
    navigateTo('account');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('Vui lòng nhập email tài khoản của bạn!', 'error');
      return;
    }
    showToast(`Đã gửi liên kết khôi phục mật khẩu đến: ${forgotEmail}`, 'info');
    setIsForgotModalOpen(false);
    setForgotEmail('');
  };

  return (
    <div className="w-full bg-[#1e0507] text-[#ffdadb] min-h-screen pb-24">
      {/* Top Breadcrumbs */}
      <section className="relative bg-gradient-to-b from-[#4a080c] to-[#2a0505] border-b border-amber-600/20 py-3.5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-200/70">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trang Chủ
            </button>
            <span>/</span>
            <span className="text-amber-300 font-bold tracking-wide">
              {mode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Thành Viên'}
            </span>
          </div>

          <div className="text-amber-500/25 text-xl font-serif select-none hidden md:block">
            ❖
          </div>
        </div>
      </section>

      {/* Main Workspace Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* If user is already logged in, show status alert */}
        {currentUser && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-red-950 flex items-center justify-center font-bold font-serif-tet">
                {currentUser.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-amber-200/80">Bạn đang đăng nhập với tài khoản:</p>
                <p className="text-sm font-bold text-white">
                  {currentUser.name}{' '}
                  {currentUser.companyName && (
                    <span className="text-amber-300">({currentUser.companyName})</span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigateTo('account')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 font-bold text-xs uppercase cursor-pointer hover:brightness-110 shadow-md"
              >
                Vào Quản Lý Đơn Hàng →
              </button>
              <button
                type="button"
                onClick={logout}
                className="px-3.5 py-2 rounded-xl border border-red-400/40 text-red-200 hover:bg-red-950/60 text-xs font-semibold cursor-pointer"
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: Privileges & Heritage Showcase (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-b from-[#3a0a0e] via-[#280507] to-[#1a0405] border border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              {/* Brand Lockup */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 text-red-950">
                  <i className="fa-solid fa-gift text-lg"></i>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-black font-serif-tet text-white tracking-wide">
                      EleGift
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-400 text-red-950 text-[10px] font-black uppercase">
                      TẾT 2027
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300/80 ">
                    Cổng Đặc Quyền Doanh Nghiệp & VIP
                  </span>
                </div>
              </div>

              {/* Title & Introduction */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-serif-tet gold-gradient-text leading-tight mb-3">
                  Đặc Quyền Hội Viên & Doanh Nghiệp VIP
                </h1>
                <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
                  Chào mừng Quý khách đến với hệ thống đặt quà Tết Đinh Mùi 2027. Đăng nhập để kích hoạt
                  bảng chiết khấu dự án đến 25%, kiểm định tiến độ đóng gói và tải hóa đơn GTGT điện tử tức thì.
                </p>
              </div>

              {/* 4 Golden Benefits */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i className="fa-solid fa-percent"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">Chiết Khấu Dự Án Lên Đến 25%</h4>
                    <p className="text-[11px] text-amber-100/70">
                      Tự động áp dụng chiết khấu bậc thang theo số lượng hộp quà đặt trước.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i className="fa-solid fa-box-open"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">Đóng Gói Thủ Công & Thiệp Mừng 2027</h4>
                    <p className="text-[11px] text-amber-100/70">
                      Sơn mài 7 lớp hoàng gia, lót lụa tơ tằm và in thiệp chúc riêng của Ban Lãnh Đạo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">Hóa Đơn GTGT & Hợp Đồng Hợp Lệ 100%</h4>
                    <p className="text-[11px] text-amber-100/70">
                      Minh bạch pháp lý, hóa đơn điện tử VAT 8% và hợp đồng kinh tế theo quy chuẩn tài chính.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-red-950/60 border border-amber-500/20 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    <i className="fa-solid fa-truck-fast"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-200">Giao Hỏa Tốc 63 Tỉnh Thành</h4>
                    <p className="text-[11px] text-amber-100/70">
                      Mạng lưới phân tán chuẩn xác đến từng chi nhánh hoặc tư gia đối tác theo danh sách bảo mật.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Demo Access Prompt */}
            <div className="pt-6 border-t border-amber-500/20 mt-6 relative z-10">
              <div className="flex items-center justify-between text-xs text-amber-200/70 mb-2">
                <span>Trải nghiệm nhanh không cần nhập:</span>
                <span className="text-amber-400 font-bold">1-Click Demo</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 hover:text-amber-100 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-building text-amber-400 text-xs"></i>
                <span>Đăng nhập mẫu B2B (Tập Đoàn Vingroup)</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#2d090d] via-[#200507] to-[#170305] border border-amber-500/30 p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Top Switcher: Login vs Register */}
            <div className="flex p-1.5 rounded-2xl bg-[#140204] border border-amber-500/25">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 shadow-md font-black'
                    : 'text-amber-200/70 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-arrow-right-to-bracket mr-1.5 text-xs"></i>
                ĐĂNG NHẬP
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-red-950 shadow-md font-black'
                    : 'text-amber-200/70 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-user-plus mr-1.5 text-xs"></i>
                ĐĂNG KÝ MỚI
              </button>
            </div>

            {/* Account Type Selector: B2B vs Personal */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
                LOẠI TÀI KHOẢN:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('b2b')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    role === 'b2b'
                      ? 'bg-red-950/90 border-amber-400 text-white shadow-md shadow-amber-500/15'
                      : 'bg-[#180305] border-amber-500/20 text-amber-100/70 hover:border-amber-400/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                      role === 'b2b'
                        ? 'bg-amber-400 text-red-950 font-bold'
                        : 'bg-red-900/40 text-amber-300'
                    }`}
                  >
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Doanh Nghiệp / B2B</div>
                    <div className="text-[10px] text-amber-300/80">Có MST & Hóa đơn VAT</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('personal')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    role === 'personal'
                      ? 'bg-red-950/90 border-amber-400 text-white shadow-md shadow-amber-500/15'
                      : 'bg-[#180305] border-amber-500/20 text-amber-100/70 hover:border-amber-400/50'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                      role === 'personal'
                        ? 'bg-amber-400 text-red-950 font-bold'
                        : 'bg-red-900/40 text-amber-300'
                    }`}
                  >
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold">Cá Nhân / VIP</div>
                    <div className="text-[10px] text-amber-300/80">Biếu gia đình & đối tác</div>
                  </div>
                </button>
              </div>
            </div>

            {/* FORM 1: LOGIN MODE */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-amber-200">
                    {role === 'b2b' ? 'Email Doanh Nghiệp hoặc Mã Số Thuế (MST) *' : 'Email của bạn *'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 text-xs">
                      <i className={role === 'b2b' ? 'fa-solid fa-building' : 'fa-solid fa-envelope'}></i>
                    </span>
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={
                        role === 'b2b'
                          ? 'Ví dụ: van.a@vingroup.net hoặc 0101245486'
                          : 'Ví dụ: phuc.nguyen@gmail.com'
                      }
                      className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-amber-200">Mật khẩu *</label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-[11px] text-amber-300 hover:text-amber-200 underline cursor-pointer"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 text-xs">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      aria-label="Ẩn/hiện mật khẩu"
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/70 hover:text-amber-300 text-xs cursor-pointer"
                    >
                      <i className={showLoginPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-amber-100/80">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded bg-red-950 border-amber-500/40 text-amber-400 focus:ring-amber-400"
                    />
                    <span>Ghi nhớ đăng nhập trên thiết bị này</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket text-red-950"></i>
                  <span>ĐĂNG NHẬP VÀO HỆ THỐNG ➔</span>
                </button>

                {/* Social SSO Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-amber-200/60">
                    <span className="bg-[#200507] px-3">HOẶC TIẾP TỤC BẰNG</span>
                  </div>
                </div>

                {/* Google & MST SSO Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      login('google.user@gmail.com', '', 'b2b', true);
                      navigateTo('account');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#180305] hover:bg-red-950/60 border border-amber-500/30 text-xs font-semibold text-white flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <i className="fa-brands fa-google text-amber-400"></i>
                    <span>Google Workspace</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      login('mst.enterprise@ele.gift', '', 'b2b', true);
                      navigateTo('account');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-[#180305] hover:bg-red-950/60 border border-amber-500/30 text-xs font-semibold text-white flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-id-card-clip text-amber-400"></i>
                    <span>Mã Số Thuế (SSO)</span>
                  </button>
                </div>
              </form>
            )}

            {/* FORM 2: REGISTER MODE */}
            {mode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-200">
                      Họ và Tên người liên hệ *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2 px-3 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-200">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="0912 345 678"
                      className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2 px-3 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-amber-200">
                    Email nhận hóa đơn & báo giá *
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="doanhnghiep@company.vn"
                    className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2 px-3 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition"
                  />
                </div>

                {/* B2B Specific Fields */}
                {role === 'b2b' && (
                  <div className="space-y-3 p-3.5 rounded-2xl bg-red-950/50 border border-amber-500/25">
                    <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                      <i className="fa-solid fa-building text-xs"></i>
                      <span>THÔNG TIN PHÁP LÝ DOANH NGHIỆP:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-amber-200/90">
                          Tên công ty / Doanh nghiệp *
                        </label>
                        <input
                          type="text"
                          required
                          value={regCompanyName}
                          onChange={(e) => setRegCompanyName(e.target.value)}
                          placeholder="Công ty CP Tập Đoàn..."
                          className="w-full bg-[#180305] border border-amber-500/30 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-amber-200/90">
                          Mã Số Thuế (MST) *
                        </label>
                        <input
                          type="text"
                          required
                          value={regTaxCode}
                          onChange={(e) => setRegTaxCode(e.target.value)}
                          placeholder="0101234567"
                          className="w-full bg-[#180305] border border-amber-500/30 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none transition font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-amber-200/90">
                          Chức vụ người phụ trách
                        </label>
                        <input
                          type="text"
                          value={regPosition}
                          onChange={(e) => setRegPosition(e.target.value)}
                          placeholder="Giám đốc thu mua / HR"
                          className="w-full bg-[#180305] border border-amber-500/30 rounded-lg py-1.5 px-2.5 text-xs text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none transition"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-amber-200/90">
                          Tỉnh / Thành phố trụ sở
                        </label>
                        <select
                          value={regCity}
                          onChange={(e) => setRegCity(e.target.value)}
                          className="w-full bg-[#180305] border border-amber-500/30 rounded-lg py-1.5 px-2.5 text-xs text-white focus:border-amber-400 focus:outline-none transition cursor-pointer"
                        >
                          <option value="Hà Nội">Hà Nội</option>
                          <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                          <option value="Đà Nẵng">Đà Nẵng</option>
                          <option value="Hải Phòng">Hải Phòng</option>
                          <option value="Cần Thơ">Cần Thơ</option>
                          <option value="Khác">Tỉnh thành khác</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-200">
                      Mật khẩu khởi tạo *
                    </label>
                    <div className="relative">
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Tối thiểu 6 ký tự"
                        className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2 px-3 pr-8 text-xs text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none transition font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 text-xs cursor-pointer"
                      >
                        <i className={showRegPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-amber-200">
                      Xác nhận mật khẩu *
                    </label>
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full bg-[#180305] border border-amber-500/30 rounded-xl py-2 px-3 text-xs text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-amber-100/80 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded bg-red-950 border-amber-500/40 text-amber-400 focus:ring-amber-400"
                    />
                    <span>
                      Tôi đồng ý với{' '}
                      <span className="text-amber-300 underline">Điều khoản dịch vụ</span> và{' '}
                      <span className="text-amber-300 underline">Chính sách bảo mật dữ liệu B2B</span> của
                      EleGift.
                    </span>
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <i className="fa-solid fa-crown text-red-950"></i>
                  <span>HOÀN TẤT ĐĂNG KÝ & KÍCH HOẠT ĐẶC QUYỀN ➔</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#3a0a0e] to-[#200507] border border-amber-400/50 p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute top-4 right-4 text-amber-300 hover:text-white text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-lg">
                <i className="fa-solid fa-key"></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-serif-tet">Khôi Phục Mật Khẩu</h3>
                <p className="text-xs text-amber-200/70">EleGift sẽ gửi liên kết xác nhận qua email</p>
              </div>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-amber-200">Email đã đăng ký</label>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="nhanvien@company.vn"
                  className="w-full bg-[#180305] border border-amber-500/30 rounded-xl p-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-red-950/60"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 font-bold text-xs uppercase"
                >
                  Gửi Liên Kết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
