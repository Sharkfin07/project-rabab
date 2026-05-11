export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format Date to WIB (UTC+7) time string HH:MM:SS */
export function formatWIBTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** Get WIB hour (0-23) from a Date */
export function getWIBHour(date: Date): number {
  return parseInt(
    date.toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      hour12: false,
    })
  );
}

/**
 * Safely parse JSON returned by Gemini API.
 * Gemini sometimes wraps the response in ```json ... ``` fences.
 */
export function parseGeminiJson<T>(text: string): T {
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}
