import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function OnboardingRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    const check = async () => {
      const {
        data: { session},
      } = await supabase.auth.getSession();
const user = session?.user;

      // ❌ not authenticated → landing
      if (!user) {
        console.log("User not authenticated, redirecting to landing page.");
        setRedirect("/");
        setLoading(false);
        return;
      }
      console.log(user.user_metadata?.onboarding_completed)
      // ❌ onboarding already completed → dashboard
      if (user.user_metadata?.email_verified === true) {
        console.log("Onboarding completed, redirecting to dashboard.");
        setRedirect("/dashboard");
        setLoading(false);
        return;
      }
      console.log("Thisi s the user ",user)
      // ✅ authenticated & onboarding not done
      setRedirect(null);
      setLoading(false);
    };

    check();
  }, []);

  if (loading) return null;

  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  return children;
}
    