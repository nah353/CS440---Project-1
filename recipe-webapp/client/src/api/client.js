const BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const AUTH_TOKEN_KEY = "recipe_auth_token";

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token) {
  if (!token) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return;
  }
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function buildHeaders(extraHeaders = {}) {
  const token = getAuthToken();
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function throwApiError(res, method, path) {
  let message = `${method} ${path} failed with status ${res.status}`;

  try {
    const data = await res.json();
    message = data.error || data.message || message;
    if (data.details) message += `: ${data.details}`;
  } catch (e) {
    const text = await res.text();
    if (text) message = text;
  }

  const isAuthError =
    res.status === 401 && /invalid or expired token|authentication required/i.test(message);

  if (isAuthError) {
    setAuthToken(null);
    message = "Session expired. Please log in again.";
  }

  const error = new Error(message);
  error.status = res.status;
  if (isAuthError) {
    error.code = "AUTH_EXPIRED";
  }
  throw error;
}

export async function apiGet(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: buildHeaders()
  });
  if (!res.ok) {
    await throwApiError(res, "GET", path);
  }
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: buildHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    await throwApiError(res, "POST", path);
  }
  return res.json();
}

export async function apiPut(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "PUT",
    headers: buildHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    await throwApiError(res, "PUT", path);
  }
  return res.json();
}

export async function apiDelete(path) {
  const res = await fetch(`${BASE}${path}`, {
    method: "DELETE",
    headers: buildHeaders({ "Content-Type": "application/json" })
  });

  if (!res.ok) {
    await throwApiError(res, "DELETE", path);
  }
  return res.json();
}
