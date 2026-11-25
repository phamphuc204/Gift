
import {
  getOrCreateCart,
  findCartItem,
  findProduct,
  getCartSummary,
} from '../../../../../lib/cart-store';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { sessionId, quantity } = body;

    if (!sessionId) {
      return Response.json(
        { success: false, message: 'Thiếu sessionId.' },
        { status: 400 }
      );
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return Response.json(
        {
          success: false,
          message: 'Số lượng phải là số nguyên lớn hơn 0.',
        },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(sessionId);
    const item = findCartItem(cart, id);

    if (!item) {
      return Response.json(
        { success: false, message: 'Không tìm thấy sản phẩm trong giỏ.' },
        { status: 404 }
      );
    }

    const product = findProduct(item.productId);

    if (!product || !product.inStock || quantity > product.stockCount) {
      return Response.json(
        { success: false, message: 'Số lượng vượt quá tồn kho.' },
        { status: 400 }
      );
    }

    item.quantity = quantity;
    item.updatedAt = new Date().toISOString();
    cart.updatedAt = new Date().toISOString();

    return Response.json({
      success: true,
      message: 'Đã cập nhật số lượng.',
      data: getCartSummary(cart),
    });
  } catch (error) {
    console.error('PATCH /api/cart/items/[id] error:', error);

    return Response.json(
      { success: false, message: 'Không thể cập nhật giỏ hàng.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return Response.json(
        { success: false, message: 'Thiếu sessionId.' },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(sessionId);
    const item = findCartItem(cart, id);

    if (!item) {
      return Response.json(
        { success: false, message: 'Không tìm thấy sản phẩm trong giỏ.' },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter((entry) => entry.id !== id);
    cart.updatedAt = new Date().toISOString();

    return Response.json({
      success: true,
      message: 'Đã xóa sản phẩm khỏi giỏ hàng.',
      data: getCartSummary(cart),
    });
  } catch (error) {
    console.error('DELETE /api/cart/items/[id] error:', error);

    return Response.json(
      { success: false, message: 'Không thể xóa sản phẩm.' },
      { status: 500 }
    );
  }
}
