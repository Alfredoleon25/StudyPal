const API_URL = "http://localhost:8000";

export async function api(path: string, options?: RequestInit) {
  
  const res = await fetch(`${API_URL}${path}`, {
  
    headers: { "Content-Type": "application/json" },
    // credentials: "include",
    ...options,
  });
  return res.json();
}
