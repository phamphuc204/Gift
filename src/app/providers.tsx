'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from '../application/AppContext';
import { AnnouncementBar } from '../presentation/components/AnnouncementBar';
import { Navbar } from '../presentation/components/Navbar';
import { Footer } from '../presentation/components/Footer';
import { FloatingContactBar } from '../presentation/components/FloatingContactBar';
import { AIGiftModal } from '../presentation/components/AIGiftModal';
import { Toast } from '../presentation/components/Toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#4a080c] text-stone-100 selection:bg-amber-400 selection:text-red-950">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FloatingContactBar />
        <AIGiftModal />
        <Toast />
      </div>
    </AppProvider>
  );
}
