import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['400', '700'], // optional: specify weights you want
});
export const metadata: Metadata = {
    title: "Take a look at EojoEthiopia | Ethiopian restaurant at san jose, ca",
    description: "Take a look at GojoEthiopia to discover the true taste of Ethiopia in the heart san jose. " +
        "Gojo restaurant offers an authentic Ethiopian food & dining experience with Ethiopian service, featuring traditional dishes crafted from fresh, " +
        "high-quality ingredients and aromatic spices. Immerse yourself in a warm gojoethiopia, inviting atmosphere that honors Ethiopian culture and hospitality. Come and see at san jose, ca",
    keywords: [
        "Gojo Ethiopian Restaurant San Jose",
        "Gojo Ethiopian Cuisine San Jose",
        "Gojo Ethiopian Food San Jose",
        "Gojo Restaurant San Jose CA",
        "Gojo Ethiopia Restaurant US",
        "Ethiopian Restaurant San Jose",
        "Ethiopian Food San Jose",
        "Authentic Ethiopian Restaurant San Jose",
        "Best Ethiopian Restaurant San Jose",
        "Ethiopian Cuisine Near Me",
        "Traditional Ethiopian Food",
        "Ethiopian Dining Experience San Jose",
        "Ethiopian Fine Dining San Jose",
        "Ethiopian Food Delivery San Jose",
        "Ethiopian Takeout San Jose",
        "Ethiopian Family Restaurant San Jose",
        "Authentic Ethiopian Cuisine",
        "Ethiopian Vegan Food",
        "Ethiopian Vegetarian Cuisine",
        "Ethiopian Cultural Food",
        "Ethiopian Spices and Cuisine",
        "Ethiopian Coffee and Cuisine",
        "Ethiopian Traditional Dishes",
        "Modern Ethiopian Cuisine",
        "Explore Ethiopian Cuisine",
        "Ethiopian Food Menu San Jose",
        "Ethiopian Food Recipes",
        "Ethiopian Food Specials",
        "Ethiopian Food Gallery",
        "Ethiopian Street Food San Jose",
        "Ethiopian Home-Cooked Meals"
    ]

};
export default function PageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={`${inter.variable} font-sans`}>
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2
                   focus:bg-indigo-600 focus:text-white rounded"
            >
                Skip to content
            </a>
                {children}
           
        </div>
    );
}