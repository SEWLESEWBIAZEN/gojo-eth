"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/Card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Calendar } from "@/components/ui/Calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover";
import { PlusCircle, Edit, Trash2, Star, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

interface Dish {
    id: string;
    name: string;
    description: string;
    price: number;
    isSpecial?: boolean;
}

const mockDishes: Dish[] = [
    {
        id: "1",
        name: "Beef Tibs",
        description: "Cubes of prime salted in onion, garlic jalapenos, grilled or juicy.",
        price: 19,
    },
    {
        id: "2",
        name: "Special Kitfo",
        description: "Chopped lean beef seasoned with purified butter and spiced pepper.",
        price: 21.99,
        isSpecial: true,
    },
];

export default function MenuDashboard() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [dishes, setDishes] = useState<Dish[]>(mockDishes);
    const [dailyMenu, setDailyMenu] = useState<Dish[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const addToDailyMenu = (dish: Dish) => {
        if (!dailyMenu.find((d) => d.id === dish.id)) {
            setDailyMenu([...dailyMenu, dish]);
        }
    };

    const removeDish = (id: string) => {
        setDishes(dishes.filter((d) => d.id !== id));
    };

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
                <main
                    id="main"
                    className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-64"
                >
                    <div className="p-6">
                        <h1 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-6">
                            Menu Management
                        </h1>

                        <Tabs defaultValue="fullMenu" className="w-full">
                            <TabsList className="flex flex-wrap justify-start bg-transparent">
                                <TabsTrigger value="fullMenu">Full Menu</TabsTrigger>
                                <TabsTrigger value="dailyMenu">Today's Menu</TabsTrigger>
                            </TabsList>

                            {/* Full Menu Section */}
                            <TabsContent value="fullMenu">
                                <div className="flex flex-wrap gap-4 justify-between items-center my-4">
                                    <Input placeholder="Search dishes..." className="max-w-sm flex-1" />
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Dish
                                    </Button>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {dishes.map((dish) => (
                                        <Card key={dish.id} className="border border-indigo-200">
                                            <CardHeader>
                                                <CardTitle className="flex justify-between items-center text-indigo-700">
                                                    {dish.name}
                                                    <span className="text-indigo-600 font-semibold">
                                                        ${dish.price}
                                                    </span>
                                                </CardTitle>
                                                {dish.isSpecial && (
                                                    <CardDescription className="flex items-center text-yellow-500">
                                                        <Star className="h-4 w-4 mr-1" /> Special
                                                    </CardDescription>
                                                )}
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {dish.description}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="flex justify-between">
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline">
                                                        <Edit className="h-4 w-4 mr-1" /> Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => removeDish(dish.id)}
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
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Daily Menu Section */}
                            <TabsContent value="dailyMenu">
                                <div className="flex flex-wrap justify-between items-center my-4 gap-3">
                                    <h2 className="text-xl font-semibold text-indigo-700">
                                        {selectedDate ? `Daily Menu - ${format(selectedDate, "PPP")}` : "Select a date"}
                                    </h2>

                                    {/* Calendar inside a popover */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="flex items-center gap-2"
                                            >
                                                <CalendarIcon className="h-4 w-4" />
                                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                initialFocus
                                            />
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
                                                        <span className="text-indigo-600 font-semibold">
                                                            ${dish.price}
                                                        </span>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {dish.description}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </div>

    );
}
