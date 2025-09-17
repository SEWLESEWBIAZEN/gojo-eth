"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Trash2,
  CheckCircle,
  XCircle,
  Dot,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  RefreshCcwDotIcon,
} from "lucide-react";
import { Reservation } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import PageLoader from "@/components/ui/PageLoader";
const ITEMS_PER_PAGE = 10;
// Status configuration for better maintainability
const STATUS_CONFIG = {
  active: {
    text: "text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30",
    border: "border-green-200 dark:border-green-800",
    label: "Active",
    icon: CheckCircle,
  },
  cancelled: {
    text: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
    border: "border-red-200 dark:border-red-800",
    label: "Cancelled",
    icon: XCircle,
  },
  pending: {
    text: "text-yellow-600",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    border: "border-yellow-200 dark:border-yellow-800",
    label: "Pending",
    icon: Dot,
  },
  inactive: {
    text: "text-gray-600",
    bg: "bg-gray-100 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    label: "Inactive",
    icon: Dot,
  },
} as const;


export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isChangingStatus, setIsChangingStatus] = useState<string | null>(null);
  const totalPages = Math.ceil(totalReservations / ITEMS_PER_PAGE);

  // Memoized filtered reservations
  const filteredReservations = useMemo(() => {
    let filtered = reservations;
    
    // Apply search filter
    if (searchText.trim()) {
      filtered = filtered.filter(
        (res) =>
          res.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
          res.email.toLowerCase().includes(searchText.toLowerCase()) ||
          (res.phone_number && res.phone_number.includes(searchText))
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((res) => res.status === statusFilter);
    }
    
    return filtered;
  }, [reservations, searchText, statusFilter]);

  // Fetch reservations with pagination
  const fetchReservations = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/reservation/getAll", {
        params: { page: currentPage, limit: ITEMS_PER_PAGE },
      });
      
      const data = response.data?.data;
      setReservations(data?.reservations || []);
      setTotalReservations(data?.total || 0);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch reservations"
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const changeStatus = useCallback(async (status: Reservation["status"], id?: string) => {
    if (!id) return;

    try {
      setIsChangingStatus(id);
      const response = await axios.put(
        `/api/reservation/updateStatus/${id}`,
        { status }
      );
      
      if (response?.data?.isError) {
        toast.error(response?.data?.message || "Something went wrong!");
        return;
      }
      
      toast.success(
        response?.data?.message || "Reservation status updated successfully!"
      );
      
      // Update locally
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Error updating reservation status"
      );
    } finally {
      setIsChangingStatus(null);
    }
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const renderStatusBadge = (status: Reservation["status"]) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const IconComponent = config.icon;
    
    return (
      <div className={`inline-flex items-center gap-1 font-medium px-3 py-1 rounded-lg ${config.text} ${config.bg}`}>
        <IconComponent size={14} />
        {config.label}
      </div>
    );
  };

  const renderActionMenu = (reservation: Reservation) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isChangingStatus === reservation.id}>
        <button 
          className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-all duration-200 disabled:opacity-50"
          aria-label="Reservation actions"
        >
          {isChangingStatus === reservation.id ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreVertical size={18} />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="rounded-xl shadow-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 min-w-[180px]"
        align="end"
      >
        <DropdownMenuItem 
          onClick={() => changeStatus("active", reservation.id)}
          className="cursor-pointer focus:bg-green-50 dark:focus:bg-green-900/20"
          disabled={isChangingStatus === reservation.id}
        >
          <CheckCircle size={16} className="mr-2 text-green-600" /> 
          Mark as Active
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeStatus("cancelled", reservation.id)}
          className="cursor-pointer focus:bg-red-50 dark:focus:bg-red-900/20"
          disabled={isChangingStatus === reservation.id}
        >
          <XCircle size={16} className="mr-2 text-red-600" /> 
          Mark as Cancelled
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeStatus("pending", reservation.id)}
          className="cursor-pointer focus:bg-yellow-50 dark:focus:bg-yellow-900/20"
          disabled={isChangingStatus === reservation.id}
        >
          <Dot size={16} className="mr-2 text-yellow-600" /> 
          Mark as Pending
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeStatus("inactive", reservation.id)}
          className="cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-700"
          disabled={isChangingStatus === reservation.id}
        >
          <Trash2 size={16} className="mr-2 text-gray-600" /> 
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderReservationCard = (reservation: Reservation) => (
    <div 
      key={reservation.id} 
      className="bg-white dark:bg-neutral-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700 flex flex-col gap-4 transition-all duration-200 hover:shadow-md"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
        {renderStatusBadge(reservation?.status)}
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate capitalize">
            {reservation.full_name}
          </h3>
          <p className="flex flex-col sm:flex-row gap-1 justify-between sm:items-center text-sm text-gray-500 dark:text-gray-400 truncate">
            <span className="flex flex-row items-center gap-1"><Mail className="w-4 h-4" color="green"/><span>{reservation.email}</span></span>
            {reservation.phone_number && <span className="flex flex-row items-center gap-1"> <Phone className="w-4 h-4" color="green"/> {reservation.phone_number}</span>}
          </p>
        </div>
        {renderActionMenu(reservation)}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-indigo-600 flex-shrink-0" />
          <span className="truncate">{reservation?.reservation_date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-indigo-600 flex-shrink-0" />
          <span className="truncate">{reservation?.reservation_time}</span>
        </div>
        <div className="flex items-center gap-2 bg-indigo-100 text-center justify-center py-1 rounded-xl">
          <Users size={16} className="text-indigo-600 flex-shrink-0" />
          <span>{reservation.partySize} guest{reservation.partySize !== 1 ? 's' : ''}</span>
        </div>
      </div>     

    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-400">
            Table Reservations
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch lg:items-end">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-10 pr-4 py-2 h-11 rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-neutral-800 dark:border-neutral-600"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            
            <div className="flex flex-row gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-3 rounded-xl border border-gray-300 dark:border-neutral-600 h-11">
                <Filter size={16} className="text-gray-500" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-0 p-0 h-auto focus:ring-0">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={fetchReservations} 
                variant="outline"
                className="h-11 rounded-xl border-gray-300 dark:border-neutral-600 flex space-x-3"
              >
                <RefreshCcwDotIcon className="w-4 h-4 "/>
               <span>Refresh</span> 
              </Button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <p className="flex justify-center items-center w-full text-gray-500 dark:text-gray-400">
            <Loader2 className="animate-spin text-indigo-600 w-6 h-6" />
          </p>
        ) : filteredReservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-neutral-800 p-4 mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              No reservations found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              {searchText || statusFilter !== "all" 
                ? "Try adjusting your search or filter to find what you're looking for."
                : "There are no reservations to display at the moment."
              }
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredReservations.map(renderReservationCard)}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-gray-200 dark:border-neutral-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalReservations)} of{" "}
                  {totalReservations} reservations
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    variant="outline"
                    className="gap-1 rounded-lg"
                    size="sm"
                  >
                    <ArrowLeft size={16} /> Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      // Show pages around current page
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          onClick={() => setCurrentPage(pageNum)}
                          className="h-8 w-8 p-0 rounded-lg"
                          size="sm"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2 text-gray-500">...</span>
                    )}
                  </div>
                  
                  <Button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    className="gap-1 rounded-lg"
                    size="sm"
                  >
                    Next <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}