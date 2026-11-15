
'use client';

import { useApp } from '../application/AppContext';

import { HomeView } from '../presentation/views/HomeView';
import { CatalogView } from '../presentation/views/CatalogView';
import { CorporateView } from '../presentation/views/CorporateView';
import { LacquerwareView } from '../presentation/views/LacquerwareView';
import { ContactView } from '../presentation/views/ContactView';
import { ProductDetailView } from '../presentation/views/ProductDetailView';
import { CartView } from '../presentation/views/CartView';
import { CheckoutView } from '../presentation/views/CheckoutView';
import { AccountView } from '../presentation/views/AccountView';
import { AIAdvisorView } from '../presentation/views/AIAdvisorView';
import { AuthView } from '../presentation/views/AuthView';

export default function HomePage() {
  const { currentScreen } = useApp();

  return (
    <div className="w-full">
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
    </div>
  );
}
