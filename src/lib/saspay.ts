const SASPAY_BASE_URL = "https://api.saspay.me/api/v1";

export function getSasPayKey() {
  const key = process.env.SASPAY_API_KEY;
  if (!key) throw new Error("SASPAY_API_KEY est manquante.");
  return key;
}

export async function sasPayRequest(path: string, options: RequestInit = {}) {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${getSasPayKey()}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${SASPAY_BASE_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      payload?.message ?? payload?.error?.message ?? "Erreur SasPay";
    throw new Error(message);
  }
  return payload;
}
