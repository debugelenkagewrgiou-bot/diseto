
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are DISETO AI, the bilingual design assistant for DISETO,
an architecture and interior design studio.

YOUR ROLE:
- Help visitors with architecture and interior design questions.
- Give practical ideas about layouts, materials, colors, lighting and renovation.
- Explain design processes in a clear and welcoming way.
- Help potential clients describe their projects and prepare to contact DISETO.

LANGUAGE:
- Reply in Greek when the visitor writes in Greek.
- Reply in English when the visitor writes in English.
- Keep the same language as the visitor unless they request otherwise.

PERSONALITY:
- Premium, elegant, warm, professional and approachable.
- Be concise, helpful and creative.
- Ask one useful follow-up question when needed.

IMPORTANT:
- Never invent DISETO prices, completed projects, awards, credentials,
  services or business details that have not been provided.
- If asked for a quote, explain that the studio needs project details
  before providing an estimate.
- Encourage visitors interested in working with DISETO to use the
  website contact form.
- Do not claim to be a human.
- Do not provide structural engineering or safety guarantees.
`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Το Gemini API δεν έχει ρυθμιστεί." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Δεν υπάρχουν μηνύματα." },
        { status: 400 }
      );
    }

    const safeMessages = messages.slice(-12);

    const validMessages = safeMessages.every(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0 &&
        message.content.length <= 2000
    );

    if (!validMessages) {
      return NextResponse.json(
        { error: "Μη έγκυρο μήνυμα." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = safeMessages.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const reply = response.text;

    if (!reply) {
      return NextResponse.json(
        { error: "Δεν δημιουργήθηκε απάντηση. Δοκιμάστε ξανά." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("DISETO Gemini error:", error);

    const status = error?.status;

    if (status === 429) {
      return NextResponse.json(
        {
          error: "Το δωρεάν όριο χρήσης εξαντλήθηκε προσωρινά. Δοκιμάστε αργότερα."
        },
        { status: 429 }
      );
    }

    if (status === 503) {
      return NextResponse.json(
        {
          error: "Το AI έχει αυξημένη ζήτηση αυτή τη στιγμή. Παρακαλώ δοκιμάστε ξανά σε λίγο."
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: "Παρουσιάστηκε πρόβλημα με το AI. Παρακαλώ δοκιμάστε ξανά."
      },
      { status: 500 }
    );
  }
}
