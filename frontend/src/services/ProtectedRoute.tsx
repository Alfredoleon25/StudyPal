// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

// export default function ProtectedRoute({
//   children,
//   onboardingRoute = false
// }: {
//   children: React.ReactNode
//   onboardingRoute?: boolean
// }) {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);
//     const navigate = useNavigate();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       console.log("Session data:", data.session);
//     const isDone = data.session?.user.user_metadata?.onboarding_completed === true

//     if(onboardingRoute && isDone){
//       console.log("User is authenticatedand created profile", data.session?.user);
//       navigate("/dashboard",{ replace: true });
//     }
//       setAuthenticated(!!data.session);
//       setLoading(false);
//     });
//   }, []);

//   if (loading) return null; // or spinner

//   if (!authenticated) {
//     console.log("User not authenticated, redirecting to landing page.");
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Navigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function ProtectedRoute({
  children,
  onboardingRoute = false, // Set to true for /registration and /subjects
}: {
  children: React.ReactNode;
  onboardingRoute?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 🛡️ Use getUser to ensure we have the latest metadata
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return null; // 🔄 You can replace null with a <LoadingSpinner />

  // 1. Not logged in? Go to landing page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isDone = user.user_metadata?.onboarding_completed === true;

  // 2. User is ON the registration pages but is ALREADY DONE
  if (onboardingRoute && isDone) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. User is ON the dashboard/app pages but is NOT DONE with registration
  // if (!onboardingRoute && !isDone) {
  //   return <Navigate to="/registration" replace />;
  // }

  // If they passed all checks, show the page
  return <>{children}</>;
}

