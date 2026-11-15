import { recommendProducts } from '../../../../lib/product-recommender';
import { NextRequest, NextResponse } from 'next/server';
import { generateGeminiResponse } from '../../../../lib/gemini';


export async function POST(request: NextRequest) {
  try {
    // Nhận dữ liệu từ Website
    const body = await request.json();
    const { prompt } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Vui lòng nhập nhu cầu tư vấn quà Tết.' },
        { status: 400 }
      );
    }

    if (prompt.length > 3000) {
      return NextResponse.json(
        { success: false, message: 'Nội dung yêu cầu quá dài.' },
        { status: 400 }
      );
    }

    // Xây dựng yêu cầu tư vấn
        const aiPrompt = `
        Bạn là chuyên gia tư vấn quà Tết của website Elegift.

        Hãy phân tích nhu cầu khách hàng và trả về kết quả
        theo đúng định dạng JSON sau:

        {
        "recommendation": "Nội dung tư vấn bằng Markdown, tiếng Việt",
        "extractedParams": {
            "budgetDisplay": "Ngân sách khách hàng",
            "recipient": "Đối tượng nhận quà",
            "delicacies": "Sản vật mong muốn",
            "packaging": "Phong cách hoặc chất liệu bao bì"
        }
        }

        Yêu cầu:
        - Phân tích đúng nội dung khách hàng nhập.
        - Không tự suy đoán thông tin khách hàng chưa cung cấp.
        - Nếu thiếu thông tin, ghi "Chưa xác định".
        - Nội dung tư vấn cần có tiêu đề, giải thích và gợi ý rõ ràng.
        - Không tự bịa tên sản phẩm, giá bán hoặc tồn kho.
        - Chỉ trả về JSON hợp lệ, không thêm Markdown bên ngoài JSON.

        Nhu cầu khách hàng:
        ${prompt}
        `;

    // Gọi Gemini API
        const result = await generateGeminiResponse(aiPrompt);

        const cleanedResult = result
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/, '')
        .trim();

        const parsedResult = JSON.parse(cleanedResult);
        const recommendedProducts = recommendProducts(
             parsedResult.extractedParams
        );

        return NextResponse.json({
        success: true,
        data: {
            recommendation: parsedResult.recommendation,
            extractedParams: parsedResult.extractedParams,
            recommendedProducts,
              },
        });

  } catch (error) {
    console.error('AI Recommendation API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Không thể thực hiện tư vấn AI. Vui lòng thử lại.',
      },
      { status: 500 }
    );
  }
}
