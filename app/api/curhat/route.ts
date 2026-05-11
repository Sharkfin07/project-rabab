import { getModel } from "@/lib/gemini";
import { parseGeminiJson } from "@/lib/utils";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Kamu adalah seorang "mamak" (paman dari pihak ibu dalam adat Minangkabau) yang bijaksana dan humoris.
Kamu menguasai ratusan petatah-petitih Minangkabau beserta maknanya yang dalam.
Gaya bicaramu: hangat, sedikit jenaka, selalu relevan dengan kehidupan modern.
Jawab HANYA dalam format JSON:
{
  "pepatah": "<pepatah asli dalam Bahasa Minang>",
  "terjemahan": "<terjemahan literal Indonesia>",
  "penjelasan": "<150-200 kata, hubungkan ke situasi user secara personal>",
  "kategori": "<karir|hubungan|keluarga|merantau|overthinking|pendidikan>"
}
Gunakan pepatah yang AUTENTIK dari tradisi Minangkabau, jangan mengarang.`;

export interface CurhatResponse {
  pepatah: string;
  terjemahan: string;
  penjelasan: string;
  kategori: string;
}

export async function POST(req: Request) {
  const { situation, category } = await req.json();
  if (!situation || typeof situation !== "string") {
    return NextResponse.json({ error: "situation diperlukan" }, { status: 400 });
  }

  const model = getModel(SYSTEM_PROMPT);
  const prompt = category
    ? `Kategori: ${category}\n\nCurhat: ${situation}`
    : situation;

  const result = await model.generateContent(prompt);
  const data = parseGeminiJson<CurhatResponse>(result.response.text());
  return NextResponse.json(data);
}
