"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import FullMenu from "@/components/dashboard/FullMenu";
import DailyMenu from "@/components/dashboard/DailyMenu";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import PageLoader from "@/components/ui/PageLoader";

export default function MenuDashboard() {
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
    async function checkAuth() {
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

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <PageLoader />
    );
  }

  if (!isAdmin) return null; // prevent unauthorized flash

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 animate-enter">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2
                   focus:bg-indigo-600 focus:text-white rounded"
      >
        Skip to content
      </a>

      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user}/>

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <main id="main" className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
              Menu Management
            </h1>

            <Tabs defaultValue="fullMenu" className="w-full">
              <TabsList className="flex flex-wrap justify-start bg-transparent">
                <TabsTrigger value="fullMenu" className="data-[state=active]:text-indigo-800">
                  Full Menu
                </TabsTrigger>
                <TabsTrigger value="dailyMenu" className="data-[state=active]:text-indigo-800">
                  Daily Menu
                </TabsTrigger>
              </TabsList>
              <TabsContent value="fullMenu">
                <FullMenu />
              </TabsContent>
              <TabsContent value="dailyMenu">
                <DailyMenu />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <footer className="lg:ml-64 mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
        <Footer />
      </footer>
    </div>
  );
}
