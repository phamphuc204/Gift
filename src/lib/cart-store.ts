
import { PRODUCTS } from '../infrastructure/mockData';
import type { Product } from '../domain/types';

export interface CartItemRecord {
  id: string;
  cartId: string;
  productId: string;
  productSkuId: string;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartRecord {
  id: string;
  userId: string | null;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  items: CartItemRecord[];
}

type CartStore = Map<string, CartRecord>;

declare global {
  // Dùng chung dữ liệu giữa các API route trong môi trường phát triển.
  var elegiftCartStore: CartStore | undefined;
}

const store: CartStore =
  globalThis.elegiftCartStore ??
  (globalThis.elegiftCartStore = new Map());

const now = () => new Date().toISOString();

export function getOrCreateCart(
  sessionId: string,
  userId: string | null = null
): CartRecord {
  let cart = store.get(sessionId);

  if (!cart) {
    const timestamp = now();

    cart = {
      id: `cart-${crypto.randomUUID()}`,
      userId,
      sessionId,
      createdAt: timestamp,
      updatedAt: timestamp,
      items: [],
    };

    store.set(sessionId, cart);
  }

  return cart;
}

export function findProduct(productId: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === productId);
}

export function findCartItem(
  cart: CartRecord,
  itemId: string
): CartItemRecord | undefined {
  return cart.items.find((item) => item.id === itemId);
}


export function getCartSummary(cart: CartRecord) {
  const items = cart.items.map((item) => {
    const product = findProduct(item.productId);

    return {
      id: item.id,
      productId: item.productId,
      product,
      quantity: item.quantity,
      selectedVariant: item.productSkuId,
      selectedVariantLabel: item.productSkuId,
      unitPrice: item.unitPrice,
    };
  });

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  return {
    id: cart.id,
    userId: cart.userId,
    sessionId: cart.sessionId,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    items,
    totalItems,
    subtotal,
  };
}

