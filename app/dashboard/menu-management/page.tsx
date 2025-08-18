"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { Dish } from "@/lib/utils";
import FullMenu from "@/components/dashboard/FullMenu";
import DailyMenu from "@/components/dashboard/DailyMenu";
import Footer from "@/components/Footer";


export default function MenuDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const [dailyMenu, setDailyMenu] = useState<Dish[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
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
          <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">Menu Management</h1>

            <Tabs defaultValue="fullMenu" className="w-full">
              <TabsList className="flex flex-wrap justify-start bg-transparent">
                <TabsTrigger value="fullMenu">Full Menu</TabsTrigger>
                <TabsTrigger value="dailyMenu">Today's Menu</TabsTrigger>
              </TabsList>

              <TabsContent value="fullMenu">
                <FullMenu />
              </TabsContent>

              <TabsContent value="dailyMenu">
                <DailyMenu dailyMenu={dailyMenu} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
