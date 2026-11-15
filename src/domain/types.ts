/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'home'
  | 'catalog'
  | 'corporate'
  | 'lacquerware'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'product-detail'
  | 'ai-advisor'
  | 'auth';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'b2b' | 'personal';
  companyName?: string;
  taxCode?: string;
  position?: string;
  address?: string;
  city?: string;
  tier: 'Gold' | 'Platinum' | 'Diamond';
  accumulatedBoxes: number;
}

export interface DelicacyItem {
  id: string;
  name: string;
  weightOrVolume: string;
  origin: string;
  description: string;
  icon: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  verifiedBoxes: number;
  rating: number;
  date: string;
  comment: string;
  variantTag: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  label: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: 'son-mai' | 'ruong-go' | 'yen-sam' | 'ruou-vang' | 'truyen-thong';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeType?: 'bestseller' | 'vip' | 'limited' | 'special' | 'bestprice';
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  gallery: string[];
  description: string;
  craftSteps?: number;
  variants?: ProductVariant[];
  delicacies?: DelicacyItem[];
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedVariantLabel?: string;
  unitPrice: number;
}

export type OrderStatus = 'packaging' | 'shipping' | 'delivered' | 'cancelled';

export interface OrderItemSummary {
  productId: string;
  title: string;
  subtitle?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string;
  customizationBadge?: string;
  giftCardBadge?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  createdAt: string;
  status: OrderStatus;
  statusText: string;
  recipientName: string;
  phone: string;
  email: string;
  shippingAddress: string;
  deliveryCity: string;
  estimatedDelivery: string;
  items: OrderItemSummary[];
  totalBoxes: number;
  subtotal: number;
  discountAmount: number;
  discountPercentage: number;
  vatAmount: number;
  grandTotal: number;
  hasVatInvoice: boolean;
  companyName?: string;
  taxCode?: string;
  companyAddress?: string;
  invoiceEmail?: string;
  laserLogoRequested?: boolean;
  giftCardRequested?: boolean;
  paymentMethod: 'vietqr' | 'cod' | 'b2b-contract';
  signedProtocolDate?: string;
}

export interface Showroom {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  features: string;
  badge: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  companyName: string;
  email: string;
  giftCategory: string;
  quantityRange: string;
  budgetRange: string;
  premiumPackaging?: boolean;
  sampleDelivery: boolean;
  vatContract: boolean;
  notes: string;
}
