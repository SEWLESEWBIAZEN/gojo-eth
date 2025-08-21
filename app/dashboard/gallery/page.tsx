"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/ui/PageLoader";
import { Image, Plus, Video } from "lucide-react";
import AdminVideoGallery from "@/components/gallery/AdminVideoGallery";
import AdminImageGallery from "@/components/gallery/AdminImageGallery";
import { Button } from "@/components/ui/Button";

export default function GalleryDashboard() {
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

  if (!isAdmin) return null; 

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 animate-enter">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2
                   focus:bg-indigo-600 focus:text-white rounded"
      >
        Skip to content
      </a>

      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} />

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <main id="main" className="flex flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64 items-start">
          <Tabs defaultValue="image-gallery" className="w-full relative mt-4">
            <TabsList>
              <TabsTrigger  className="data-[state=active]:text-indigo-800 text-indigo-900" value="image-gallery"><Image className="mr-2 h-6 w-5 " /> Image Gallery</TabsTrigger>
              <TabsTrigger  className="data-[state=active]:text-indigo-800 text-indigo-900" value="video-gallery"><Video className="mr-2 h-6 w-5 " /> Video Gallery</TabsTrigger>
            </TabsList>
            <br />
            <TabsContent value="image-gallery" className="animate-enter py-4">
              <AdminImageGallery />
            </TabsContent>
            <TabsContent value="video-gallery" className="animate-enter py-4">
              <AdminVideoGallery />
            </TabsContent>
          </Tabs>
          <Button  className="mt-4 bg-indigo-800 text-white hover:bg-indigo-700 flex flex-row space-x-2"> <Plus/><span className="mr-2 hidden sm:inline-block">New</span></Button>
        </main>
      </div>

      <footer className="lg:ml-64 mt-auto border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur">
        <Footer />
      </footer>
    </div>
  );
}
