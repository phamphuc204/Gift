'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#6e0d13] via-[#a1161d] to-[#6e0d13] border-b border-amber-500/25 py-1 px-4 text-center text-[11px] tracking-wider font-semibold text-amber-200 flex items-center justify-center gap-2 whitespace-nowrap overflow-x-auto select-none">
      <span className="inline-block animate-pulse">🏮</span>
      <span>ƯU ĐÃI DOANH NGHIỆP: CHIẾT KHẤU ĐẾN 25% • MIỄN PHÍ VẬN CHUYỂN HỎA TỐC & THIỆP CHÚC MỪNG 2027</span>
      <span className="inline-block animate-pulse">🏮</span>
    </div>
  );
};
