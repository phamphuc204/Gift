'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../application/AppContext';
import { ScreenId } from '../../domain/types';

export const Navbar: React.FC = () => {
  const { currentScreen, navigateTo, cartTotals, currentUser } = useApp();

  const navLinks: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'TRANG CHỦ' },
    { id: 'catalog', label: 'HỘP QUÀ TẾT' },
    { id: 'corporate', label: 'QUÀ DOANH NGHIỆP' },
    { id: 'lacquerware', label: 'BỘ SƯU TẬP SƠN MÀI' },
    { id: 'contact', label: 'LIÊN HỆ' },
  ];

  return (
    <header className="relative z-30 bg-[#5c0b11]/95 backdrop-blur-md border-b border-amber-500/20 px-3 sm:px-5 lg:px-6 xl:px-12 sticky top-0 transition-all shadow-xl py-2.5 w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 xl:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-2 group shrink-0 text-left cursor-pointer focus:outline-none"
          data-purpose="brand-identity"
          aria-label="Về trang chủ EleGift"
        >
          <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-100 flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <i className="fa-solid fa-gift text-[#69090f] text-sm xl:text-base"></i>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-lg xl:text-2xl font-black tracking-tight text-white font-serif uppercase">
                EleGift
              </span>
              <span className="px-1.5 xl:px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-red-950 text-[9px] xl:text-[10px] font-black tracking-wider uppercase shadow-md leading-none">
                TẾT 2027
              </span>
            </div>
            <span className="text-[9px] xl:text-[10px] font-medium text-amber-300/80 tracking-widest uppercase">
              Quà Tết Cao Cấp
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-6 text-xs xl:text-sm font-semibold tracking-wide whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.id;
            return (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`transition py-1 whitespace-nowrap cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-amber-300 font-bold border-b-2 border-amber-400'
                    : 'text-red-100/90 hover:text-amber-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Actions: Account, Cart, Consultation CTA */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 xl:gap-2">
            {/* Account Icon */}
            <button
              onClick={() => navigateTo(currentUser ? 'account' : 'auth')}
              aria-label={currentUser ? `Tài khoản: ${currentUser.name}` : 'Đăng nhập / Đăng ký'}
              className={`h-8 px-2 xl:px-2.5 rounded-full flex items-center gap-1.5 transition-colors border cursor-pointer ${
                currentScreen === 'account' || currentScreen === 'auth'
                  ? 'text-amber-400 bg-amber-400/20 border-amber-400 shadow-md shadow-amber-500/25'
                  : 'text-amber-300 hover:text-amber-100 hover:bg-amber-500/10 border-amber-400/30'
              }`}
              title={
                currentUser
                  ? `Tài khoản: ${currentUser.name} (${currentUser.companyName || 'Cá nhân'})`
                  : 'Đăng nhập / Đăng ký'
              }
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              {currentUser ? (
                <span className="text-[11px] font-bold max-w-[65px] xl:max-w-[90px] truncate hidden sm:inline">
                  {currentUser.name}
                </span>
              ) : (
                <span className="text-[11px] font-bold hidden sm:inline">
                  Đăng nhập
                </span>
              )}
            </button>

            {/* Cart Icon with Dynamic Count Badge */}
            <button
              onClick={() => navigateTo('cart')}
              aria-label={`Giỏ hàng (${cartTotals.totalBoxes} hộp)`}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-colors border cursor-pointer shrink-0 ${
                currentScreen === 'cart' || currentScreen === 'checkout'
                  ? 'text-amber-400 bg-amber-400/20 border-amber-400 shadow-md shadow-amber-500/25'
                  : 'text-amber-300 hover:text-amber-100 hover:bg-amber-500/10 border-amber-400/30'
              }`}
              title="Xem giỏ quà Tết"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartTotals.totalBoxes > 0 && (
                <span
                  id="header-cart-count"
                  className="absolute -top-1 -right-1 bg-amber-400 text-red-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow border border-amber-200"
                >
                  {cartTotals.totalBoxes}
                </span>
              )}
            </button>
          </div>

          {/* Consultation CTA */}
          <button
            onClick={() => navigateTo('ai-advisor')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 xl:px-4 py-1.5 xl:py-2 text-xs xl:text-sm font-bold tracking-wide text-red-950 bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 rounded-full hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-400/40 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer shrink-0"
          >
            <i className="fa-solid fa-wand-magic-sparkles text-[11px]"></i>
            <span>TƯ VẤN QUÀ TẾT</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Row */}
      <div className="flex lg:hidden items-center justify-between overflow-x-auto pt-2.5 pb-1 gap-2 border-t border-amber-500/15 mt-2">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => navigateTo(link.id)}
            className={`text-[11px] whitespace-nowrap px-2 py-1 rounded-md transition ${
              currentScreen === link.id
                ? 'bg-amber-400 text-red-950 font-bold'
                : 'text-amber-200/80 hover:text-white'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};