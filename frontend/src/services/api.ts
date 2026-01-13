const API_URL = "http://localhost:8000";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function api(path: string, options?: RequestInit) {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
  
      const res = await fetch(`${API_URL}${path}`, {
        
        headers: { "Content-Type": "application/json",...(token && { Authorization: `Bearer ${token}` }),},
        // credentials: "include",
        ...options,
      });
      return res.json();
}
