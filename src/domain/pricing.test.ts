/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatVND,
  calculateB2BDiscountPercentage,
  calculateCartTotals,
} from './pricing';
import { CartItem, Product } from './types';

const mockProduct: Product = {
  id: 'prod-1',
  sku: 'EG-SM2027-01',
  name: 'Hộp Gỗ Sơn Mài "Vạn Sự Khởi Sắc"',
  subtitle: 'Sơn Mài Thủ Công Mỹ Nghệ',
  category: 'son-mai',
  categoryLabel: 'Hộp Gỗ Sơn Mài',
  price: 1250000,
  rating: 4.9,
  reviewsCount: 128,
  inStock: true,
  stockCount: 850,
  imageUrl: 'https://example.com/box.jpg',
  gallery: ['https://example.com/box.jpg'],
  description: 'Test description',
};

test('formatVND formats number correctly with ₫ symbol', () => {
  assert.equal(formatVND(1250000), '1.250.000 ₫');
  assert.equal(formatVND(0), '0 ₫');
});

test('calculateB2BDiscountPercentage handles tiered box count and coupons', () => {
  // < 10 boxes -> 0%
  assert.equal(calculateB2BDiscountPercentage(5), 0);
  // 10 - 19 boxes -> 5%
  assert.equal(calculateB2BDiscountPercentage(15), 5);
  // 20 - 49 boxes -> 10%
  assert.equal(calculateB2BDiscountPercentage(25), 10);
  // 50 - 199 boxes -> 18%
  assert.equal(calculateB2BDiscountPercentage(50), 18);
  // >= 200 boxes -> 25%
  assert.equal(calculateB2BDiscountPercentage(250), 25);

  // Coupon TET2027 gives at least 10% even on small order
  assert.equal(calculateB2BDiscountPercentage(5, 'TET2027'), 10);
  // Coupon preserves higher tiered discount if total boxes >= 50
  assert.equal(calculateB2BDiscountPercentage(50, 'TET2027'), 18);
});

test('calculateCartTotals calculates correct subtotal, discount and totals', () => {
  const items: CartItem[] = [
    {
      id: 'item-1',
      productId: 'prod-1',
      product: mockProduct,
      quantity: 20,
      unitPrice: 1250000,
    },
    {
      id: 'item-2',
      productId: 'prod-2',
      product: {
        ...mockProduct,
        id: 'prod-2',
        price: 2450000,
      },
      quantity: 5,
      unitPrice: 2450000,
    },
  ];

  const totals = calculateCartTotals(items, 'TET2027');

  assert.equal(totals.totalBoxes, 25);
  assert.equal(totals.subtotal, 37250000);
  assert.equal(totals.discountPercentage, 10);
  assert.equal(totals.discountAmount, 3725000);
  assert.equal(totals.grandTotal, 33525000);
  assert.equal(totals.isShippingFree, true);
});
