import { NextRequest, NextResponse } from "next/server";
import {
  verifiedPhotos,
  verifiedJourney,
  verifiedStories,
  verifiedResistance,
} from "@/data/verified-data";

const LANGFLOW_URL = process.env.LANGFLOW_ENDPOINT || "";
const LANGFLOW_API_KEY = process.env.LANGFLOW_API_KEY || "";

let cachedKnowledgeSummary: string | null = null;

function getKnowledgeSummary(): string {
  if (cachedKnowledgeSummary) return cachedKnowledgeSummary;

  const photosText = verifiedPhotos
    .map(
      (p) =>
        `- Năm ${p.year} [${p.title}] tại ${p.location}: ${p.historical_context}. Nguồn: ${p.source_name}`
    )
    .join("\n");

  const journeyText = verifiedJourney
    .map(
      (j) =>
        `- Giai đoạn ${j.year_range}: Hoạt động tại ${j.city} (${j.country}, ${j.continent}). Nội dung: ${j.activities}. Ý nghĩa lịch sử: ${j.historical_significance}. Nguồn: ${j.source_name}`
    )
    .join("\n");

  const storiesText = verifiedStories
    .map(
      (s) =>
        `- Mốc ${s.year} [${s.title}]: ${s.summary}. Chi tiết: ${s.full_story}. Bài học/Trích dẫn: "${s.lesson_or_quote}". Nguồn: ${s.source_name}`
    )
    .join("\n");

  const resistanceText = verifiedResistance
    .map(
      (r) =>
        `- Năm ${r.year} [${r.event_title}] (${r.war_period}): Bối cảnh: ${r.campaign_or_context}. Vai trò Chủ tịch Hồ Chí Minh: ${r.ho_chi_minh_role}. Trích dẫn/Chỉ thị: "${r.authentic_quote}". Kết quả: ${r.outcome}. Nguồn: ${r.source_name}`
    )
    .join("\n");

  cachedKnowledgeSummary = `
[TƯ LIỆU HÌNH ẢNH & SỰ KIỆN LỊCH SỬ CHÍNH THỐNG]
${photosText}

[HÀNH TRÌNH 30 NĂM TÌM ĐƯỜNG CỨU NƯỚC (1911 - 1941)]
${journeyText}

[KHO TÀNG CÂU CHUYỆN & DẤU ẤN LỊCH SỬ]
${storiesText}

[HAI CUỘC KHÁNG CHIẾN VĨ ĐẠI & LÃNH ĐẠO CÁCH MẠNG]
${resistanceText}
`;

  return cachedKnowledgeSummary;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = (body.message || body.input_value || "").trim();

    if (!userMessage) {
      return NextResponse.json(
        { error: "Nội dung câu hỏi không được để trống." },
        { status: 400 }
      );
    }

    // 1. Chỉ gọi Langflow nếu có cấu hình biến môi trường LANGFLOW_ENDPOINT và USE_LANGFLOW=true
    if (LANGFLOW_URL && process.env.USE_LANGFLOW === "true") {
      try {
        const lfRes = await fetch(LANGFLOW_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": LANGFLOW_API_KEY,
          },
          body: JSON.stringify({
            input_value: userMessage,
            output_type: "chat",
            input_type: "chat",
          }),
          signal: AbortSignal.timeout(2000),
        });

        if (lfRes.ok) {
          const lfData = await lfRes.json();
          const botText =
            lfData?.outputs?.[0]?.outputs?.[0]?.results?.message?.text ||
            lfData?.outputs?.[0]?.outputs?.[0]?.artifacts?.message ||
            lfData?.result;
          if (botText) {
            return NextResponse.json({ text: botText, source: "langflow" });
          }
        }
      } catch {
        // Tự động chuyển tiếp sang Gemini trực tiếp
      }
    }

    // 2. Chế độ Cloud / Production: Gọi trực tiếp Gemini API với Kho tư liệu chuẩn xác 100%
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { text: "Hệ thống AI chưa được cấu hình GEMINI_API_KEY trên môi trường triển khai." },
        { status: 500 }
      );
    }

    const knowledgeBase = getKnowledgeSummary();

    const systemPrompt = `Bạn là Trợ lý AI của Triển Lãm Số Tưởng Nhớ Chủ Tịch Hồ Chí Minh (1890 - 1969).
QUY TẮC BẮT BUỘC (TUÂN THỦ 100%):
1. Chuẩn xác, trang trọng, tôn kính, đúng với phong cách và tư tưởng của Chủ tịch Hồ Chí Minh.
2. CHỈ ĐƯỢC PHÉP trả lời dựa trên thông tin có trong Ngữ cảnh tư liệu lịch sử dưới đây.
3. TUYỆT ĐỐI KHÔNG tự sáng tác, suy diễn hay bịa đặt chi tiết, ngày tháng, sự kiện lịch sử.
4. Nếu câu hỏi hoàn toàn không liên quan đến Bác Hồ hoặc tư liệu lịch sử, hãy từ chối một cách lịch sự rằng: "Xin lỗi, tôi không tìm thấy thông tin này trong kho tài liệu lưu trữ chính thống của Triển Lãm."
5. Trả lời súc tích, rõ ràng, gạch đầu dòng các mốc thời gian, địa điểm, sự kiện chính nếu phù hợp.

NGỮ CẢNH TƯ LIỆU LỊCH SỬ ĐÃ KIỂM CHỨNG:
${knowledgeBase}

CÂU HỎI CỦA KHÁCH THĂM QUAN:
${userMessage}

CÂU TRẢ LỜI:`;

    const candidateModels = ["gemini-3.5-flash-lite", "gemini-flash-latest", "gemini-3.8-flash"];
    let botReply = "";

    for (const model of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const part = data?.candidates?.[0]?.content?.parts?.find(
            (p: { text?: string }) => p.text
          );
          if (part?.text) {
            botReply = part.text;
            break;
          }
        }
      } catch {
        // thử model tiếp theo trong danh sách
      }
    }

    if (!botReply) {
      return NextResponse.json(
        { text: "Đang có sự cố kết nối tới mô hình AI. Vui lòng thử lại sau giây lát." },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: botReply, source: "gemini" });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Chat API route error:", errorMsg);
    return NextResponse.json(
      { text: "Đã xảy ra lỗi trong quá trình xử lý yêu cầu." },
      { status: 500 }
    );
  }
}
