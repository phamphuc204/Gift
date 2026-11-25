
import {
  getOrCreateCart,
  findProduct,
  getCartSummary,
} from '../../../lib/cart-store';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return Response.json(
        {
          success: false,
          message: 'Thiếu sessionId.',
        },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(sessionId);

    return Response.json({
      success: true,
      message: 'Lấy giỏ hàng thành công.',
      data: getCartSummary(cart),
    });
  } catch (error) {
    console.error('GET /api/cart error:', error);

    return Response.json(
      {
        success: false,
        message: 'Không thể lấy thông tin giỏ hàng.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      sessionId,
      productId,
      productSkuId,
      quantity = 1,
    } = body;

    if (!sessionId || !productId) {
      return Response.json(
        {
          success: false,
          message: 'Cần cung cấp sessionId và productId.',
        },
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

    const product = findProduct(productId);

    if (!product) {
      return Response.json(
        { success: false, message: 'Không tìm thấy sản phẩm.' },
        { status: 404 }
      );
    }

    if (!product.inStock || product.stockCount < quantity) {
      return Response.json(
        { success: false, message: 'Sản phẩm không đủ tồn kho.' },
        { status: 400 }
      );
    }

    const skuId = productSkuId || 'standard';

    // Nếu sản phẩm có danh sách phiên bản, kiểm tra phiên bản được chọn.
    const variants = product.variants ?? [];
    if (
      variants.length > 0 &&
      !variants.some((variant) => variant.id === skuId)
    ) {
      return Response.json(
        { success: false, message: 'Phiên bản sản phẩm không hợp lệ.' },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(sessionId);

    const existingItem = cart.items.find(
      (item) =>
        item.productId === productId &&
        item.productSkuId === skuId
    );

    if (existingItem) {
      const nextQuantity = existingItem.quantity + quantity;

      if (nextQuantity > product.stockCount) {
        return Response.json(
          { success: false, message: 'Số lượng vượt quá tồn kho.' },
          { status: 400 }
        );
      }

      existingItem.quantity = nextQuantity;
      existingItem.updatedAt = new Date().toISOString();
    } else {
      const timestamp = new Date().toISOString();

      cart.items.push({
        id: `item-${crypto.randomUUID()}`,
        cartId: cart.id,
        productId,
        productSkuId: skuId,
        quantity,
        unitPrice: product.price,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    cart.updatedAt = new Date().toISOString();

    return Response.json(
      {
        success: true,
        message: 'Đã thêm sản phẩm vào giỏ hàng.',
        data: getCartSummary(cart),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/cart/items error:', error);

    return Response.json(
      { success: false, message: 'Không thể thêm sản phẩm.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return Response.json(
        { success: false, message: 'Thiếu sessionId.' },
        { status: 400 }
      );
    }

    const cart = getOrCreateCart(sessionId);

    cart.items = [];
    cart.updatedAt = new Date().toISOString();

    return Response.json({
      success: true,
      message: 'Đã làm trống giỏ hàng.',
      data: getCartSummary(cart),
    });
  } catch (error) {
    console.error('DELETE /api/cart error:', error);

    return Response.json(
      { success: false, message: 'Không thể làm trống giỏ hàng.' },
      { status: 500 }
    );
  }
}
