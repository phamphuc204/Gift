
import { PRODUCTS } from '../../../../infrastructure/mockData';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const product = PRODUCTS.find(
      (item) => item.id === id
    );

    if (!product) {
      return Response.json(
        {
          success: false,
          message: 'Không tìm thấy sản phẩm.',
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('GET /api/products/[id] error:', error);

    return Response.json(
      {
        success: false,
        message: 'Không thể lấy thông tin sản phẩm.',
      },
      { status: 500 }
    );
  }
}
