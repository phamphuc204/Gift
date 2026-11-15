'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../../application/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast.show) return null;

  const bgStyles =
    toast.type === 'error'
      ? 'bg-rose-950/90 border-rose-500/50 text-rose-200'
      : toast.type === 'info'
      ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
      : 'bg-emerald-950/95 border-amber-400/60 text-amber-100';

  const icon =
    toast.type === 'error'
      ? 'fa-circle-exclamation text-rose-400'
      : toast.type === 'info'
      ? 'fa-circle-info text-amber-400'
      : 'fa-circle-check text-emerald-400';

  return (
    <div
      role="alert"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-2xl backdrop-blur-md transition-all animate-bounce"
    >
      <div className={`${bgStyles} flex items-center gap-3 px-4 py-2.5 rounded-xl border`}>
        <i className={`fa-solid ${icon} text-base`}></i>
        <span className="text-xs sm:text-sm font-semibold tracking-wide">{toast.message}</span>
        <button
          onClick={hideToast}
          aria-label="Đóng thông báo"
          className="ml-2 text-xs opacity-70 hover:opacity-100 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
