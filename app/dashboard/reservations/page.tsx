"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { MoreVertical, Pencil, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import PageLoader from "@/components/ui/PageLoader";

// Reservation type
interface Reservation {
  id: number;
  full_name: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  phone_number?: string;
  partySize: number;
  status: "Pending" | "Received" | "Cancelled";
}

// Mock data
const mockReservations: Reservation[] = [
  {
    id: 1,
    full_name: "John Doe",
    email: "john@example.com",
    reservation_date: "2025-08-20",
    reservation_time: "19:00",
    phone_number: "1234567890",
    partySize: 4,
    status: "Pending",
  },
  {
    id: 2,
    full_name: "Jane Smith",
    email: "jane@example.com",
    reservation_date: "2025-08-18",
    reservation_time: "18:30",
    partySize: 2,
    status: "Received",
  },
];

export default function ReservationsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

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

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || profile?.role !== "admin") {
        router.push("/not-authorized");
      } else {
        setIsAdmin(true);
        setReservations(mockReservations); // load data once authenticated
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

  // CRUD actions
  const deleteReservation = (id: number) =>
    setReservations((prev) => prev.filter((res) => res.id !== id));

  const changeStatus = (id: number, status: Reservation["status"]) =>
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status } : res))
    );

  const setEditingReservation = (res: Reservation) => {
    alert(`Editing reservation for ${res.full_name}`);
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
          <div className="p-6 md:p-10 bg-transparent dark:bg-gray-800 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
              Table Reservations
            </h1>

            {reservations.length === 0 ? (
              <p className="text-gray-500">No reservations available.</p>
            ) : (
              <Table>
                <TableCaption>A list of all upcoming reservations</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Party Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell className="font-medium">{res.full_name}</TableCell>
                      <TableCell className="text-sm">
                        {res.email}
                        {res.phone_number && <span> | {res.phone_number}</span>}
                      </TableCell>
                      <TableCell>{res.reservation_date}</TableCell>
                      <TableCell>{res.reservation_time}</TableCell>
                      <TableCell>{res.partySize}</TableCell>
                      <TableCell
                        className={`font-medium ${
                          res.status === "Received"
                            ? "text-green-600"
                            : res.status === "Cancelled"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {res.status}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
                              <MoreVertical />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="rounded-lg shadow-lg bg-white dark:bg-neutral-800">
                            <DropdownMenuItem onClick={() => setEditingReservation(res)}>
                              <Pencil size={16} className="mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteReservation(res.id)}>
                              <Trash2 size={16} className="mr-2" /> Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => changeStatus(res.id, "Received")}
                            >
                              <CheckCircle size={16} className="mr-2" /> Received
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => changeStatus(res.id, "Cancelled")}
                            >
                              <XCircle size={16} className="mr-2" /> Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(res.id, "Pending")}>
                              Pending
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
