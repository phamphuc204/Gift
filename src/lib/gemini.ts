
import { GoogleGenAI } from '@google/genai';

// Khởi tạo Gemini API ở phía Backend
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Thiếu GEMINI_API_KEY trong file .env.local');
}

const ai = new GoogleGenAI({ apiKey });

// Hàm gửi yêu cầu đến Gemini và nhận kết quả
export async function generateGeminiResponse(
  prompt: string
): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
    });

    return response.text ?? 'Gemini không trả về nội dung.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Không thể kết nối Gemini API.');
  }
}
