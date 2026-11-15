'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../application/AppContext';

export const FloatingContactBar: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <aside
      aria-label="Kênh liên hệ nhanh và AI tư vấn"
      className="fixed top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5 items-end select-none right-2"
    >
      {/* 1. AI Chọn Quà Floating Button */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-gradient-to-r from-red-950 to-[#5c0b11] border border-amber-400/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300">
          <span className="text-xs font-bold text-amber-200 tracking-wide">Trợ Lý AI Tư Vấn Quà Tết</span>
        </div>
        <button
          onClick={() => navigateTo('ai-advisor')}
          aria-label="AI Chọn Quà Tết"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-300 via-amber-400 to-yellow-500 border border-amber-200 shadow-lg shadow-amber-500/30 flex items-center justify-center text-red-950 hover:scale-110 active:scale-95 transition-all duration-300 text-base cursor-pointer"
        >
          <span className="leading-none select-none">✨</span>
        </button>
      </div>

      {/* 2. Hotline Button */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-gradient-to-r from-red-950 to-[#5c0b11] border border-amber-400/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300">
          <span className="text-xs font-bold text-amber-200 tracking-wide">
            Hotline 24/7: <span className="text-amber-400">1900 8866</span>
          </span>
        </div>
        <a
          href="tel:19008866"
          aria-label="Hotline 24/7"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 via-[#a1161d] to-amber-500 border border-amber-400/60 shadow-lg shadow-amber-500/25 flex items-center justify-center text-amber-200 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <i className="fa-solid fa-phone-volume text-sm animate-pulse"></i>
        </a>
      </div>

      {/* 3. Zalo Button */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-gradient-to-r from-red-950 to-[#5c0b11] border border-amber-400/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300">
          <span className="text-xs font-bold text-amber-200 tracking-wide">Chat Zalo tư vấn</span>
        </div>
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Zalo"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0084FF] to-[#00C6FF] border border-amber-400/50 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white hover:border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300 font-black text-[11px] tracking-tight"
        >
          <span>Zalo</span>
        </a>
      </div>

      {/* 4. Facebook Button */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-gradient-to-r from-red-950 to-[#5c0b11] border border-amber-400/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300">
          <span className="text-xs font-bold text-amber-200 tracking-wide">Fanpage Facebook</span>
        </div>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fanpage Facebook"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1877F2] to-[#0d5ac1] border border-amber-400/50 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white hover:border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <i className="fa-brands fa-facebook-f text-sm"></i>
        </a>
      </div>

      {/* 5. Messenger Button */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-gradient-to-r from-red-950 to-[#5c0b11] border border-amber-400/40 px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap transition-all duration-300">
          <span className="text-xs font-bold text-amber-200 tracking-wide">Chat Messenger</span>
        </div>
        <a
          href="https://m.me"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat Messenger"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0084FF] via-[#00B2FF] to-[#00C6FF] border border-amber-400/50 shadow-lg shadow-blue-900/40 flex items-center justify-center text-white hover:border-amber-300 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <i className="fa-brands fa-facebook-messenger text-sm"></i>
        </a>
      </div>
    </aside>
  );
};
