"use client";

import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/Button";
import { ArmchairIcon } from "lucide-react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { DateTimePicker } from "./ui/DateTimePicker";

const Reservation = () => {
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Handle form submission
    }
    return (
        <Drawer modal={false}>
            <DrawerTrigger asChild>
                <Button>
                    <ArmchairIcon className="mr-2" />
                    Reserve a Table
                </Button>
            </DrawerTrigger>

            <DrawerContent className="px-4 pb-6 space-y-4 container">
                <DrawerHeader>
                    <DrawerTitle>Reserve a Table</DrawerTitle>
                    <DrawerDescription>
                        Enter the required details to reserve your table.
                    </DrawerDescription>
                </DrawerHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3 flex flex-col md:flex-row gap-6 md:items-end">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name<span>*</span></Label>
                            <Input id="name" type="text" placeholder="Enter your name....." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email<span>*</span></Label>
                            <Input id="email" type="email" placeholder="Enter your email...." />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number...." />
                        </div>

                        <div className="space-y-2">
                            <DateTimePicker date={date} setDate={setDate} />
                        </div>
                    </div>

                    <DrawerFooter className="pt-4 flex justify-between">
                        <Button type="submit"  >Submit</Button>
                        <DrawerClose asChild className="">
                            <Button variant="outline" className="">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default Reservation;
