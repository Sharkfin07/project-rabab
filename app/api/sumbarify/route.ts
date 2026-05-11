import { getModel } from "@/lib/gemini";
import { parseGeminiJson } from "@/lib/utils";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah juru masak Minangkabau yang berpengalaman. Berdasarkan bahan-bahan yang diberikan,
buatkan resep masakan yang di-"Sumbar-ify" — artinya gunakan teknik, bumbu, dan filosofi
memasak Minangkabau. Sertakan: nama masakan (yang kreatif), bahan tambahan yang direkomendasikan,
langkah memasak, dan cerita singkat mengapa masakan ini "ala Minang".
Jawab dalam Bahasa Indonesia. Format JSON:
{
  "name": "<nama masakan kreatif>",
  "additionalIngredients": ["<bahan tambahan 1>", "..."],
  "steps": ["<langkah 1>", "..."],
  "story": "<cerita singkat mengapa ini ala Minang>"
}`;

export interface SumbarifyResponse {
  name: string;
  additionalIngredients: string[];
  steps: string[];
  story: string;
}

export async function POST(req: Request) {
  const { ingredients, spiceLevel, occasion } = await req.json();
  if (!ingredients || typeof ingredients !== "string") {
    return NextResponse.json(
      { error: "ingredients diperlukan" },
      { status: 400 }
    );
  }

  const model = getModel(SYSTEM_PROMPT);
  const parts = [`Bahan-bahan: ${ingredients}`];
  if (spiceLevel) parts.push(`Level kepedasan: ${spiceLevel}/5`);
  if (occasion) parts.push(`Jenis acara: ${occasion}`);

  const result = await model.generateContent(parts.join("\n"));
  const data = parseGeminiJson<SumbarifyResponse>(result.response.text());
  return NextResponse.json(data);
}
