"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PlusCircle } from "lucide-react";
import { Dish } from "@/lib/utils";
import DishCard from "./DishCard";
import { useEffect, useState } from "react";
import MenuLoading from "../menu/MenuLoading";



export default function FullMenu() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Fetch dishes from an API or other source
        const fetchDishes = async () => {
            try{
                setIsLoading(true);
                const response = await fetch("/api/dish/getAll");
                const data = await response.json();
                setDishes(data?.data ?? []);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDishes();
    }, []);

    const removeDish = (id: string) => {
        setDishes((prevDishes) => prevDishes.filter((dish) => dish.id !== id));
    };

    const addToDailyMenu = (dish: Dish) => {
        // Implement adding to daily menu logic
    };

    return (
        <>
            <div className="flex flex-wrap gap-4 justify-between items-center my-4">
                <Input placeholder="Search dishes..."
                    className="max-w-sm flex-1 focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-[3px]"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Dish
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes?.filter((dish) => dish.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dish) => (
                    <DishCard key={dish.id} dish={dish} removeDish={removeDish} addToDailyMenu={addToDailyMenu} />
                ))}
            </div>
            {(dishes?.filter((dish) => dish.name.toLowerCase().includes(searchTerm.toLowerCase()))?.length === 0 && !isLoading) && (
                <div className="col-span-3 text-center text-gray-500">
                    No dishes found.
                </div>
            )}
            {isLoading && (
                <div className="col-span-3 text-center text-gray-500">
                    <MenuLoading/>
                </div>
            )}
        </>
    );
}
