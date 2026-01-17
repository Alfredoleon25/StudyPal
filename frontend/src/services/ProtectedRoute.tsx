import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      // console.log("Session data:", data.session?.user);

    if(data.session?.user.user_metadata?.email_verified === true){
          // return <Navigate to="/dashboard" replace />;
      // console.log("User is authenticated:", data.session?.user);
    }
      setAuthenticated(!!data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // or spinner

  if (!authenticated) {
    console.log("User not authenticated, redirecting to landing page.");
    return <Navigate to="/" replace />;
  }

  return children;
}