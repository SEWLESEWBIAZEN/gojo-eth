"use client";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Dish } from "@/lib/utils";
import { useState } from "react";


interface DailyMenuProps {
  dailyMenu: Dish[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export default function DailyMenu({ dailyMenu, selectedDate, setSelectedDate }: DailyMenuProps) {
   
  return (
    <>
      <div className="flex flex-wrap justify-between items-center my-4 gap-3">
        <h2 className="text-xl font-semibold text-indigo-700">
          {selectedDate ? `Daily Menu - ${format(selectedDate, "PPP")}` : "Select a date"}
        </h2>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {dailyMenu.length === 0 ? (
        <p className="text-gray-500">No items added to this day's menu yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyMenu.map((dish) => (
            <Card key={dish.id} className="border border-indigo-200">
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-indigo-700">
                  {dish.name}
                  <span className="text-indigo-600 font-semibold">${dish.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300">{dish.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
