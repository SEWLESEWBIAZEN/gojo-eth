import MenuTabs from "./MenuTabs";
import React from 'react'
import Reservation from "../Reservation";
const MenuSection = () => {
    return (
        <section id="menu" className="py-12 px-4 border-t">
            <div className="container gap-8 items-center py-12 md:py-20 px-4">
                <div className="flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
                            Cuisine Collection
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Explore our carefully curated daily specials, crafted to bring you something new and exciting every time you visit.
                            Take a leisurely tour through our full menu, where each dish is thoughtfully prepared to satisfy every craving — from comforting classics to bold, adventurous flavors.
                            Whether you’re in the mood for a quick, flavorful bite or a hearty, indulgent feast, your perfect meal is only a click away.
                        </p>
                    </div>
                    <Reservation />
                </div>
                <MenuTabs />
            </div>
        </section>
    )
}

export default MenuSection
