import MenuTabs from "./MenuTabs";
import React from 'react'
const MenuSection = () => {
    return (
         <section id="menu" className="py-12 px-4 border-t">
            <div className="container gap-8 items-center py-12 md:py-20 px-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
                Menu
            </h2>
            <p className="text-muted-foreground mb-6">
                Browse our daily specials or the full menu.
            </p>
            <MenuTabs />
            </div>
        </section>
    )
}

export default MenuSection
