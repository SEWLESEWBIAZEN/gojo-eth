'use client';
import { usePathname } from "next/navigation";
import UserNotFound from "../components/UserNotFound";
import DashboardNotFound from "@/components/dashboard/DashboardNotFound";

export default function NotFound() {
    const pathname = usePathname();
    if (pathname.startsWith("/dashboard")) {
        return <DashboardNotFound />;
    } else {
        return <UserNotFound />;

    }
}
