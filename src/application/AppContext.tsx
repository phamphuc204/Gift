
'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import {
  ScreenId,
  CartItem,
  Product,
  Order,
  UserProfile,
} from '../domain/types';

import {
  calculateCartTotals,
  CartCalculationResult,
} from '../domain/pricing';



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

  navigateTo: (screen: ScreenId, productId?: string) => void;
  login: (
    email: string,
    password?: string,
    role?: 'b2b' | 'personal',
    rememberMe?: boolean
  ) => boolean;
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

  showToast: (
    message: string,
    type?: 'success' | 'info' | 'error'
  ) => void;
  hideToast: () => void;
  openAIModal: () => void;
  closeAIModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'elegift_session_id';

interface CartApiItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedVariantLabel?: string;
  unitPrice: number;
}

interface CartApiResponse {
  success: boolean;
  message?: string;
  data?: {
    items?: CartApiItem[];
  };
}
interface OrdersApiResponse {
  success: boolean;
  message?: string;
  data?: {
    total: number;
    orders: Order[];
  };
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');

  const [selectedProductId, setSelectedProductId] =
    useState<string>('van-su-khoi-sac');

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);

  const [currentUser, setCurrentUser] =
    useState<UserProfile | null>(INITIAL_USER);

  const [orders, setOrders] = useState<Order[]>([]);

  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [sessionId, setSessionId] = useState<string>('');

  const [isCartLoading, setIsCartLoading] = useState<boolean>(true);

  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    type: 'success',
  });

  // ============================================
  // ORDERS API - GET ORDERS
  // ============================================

  useEffect(() => {
    // Chỉ tải đơn hàng khi người dùng mở trang tài khoản
    if (currentScreen !== 'account') return;

    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
          cache: 'no-store',
        });

        const result: OrdersApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Không thể tải danh sách đơn hàng.'
          );
        }

        if (cancelled) return;

        setOrders(result.data?.orders || []);
      } catch (error) {
        console.error('Lỗi tải danh sách đơn hàng:', error);

        if (!cancelled) {
          showToast(
            'Không thể tải lịch sử đơn hàng. Vui lòng thử lại.',
            'error'
          );
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, [currentScreen]);

  // ============================================
  // TOAST
  // ============================================

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success'
  ) => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  useEffect(() => {
    if (!toast.show) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast.show]);

  // ============================================
  // SESSION ID
  // ============================================

  useEffect(() => {
    let currentSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!currentSessionId) {
      currentSessionId = `session-${crypto.randomUUID()}`;

      localStorage.setItem(
        SESSION_STORAGE_KEY,
        currentSessionId
      );
    }

    setSessionId(currentSessionId);
  }, []);

  // ============================================
  // CART API - GET CART
  // ============================================

  const syncCartFromApi = async (currentSessionId: string) => {
    try {
      const response = await fetch(
        `/api/cart?sessionId=${encodeURIComponent(currentSessionId)}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      );

      const result: CartApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể tải giỏ hàng.'
        );
      }

      const apiItems = result.data?.items || [];

      const mappedItems: CartItem[] = apiItems
        .filter((item) => item.product)
        .map((item) => ({
          id: item.id,
          productId: item.productId,
          product: item.product,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant || 'standard',
          selectedVariantLabel:
            item.selectedVariantLabel || 'Phiên bản tiêu chuẩn',
          unitPrice: item.unitPrice,
        }));

      setCartItems(mappedItems);

      return mappedItems;
    } catch (error) {
      console.error('Lỗi đồng bộ giỏ hàng:', error);

      throw error;
    }
  };

  // Tự động tải giỏ hàng khi đã có sessionId
  useEffect(() => {
    if (!sessionId) return;

    let cancelled = false;

    const loadCart = async () => {
      try {
        const response = await fetch(
          `/api/cart?sessionId=${encodeURIComponent(sessionId)}`,
          {
            method: 'GET',
            cache: 'no-store',
          }
        );

        const result: CartApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Không thể tải giỏ hàng.'
          );
        }

        if (cancelled) return;

        const apiItems = result.data?.items || [];

        const mappedItems: CartItem[] = apiItems
          .filter((item) => item.product)
          .map((item) => ({
            id: item.id,
            productId: item.productId,
            product: item.product,
            quantity: item.quantity,
            selectedVariant: item.selectedVariant || 'standard',
            selectedVariantLabel:
              item.selectedVariantLabel || 'Phiên bản tiêu chuẩn',
            unitPrice: item.unitPrice,
          }));

        setCartItems(mappedItems);
      } catch (error) {
        console.error('Không thể tải giỏ hàng:', error);

        if (!cancelled) {
          showToast(
            'Không thể tải giỏ hàng. Vui lòng thử tải lại trang.',
            'error'
          );
        }
      } finally {
        if (!cancelled) {
          setIsCartLoading(false);
        }
      }
    };

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  // Đảm bảo có sessionId trước khi gọi Cart API
  const ensureSessionId = (): string => {
    if (sessionId) return sessionId;

    let currentSessionId = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!currentSessionId) {
      currentSessionId = `session-${crypto.randomUUID()}`;

      localStorage.setItem(
        SESSION_STORAGE_KEY,
        currentSessionId
      );
    }

    setSessionId(currentSessionId);

    return currentSessionId;
  };

  // ============================================
  // CART TOTALS
  // ============================================

  const cartTotals = calculateCartTotals(
    cartItems,
    couponApplied ? couponCode : undefined
  );

  // ============================================
  // NAVIGATION
  // ============================================

  const navigateTo = (
    screen: ScreenId,
    productId?: string
  ) => {
    if (productId) {
      setSelectedProductId(productId);
    }

    setCurrentScreen(screen);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ============================================
  // LOGIN
  // ============================================

  const login = (
    email: string,
    _password?: string,
    role: 'b2b' | 'personal' = 'b2b',
    _rememberMe?: boolean
  ) => {
    const isVingroup =
      email.toLowerCase().includes('vingroup') ||
      email === '' ||
      email.toLowerCase().includes('admin');

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: isVingroup
        ? 'Nguyễn Văn A'
        : email.split('@')[0] || 'Khách Hàng VIP',
      email: email || 'van.a@vingroup.net',
      phone: '0912 345 678',
      role,
      companyName:
        role === 'b2b'
          ? isVingroup
            ? 'Tập Đoàn Vingroup'
            : 'Công Ty CP Đối Tác Doanh Nghiệp'
          : undefined,
      taxCode: role === 'b2b' ? '0101245486' : undefined,
      position:
        role === 'b2b'
          ? 'Quản lý thu mua & Đối ngoại'
          : 'Khách hàng thân thiết',
      address: 'Tòa tháp Symphony, Chu Huy Mân, Long Biên',
      city: 'Hà Nội',
      tier: 'Gold',
      accumulatedBoxes: 125,
    };

    setCurrentUser(user);

    showToast(
      `Đăng nhập thành công! Chào mừng ${user.name}.`,
      'success'
    );

    return true;
  };

  // ============================================
  // REGISTER
  // ============================================

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

      taxCode:
        profileData.role === 'personal'
          ? undefined
          : profileData.taxCode || '0109988776',

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

    showToast(
      `Tạo tài khoản thành công! Chào mừng ${newUser.name} đến với EleGift.`,
      'success'
    );

    return true;
  };

  // ============================================
  // UPDATE USER PROFILE
  // ============================================

  const updateUserProfile = (
    profileData: Partial<UserProfile>
  ) => {
    setCurrentUser((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        ...profileData,
      };
    });

    showToast(
      'Đã lưu và đồng bộ thông tin tài khoản & doanh nghiệp thành công!',
      'success'
    );
  };

  // ============================================
  // LOGOUT
  // ============================================

  const logout = () => {
    setCurrentUser(null);

    showToast(
      'Đã đăng xuất tài khoản an toàn.',
      'info'
    );
  };

  // ============================================
  // CART API - ADD TO CART
  // ============================================

  const addToCart = async (
    product: Product,
    quantity = 1,
    variant = 'do-phu-quy',
    variantLabel?: string
  ) => {
    try {
      const currentSessionId = ensureSessionId();

      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: currentSessionId,
          productId: product.id,
          productSkuId: variant,
          quantity,
        }),
      });

      const result: CartApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể thêm sản phẩm vào giỏ hàng.'
        );
      }

      await syncCartFromApi(currentSessionId);

      showToast(
        `Đã thêm ${quantity} hộp "${product.name}" vào giỏ hàng Tết!`,
        'success'
      );
    } catch (error) {
      console.error('Lỗi thêm vào giỏ hàng:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Không thể thêm sản phẩm vào giỏ hàng.',
        'error'
      );
    }
  };

  // ============================================
  // CART API - UPDATE QUANTITY
  // ============================================

  const setCartQuantity = async (
    itemId: string,
    quantity: number
  ) => {
    try {
      const currentSessionId = ensureSessionId();

      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const response = await fetch(
        `/api/cart/items/${encodeURIComponent(itemId)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: currentSessionId,
            quantity,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể cập nhật số lượng.'
        );
      }

      await syncCartFromApi(currentSessionId);
    } catch (error) {
      console.error('Lỗi cập nhật giỏ hàng:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Không thể cập nhật số lượng sản phẩm.',
        'error'
      );
    }
  };

  const updateCartQuantity = (
    itemId: string,
    delta: number
  ) => {
    const currentItem = cartItems.find(
      (item) => item.id === itemId
    );

    if (!currentItem) return;

    const nextQuantity = currentItem.quantity + delta;

    if (nextQuantity <= 0) {
      void removeFromCart(itemId);
      return;
    }

    void setCartQuantity(itemId, nextQuantity);
  };

  // ============================================
  // CART API - REMOVE ITEM
  // ============================================

  const removeFromCart = async (itemId: string) => {
    try {
      const currentSessionId = ensureSessionId();

      const response = await fetch(
        `/api/cart/items/${encodeURIComponent(itemId)}?sessionId=${encodeURIComponent(currentSessionId)}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể xóa sản phẩm.'
        );
      }

      await syncCartFromApi(currentSessionId);

      showToast(
        'Đã xóa món quà khỏi giỏ hàng.',
        'info'
      );
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Không thể xóa sản phẩm khỏi giỏ hàng.',
        'error'
      );
    }
  };

  // ============================================
  // CART API - CLEAR CART
  // ============================================

  const clearCart = async () => {
    try {
      const currentSessionId = ensureSessionId();

      const response = await fetch(
        `/api/cart?sessionId=${encodeURIComponent(currentSessionId)}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể làm trống giỏ hàng.'
        );
      }

      setCartItems([]);

      showToast(
        'Đã làm trống giỏ quà Tết.',
        'info'
      );
    } catch (error) {
      console.error('Lỗi làm trống giỏ hàng:', error);

      showToast(
        error instanceof Error
          ? error.message
          : 'Không thể làm trống giỏ hàng.',
        'error'
      );
    }
  };

  // ============================================
  // COUPON
  // ============================================

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();

    if (
      trimmed === 'TET2027' ||
      trimmed === 'B2BVIP'
    ) {
      setCouponCode(trimmed);
      setCouponApplied(true);

      showToast(
        `Mã ưu đãi "${trimmed}" đã được xác thực thành công!`,
        'success'
      );

      return true;
    }

    showToast(
      'Mã ưu đãi không hợp lệ hoặc đã hết hạn.',
      'error'
    );

    return false;
  };

  // ============================================
  // PLACE ORDER
  // Lưu ý: Phần tạo đơn hàng vẫn đang dùng logic cũ.
  // Sẽ tích hợp Orders API ở bước tiếp theo.
  // ============================================

  const placeOrder = (
    payload: Partial<Order>
  ): Order => {
    const newOrderCode = `#EG-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    const now = new Date();

    const dateFormatted =
      `${now.getDate().toString().padStart(2, '0')}/` +
      `${(now.getMonth() + 1).toString().padStart(2, '0')}/` +
      `${now.getFullYear()} (` +
      `${now.getHours().toString().padStart(2, '0')}:` +
      `${now.getMinutes().toString().padStart(2, '0')})`;

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      title: item.product.name,
      subtitle:
        item.selectedVariantLabel || item.product.subtitle,
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

      recipientName:
        payload.recipientName || 'Nguyễn Hoàng Nam',

      phone:
        payload.phone || '0988 234 567',

      email:
        payload.email || 'hoangnam.b2b@vietcorp.vn',

      shippingAddress:
        payload.shippingAddress ||
        'Tầng 15, Tòa tháp Capital Tower, 109 Trần Hưng Đạo',

      deliveryCity:
        payload.deliveryCity || 'Hà Nội',

      estimatedDelivery:
        'Trước ngày 23 Tháng Chạp (Tết Ông Táo)',

      items: orderItems,

      totalBoxes: cartTotals.totalBoxes,
      subtotal: cartTotals.subtotal,
      discountAmount: cartTotals.discountAmount,
      discountPercentage: cartTotals.discountPercentage,
      vatAmount: cartTotals.vatAmount,
      grandTotal: cartTotals.grandTotal,

      hasVatInvoice: !!payload.hasVatInvoice,

      companyName:
        payload.companyName ||
        'Công Ty CP Tập Đoàn Đầu Tư & Thương Mại Việt Nam',

      taxCode:
        payload.taxCode || '0108928392',

      companyAddress:
        payload.companyAddress ||
        '109 Trần Hưng Đạo, P. Cửa Nam, Quận Hoàn Kiếm, TP. Hà Nội',

      invoiceEmail:
        payload.invoiceEmail || 'ketoan@vietcorp.vn',

      giftCardRequested: payload.giftCardRequested,

      paymentMethod: payload.paymentMethod || 'vietqr',
    };

    setOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    // Đồng bộ việc xóa giỏ hàng trên Backend
    void clearCartAfterOrder();

    showToast(
      `Đặt hàng thành công! Mã đơn của Quý khách là ${newOrderCode}`,
      'success'
    );

    return newOrder;
  };

  // Xóa giỏ hàng Backend sau khi tạo đơn hàng bằng logic hiện tại
  const clearCartAfterOrder = async () => {
    try {
      const currentSessionId = ensureSessionId();

      const response = await fetch(
        `/api/cart?sessionId=${encodeURIComponent(currentSessionId)}`,
        {
          method: 'DELETE',
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Không thể đồng bộ giỏ hàng.'
        );
      }

      setCartItems([]);
    } catch (error) {
      console.error(
        'Không thể đồng bộ giỏ hàng sau khi đặt hàng:',
        error
      );
    }
  };

  // ============================================
  // AI MODAL
  // ============================================

  const openAIModal = () => {
    setIsAIModalOpen(true);
  };

  const closeAIModal = () => {
    setIsAIModalOpen(false);
  };

  // ============================================
  // PROVIDER
  // ============================================

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

// ============================================
// USE APP
// ============================================

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used within an AppProvider'
    );
  }

  return context;
};
