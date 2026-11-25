
import { NextRequest, NextResponse } from 'next/server';
import { orderStore } from '../../../lib/order-store';
import {
  getOrCreateCart,
  getCartSummary,
} from '../../../lib/cart-store';
import {
  calculateCartTotals,
} from '../../../domain/pricing';
import type {
  CartItem,
  Order,
  OrderItemSummary,
} from '../../../domain/types';


const VALID_PAYMENT_METHODS = [
  'vietqr',
  'cod',
  'b2b-contract',
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      sessionId,
      recipientName,
      phone,
      email,
      city,
      district,
      address,
      deliveryTime,
      paymentMethod,
      requireVat,
      companyName,
      taxCode,
      companyAddress,
      invoiceEmail,
      giftCard,
      customNotes,
      couponCode,
    } = body;

    // 1. Kiểm tra dữ liệu bắt buộc
    if (
      typeof sessionId !== 'string' ||
      !sessionId.trim() ||
      typeof recipientName !== 'string' ||
      !recipientName.trim() ||
      typeof phone !== 'string' ||
      !phone.trim() ||
      typeof email !== 'string' ||
      !email.trim() ||
      typeof city !== 'string' ||
      !city.trim() ||
      typeof district !== 'string' ||
      !district.trim() ||
      typeof address !== 'string' ||
      !address.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Vui lòng cung cấp đầy đủ thông tin nhận hàng.',
        },
        { status: 400 }
      );
    }

    if (
      !VALID_PAYMENT_METHODS.includes(paymentMethod)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Phương thức thanh toán không hợp lệ.',
        },
        { status: 400 }
      );
    }

    // 2. Lấy giỏ hàng
    const cart = getOrCreateCart(sessionId.trim());
    const cartSummary = getCartSummary(cart);

    if (cartSummary.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Giỏ hàng đang trống. Không thể đặt hàng.',
        },
        { status: 400 }
      );
    }

    // 3. Kiểm tra sản phẩm và chuyển dữ liệu về CartItem
    const cartItems: CartItem[] = cartSummary.items.map((item) => {
      if (!item.product) {
        throw new Error(`Không tìm thấy sản phẩm ${item.productId}`);
      }

      if (
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0 ||
        !Number.isFinite(item.unitPrice) ||
        item.unitPrice < 0
      ) {
        throw new Error('Dữ liệu số lượng hoặc giá sản phẩm không hợp lệ.');
      }

      return {
        id: item.id,
        productId: item.productId,
        product: item.product,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
        selectedVariantLabel: item.selectedVariantLabel,
        unitPrice: item.unitPrice,
      };
    });

    // 4. Tính tiền ở Backend
    const validCoupon =
      couponCode === 'TET2027' || couponCode === 'B2BVIP'
        ? couponCode
        : undefined;

    const totals = calculateCartTotals(cartItems, validCoupon);

    // 5. Tạo danh sách sản phẩm trong đơn hàng
    const orderItems: OrderItemSummary[] = cartItems.map((item) => ({
      productId: item.productId,
      title: item.product.name,
      subtitle: item.product.subtitle,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      imageUrl: item.product.imageUrl,
      customizationBadge: item.selectedVariantLabel,
      giftCardBadge: giftCard ? 'Có thiệp chúc Tết' : undefined,
    }));

    // 6. Tạo đơn hàng
    const now = new Date();
    const timestamp = now.toISOString();
    const orderId = crypto.randomUUID();

    const order: Order = {
      id: orderId,
      orderCode: `EG-${now.getFullYear()}-${orderId
        .slice(0, 8)
        .toUpperCase()}`,
      createdAt: timestamp,
      status: 'packaging',
      statusText: 'Đang chờ xử lý',

      recipientName: recipientName.trim(),
      phone: phone.trim(),
      email: email.trim(),

      shippingAddress: `${address.trim()}, ${district.trim()}, ${city.trim()}`,
      deliveryCity: city.trim(),
      estimatedDelivery: deliveryTime || 'Sẽ được xác nhận sau',

      items: orderItems,
      totalBoxes: totals.totalBoxes,
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      discountPercentage: totals.discountPercentage,
      vatAmount: totals.vatAmount,
      grandTotal: totals.grandTotal,

      hasVatInvoice: Boolean(requireVat),
      companyName: companyName || undefined,
      taxCode: taxCode || undefined,
      companyAddress: companyAddress || undefined,
      invoiceEmail: invoiceEmail || undefined,

      giftCardRequested: Boolean(giftCard),
      paymentMethod,
    };

    // 7. Lưu đơn hàng
    orderStore.set(order.id, order);

    // 8. Xóa giỏ hàng sau khi tạo đơn thành công
    cart.items = [];
    cart.updatedAt = timestamp;

    return NextResponse.json(
      {
        success: true,
        message: 'Đặt hàng thành công.',
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create Order API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể tạo đơn hàng. Vui lòng kiểm tra lại dữ liệu.',
      },
      { status: 500 }
    );
  }
}
// GET: Lấy danh sách đơn hàng
export async function GET() {
  try {
    const orders = Array.from(orderStore.values());

    // Sắp xếp đơn hàng mới nhất lên đầu
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      message: 'Lấy danh sách đơn hàng thành công.',
      data: {
        total: orders.length,
        orders,
      },
    });
  } catch (error) {
    console.error('Get Orders API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể lấy danh sách đơn hàng.',
      },
      { status: 500 }
    );
  }
}