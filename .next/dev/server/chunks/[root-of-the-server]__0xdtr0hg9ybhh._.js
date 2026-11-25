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
"[project]/src/app/api/products/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$infrastructure$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/infrastructure/mockData.ts [app-route] (ecmascript)");
;
async function GET(request, { params }) {
    try {
        const { id } = await params;
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$infrastructure$2f$mockData$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PRODUCTS"].find((item)=>item.id === id);
        if (!product) {
            return Response.json({
                success: false,
                message: 'Không tìm thấy sản phẩm.'
            }, {
                status: 404
            });
        }
        return Response.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('GET /api/products/[id] error:', error);
        return Response.json({
            success: false,
            message: 'Không thể lấy thông tin sản phẩm.'
        }, {
            status: 500
        });
    }
}
}),
"[project]/src/infrastructure/mockData.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */ __turbopack_context__.s([
    "FAQS",
    ()=>FAQS,
    "HERO_SLIDES",
    ()=>HERO_SLIDES,
    "IMAGES",
    ()=>IMAGES,
    "INITIAL_ORDERS",
    ()=>INITIAL_ORDERS,
    "PARTNERS",
    ()=>PARTNERS,
    "PRODUCTS",
    ()=>PRODUCTS,
    "SHOWROOMS",
    ()=>SHOWROOMS
]);
const IMAGES = {
    carousel1: '/images/hero_tet_hamper_1793432650891.jpg',
    carousel2: '/images/son_mai_gold_box_1793432650560.jpg',
    carousel3: '/images/wood_carved_hamper_1793432651999.jpg',
    artisanWorkshop: '/images/lacquer_artisan_process_1793432652031.jpg',
    boxDetailedSet: '/images/hero_tet_hamper_1793432650891.jpg',
    boxGoldLeaf: '/images/son_mai_gold_box_1793432650560.jpg',
    boxWoodMun: '/images/wood_carved_hamper_1793432651999.jpg',
    boxEggshell: '/images/son_mai_gold_box_1793432650560.jpg',
    boxWarmReunion: '/images/hero_tet_hamper_1793432650891.jpg',
    orderItem1: '/images/hero_tet_hamper_1793432650891.jpg',
    orderItem2: '/images/wood_carved_hamper_1793432651999.jpg'
};
const PRODUCTS = [
    {
        id: 'van-su-khoi-sac',
        sku: 'EG-SM2027-01',
        name: 'Hộp Gỗ Sơn Mài "Vạn Sự Khởi Sắc"',
        subtitle: 'Sơn Mài Thủ Công Mỹ Nghệ',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 1250000,
        originalPrice: 1500000,
        badge: 'BÁN CHẠY NHẤT',
        badgeType: 'bestseller',
        rating: 4.9,
        reviewsCount: 128,
        inStock: true,
        stockCount: 850,
        imageUrl: IMAGES.carousel1,
        gallery: [
            IMAGES.carousel1,
            IMAGES.boxDetailedSet,
            IMAGES.boxGoldLeaf,
            IMAGES.carousel2
        ],
        craftSteps: 54,
        description: 'Tuyển chọn tuyệt phẩm hộp quà Tết sơn mài truyền thống 7 lớp màu son đỏ hoàng gia kết hợp nắp đậy khảm nhũ kim. Món quà tri ân tinh tế, biểu trưng cho khởi đầu rực rỡ và phát đạt của doanh nghiệp.',
        variants: [
            {
                id: 'do-phu-quy',
                name: 'Đỏ Phú Quý',
                colorHex: '#8B0000',
                label: 'Bán chạy nhất'
            },
            {
                id: 'vang-hoang-gia',
                name: 'Vàng Hoàng Gia',
                colorHex: '#B8860B',
                label: 'Thếp nhũ vàng'
            },
            {
                id: 'xanh-ngoc-bich',
                name: 'Xanh Ngọc Bích',
                colorHex: '#1A4338',
                label: 'Quý phái'
            }
        ],
        delicacies: [
            {
                id: 'del-1',
                name: 'Rượu Vang Pháp Bordeaux Grand Cru',
                weightOrVolume: 'Dung tích: 750ml • Niên vụ tuyển chọn',
                origin: 'Bordeaux, Pháp',
                description: 'Hương thơm sâu lắng của quả mọng đen, ủ thùng sồi Pháp 18 tháng, vị chát mượt mà đậm đà.',
                icon: 'fa-wine-bottle'
            },
            {
                id: 'del-2',
                name: 'Trà Cổ Thụ Shan Tuyết Hà Giang',
                weightOrVolume: 'Trọng lượng: 100g • Hũ sứ mạ vàng',
                origin: 'Tây Côn Lĩnh, Hà Giang',
                description: 'Thu hái từ cây trà trên 300 năm tuổi trên dải Tây Côn Lĩnh mây phủ, nước vàng óng, hậu ngọt sâu.',
                icon: 'fa-leaf'
            },
            {
                id: 'del-3',
                name: 'Hạt Macca Đắk Lắk Nứt Vỏ Hạng Nhất',
                weightOrVolume: 'Trọng lượng: 250g • Hũ thủy tinh chân không',
                origin: 'Đắk Lắk, Việt Nam',
                description: 'Hạt tròn đều, sấy gió tự nhiên giữ trọn độ ngậy béo, tặng kèm dụng cụ tách vỏ mạ đồng.',
                icon: 'fa-bowl-rice'
            },
            {
                id: 'del-4',
                name: 'Hạt Điều Bình Phước Rang Củi',
                weightOrVolume: 'Trọng lượng: 200g • Loại A Cồ xuất khẩu',
                origin: 'Bình Phước, Việt Nam',
                description: 'Rang thủ công bằng củi cà phê, giòn tan, vị ngọt bùi tự nhiên không gắt muối.',
                icon: 'fa-seedling'
            },
            {
                id: 'del-5',
                name: 'Yến Sào Chưng Đông Trùng Hạ Thảo',
                weightOrVolume: 'Số lượng: 02 hũ x 70ml • Nha Trang',
                origin: 'Nha Trang, Khánh Hòa',
                description: 'Hàm lượng yến tươi nguyên chất 35%, kết hợp nấm đông trùng dược liệu và đường phèn thanh mát.',
                icon: 'fa-jar'
            },
            {
                id: 'del-6',
                name: 'Mứt Gừng Hoàng Gia & Long Nhãn Sen',
                weightOrVolume: 'Trọng lượng: 200g • Đặc sản Huế & Hưng Yên',
                origin: 'Cung đình Huế & Hưng Yên',
                description: 'Mứt gừng lát dẻo cay ấm, hòa quyện long nhãn bọc hạt sen sấy thanh tao cho chén trà xuân.',
                icon: 'fa-cookie'
            }
        ],
        isFeatured: true
    },
    {
        id: 'long-phung-hoa-minh',
        sku: 'EG-RG2027-02',
        name: 'Rương Gỗ Tự Nhiên "Long Phụng Hòa Minh"',
        subtitle: 'Rương Gỗ Thủ Công Khắc Nổi',
        category: 'ruong-go',
        categoryLabel: 'Rương Gỗ Khắc Chữ',
        price: 2450000,
        originalPrice: 2850000,
        badge: 'PHIÊN BẢN ĐẶC BIỆT',
        badgeType: 'special',
        rating: 5.0,
        reviewsCount: 96,
        inStock: true,
        stockCount: 420,
        imageUrl: IMAGES.boxWoodMun,
        gallery: [
            IMAGES.boxWoodMun,
            IMAGES.carousel2,
            IMAGES.carousel3
        ],
        description: 'Gỗ Mun Hoàng Gia nguyên khối chạm khắc rồng phượng uyển chuyển, phối cùng Single Malt Whisky 18 năm, tổ yến tinh chế và trà Shan tuyết cổ thụ trứ danh.',
        isFeatured: true
    },
    {
        id: 'an-khang-thinh-vuong',
        sku: 'EG-YS2027-03',
        name: 'Set Yến Sào Hoàng Kim "An Khang Thịnh Vượng"',
        subtitle: 'Tổ Yến Tự Nhiên Khánh Hòa',
        category: 'yen-sam',
        categoryLabel: 'Hộp Quà Yến Sào & Sâm',
        price: 1850000,
        originalPrice: 2200000,
        badge: 'SET YẾN SÀO CAO CẤP',
        badgeType: 'vip',
        rating: 4.9,
        reviewsCount: 148,
        inStock: true,
        stockCount: 610,
        imageUrl: IMAGES.carousel2,
        gallery: [
            IMAGES.carousel2,
            IMAGES.boxDetailedSet
        ],
        description: 'Tổ yến đảo Khánh Hòa nguyên tai rút lông định hình, kết hợp đông trùng hạ thảo Tây Tạng, đường phèn hữu cơ và táo đỏ Tân Cương.',
        isFeatured: true
    },
    {
        id: 'khang-thinh-nhu-y',
        sku: 'EG-SM2027-04',
        name: 'Hộp Gỗ Sơn Mài Khang Thịnh Như Ý',
        subtitle: 'Sơn Mài Truyền Thống',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 1550000,
        originalPrice: 1800000,
        badge: 'CAO CẤP',
        badgeType: 'limited',
        rating: 4.9,
        reviewsCount: 112,
        inStock: true,
        stockCount: 520,
        imageUrl: IMAGES.carousel3,
        gallery: [
            IMAGES.carousel3,
            IMAGES.boxDetailedSet
        ],
        description: 'Hồng trà cổ thụ Tây Côn Lĩnh, nho khô Chile nguyên cành, hạt dẻ cười California và mứt gừng Huế dẻo thơm.',
        isFeatured: false
    },
    {
        id: 'hoa-mai-nghenh-xuan',
        sku: 'EG-TT2027-05',
        name: 'Hộp Mộc Hoa Mai Nghênh Xuân',
        subtitle: 'Gỗ Mộc Truyền Thống',
        category: 'truyen-thong',
        categoryLabel: 'Bộ Quà Truyền Thống',
        price: 1250000,
        originalPrice: 1450000,
        badge: 'TRUYỀN THỐNG',
        badgeType: 'bestseller',
        rating: 4.8,
        reviewsCount: 84,
        inStock: true,
        stockCount: 390,
        imageUrl: IMAGES.boxEggshell,
        gallery: [
            IMAGES.boxEggshell,
            IMAGES.carousel1
        ],
        description: 'Hạt óc chó sấy mộc, trà Ô Long Tứ Quý hảo hạng, táo đỏ Tân Cương hữu cơ & mứt tắc chua ngọt thanh tao.',
        isFeatured: false
    },
    {
        id: 'luc-giac-dai-cat',
        sku: 'EG-SM2027-06',
        name: 'Hộp Sơn Mài Lục Giác Đại Cát',
        subtitle: 'Đỉnh Cao Chế Tác Cung Đình',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 3200000,
        originalPrice: 3800000,
        badge: 'HOÀNG GIA VIP',
        badgeType: 'vip',
        rating: 5.0,
        reviewsCount: 65,
        inStock: true,
        stockCount: 180,
        imageUrl: IMAGES.carousel1,
        gallery: [
            IMAGES.carousel1,
            IMAGES.boxGoldLeaf
        ],
        description: 'Hồng sâm củ khô 6 năm tuổi Hàn Quốc, tổ yến đảo thượng hạng, đông trùng hạ thảo tự nhiên và rượu vang Gran Reserva.',
        isFeatured: true
    },
    {
        id: 'doan-vien-am-ap',
        sku: 'EG-TT2027-07',
        name: 'Set Quà Tết Đoàn Viên Ấm Áp',
        subtitle: 'Nông Sản OCOP & Trà Thảo Mộc',
        category: 'truyen-thong',
        categoryLabel: 'Bộ Quà Truyền Thống',
        price: 990000,
        originalPrice: 1150000,
        badge: 'GIÁ TỐT NHẤT',
        badgeType: 'bestprice',
        rating: 4.8,
        reviewsCount: 175,
        inStock: true,
        stockCount: 920,
        imageUrl: IMAGES.boxWarmReunion,
        gallery: [
            IMAGES.boxWarmReunion
        ],
        description: 'Hạt điều rang củi, mứt vỏ bưởi sấy dẻo, xoài cát sấy muối ớt cùng trà hoa cúc vàng thanh nhiệt đầu xuân.',
        isFeatured: false
    },
    {
        id: 'kim-ngan-phu-quy',
        sku: 'EG-SM2027-08',
        name: 'Hộp Sơn Mài Kim Ngân Phú Quý',
        subtitle: 'Sơn Mài Thếp Vàng 24K',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 2850000,
        originalPrice: 3300000,
        badge: 'THẾP VÀNG 24K',
        badgeType: 'limited',
        rating: 5.0,
        reviewsCount: 86,
        inStock: true,
        stockCount: 240,
        imageUrl: IMAGES.boxGoldLeaf,
        gallery: [
            IMAGES.boxGoldLeaf
        ],
        craftSteps: 54,
        description: 'Sơn mài đen bóng gương kết hợp họa tiết cành mai thếp vàng lá 24K. Đi kèm Vang Bordeaux Grand Cru, Yến Đảo & Hạt Macca Úc.',
        isFeatured: true
    },
    {
        id: 'bach-hac-quan-tung',
        sku: 'EG-SM2027-09',
        name: 'Bách Hạc Quần Tùng Cẩn Xà Cừ',
        subtitle: 'Nghệ Nhân Làng Hạ Thái',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 4200000,
        originalPrice: 4800000,
        badge: 'CẨN XÀ CỪ QUÝ',
        badgeType: 'vip',
        rating: 5.0,
        reviewsCount: 120,
        inStock: true,
        stockCount: 110,
        imageUrl: IMAGES.boxEggshell,
        gallery: [
            IMAGES.boxEggshell
        ],
        craftSteps: 54,
        description: 'Kiệt tác khắc họa chim hạc trường thọ trên vỏ trai ngũ sắc lấp lánh. Gồm Đông Trùng Hạ Thảo nguyên con, Rượu Vang Ý & Trà Oolong Thượng Hạng.',
        isFeatured: true
    },
    {
        id: 'vinh-hoa-dinh-mui',
        sku: 'EG-SM2027-10',
        name: 'Hộp Sơn Mài Vinh Hoa Đinh Mùi',
        subtitle: 'Khảm Vỏ Trứng Tinh Xảo',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 3450000,
        originalPrice: 3950000,
        badge: 'KHẢM VỎ TRỨNG',
        badgeType: 'limited',
        rating: 4.9,
        reviewsCount: 64,
        inStock: true,
        stockCount: 150,
        imageUrl: IMAGES.boxDetailedSet,
        gallery: [
            IMAGES.boxDetailedSet
        ],
        description: 'Kỹ thuật ghép từng mảnh vỏ trứng vịt tạo hình linh vật và hoa sen truyền thống trên nền sơn then bóng loáng. Tinh tế và đậm nét hoài niệm.',
        isFeatured: false
    },
    {
        id: 'nhu-y-chu-sa',
        sku: 'EG-SM2027-11',
        name: 'Như Ý Cát Tường Chu Sa',
        subtitle: 'Sơn Mài Đỏ Chu Sa Hoàng Gia',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 2250000,
        originalPrice: 2600000,
        badge: 'SƠN MÀI ĐỎ CHU SA',
        badgeType: 'special',
        rating: 4.8,
        reviewsCount: 52,
        inStock: true,
        stockCount: 320,
        imageUrl: IMAGES.boxGoldLeaf,
        gallery: [
            IMAGES.boxGoldLeaf
        ],
        description: 'Màu đỏ chu sa son thắm tượng trưng vượng khí tân niên, phối họa tiết vân mây dát bạc phủ bóng. Kết hợp Rượu Whisky mạch nha & Trà Sen Tây Hồ.',
        isFeatured: false
    },
    {
        id: 'cuu-long-trieu-nhat',
        sku: 'EG-SM2027-12',
        name: 'Cửu Long Triều Nhật Hoàng Gia',
        subtitle: 'Đỉnh Cao Chế Tác Cung Đình',
        category: 'son-mai',
        categoryLabel: 'Hộp Gỗ Sơn Mài',
        price: 5200000,
        originalPrice: 6000000,
        badge: 'SET HOÀNG GIA ĐẶC BIỆT',
        badgeType: 'vip',
        rating: 5.0,
        reviewsCount: 98,
        inStock: true,
        stockCount: 75,
        imageUrl: IMAGES.boxEggshell,
        gallery: [
            IMAGES.boxEggshell
        ],
        craftSteps: 54,
        description: '12 lớp sơn mài then bóng gương kết hợp phù điêu rồng ngậm ngọc thếp vàng toàn bộ. Bao gồm Vang hảo hạng niên vụ cổ và Tổ Yến thượng phẩm.',
        isFeatured: true
    }
];
const HERO_SLIDES = [
    {
        badge: 'BỘ SƯU TẬP GIỚI HẠN',
        name: 'Hộp Gỗ Sơn Mài “Vạn Sự Khởi Sắc”',
        price: 'Từ 1.250.000₫',
        image: IMAGES.carousel1,
        productId: 'van-su-khoi-sac'
    },
    {
        badge: 'SET YẾN SÀO CAO CẤP',
        name: 'Set Yến Sào Hoàng Kim “An Khang Thịnh Vượng”',
        price: 'Từ 1.850.000₫',
        image: IMAGES.carousel2,
        productId: 'an-khang-thinh-vuong'
    },
    {
        badge: 'PHIÊN BẢN ĐẶC BIỆT',
        name: 'Rương Gỗ Chạm Khắc “Long Phụng Hòa Minh”',
        price: 'Từ 2.450.000₫',
        image: IMAGES.carousel3,
        productId: 'long-phung-hoa-minh'
    }
];
const SHOWROOMS = [
    {
        id: 'hanoi',
        city: 'Hà Nội',
        name: 'Showroom Hà Nội (Trụ sở chính)',
        address: '88 Phố Huế, Q. Hai Bà Trưng, TP. Hà Nội',
        phone: '024 3988 8888',
        features: 'VIP Tasting Lounge B2B',
        badge: 'Có chỗ đỗ ô tô'
    },
    {
        id: 'hcmc',
        city: 'TP. Hồ Chí Minh',
        name: 'Showroom TP. Hồ Chí Minh',
        address: '126 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP. HCM',
        phone: '028 3988 8888',
        features: 'Phòng Trưng Bày Sơn Mài',
        badge: '60+ mẫu trưng bày'
    },
    {
        id: 'danang',
        city: 'Đà Nẵng',
        name: 'Showroom & Kho Miền Trung',
        address: '45 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng',
        phone: '0236 3988 888',
        features: 'Hub Phân Tán Miền Trung',
        badge: 'Giao hỏa tốc 24h'
    }
];
const FAQS = [
    {
        id: 1,
        question: 'Chính sách chiết khấu bậc thang Tết Đinh Mùi 2027 áp dụng như thế nào?',
        answer: 'EleGift áp dụng chiết khấu trực tiếp trên giá trị hợp đồng từ 10% đến 25% tùy theo số lượng đặt hàng (từ 10 hộp trở lên). Đối với đơn hàng sớm đặt cọc trước ngày 15/12 Âm lịch, Quý công ty được tặng thêm gói thiết kế thiệp chúc mừng Ban Lãnh Đạo & túi lụa cao cấp trị giá 5.000.000đ.'
    },
    {
        id: 2,
        question: 'Thời gian gửi hộp mẫu thực tế & thẩm định chất lượng mất bao lâu?',
        answer: 'Đội ngũ chuyên viên gửi hồ sơ quy cách trong vòng 30 phút. Mẫu hộp sơn mài thực tế được gửi đến tận bàn làm việc của Quý khách trong 24h đối với Hà Nội & TP.HCM, và 48h đối với các tỉnh thành khác.'
    },
    {
        id: 3,
        question: 'EleGift có hỗ trợ giao phân tán đến từng chi nhánh, đối tác toàn quốc không?',
        answer: 'Có. Chúng tôi sở hữu mạng lưới logistics chuyên nghiệp 63 tỉnh thành, nhận đóng gói chèn xốp chống sốc tiêu chuẩn hàng cao cấp và giao tận tay từng địa chỉ chi nhánh hoặc tư gia đối tác theo danh sách bảo mật của quý khách.'
    },
    {
        id: 4,
        question: 'Thủ tục hợp đồng kinh tế và xuất hóa đơn VAT điện tử ra sao?',
        answer: 'EleGift cung cấp đầy đủ hợp đồng thương mại, biên bản nghiệm thu và hóa đơn GTGT (VAT 100% hợp lệ) ngay khi hoàn tất đơn hàng. Hỗ trợ thanh toán linh hoạt nhiều đợt theo quy chế tài chính của doanh nghiệp.'
    }
];
const INITIAL_ORDERS = [
    {
        id: 'order-1',
        orderCode: '#EG-882027',
        createdAt: '18/01/2027 (14:30)',
        status: 'shipping',
        statusText: 'Đang vận chuyển hỏa tốc',
        recipientName: 'Nguyễn Văn A',
        phone: '0912 345 678',
        email: 'van.a@vingroup.net',
        shippingAddress: 'Tòa tháp Symphony, Chu Huy Mân, Long Biên, Hà Nội',
        deliveryCity: 'Hà Nội',
        estimatedDelivery: '20/01/2027 (Trước 23 Tháng Chạp)',
        items: [
            {
                productId: 'van-su-khoi-sac',
                title: 'Hộp Gỗ Sơn Mài "Vạn Sự Khởi Sắc"',
                subtitle: 'Phối ngẫu: Yến Sào Khánh Hòa, Hạt Macca Úc, Vang Nổ Bordeaux & Trà Cổ Thụ',
                quantity: 50,
                unitPrice: 1160000,
                totalPrice: 58000000,
                imageUrl: IMAGES.orderItem1,
                customizationBadge: 'Đóng gói sơn mài thượng hạng',
                giftCardBadge: 'Kèm 50 thiệp chúc mừng riêng'
            }
        ],
        totalBoxes: 50,
        subtotal: 72500000,
        discountPercentage: 20,
        discountAmount: 14500000,
        vatAmount: 4640000,
        grandTotal: 62640000,
        hasVatInvoice: true,
        companyName: 'Tập Đoàn Vingroup',
        taxCode: '0101245486',
        giftCardRequested: true,
        paymentMethod: 'b2b-contract'
    },
    {
        id: 'order-2',
        orderCode: '#EG-881945',
        createdAt: '15/01/2027 (09:15)',
        status: 'packaging',
        statusText: 'Đang kiểm định & Đóng gói sơn mài',
        recipientName: 'Nguyễn Văn A',
        phone: '0912 345 678',
        email: 'van.a@vingroup.net',
        shippingAddress: 'Vincom Center, 72 Lê Thánh Tôn, Bến Nghé, Quận 1, TP.HCM',
        deliveryCity: 'TP. Hồ Chí Minh',
        estimatedDelivery: '21/01/2027 (Giao hẹn giờ)',
        items: [
            {
                productId: 'long-phung-hoa-minh',
                title: 'Rương Gỗ Tự Nhiên "Long Phụng Hòa Minh"',
                subtitle: 'Dòng Rượu Ngoại Whisky 18 Năm, Tổ Yến Tinh Chế & Trà Shan Tuyết Thượng Hạng',
                quantity: 30,
                unitPrice: 2280000,
                totalPrice: 68400000,
                imageUrl: IMAGES.orderItem2,
                customizationBadge: 'Chế tác khay gấm lụa hoàng gia & niêm phong'
            }
        ],
        totalBoxes: 30,
        subtotal: 85500000,
        discountPercentage: 20,
        discountAmount: 17100000,
        vatAmount: 5472000,
        grandTotal: 73872000,
        hasVatInvoice: true,
        companyName: 'Tập Đoàn Vingroup',
        taxCode: '0101245486',
        paymentMethod: 'b2b-contract'
    },
    {
        id: 'order-3',
        orderCode: '#EG-880211',
        createdAt: '05/01/2027 (11:00)',
        status: 'delivered',
        statusText: 'Đã giao thành công & Nghiệm thu',
        recipientName: 'Nguyễn Văn A',
        phone: '0912 345 678',
        email: 'van.a@vingroup.net',
        shippingAddress: '45 Bạch Đằng, Q. Hải Châu, TP. Đà Nẵng',
        deliveryCity: 'Đà Nẵng',
        estimatedDelivery: '10/01/2027 (Đã hoàn tất)',
        signedProtocolDate: '10/01/2027',
        items: [
            {
                productId: 'khai-xuan-nhu-y',
                title: 'Hộp Sơn Mài Thượng Hạng "Khai Xuân Như Ý"',
                subtitle: 'Đơn quà tặng ngoại giao - Chi nhánh Đà Nẵng',
                quantity: 15,
                unitPrice: 1850000,
                totalPrice: 27750000,
                imageUrl: IMAGES.orderItem1
            }
        ],
        totalBoxes: 15,
        subtotal: 27750000,
        discountPercentage: 0,
        discountAmount: 0,
        vatAmount: 2220000,
        grandTotal: 29970000,
        hasVatInvoice: true,
        paymentMethod: 'vietqr'
    }
];
const PARTNERS = [
    'VIETTEL',
    'TECHCOMBANK',
    'VINFAST',
    'VINGROUP',
    'FPT CORP',
    'VIETCOMBANK'
];
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0xdtr0hg9ybhh._.js.map