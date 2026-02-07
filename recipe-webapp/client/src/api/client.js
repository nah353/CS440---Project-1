const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`POST ${path} failed: ${msg}`);
  }
  return res.json();
}
