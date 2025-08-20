"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { toast } from "sonner";

import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/ui/PageLoader";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2, CheckCircle, XCircle, Dot, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Reservation } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ReservationsPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalReservations / ITEMS_PER_PAGE);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');

  // Close mobile menu on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Authentication & role check
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

  // Fetch reservations with pagination
  useEffect(() => {
    async function fetchReservations() {
      try {
        setIsFetching(true);
        const response = await axios.get("/api/reservation/getAll", {
          params: { page, limit: ITEMS_PER_PAGE },
        });
        const data = response.data?.data;
        setReservations(data?.reservations || []);
        setTotalReservations(data?.total || 0);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to fetch reservations");
      } finally {
        setIsFetching(false);
      }
    }

    fetchReservations();
  }, [page]);

  if (loading) return <PageLoader />;
  if (!isAdmin) return null; // prevent unauthorized flash

  // CRUD actions
  const deleteReservation = (id?: string) =>
    setReservations((prev) => prev.filter((res) => res.id !== id));

  async function changeStatus(status: Reservation["status"], id?: string) {
    try {
      const response = await axios.put(`/api/reservation/updateStatus/${id}`, { status });
      if (response?.data?.isError) {
        toast.error(response?.data?.message || "Something went wrong!");
        return;
      }
      toast.success(response?.data?.message || "Reservation status updated successfully!");
      // Update locally
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error updating reservation status");
    }
  }

  const setEditingReservation = (res: Reservation) => {

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

      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} />

      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main id="main" className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64">
          <div className="p-6 md:p-10 bg-transparent dark:bg-gray-800 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between">
              <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
                Table Reservations
              </h1>
              <Input
                placeholder="Search reservations..."
                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500 sm:w-[50%] lg:w-[60%]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {isFetching ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin w-10 h-10 text-indigo-600" />
              </div>
            ) : reservations.length === 0 ? (
              <p className="text-gray-500">No reservations available.</p>
            ) : (
              <>
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
                    {reservations?.
                      filter((res) =>
                        res.full_name.toLowerCase()
                          .includes(searchText.toLowerCase()))
                      .map((res) => (
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
                            className={`font-medium ${res.status === "active"
                              ? "text-green-600 bg-green-100 uppercase"
                              : res.status === "cancelled"
                                ? "text-red-600 bg-red-100 uppercase"
                                : "text-yellow-600 bg-yellow-100 uppercase"
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
                                <DropdownMenuItem onClick={() => changeStatus("active", res.id)}>
                                  <CheckCircle size={16} className="mr-2" /> Active
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeStatus("cancelled", res.id)}>
                                  <XCircle size={16} className="mr-2" /> Cancelled
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeStatus("pending", res.id)}>
                                  <Dot className="-mr-4" /> <Dot className="-mr-4" /> <Dot className="-mr-2" /> Pending
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
                    <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="bg-indigo-800 hover:bg-indigo-700">
                      <ArrowLeft className="mr-2" /> Previous
                    </Button>
                    <span className="flex items-center gap-2">
                      Page {page} of {totalPages}
                    </span>
                    <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="bg-indigo-800 hover:gg-indigo">
                      Next <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
