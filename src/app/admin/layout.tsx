"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === "/admin/login") {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setIsAuthenticated(false);
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (pathname === "/admin/login") return;
      
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ background: "#0e0c0b" }}>
        <div className="animate-pulse flex flex-col items-center gap-4">
          <span className="text-2xl font-black tracking-widest uppercase" style={{ color: "#ede6d4" }}>
            MUTE
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]" style={{ color: "#7a6d62" }}>
            Authenticating...
          </span>
        </div>
      </div>
    );
  }

  // If on login page, render children directly without auth intercept
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // If authenticated, render children
  if (isAuthenticated) {
    return (
      <>
        {/* Absolute clean layout wrapper to let admins log out */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border shadow-lg"
            style={{ 
              background: "#1a1714", 
              borderColor: "rgba(61, 56, 54, 0.8)", 
              color: "#7a6d62" 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "#ede6d4";
              e.currentTarget.style.borderColor = "rgba(156,90,96,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "#7a6d62";
              e.currentTarget.style.borderColor = "rgba(61, 56, 54, 0.8)";
            }}
          >
            Lock Dashboard
          </button>
        </div>
        {children}
      </>
    );
  }

  return null;
}
