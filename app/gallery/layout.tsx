import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});
export const metadata: Metadata = {
  title: "🍴 GojoEthiopia | Authentic Ethiopian Restaurant in San Jose",
  description:
    "Discover GojoEthiopia, the top Ethiopian restaurant in San Jose. Enjoy authentic Ethiopian cuisine with traditional recipes, vegan and vegetarian dishes, coffee ceremony, and a true cultural dining experience.",
  keywords: [    
    "GojoEthiopia",
    "GojoEthiopia San Jose",
    "GojoEthiopia Restaurant",
    "GojoEthiopia Ethiopian Cuisine",
    "GojoEthiopia Food Gallery",
    "GojoEthiopia Reviews",
    "GojoEthiopia Menu",
    "Ethiopian Restaurant San Jose",
    "Authentic Ethiopian Restaurant San Jose",
    "Best Ethiopian Restaurant San Jose",
    "Traditional Ethiopian Food San Jose",
    "Ethiopian Dining Experience",
    "Ethiopian Lunch San Jose",
    "Ethiopian Dinner San Jose",
    "Ethiopian Food Delivery San Jose",
    "Ethiopian Takeout San Jose",
    "Ethiopian Catering Services San Jose",
    "Ethiopian Vegan Food",
    "Ethiopian Vegetarian Cuisine",
    "Ethiopian Coffee Ceremony",
    "Ethiopian Spices and Flavors",
    "Ethiopian Cultural Dining",
    "Modern Ethiopian Cuisine",
    "Ethiopian Street Food San Jose",
    "Ethiopian Home-Cooked Meals",
    "Ethiopian Food Specials",
    "Ethiopian Family Restaurant",
    "Explore Ethiopian Recipes",
    "Ethiopian Fine Dining San Jose",
    "Authentic Ethiopian Cultural Cuisine",
    "Traditional Ethiopian Cuisine Near Me",
    "Ethiopian Culinary Experience",
    "African Cuisine in San Jose"
  ],
};


export default function GalleryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.variable} font-sans`}>
            {children}
        </div>
    );
}
