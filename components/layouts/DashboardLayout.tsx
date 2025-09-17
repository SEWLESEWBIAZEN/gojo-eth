'use client'
import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import Header from "../dashboard/Header";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import PageLoader from "../ui/PageLoader";
import Footer from "../Footer";
type DashboardLayoutProps = {
  children: React.ReactNode;
};
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Check authentication and role
  useEffect(() => {
    async function checkRole() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || profile?.role !== "admin") {
        router.push("/not-authorized");
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    }

    checkRole();
  }, [router, supabase]);
if(loading){
  return <PageLoader/>
}
  if (!isAdmin) return null; // Prevent flashing content for non-admins

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-900 w-full">     
      <Sidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />      
      <div className="flex-1 flex flex-col min-h-screen">        
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          user={user}
        />       
        <main
          id="main"
          className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:ml-64 transition-all duration-200 "
        >
          {loading ? <PageLoader /> : children}
        </main>       
        <footer className="mt-auto lg:ml-64 border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default DashboardLayout;
