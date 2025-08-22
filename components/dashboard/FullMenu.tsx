"use client";
import { Input } from "@/components/ui/Input";
import DishCard from "./DishCard";
import { useState } from "react";
import MenuLoading from "../menu/MenuLoading";
import AddNewMenu from "./AddNewMenu";
import { useDishesAndCategories } from "@/contexts/queries/useFetchFullMenu";
import { toast } from "sonner";

export default function FullMenu() {
    const [searchTerm, setSearchTerm] = useState("");
    const [refetch, setRefetch] = useState(false);
    const {
        dishes = [],
        dishCategories = [],
        isLoading,
        isError
    } = useDishesAndCategories();

    // optional: handle errors
    if (isError) {
        toast.error("Error fetching dishes or dish categories");
    }
    return (
        <>
            <div className="flex flex-wrap gap-4 justify-between items-center my-4">
                <Input placeholder="Search dishes..."
                    className="max-w-sm flex-1 focus-visible:border-indigo-500 focus-visible:ring-indigo-500 focus-visible:ring-[3px]"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <AddNewMenu categories={dishCategories} />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dishes?.filter((dish) => dish?.name.toLowerCase().includes(searchTerm.toLowerCase())).map((dish) => (
                    <DishCard key={dish.id} dish={dish} setRefetch={setRefetch} />
                ))}
            </div>
            {(dishes?.filter((dish) => dish?.name.toLowerCase().includes(searchTerm.toLowerCase()))?.length === 0 && !isLoading) && (
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
