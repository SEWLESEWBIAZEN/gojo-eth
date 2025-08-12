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
                            Menu
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Browse our daily specials or the full menu.
                        </p>
                    </div>
                    <Reservation/>
                </div>
                <MenuTabs />
            </div>
        </section>
    )
}

export default MenuSection
