"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Dish } from "@/lib/utils";
import { Edit, Trash2, Star } from "lucide-react";


interface DishCardProps {
  dish: Dish;
  removeDish: (id: string) => void;
  addToDailyMenu: (dish: Dish) => void;
}

export default function DishCard({ dish, removeDish, addToDailyMenu }: DishCardProps) {
  return (
    <Card className="border border-indigo-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center text-indigo-700">
          {dish.name}
          <span className="text-indigo-600 font-semibold">${dish.price}</span>
        </CardTitle>
        {dish?.featured && (
          <CardDescription className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1" /> Special
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300">{dish?.description}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-4 justify-between">
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => removeDish(dish?.id)}
            className="text-red-800 border-none"
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => addToDailyMenu(dish)}
        >
          Add to Daily
        </Button>
      </CardFooter>
    </Card>
  );
}
