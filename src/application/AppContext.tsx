'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenId, CartItem, Product, Order, UserProfile } from '../domain/types';
import { calculateCartTotals, CartCalculationResult } from '../domain/pricing';
import { PRODUCTS, INITIAL_ORDERS } from '../infrastructure/mockData';

export const INITIAL_USER: UserProfile = {
  id: 'usr-b2b-01',
  name: 'Nguyễn Văn A',
  email: 'van.a@vingroup.net',
  phone: '0912 345 678',
  role: 'b2b',
  companyName: 'Tập Đoàn Vingroup',
  taxCode: '0101245486',
  position: 'Quản lý thu mua cấp cao',
  address: 'Tòa tháp Symphony, Chu Huy Mân, Long Biên, Hà Nội',
  city: 'Hà Nội',
  tier: 'Gold',
  accumulatedBoxes: 125,
};

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentScreen: ScreenId;
  selectedProductId: string;
  cartItems: CartItem[];
  couponCode: string;
  couponApplied: boolean;
  orders: Order[];
  toast: ToastState;
  isAIModalOpen: boolean;
  cartTotals: CartCalculationResult;
  currentUser: UserProfile | null;
  // Actions
  navigateTo: (screen: ScreenId, productId?: string) => void;
  login: (email: string, password?: string, role?: 'b2b' | 'personal', rememberMe?: boolean) => boolean;
  register: (profileData: Partial<UserProfile>) => boolean;
  updateUserProfile: (profileData: Partial<UserProfile>) => void;
  logout: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    variant?: string,
    variantLabel?: string
  ) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  setCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  placeOrder: (orderPayload: Partial<Order>) => Order;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  hideToast: () => void;
  openAIModal: () => void;
  closeAIModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('van-su-khoi-sac');
  const [couponCode, setCouponCode] = useState<string>('TET2027');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  const login = (email: string, _password?: string, role: 'b2b' | 'personal' = 'b2b', _rememberMe?: boolean) => {
    const isVingroup =
      email.toLowerCase().includes('vingroup') ||
      email === '' ||
      email.toLowerCase().includes('admin');

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: isVingroup ? 'Nguyễn Văn A' : (email.split('@')[0] || 'Khách Hàng VIP'),
      email: email || 'van.a@vingroup.net',
      phone: '0912 345 678',
      role: role,
      companyName:
        role === 'b2b'
          ? isVingroup
            ? 'Tập Đoàn Vingroup'
            : 'Công Ty CP Đối Tác Doanh Nghiệp'
          : undefined,
      taxCode: role === 'b2b' ? '0101245486' : undefined,
      position: role === 'b2b' ? 'Quản lý thu mua & Đối ngoại' : 'Khách hàng thân thiết',
      address: 'Tòa tháp Symphony, Chu Huy Mân, Long Biên',
      city: 'Hà Nội',
      tier: 'Gold',
      accumulatedBoxes: 125,
    };
    setCurrentUser(user);
    showToast(`Đăng nhập thành công! Chào mừng ${user.name}.`, 'success');
    return true;
  };

  const register = (profileData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: profileData.name || 'Quý Doanh Nghiệp',
      email: profileData.email || 'doanhnghiep@company.vn',
      phone: profileData.phone || '0912 345 678',
      role: profileData.role || 'b2b',
      companyName:
        profileData.role === 'personal'
          ? undefined
          : profileData.companyName || 'Công Ty Cổ Phần Mới',
      taxCode: profileData.role === 'personal' ? undefined : profileData.taxCode || '0109988776',
      position:
        profileData.role === 'personal'
          ? 'Khách hàng cá nhân'
          : profileData.position || 'Đại diện ủy quyền thu mua',
      address: profileData.address || 'Hà Nội',
      city: profileData.city || 'Hà Nội',
      tier: 'Gold',
      accumulatedBoxes: 0,
    };
    setCurrentUser(newUser);
    showToast(`Tạo tài khoản thành công! Chào mừng ${newUser.name} đến với EleGift.`, 'success');
    return true;
  };

  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      return { ...prev, ...profileData };
    });
    showToast('Đã lưu và đồng bộ thông tin tài khoản & doanh nghiệp thành công!', 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất tài khoản an toàn.', 'info');
  };

  // Seed default cart items:
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const prod1 = PRODUCTS.find((p) => p.id === 'van-su-khoi-sac') || PRODUCTS[0];
    const prod2 = PRODUCTS.find((p) => p.id === 'long-phung-hoa-minh') || PRODUCTS[1];
    return [
      {
        id: 'cart-item-1',
        productId: prod1.id,
        product: prod1,
        quantity: 20,
        selectedVariant: 'do-phu-quy',
        selectedVariantLabel: 'Đỏ Phú Quý • Hộp sơn mài cao cấp',
        unitPrice: 1250000,
      },
      {
        id: 'cart-item-2',
        productId: prod2.id,
        product: prod2,
        quantity: 5,
        selectedVariant: 'mun-hoang-gia',
        selectedVariantLabel: 'Gỗ Mun Hoàng Gia • Single Malt Whisky',
        unitPrice: 2450000,
      },
    ];
  });

  const cartTotals = calculateCartTotals(
    cartItems,
    couponApplied ? couponCode : undefined
  );

  const navigateTo = (screen: ScreenId, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const addToCart = (
    product: Product,
    quantity = 1,
    variant = 'standard',
    variantLabel?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedVariant === variant
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: product.id,
          product,
          quantity,
          selectedVariant: variant,
          selectedVariantLabel: variantLabel || (variant === 'standard' ? 'Phiên bản tiêu chuẩn' : variant),
          unitPrice: product.price,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Đã thêm ${quantity} hộp "${product.name}" vào giỏ hàng Tết!`, 'success');
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const setCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Đã xóa món quà khỏi giỏ hàng.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Đã làm trống giỏ quà Tết.', 'info');
  };

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'TET2027' || trimmed === 'B2BVIP') {
      setCouponCode(trimmed);
      setCouponApplied(true);
      showToast(`Mã ưu đãi "${trimmed}" đã được xác thực thành công!`, 'success');
      return true;
    } else {
      showToast('Mã ưu đãi không hợp lệ hoặc đã hết hạn.', 'error');
      return false;
    }
  };

  const placeOrder = (payload: Partial<Order>): Order => {
    const newOrderCode = `#EG-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const dateFormatted = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} (${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')})`;

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      title: item.product.name,
      subtitle: item.selectedVariantLabel || item.product.subtitle,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      imageUrl: item.product.imageUrl,
      customizationBadge: 'Đóng gói sơn mài thượng hạng',
      giftCardBadge: payload.giftCardRequested
        ? 'Thiệp chúc Tết thiết kế riêng'
        : undefined,
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderCode: newOrderCode,
      createdAt: dateFormatted,
      status: 'packaging',
      statusText: 'Đang kiểm định & Đóng gói sơn mài',
      recipientName: payload.recipientName || 'Nguyễn Hoàng Nam',
      phone: payload.phone || '0988 234 567',
      email: payload.email || 'hoangnam.b2b@vietcorp.vn',
      shippingAddress:
        payload.shippingAddress || 'Tầng 15, Tòa tháp Capital Tower, 109 Trần Hưng Đạo',
      deliveryCity: payload.deliveryCity || 'Hà Nội',
      estimatedDelivery: 'Trước ngày 23 Tháng Chạp (Tết Ông Táo)',
      items: orderItems,
      totalBoxes: cartTotals.totalBoxes,
      subtotal: cartTotals.subtotal,
      discountAmount: cartTotals.discountAmount,
      discountPercentage: cartTotals.discountPercentage,
      vatAmount: cartTotals.vatAmount,
      grandTotal: cartTotals.grandTotal,
      hasVatInvoice: !!payload.hasVatInvoice,
      companyName: payload.companyName || 'Công Ty CP Tập Đoàn Đầu Tư & Thương Mại Việt Nam',
      taxCode: payload.taxCode || '0108928392',
      companyAddress:
        payload.companyAddress || '109 Trần Hưng Đạo, P. Cửa Nam, Quận Hoàn Kiếm, TP. Hà Nội',
      invoiceEmail: payload.invoiceEmail || 'ketoan@vietcorp.vn',
      giftCardRequested: payload.giftCardRequested,
      paymentMethod: payload.paymentMethod || 'vietqr',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    showToast(`Đặt hàng thành công! Mã đơn của Quý khách là ${newOrderCode}`, 'success');
    return newOrder;
  };

  const openAIModal = () => setIsAIModalOpen(true);
  const closeAIModal = () => setIsAIModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        selectedProductId,
        cartItems,
        couponCode,
        couponApplied,
        orders,
        toast,
        isAIModalOpen,
        cartTotals,
        currentUser,
        navigateTo,
        login,
        register,
        updateUserProfile,
        logout,
        addToCart,
        updateCartQuantity,
        setCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        placeOrder,
        showToast,
        hideToast,
        openAIModal,
        closeAIModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
