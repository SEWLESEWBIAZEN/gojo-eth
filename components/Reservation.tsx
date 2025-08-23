"use client";

import React, { useState } from "react";
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
import { ArmchairIcon, X } from "lucide-react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { DateTimePicker } from "./ui/DateTimePicker";
import axios from "axios";
import { toast } from "sonner";
import { BlinkBlur, OrbitProgress } from 'react-loading-indicators'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";



const Reservation = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<string>("10:30");
    const [isLoading, setIsLoading] = useState(false);

    const [reservationForm, setReservationForm] = useState({
        email: "",
        full_name: "",
        phone_number: "",
        partySize: 1,
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        setReservationForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault();
        try {
            const reservationData = {
                email: reservationForm.email,
                full_name: reservationForm.full_name,
                phone_number: reservationForm.phone_number,
                reservation_date: new Date(date).toDateString(),
                reservation_time: `${time?.split(":")[0]}:${time?.split(":")[1]}`,
                partySize: Number(reservationForm.partySize),
            }

            const response = await axios.post("/api/reservation/reserve", reservationData);
            setDialogOpen(false);
            toast.success(response?.data?.message || "Table reserved successfully!");
        }
        catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to reserve table")
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setDialogOpen(true)}>
                    <ArmchairIcon className="mr-2" />
                    Reserve a Table
                </Button>
            </DialogTrigger>

            <DialogContent className="px-4 bg-white rounded-md py-6 backdrop-blur-xl w-[90%]">
                <DialogClose asChild>
                    <button className="w-full flex justify-end">
                        <X className="bg-primary/10 rounded-full p-2 h-8 w-8 text-black font-bold" />
                    </button>
                </DialogClose>

                <DialogHeader>
                    <DialogTitle>Reserve a Table</DialogTitle>
                    <DialogDescription>
                        Enter the required details to reserve your table.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-full">
                    <div className="space-y-6 flex flex-wrap md:items-end gap-4 py-4 w-full">
                        <div className="space-y-2 w-full md:w-[45%]">
                            <Label htmlFor="name">Full Name<span>*</span></Label>
                            <Input id="name" type="text" placeholder="Enter your name....." className="w-full" value={reservationForm.full_name} onChange={handleChange} name="full_name" />
                        </div>

                        <div className="space-y-2 w-full md:w-[45%]">
                            <Label htmlFor="email">Email<span>*</span></Label>
                            <Input id="email" type="email" placeholder="Enter your email...." className="w-full" value={reservationForm.email} onChange={handleChange} name="email" />
                        </div>

                        <div className="space-y-2 w-full md:w-[45%]">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number...." className="w-full" value={reservationForm.phone_number} onChange={handleChange} name="phone_number" />
                        </div>
                        <div className="space-y-2 w-full md:w-[45%]">
                            <Label htmlFor="partySize">Party Size</Label>
                            <Input id="partySize" type="number" placeholder="Enter party size...." className="w-full" value={reservationForm.partySize} onChange={handleChange} name="partySize" />
                        </div>

                        <div className="space-y-2">
                            <DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime} />
                        </div>
                    </div>

                    <DialogFooter className="pt-4 flex flex-col md:flex-row md:justify-center">
                        <Button type="submit" disabled={isLoading} >
                            {isLoading ? <OrbitProgress style={{ width: 2, height: 2 }} /> : "Submit"}
                        </Button>
                        <DialogClose asChild className="">
                            <Button variant="outline" className="" onClick={() => setDialogOpen(false)}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default Reservation;
