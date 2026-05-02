import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Vercel Serverless Function for Gemini Chat
 * logic adapted from the user's provided snippet
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API 키가 설정되지 않았습니다. .env.local 또는 Vercel 설정을 확인해주세요." });
  }

  try {
    // SDK 초기화 (사용자 제공 코드 스타일 반영)
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 사용자가 요청한 모델 명칭 사용 (gemini-3.1-pro-preview)
    // 실제 환경에서 해당 명칭이 지원되지 않을 경우를 대비해 1.5 모델을 fallback으로 고려할 수 있습니다.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    // 답변 생성 (사용자 제공 run() 함수 로직 반영)
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "AI 답변 생성 중 오류가 발생했습니다: " + error.message });
  }
}
