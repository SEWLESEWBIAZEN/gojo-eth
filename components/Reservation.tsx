"use client";

import React, {  useState } from "react";
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
import axios from "axios";
import { toast } from "sonner";
import {BlinkBlur,OrbitProgress} from 'react-loading-indicators'



const Reservation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
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
        try{
            const reservationData= {
                email: reservationForm.email,
                full_name: reservationForm.full_name,
                phone_number: reservationForm.phone_number,
                reservation_date: new Date(date).toDateString(),
                reservation_time: `${time?.split(":")[0]}:${time?.split(":")[1]}`,
                partySize: Number(reservationForm.partySize),
            }
    
            const response = await axios.post("/api/reservation/reserve", reservationData);
            setDrawerOpen(false);
            toast.success(response?.data?.message || "Table reserved successfully!");
        }
        catch(err:any){
            toast.error(err?.response?.data?.message || "Failed to reserve table")
        }
        finally {
            setIsLoading(false)
        }

    }
    return (
        <Drawer modal={false} open={drawerOpen}>
            <DrawerTrigger asChild>
                <Button onClick={() => setDrawerOpen(true)}>
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
                            <Input id="name" type="text" placeholder="Enter your name....." value={reservationForm.full_name} onChange={handleChange} name="full_name" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email<span>*</span></Label>
                            <Input id="email" type="email" placeholder="Enter your email...." value={reservationForm.email} onChange={handleChange} name="email" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" type="tel" placeholder="Enter your phone number...." value={reservationForm.phone_number} onChange={handleChange} name="phone_number" />
                        </div>
                        <div>
                            <Label htmlFor="partySize">Party Size</Label>
                            <Input id="partySize" type="number" placeholder="Enter party size...." value={reservationForm.partySize} onChange={handleChange} name="partySize" />
                        </div>

                        <div className="space-y-2">
                            <DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime}/>
                        </div>
                    </div>

                    <DrawerFooter className="pt-4 flex justify-between">
                        <Button type="submit" disabled={isLoading} >
                            {isLoading ? <OrbitProgress style={{ width: 2, height: 2 }} /> : "Submit"}
                        </Button>
                        <DrawerClose asChild className="">
                            <Button variant="outline" className="" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default Reservation;
