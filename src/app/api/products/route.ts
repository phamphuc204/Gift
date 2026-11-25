
import { PRODUCTS } from '../../../infrastructure/mockData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Lấy tham số tìm kiếm
    const search = searchParams.get('search')?.trim().toLowerCase();
    const category = searchParams.get('category');
    const minPrice = Number(searchParams.get('minPrice') ?? 0);
    const maxPriceParam = searchParams.get('maxPrice');
    const maxPrice = maxPriceParam
      ? Number(maxPriceParam)
      : Infinity;
    const inStock = searchParams.get('inStock');
    const sort = searchParams.get('sort');

    // Kiểm tra giá hợp lệ
    if (
      !Number.isFinite(minPrice) ||
      minPrice < 0 ||
      (maxPriceParam !== null &&
        (!Number.isFinite(maxPrice) || maxPrice < 0))
    ) {
      return Response.json(
        { success: false, message: 'Khoảng giá không hợp lệ.' },
        { status: 400 }
      );
    }

    // Lọc sản phẩm
    let products = [...PRODUCTS];

    if (search) {
      products = products.filter((product) =>
        [
          product.name,
          product.subtitle,
          product.description,
          product.categoryLabel,
        ].some((value) => value?.toLowerCase().includes(search))
      );
    }

    if (category) {
      products = products.filter(
        (product) => product.category === category
      );
    }

    products = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice
    );

    if (inStock === 'true') {
      products = products.filter(
        (product) => product.inStock && product.stockCount > 0
      );
    }

    if (inStock === 'false') {
      products = products.filter(
        (product) => !product.inStock || product.stockCount <= 0
      );
    }

    // Sắp xếp sản phẩm
    switch (sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return Response.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch (error) {
    console.error('GET /api/products error:', error);

    return Response.json(
      {
        success: false,
        message: 'Không thể lấy danh sách sản phẩm.',
      },
      { status: 500 }
    );
  }
}
