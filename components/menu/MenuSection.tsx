'use client'
import MenuTabs from "./MenuTabs";
import React, { useState } from 'react'
import Reservation from "../Reservation";
import { Input } from "../ui/Input";
import Image from 'next/image'
const MenuSection = () => {

    const [searchText, setSearchText] = useState("");
    return (
        <section id="menu" className="py-4 px-4 border-t">
            <div className="container gap-8 items-center py-8 md:py-10 px-4">
                <div className="flex flex-col md:flex-row justify-between items-end space-x-6">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
                            Cuisine Collection
                        </h2>
                        <p className="text-muted-foreground mb-6 text-justify">
                            Explore our carefully curated daily specials, crafted to bring you something new and exciting every time you visit.
                            Take a leisurely tour through our full menu, where each dish is thoughtfully prepared to satisfy every craving — from comforting classics to bold, adventurous flavors.
                            Whether you’re in the mood for a quick, flavorful bite or a hearty, indulgent feast, your perfect meal is only a click away.
                        </p>
                    </div>
                    <div className="space-y-4 w-[60%] mb-4">
                        <Input
                            placeholder="Search the cuisine...."
                            className="border border-primary"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)} />
                        <Reservation />
                    </div>
                </div>

                <div className="relative overflow-auto pt-[50px] sm:pt-[20px] md:pt-[5px] lg:pt-0">
                    {/* Main content */}
                    <MenuTabs searchText={searchText} />
                    {/* Vertical borders */}
                    <div className="absolute inset-y-0 left-0 w-[20px] bg-repeat-y" style={{ backgroundImage: "url('/border-vertical.png')" }} />
                    <div className="absolute inset-y-0 right-0 w-[20px] bg-repeat-y" style={{ backgroundImage: "url('/border-vertical.png')" }} />
                    {/* Horizontal borders */}
                    <div className="absolute inset-x-0 top-0 h-[20px] bg-repeat-x" style={{ backgroundImage: "url('/border-horizontal.png')" }} />
                    <div className="absolute inset-x-0 bottom-0 h-[20px] bg-repeat-x" style={{ backgroundImage: "url('/border-horizontal.png')" }} />
                </div>





            </div>
        </section>
    )
}

export default MenuSection
