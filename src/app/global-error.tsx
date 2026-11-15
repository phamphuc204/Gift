'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#4a080c] text-amber-100 flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md bg-red-950/80 rounded-2xl border border-amber-500/30 shadow-2xl">
          <h2 className="text-2xl font-bold font-serif-tet mb-3 text-amber-300">
            Đã có sự cố xảy ra
          </h2>
          <p className="text-sm text-red-200/80 mb-6">
            Hệ thống quà Tết đang được đồng bộ. Xin vui lòng nhấn thử lại để tiếp tục.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 font-bold text-sm hover:scale-105 transition-transform"
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}
