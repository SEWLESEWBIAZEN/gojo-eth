'use client'

import { useState } from "react";
import { Button } from "./ui/Button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { toast } from "sonner";
import { Dish } from "@/lib/utils";
import { Checkbox } from "./ui/Checkbox";
import { Label } from "./ui/Label";
import { X } from "lucide-react";

interface AddToDailyMenuProps {
    dish: Dish;
    addMutation: any; // React Query mutation
}

export default function AddToDailyMenu({ dish, addMutation }: AddToDailyMenuProps) {
    const [priceAdjustment, setPriceAdjustment] = useState(dish?.price?.toString() || "");
    const [todaySpecial, setTodaySpecial] = useState(false);

    const handleAdd = () => {
        if (!priceAdjustment) {
            toast.error("Please enter a price adjustment");
            return;
        }

        addMutation.mutate(
            { dishId: dish.id, batchPrice: parseFloat(priceAdjustment), specialOfTheDay: todaySpecial },
            {
                onSuccess: () =>
                    toast.success(
                        `${dish.name} added${todaySpecial ? " as Today's Special" : ""}!`
                    ),
            }
        );
    };

    return (
        <>
            {!dish.todays && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Add to Today's
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md bg-white rounded-lg px-6 py-4">
                        <DialogClose className="flex flex-1 justify-end mb-2 "><X className="bg-indigo-200 p-1 rounded-full"/></DialogClose>
                        <DialogHeader>
                            <DialogTitle>
                                Add <span className="font-semibold text-indigo-600">{dish.name}</span> to Today's Menu
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 flex flex-col gap-4">
                            <Label className="font-medium">Price Adjustment</Label>
                            <Input
                                type="number"
                                placeholder="Enter new price..."
                                value={priceAdjustment}
                                onChange={(e) => setPriceAdjustment(e.target.value)}
                                className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus-visible:ring-indigo-500"
                            />
                        </div>

                        <div className="mt-4 flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                            <Checkbox
                                checked={todaySpecial}
                                onCheckedChange={(checked) => setTodaySpecial(Boolean(checked))}
                                className="data-[state=checked]:bg-indigo-500 focus-visible:ring-indigo-500 border border-indigo-500"
                            />
                            <Label className="font-medium">Mark as Today's Special</Label>
                        </div>

                        <DialogFooter className="mt-6 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setPriceAdjustment("")}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={handleAdd}
                                disabled={addMutation.status === "pending"}
                            >
                                {addMutation.status === "pending" ? "Adding..." : "Add to Today's Menu"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
