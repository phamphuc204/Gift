module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/products/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import { PRODUCTS } from '../../../infrastructure/mockData';
// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     // Lấy tham số tìm kiếm
//     const search = searchParams.get('search')?.trim().toLowerCase();
//     const category = searchParams.get('category');
//     const minPrice = Number(searchParams.get('minPrice') ?? 0);
//     const maxPriceParam = searchParams.get('maxPrice');
//     const maxPrice = maxPriceParam
//       ? Number(maxPriceParam)
//       : Infinity;
//     const inStock = searchParams.get('inStock');
//     const sort = searchParams.get('sort');
//     // Kiểm tra giá hợp lệ
//     if (
//       !Number.isFinite(minPrice) ||
//       minPrice < 0 ||
//       (maxPriceParam !== null &&
//         (!Number.isFinite(maxPrice) || maxPrice < 0))
//     ) {
//       return Response.json(
//         { success: false, message: 'Khoảng giá không hợp lệ.' },
//         { status: 400 }
//       );
//     }
//     // Lọc sản phẩm
//     let products = [...PRODUCTS];
//     if (search) {
//       products = products.filter((product) =>
//         [
//           product.name,
//           product.subtitle,
//           product.description,
//           product.categoryLabel,
//         ].some((value) => value?.toLowerCase().includes(search))
//       );
//     }
//     if (category) {
//       products = products.filter(
//         (product) => product.category === category
//       );
//     }
//     products = products.filter(
//       (product) =>
//         product.price >= minPrice &&
//         product.price <= maxPrice
//     );
//     if (inStock === 'true') {
//       products = products.filter(
//         (product) => product.inStock && product.stockCount > 0
//       );
//     }
//     if (inStock === 'false') {
//       products = products.filter(
//         (product) => !product.inStock || product.stockCount <= 0
//       );
//     }
//     // Sắp xếp sản phẩm
//     switch (sort) {
//       case 'price_asc':
//         products.sort((a, b) => a.price - b.price);
//         break;
//       case 'price_desc':
//         products.sort((a, b) => b.price - a.price);
//         break;
//       case 'rating':
//         products.sort((a, b) => b.rating - a.rating);
//         break;
//       default:
//         break;
//     }
//     return Response.json({
//       success: true,
//       total: products.length,
//       data: products,
//     });
//   } catch (error) {
//     console.error('GET /api/products error:', error);
//     return Response.json(
//       {
//         success: false,
//         message: 'Không thể lấy danh sách sản phẩm.',
//       },
//       { status: 500 }
//     );
//   }
// }
__turbopack_context__.s([]);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0f0xfp-yb-dtb._.js.map