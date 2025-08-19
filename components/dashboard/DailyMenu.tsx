"use client";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/Card";
import MenuLoading from "../menu/MenuLoading";
import { useState, useEffect } from "react";
import { useDailyMenu } from "@/contexts/queries/useDailyMenu";
import { useRemoveDishFromDailyMenu } from "@/contexts/mutations/useRemoveDishFromDailyMenu";


// --- Component ---
export default function DailyMenu() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: dailyMenu = [], isLoading, error } = useDailyMenu(selectedDate);
  const { mutate: removeDishFromMenu, isPending: removing } = useRemoveDishFromDailyMenu(selectedDate);
  const [dishToRemove, setDishToRemove] = useState<string | null>(null);

  useEffect(() => {
    if (error) toast.error((error as Error).message);
  }, [error]);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center my-4 gap-3">
        <h2 className="text-xl font-semibold text-indigo-700">
          {`Daily Menu - ${format(selectedDate, "PPP")}`}
        </h2>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {isLoading && <MenuLoading />}

      {!isLoading && dailyMenu.length === 0 ? (
        <p className="text-gray-500">No items added to this day's menu yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailyMenu.map((dish) => (
            <Card
              key={dish.id}
              className="border border-indigo-200 shadow-sm hover:shadow-md transition-shadow bg-indigo-100"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-indigo-700">
                  <span>{dish.name}</span>
                  <span className="text-indigo-600 font-semibold">
                    ${dish.price.toFixed(2)}
                  </span>
                </CardTitle>
                <CardDescription className="text-md text-accent">
                  {dish.category}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {dish.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dish.featured && (
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      ⭐ Special
                    </span>
                  )}
                  {dish.spicy && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                      🌶️ Spicy
                    </span>
                  )}
                  {dish.vegan && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                      🌱 Vegan
                    </span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between flex-wrap items-end">
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < dish.rating ? "★" : "☆"}</span>
                  ))}
                </div>

                <Button
                  size="sm"
                  aria-label="Remove dish from today's menu"
                  disabled={dishToRemove === dish.id}
                  onClick={
                    () => {
                      removeDishFromMenu(dish.id);
                      setDishToRemove(dish.id);
                    }
                  }
                  className="bg-red-800 hover:bg-red-900 text-white text-sm px-4 py-2 
                      disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {dishToRemove === dish.id ? "Removing..." : "Remove"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
