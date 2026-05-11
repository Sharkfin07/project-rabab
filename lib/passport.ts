const KEY = "urang-awak-passport";

export function getPassport(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addStamp(id: string): void {
  if (typeof window === "undefined") return;
  const stamps = getPassport();
  if (!stamps.includes(id)) {
    localStorage.setItem(KEY, JSON.stringify([...stamps, id]));
  }
}

export function hasStamp(id: string): boolean {
  return getPassport().includes(id);
}

export function clearPassport(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
