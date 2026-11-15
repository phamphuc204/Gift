'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useApp } from '../../application/AppContext';
import { PRODUCTS, IMAGES } from '../../infrastructure/mockData';
import { Product } from '../../domain/types';

interface PresetPrompt {
  label: string;
  query: string;
  budgetRange: string;
  budgetLabel: string;
  recipient: string;
  delicacy: string;
  packaging: string;
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    label: 'Biếu sếp / Đối tác VIP',
    query:
      'Tôi muốn tìm quà biếu đối tác nam cấp cao, ngân sách khoảng 3 triệu, thiết kế sang trọng sơn mài đỏ dát vàng và có rượu vang ngoại thượng hạng cùng hạt dinh dưỡng.',
    budgetRange: '2.5-5',
    budgetLabel: '2.500.000đ - 5.000.000đ',
    recipient: 'Nam giới • Đối tác cấp cao B2B',
    delicacy: 'Rượu Vang Ngoại + Yến Sào / Hạt',
    packaging: 'Sơn mài Đỏ Hoàng Gia Dát Vàng',
  },
  {
    label: 'Quà gia đình sum vầy',
    query:
      'Tìm hộp quà Tết ấm cúng cho gia đình, bố mẹ nhiều thế hệ, chú trọng trà Shan Tuyết cổ thụ, tổ yến bồi bổ sức khỏe và các loại hạt dinh dưỡng không dùng rượu mạnh.',
    budgetRange: '1-2.5',
    budgetLabel: '1.500.000đ - 2.500.000đ',
    recipient: 'Gia đình • Bố mẹ & Người lớn tuổi',
    delicacy: 'Trà Cổ Thụ Shan Tuyết + Yến Sào',
    packaging: 'Hộp Gỗ Mộc Chạm Hoa Sen',
  },
  {
    label: 'Doanh nghiệp 1 - 2 triệu',
    query:
      'Cần đặt 80 hộp quà tặng đối tác và khách hàng thân thiết của công ty, mức ngân sách 1.500.000đ / hộp, thiết kế sơn mài sang trọng và hóa đơn VAT.',
    budgetRange: '1-2.5',
    budgetLabel: '1.200.000đ - 1.800.000đ',
    recipient: 'Khách hàng thân thiết • Đối tác B2B',
    delicacy: 'Vang Đỏ Bordeaux + Hạt Dinh Dưỡng',
    packaging: 'Hộp Sơn Mài Thắt Nơ Lụa Ép Kim',
  },
  {
    label: 'Hộp sơn mài dát vàng & Vang',
    query:
      'Tuyển chọn hộp quà sơn mài truyền thống 7 lớp màu then hoặc đỏ đô, thếp vàng 24K thủ công tinh xảo, phối cùng chai vang Grand Cru lâu năm để ngoại giao.',
    budgetRange: '2.5-5',
    budgetLabel: '2.800.000đ - 5.000.000đ',
    recipient: 'Lãnh đạo ngoại giao • VIP C-Level',
    delicacy: 'Vang Pháp Grand Cru + Yến Đảo',
    packaging: 'Sơn Mài Thếp Vàng 24K Làng Nghề',
  },
  {
    label: 'Yến sào & Đông trùng hạ thảo',
    query:
      'Tìm set quà Tết sức khỏe cao cấp gồm yến sào Khánh Hòa nguyên tổ, đông trùng hạ thảo Tây Tạng và sâm ngọc linh thượng hạng, đóng rương gỗ quý bảo hiểm.',
    budgetRange: '>5',
    budgetLabel: '5.200.000đ - 8.500.000đ',
    recipient: 'Đối tác chiến lược • Tri ân đặc biệt',
    delicacy: 'Đông Trùng Hạ Thảo + Yến Sào Khánh Hòa',
    packaging: 'Rương Gỗ Mun Khảm Xà Cừ Cổ Điển',
  },
];

