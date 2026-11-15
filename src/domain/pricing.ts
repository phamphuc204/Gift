/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem } from './types';

/**
 * Format currency in Vietnamese Dong
 * @param amount Number in VND
 * @returns string formatted like "1.250.000 ₫"
 */
export function formatVND(amount: number): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('vi-VN').format(rounded) + ' ₫';
}

/**
 * Calculate tiered B2B wholesale discount percentage
 * - Under 10 boxes: 0%
 * - 10 - 19 boxes: 5%
 * - 20 - 49 boxes: 10%
 * - 50 - 199 boxes: 18%
 * - >= 200 boxes: 25%
 * If coupon "TET2027" is applied, ensure at least 10% discount.
 * If coupon "B2BVIP" is applied, ensure at least 15% discount.
 */
export function calculateB2BDiscountPercentage(totalBoxes: number, couponCode?: string): number {
  let baseDiscount = 0;

  if (totalBoxes >= 200) {
    baseDiscount = 25;
  } else if (totalBoxes >= 50) {
    baseDiscount = 18;
  } else if (totalBoxes >= 20) {
    baseDiscount = 10;
  } else if (totalBoxes >= 10) {
    baseDiscount = 5;
  }

  const normalizedCode = couponCode?.trim().toUpperCase();
  if (normalizedCode === 'TET2027') {
    baseDiscount = Math.max(baseDiscount, 10);
  } else if (normalizedCode === 'B2BVIP') {
    baseDiscount = Math.max(baseDiscount, 15);
  }

  return baseDiscount;
}

export interface CartCalculationResult {
  totalBoxes: number;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  shippingFee: number;
  isShippingFree: boolean;
  vatRate: number; // 0.08 = 8%
  vatAmount: number;
  grandTotal: number;
  isB2BDiscountActive: boolean;
}

/**
 * Pure calculation of cart financial totals
 */
export function calculateCartTotals(
  items: CartItem[],
  couponCode?: string,
  vatRate: number = 0.08
): CartCalculationResult {
  const totalBoxes = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.unitPrice || 0) * (item.quantity || 0),
    0
  );

  const discountPercentage = calculateB2BDiscountPercentage(totalBoxes, couponCode);
  const discountAmount = Math.round(subtotal * (discountPercentage / 100));

  // Enterprise gift shipping is free for all orders
  const shippingFee = 0;
  const isShippingFree = true;

  // Amount before VAT
  const netAmount = Math.max(0, subtotal - discountAmount);
  // VAT 8% (optional calculation, prices in screens are stated with VAT included or calculated)
  const vatAmount = Math.round(netAmount * (vatRate / (1 + vatRate)));
  const grandTotal = netAmount;

  return {
    totalBoxes,
    subtotal,
    discountPercentage,
    discountAmount,
    shippingFee,
    isShippingFree,
    vatRate,
    vatAmount,
    grandTotal,
    isB2BDiscountActive: discountPercentage > 0,
  };
}
