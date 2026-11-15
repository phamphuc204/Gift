/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './application/AppContext';
import { AnnouncementBar } from './presentation/components/AnnouncementBar';
import { Navbar } from './presentation/components/Navbar';
import { Footer } from './presentation/components/Footer';
import { FloatingContactBar } from './presentation/components/FloatingContactBar';
import { AIGiftModal } from './presentation/components/AIGiftModal';
import { Toast } from './presentation/components/Toast';

import { HomeView } from './presentation/views/HomeView';
import { CatalogView } from './presentation/views/CatalogView';
import { CorporateView } from './presentation/views/CorporateView';
import { LacquerwareView } from './presentation/views/LacquerwareView';
import { ContactView } from './presentation/views/ContactView';
import { ProductDetailView } from './presentation/views/ProductDetailView';
import { CartView } from './presentation/views/CartView';
import { CheckoutView } from './presentation/views/CheckoutView';
import { AccountView } from './presentation/views/AccountView';
import { AIAdvisorView } from './presentation/views/AIAdvisorView';
import { AuthView } from './presentation/views/AuthView';

const MainLayout: React.FC = () => {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-amber-400 selection:text-red-950">
      <div>
        <AnnouncementBar />
        <Navbar />

        <main>
          {currentScreen === 'home' && <HomeView />}
          {currentScreen === 'catalog' && <CatalogView />}
          {currentScreen === 'corporate' && <CorporateView />}
          {currentScreen === 'lacquerware' && <LacquerwareView />}
          {currentScreen === 'contact' && <ContactView />}
          {currentScreen === 'product-detail' && <ProductDetailView />}
          {currentScreen === 'cart' && <CartView />}
          {currentScreen === 'checkout' && <CheckoutView />}
          {currentScreen === 'account' && <AccountView />}
          {currentScreen === 'ai-advisor' && <AIAdvisorView />}
          {currentScreen === 'auth' && <AuthView />}
        </main>
      </div>

      <Footer />
      <FloatingContactBar />
      <AIGiftModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