export const AIAdvisorView: React.FC = () => {
  const { navigateTo, addToCart, showToast } = useApp();

  const [userInput, setUserInput] = useState<string>(
    'Tôi muốn tìm quà biếu đối tác nam cấp cao, ngân sách khoảng 3 triệu, thiết kế sang trọng sơn mài đỏ dát vàng và có rượu vang ngoại thượng hạng cùng hạt dinh dưỡng.'
  );
  const [selectedBudgetRange, setSelectedBudgetRange] = useState<string>('2.5-5');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisTimestamp, setAnalysisTimestamp] = useState<number>(340);
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [aiError, setAiError] = useState<string>('');
  const [recommendedProducts, setRecommendedProducts] = useState<
    {
      product: Product;
      score: number;
      reason: string;
    }[]
  >([]);
  // Extracted parameters
  const [extractedParams, setExtractedParams] = useState({
    budgetDisplay: '~ 3.000.000 VNĐ / phần',
    recipient: 'Nam giới • Đối tác cấp cao B2B',
    delicacies: 'Rượu Vang Ngoại + Yến Sào / Hạt',
    packaging: 'Sơn mài Đỏ Hoàng Gia Dát Vàng',
    tokens: 1248,
    matchRate: '98.6%',
  });

  const handleSelectPreset = (preset: PresetPrompt) => {
    setUserInput(preset.query);
    setSelectedBudgetRange(preset.budgetRange);
    setExtractedParams({
      budgetDisplay: preset.budgetLabel,
      recipient: preset.recipient,
      delicacies: preset.delicacy,
      packaging: preset.packaging,
      tokens: 1100 + Math.floor(Math.random() * 300),
      matchRate: `${(97 + Math.random() * 2.8).toFixed(1)}%`,
    });
    showToast(`Đã áp dụng gợi ý: "${preset.label}"`, 'info');
  };

  const handleAnalyze = async () => {
    if (!userInput.trim()) {
      showToast('Vui lòng nhập nhu cầu tư vấn quà Tết.', 'error');
      return;
    }

    setIsAnalyzing(true);
    setAiError('');
    setAiRecommendation('');
    setRecommendedProducts([]);
    const startTime = Date.now();

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `
        Nhu cầu khách hàng: ${userInput}

        Khung ngân sách khách hàng đã chọn: ${
          {
            '<1': 'Dưới 1.000.000đ',
            '1-2.5': 'Từ 1.000.000đ đến 2.500.000đ',
            '2.5-5': 'Từ 2.500.000đ đến 5.000.000đ',
            '>5': 'Trên 5.000.000đ',
          }[selectedBudgetRange]
        }

        Hãy ưu tiên khung ngân sách đã chọn khi tư vấn và đề xuất sản phẩm.
        Nếu nội dung khách hàng nhập có ngân sách cụ thể khác với lựa chọn này,
        hãy ưu tiên ngân sách cụ thể trong nội dung khách hàng.
          `.trim(),
        }),
      });

      const result = await response.json();
      console.log('AI API Status:', response.status);
      console.log('AI API Response:', result);

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Không thể nhận tư vấn từ AI.');
      }

      setAiRecommendation(result.data.recommendation);
      setRecommendedProducts(
        result.data.recommendedProducts ?? []
      );
      // Cập nhật tham số AI trích xuất
      setExtractedParams((prev) => ({
        ...prev,
        budgetDisplay: result.data.extractedParams.budgetDisplay,
        recipient: result.data.extractedParams.recipient,
        delicacies: result.data.extractedParams.delicacies,
        packaging: result.data.extractedParams.packaging,
      }));
      setAnalysisTimestamp(Date.now() - startTime);

      showToast('AI đã phân tích nhu cầu và hoàn tất tư vấn!', 'success');
    } catch (error) {
      console.error('Lỗi gọi AI:', error);

      const message =
        error instanceof Error
          ? error.message
          : 'Đã xảy ra lỗi khi kết nối AI.';

      setAiError(message);
      showToast(message, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Find products for the 3 recommendations
  const productXuanLoc: Product =
    PRODUCTS.find((p) => p.id === 'van-su-khoi-sac') || PRODUCTS[0];
  const productKhoiSac: Product =
    PRODUCTS.find((p) => p.id === 'an-khang-thinh-vuong') || PRODUCTS[1];
  const productLongPhung: Product =
    PRODUCTS.find((p) => p.id === 'long-phung-hoa-minh') || PRODUCTS[2];

  const handleAddRecToCart = (prod: Product, label: string) => {
    addToCart(prod, 1);
    showToast(`Đã thêm "${label}" vào giỏ quà Tết!`, 'success');
  };

  return (
    <div className="w-full bg-[#1e0507] text-[#ffdadb] min-h-screen pb-24">
      {/* Top Breadcrumb Bar */}
      <section className="relative bg-gradient-to-b from-[#4a080c] to-[#2a0505] border-b border-amber-600/20 py-3.5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-200/70">
            <button
              onClick={() => navigateTo('home')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Trang Chủ
            </button>
            <span>/</span>
            <span className="text-amber-300 font-bold tracking-wide">
              AI Tư Vấn Quà Tết 2027
            </span>
          </div>

          <div className="text-amber-500/25 text-xl font-serif select-none hidden md:block">
            ❖
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* HERO BANNER CARD */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#3d0a0e] via-[#2f080b] to-[#1e0507] border border-amber-500/30 p-6 sm:p-10 text-center overflow-hidden shadow-2xl">
          {/* Subtle Corner Diamonds */}
          <div className="absolute top-4 left-6 text-amber-500/20 text-3xl font-serif select-none hidden sm:block pointer-events-none">
            ❖
          </div>
          <div className="absolute bottom-4 right-6 text-amber-500/20 text-3xl font-serif select-none hidden sm:block pointer-events-none">
            ❖
          </div>

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-40 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-amber-400/40 text-xs font-bold text-amber-300 uppercase tracking-widest shadow-inner">
              <span className="text-xs">✨</span>
              <span>CÔNG NGHỆ AI CONCIERGE 2027 • TỐI ƯU CÁ NHÂN HÓA</span>
              <span className="text-xs">✨</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-tet tracking-tight gold-gradient-text leading-tight">
              Trợ Lý AI Tư Vấn Quà Tết Thông Minh Đinh Mùi 2027
            </h1>

            {/* Subtitle */}
            <p className="text-amber-100/80 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Ứng dụng mô hình AI kết hợp cơ sở dữ liệu vạn phần quà cao cấp EleGift, trích xuất chính xác
              tiêu chí ngân sách, đối tượng và gu thưởng thức để mang lại gợi ý hoàn hảo nhất.
            </p>

            {/* Status Telemetry Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-amber-200/70 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Gemini Enterprise Engine: <strong className="text-amber-200">Sẵn sàng</strong></span>
              </div>
              <span className="text-amber-500/40 hidden sm:inline">•</span>
              <div>
                Độ trễ phản hồi: <strong className="text-amber-300 font-mono">{analysisTimestamp}ms</strong>
              </div>
              <span className="text-amber-500/40 hidden sm:inline">•</span>
              <div>
                <strong className="text-amber-200">120+</strong> Bộ sưu tập Sơn mài 2027
              </div>
            </div>
          </div>
        </section>

        {/* 2-COLUMN MAIN WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Input & Extracted Parameters (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Nhập Tiêu Chí Tặng Quà */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-5 sm:p-6 shadow-xl space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm">
                    <i className="fa-solid fa-pen-nib"></i>
                  </div>
                  <h2 className="text-base font-bold text-white font-serif-tet">
                    Nhập Tiêu Chí Tặng Quà
                  </h2>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-950 border border-amber-500/40 text-[10px] font-bold text-amber-300 font-mono">
                  NLP V2.4
                </span>
              </div>

              {/* Textarea with Clear Button */}
              <div className="relative">
                <textarea
                  rows={4}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Nhập yêu cầu: ngân sách, người nhận, loại rượu hoặc trà, phong cách đóng gói..."
                  className="w-full bg-[#180305] border border-amber-500/30 rounded-xl p-3.5 text-xs sm:text-sm text-white placeholder-amber-200/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50 resize-none transition"
                />
                {userInput && (
                  <button
                    type="button"
                    onClick={() => setUserInput('')}
                    title="Xóa nội dung"
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-red-950/80 hover:bg-red-800 text-amber-200 text-xs flex items-center justify-center transition cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Gợi ý một chạm (Quick Prompts) */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-amber-300 uppercase mb-2">
                  GỢI Ý MỘT CHẠM (QUICK PROMPTS):
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_PROMPTS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className="px-3 py-1.5 rounded-full bg-red-950/60 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400 text-xs text-amber-100 hover:text-amber-200 transition-all duration-200 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Khung ngân sách dự kiến */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                    KHUNG NGÂN SÁCH DỰ KIẾN:
                  </span>
                  <span className="text-xs font-bold text-amber-300 font-mono">
                    {selectedBudgetRange === '<1' && '< 1.000.000đ'}
                    {selectedBudgetRange === '1-2.5' && '1.000.000đ - 2.500.000đ'}
                    {selectedBudgetRange === '2.5-5' && '2.500.000đ - 3.500.000đ'}
                    {selectedBudgetRange === '>5' && '> 5.000.000đ'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: '<1', label: '< 1 Triệu' },
                    { id: '1-2.5', label: '1 - 2.5 Triệu' },
                    { id: '2.5-5', label: '2.5 - 5 Triệu' },
                    { id: '>5', label: '> 5 Triệu' },
                  ].map((tier) => {
                    const isActive = selectedBudgetRange === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedBudgetRange(tier.id)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-red-950 shadow-md font-extrabold'
                            : 'bg-red-950/60 hover:bg-red-900/60 text-amber-100/80 border border-amber-500/20'
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-xl shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isAnalyzing ? (
                  <>
                    <i className="fa-solid fa-circle-notch animate-spin text-red-950"></i>
                    <span>ĐANG TRÍCH XUẤT THÔNG MINH...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-wand-magic-sparkles text-red-950"></i>
                    <span>PHÂN TÍCH NHU CẦU & TÌM QUÀ VỚI AI ✨</span>
                  </>
                )}
              </button>
            </div>

            {/* Card 2: Tham Số AI Trích Xuất Thời Gian Thực */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-5 sm:p-6 shadow-xl space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 text-sm">
                    <i className="fa-solid fa-code-merge"></i>
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Tham Số AI Trích Xuất Thời Gian Thực
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-950 border border-amber-400/40 text-[10px] font-bold text-amber-300">
                  {extractedParams.matchRate} Khớp
                </span>
              </div>

              {/* Extracted Fields */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#180305] border border-amber-500/15">
                  <span className="flex items-center gap-2 text-amber-200/80">
                    <i className="fa-solid fa-wallet text-amber-400 text-xs"></i>
                    <span>Ngân sách nhận diện:</span>
                  </span>
                  <span className="font-bold text-amber-300 font-mono">
                    {extractedParams.budgetDisplay}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#180305] border border-amber-500/15">
                  <span className="flex items-center gap-2 text-amber-200/80">
                    <i className="fa-solid fa-user-tie text-amber-400 text-xs"></i>
                    <span>Đối tượng tặng:</span>
                  </span>
                  <span className="font-semibold text-white">
                    {extractedParams.recipient}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#180305] border border-amber-500/15">
                  <span className="flex items-center gap-2 text-amber-200/80">
                    <i className="fa-solid fa-wine-glass text-amber-400 text-xs"></i>
                    <span>Sản vật mong muốn:</span>
                  </span>
                  <span className="font-semibold text-amber-200">
                    {extractedParams.delicacies}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#180305] border border-amber-500/15">
                  <span className="flex items-center gap-2 text-amber-200/80">
                    <i className="fa-solid fa-box text-amber-400 text-xs"></i>
                    <span>Chất liệu bao bì:</span>
                  </span>
                  <span className="font-semibold text-amber-300">
                    {extractedParams.packaging}
                  </span>
                </div>
              </div>

              {/* Bottom Footer Diagnostics */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-amber-200/60 border-t border-amber-500/15">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <i className="fa-solid fa-shield-halved text-xs"></i>
                  <span>Chuẩn đoán ngữ nghĩa chính xác</span>
                </div>
                <div className="font-mono text-amber-300/80">
                  {extractedParams.tokens} Tokens Analyzed
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Expert Insight & 3 Recommendations (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Insight Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-red-950 flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                    <i className="fa-solid fa-lightbulb"></i>
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white font-serif-tet">
                      Lời Khuyên & Nhận Định Chuyên Gia AI
                    </h2>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-950/80 border border-amber-400/40 text-[10px] font-extrabold text-amber-300 uppercase tracking-wider shrink-0">
                  CÁ NHÂN HÓA
                </span>
              </div>

              {aiError ? (
                <p className="text-sm text-red-300 leading-relaxed">
                  {aiError}
                </p>
              ) : aiRecommendation ? (
                <div
                  className="mt-4 text-sm text-amber-100/90 leading-7
                    [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-amber-300 [&_h1]:mb-3
                    [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-amber-300 [&_h2]:mt-5 [&_h2]:mb-2
                    [&_h3]:font-bold [&_h3]:text-amber-200 [&_h3]:mt-4 [&_h3]:mb-2
                    [&_p]:mb-3
                    [&_strong]:font-bold [&_strong]:text-amber-300
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                    [&_li]:mb-1
                    [&_hr]:border-amber-500/30 [&_hr]:my-4"
                >
                  <ReactMarkdown>{aiRecommendation}</ReactMarkdown>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed">
                  Nội dung phân tích nhu cầu sẽ hiển thị tại đây sau khi bạn nhấn nút phân tích.
                </p>
              )}
            </div>


            {/* AI PRODUCT RECOMMENDATIONS */}
            <div className="space-y-4">
              {recommendedProducts.length > 0 ? (
                recommendedProducts.map(({ product, reason }, index) => (
                  <div
                    key={product.id}
                    className={`rounded-2xl bg-gradient-to-b from-[#350c10] to-[#220608] border ${
                      index === 0
                        ? 'border-2 border-amber-400/60 shadow-2xl'
                        : 'border-amber-500/30 shadow-xl'
                    } p-5 sm:p-6 relative overflow-hidden space-y-4`}
                  >
                    {/* Badge và mã sản phẩm */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-red-950 font-black text-xs uppercase tracking-wider">
                        <i className="fa-solid fa-star text-xs"></i>
                        {index === 0
                          ? 'AI KHUYÊN DÙNG SỐ 1'
                          : `AI ĐỀ XUẤT SỐ ${index + 1}`}
                      </span>

                      <span className="text-[11px] font-mono text-amber-200/70">
                        MÃ SP: {product.sku}
                      </span>
                    </div>

                    {/* Hình ảnh và thông tin */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                      <div className={`${index === 0 ? 'sm:col-span-5' : 'sm:col-span-4'} relative aspect-square rounded-xl overflow-hidden border border-amber-400/40 shadow-xl`}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-500"
                        />

                        {product.badge && (
                          <span className="absolute top-2.5 left-2.5 bg-gradient-to-r from-red-600 to-amber-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded shadow uppercase">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <div className={`${index === 0 ? 'sm:col-span-7' : 'sm:col-span-8'} space-y-3`}>
                        <h3
                          onClick={() => navigateTo('product-detail', product.id)}
                          className="text-lg sm:text-xl font-bold font-serif-tet text-white hover:text-amber-300 transition cursor-pointer"
                        >
                          {product.name}
                        </h3>

                        <p className="text-xs text-amber-200/70">
                          {product.subtitle}
                        </p>

                        {/* Giá sản phẩm */}
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-xl font-black text-amber-300 font-serif-tet">
                            {product.price.toLocaleString('vi-VN')} VND
                          </span>

                          {product.originalPrice && (
                            <span className="text-xs text-amber-100/50 line-through">
                              {product.originalPrice.toLocaleString('vi-VN')} VND
                            </span>
                          )}
                        </div>

                        {/* Lý do AI lựa chọn */}
                        <div className="p-3 rounded-xl bg-[#1b0305] border border-amber-500/20 text-xs text-amber-100/85 leading-relaxed">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-2">
                            <i className="fa-regular fa-compass text-xs"></i>
                            <span>Lý do AI lựa chọn:</span>
                          </div>
                          <p>{reason || product.description}</p>
                        </div>

                        {/* Danh mục */}
                        <div className="text-xs text-amber-200/70">
                          Danh mục: {product.categoryLabel}
                        </div>

                        {/* Nút thao tác */}
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleAddRecToCart(product, product.name)
                            }
                            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-amber-400 text-red-950 font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <i className="fa-solid fa-cart-shopping text-xs"></i>
                            <span>THÊM VÀO GIỎ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => navigateTo('product-detail', product.id)}
                            className="py-2.5 px-4 rounded-xl border border-amber-400/40 text-amber-200 hover:text-white hover:bg-amber-500/10 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>Chi Tiết</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-[#2e0b0e] border border-amber-500/30 p-6 text-center">
                  <i className="fa-solid fa-gift text-3xl text-amber-400 mb-3"></i>
                  <p className="text-sm text-amber-100">
                    Chưa có sản phẩm đề xuất. Vui lòng nhập nhu cầu và nhấn phân tích AI.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* BOTTOM SECTION: 3 COMMITMENT CARDS */}
        <section className="pt-8 border-t border-amber-500/20">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif-tet text-white">
              Cam Kết Tiêu Chuẩn Phục Vụ Doanh Nghiệp EleGift
            </h2>
            <p className="text-xs text-amber-200/70">
              Đảm bảo phản hồi nhanh chóng dưới 10 giây • Hệ thống dự phòng thông minh 100% mẫu Best Seller trong kho
              hàng Tết 2027
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-red-950 flex items-center justify-center text-xl mx-auto shadow-md">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-sm font-bold text-white font-serif-tet">
                Bảo Mật Thông Tin Doanh Nghiệp
              </h3>
              <p className="text-xs text-amber-100/75 leading-relaxed">
                Toàn bộ danh sách người nhận, ngân sách đối tác và thông tin hợp đồng được mã hóa tuân thủ chuẩn ISO B2B.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-red-950 flex items-center justify-center text-xl mx-auto shadow-md">
                <i className="fa-solid fa-boxes-stacked"></i>
              </div>
              <h3 className="text-sm font-bold text-white font-serif-tet">
                Kho Hàng Thời Gian Thực
              </h3>
              <p className="text-xs text-amber-100/75 leading-relaxed">
                AI chỉ gợi ý những mẫu có sẵn khả năng cung ứng đủ số lượng lớn từ 50 đến 5.000 set quà ngay trong mùa
                cao điểm.
              </p>
            </div>

            <div className="rounded-2xl bg-gradient-to-b from-[#2e0b0e] to-[#200608] border border-amber-500/30 p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-red-950 flex items-center justify-center text-xl mx-auto shadow-md">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h3 className="text-sm font-bold text-white font-serif-tet">
                Chuyên Viên Tư Vấn Đồng Hành 1-1
              </h3>
              <p className="text-xs text-amber-100/75 leading-relaxed">
                Gặp gỡ chuyên viên phong thủy và chuyên gia sommelier rượu vang hỗ trợ hoàn thiện bản mẫu thiết kế hộp
                miễn phí.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
