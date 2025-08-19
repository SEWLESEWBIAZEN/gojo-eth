"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Loader2 } from "lucide-react";
import PageLoader from "@/components/ui/PageLoader";

// Inquiry type
interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Mock data
const mockInquiries: Inquiry[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    message: "I am having trouble logging in.",
    created_at: "2025-08-16T08:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    message: "Can I get a refund for my last order?",
    created_at: "2025-08-15T14:15:00Z",
  },
  {
    id: "3",
    name: "Anonymous",
    email: "anonymous@example.com",
    message: "The website crashes when I try to upload an image.",
    created_at: "2025-08-14T18:45:00Z",
  },
];

export default function DashboardPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || profile?.role !== "admin") {
        router.push("/not-authorized");
      } else {
        setIsAdmin(true);
        setInquiries(mockInquiries); // Load inquiries once authenticated
      }

      setLoading(false);
    }

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <PageLoader/>
    );
  }

  if (!isAdmin) return null; // prevent unauthorized flash

  const resolveInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 animate-enter">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2
                   focus:bg-indigo-600 focus:text-white rounded"
      >
        Skip to content
      </a>

      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

        <main id="main" className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
          <div className="p-6 md:p-10 bg-transparent min-h-screen rounded-lg">
            <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
              User Inquiries
            </h1>

            {inquiries.length === 0 ? (
              <p className="text-gray-500">No user inquiries at the moment.</p>
            ) : (
              <Table>
                <TableCaption>A list of recent user inquiries.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="w-[200px]">Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell className="font-medium">{inquiry.name}</TableCell>
                      <TableCell>{inquiry.email}</TableCell>
                      <TableCell className="max-w-sm truncate">{inquiry.message}</TableCell>
                      <TableCell>{new Date(inquiry.created_at).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => resolveInquiry(inquiry.id)}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                          size="sm"
                        >
                          <CheckCircle size={16} /> Resolve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
