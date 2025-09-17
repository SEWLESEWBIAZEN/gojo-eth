import React from "react";
import Overview from "@/components/dashboard/Overview";

export default function DashboardPage() {
  return (
    <div className="relative flex flex-1 overflow-hidden">
      <main
        id="main"
        className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Overview />
      </main>
    </div>
  );
}
