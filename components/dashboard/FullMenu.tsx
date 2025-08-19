"use client";
import { Input } from "@/components/ui/Input";
import { Dish } from "@/lib/utils";
import DishCard from "./DishCard";
import { useEffect, useState } from "react";
import MenuLoading from "../menu/MenuLoading";
import AddNewMenu from "./AddNewMenu";
import axios from "axios";

export default function FullMenu() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [dishCategories, setDishCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        const fetchDishes = async () => {
            setIsLoading(true);
            try {
                const [dishResult, categoryResult] = await Promise.allSettled([
                    axios.get("/api/dish/getAll"),
                    axios.get("/api/dishCategory/getAll"),
                ]);

                if (dishResult.status === "fulfilled") {
                    setDishes(dishResult.value.data?.data ?? []);
                } else {
                    console.error("Failed to fetch dishes:", dishResult.reason);
                }

                if (categoryResult.status === "fulfilled") {
                    setDishCategories(categoryResult.value.data?.data ?? []);
                } else {
                    console.error("Failed to fetch categories:", categoryResult.reason);
                }
            } catch (err) {
                console.error("Unexpected error fetching data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDishes();
    }, [refetch]);

  

    return (
        <>
            <div className="flex flex-wrap gap-4 justify-between items-center my-4">
                <Input placeholder="Search dishes..."
                    className="max-w-sm flex-1 focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-[3px]"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <AddNewMenu setRefetch={setRefetch} categories={dishCategories} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes?.filter((dish) => dish.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dish) => (
                    <DishCard key={dish.id} dish={dish}  setRefetch={setRefetch} />
                ))}
            </div>
            {(dishes?.filter((dish) => dish.name.toLowerCase().includes(searchTerm.toLowerCase()))?.length === 0 && !isLoading) && (
                <div className="col-span-3 text-center text-gray-500">
                    No dishes found.
                </div>
            )}
            {isLoading && (
                <div className="col-span-3 text-center text-gray-500">
                    <MenuLoading />
                </div>
            )}
        </>
    );
}
