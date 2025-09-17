import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import FullMenu from "@/components/dashboard/FullMenu";
import DailyMenu from "@/components/dashboard/DailyMenu";

export default function MenuDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 animate-enter">
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

    </div>
  );
}
