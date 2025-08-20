'use client'

import React, { useState } from "react";
import MenuTabs from "./MenuTabs";
import Reservation from "../Reservation";
import { Input } from "../ui/Input";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";

const MenuSection = () => {
    const [searchText, setSearchText] = useState("");

    return (
        <section id="menu" className="py-12 px-4 border-t relative">
            <div className="container mx-auto flex flex-col gap-10 md:gap-12">
                {/* Header + Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    {/* Title & Description */}
                    <div className="md:w-1/2">
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
                            Cuisine Collection
                        </h2>
                        <p className="text-muted-foreground text-justify leading-relaxed">
                            Explore our carefully curated daily specials, crafted to bring you something new and exciting every time you visit.
                            Take a leisurely tour through our full menu, where each dish is thoughtfully prepared to satisfy every craving — from comforting classics to bold, adventurous flavors.
                            Whether you’re in the mood for a quick, flavorful bite or a hearty, indulgent feast, your perfect meal is only a click away.
                        </p>
                    </div>

                    {/* Search + Reservation */}
                    <div className="md:w-[40%] flex flex-col gap-4">
                        <Input
                            placeholder="Search the cuisine..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border border-primary focus:ring-2 focus:ring-primary rounded-lg"
                        />
                        <Reservation />
                    </div>
                </div>

                {/* Menu Tabs + Borders */}
                <div className="relative overflow-auto pt-6 md:pt-4 lg:pt-0">
                    <MenuTabs searchText={searchText} />

                    {/* Vertical borders */}
                    <div
                        className="absolute inset-y-0 left-0 w-5 bg-repeat-y rounded-lg"
                        style={{ backgroundImage: "url('/border-vertical.png')" }}
                    />
                    <div
                        className="absolute inset-y-0 right-0 w-5 bg-repeat-y rounded-lg"
                        style={{ backgroundImage: "url('/border-vertical.png')" }}
                    />

                    {/* Horizontal borders */}
                    <div
                        className="absolute inset-x-0 top-0 h-5 bg-repeat-x rounded-lg"
                        style={{ backgroundImage: "url('/border-horizontal.png')" }}
                    />
                    <div
                        className="absolute inset-x-0 bottom-0 h-5 bg-repeat-x rounded-lg"
                        style={{ backgroundImage: "url('/border-horizontal.png')" }}
                    />
                </div>

                {/* Order Now Button */}
                <div className="flex justify-center">
                    <Link
                        href="https://www.doordash.com/store/gojo-ethiopian-restaurant-san-jose-25324615/23804756/?srsltid=AfmBOopARPE0AMakeIngWooakxEN9COzyfKwvPZaN19cta8VhFNarSgs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex px-6 py-3 text-white font-semibold text-lg rounded-xl bg-primary shadow-lg hover:scale-105 transform transition-all duration-200"
                    >
                        <BaggageClaim className="mr-2 h-6 w-6"  /> <span>Order Now</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
