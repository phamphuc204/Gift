
import { NextRequest, NextResponse } from 'next/server';
import { orderStore } from '../../../../lib/order-store';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET: Lấy chi tiết đơn hàng theo ID
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const order = orderStore.get(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Không tìm thấy đơn hàng.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lấy chi tiết đơn hàng thành công.',
      data: order,
    });
  } catch (error) {
    console.error('Get Order Detail API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể lấy chi tiết đơn hàng.',
      },
      { status: 500 }
    );
  }
}

 // PATCH: Cập nhật trạng thái đơn hàng
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const order = orderStore.get(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: 'Không tìm thấy đơn hàng.',
        },
        { status: 404 }
      );
    }

    const statusTexts = {
      packaging: 'Đang chờ xử lý',
      shipping: 'Đang giao hàng',
      delivered: 'Đã giao hàng',
      cancelled: 'Đã hủy',
    } as const;

    if (
      typeof status !== 'string' ||
      !Object.prototype.hasOwnProperty.call(statusTexts, status)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Trạng thái đơn hàng không hợp lệ.',
        },
        { status: 400 }
      );
    }

    const newStatus = status as keyof typeof statusTexts;

    const updatedOrder = {
      ...order,
      status: newStatus,
      statusText: statusTexts[newStatus],
    };

    orderStore.set(id, updatedOrder);

    return NextResponse.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công.',
      data: updatedOrder,
    });
  } catch (error) {
    console.error('Update Order Status API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể cập nhật trạng thái đơn hàng.',
      },
      { status: 500 }
    );
  }
}
