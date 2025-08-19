import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});
export const metadata: Metadata = {
    title: "🍴Gojo | Ethiopian | Restaurant",
    description: "Discover the true taste of Ethiopia in the heart of the city. Our restaurant offers an authentic Ethiopian dining experience, featuring traditional dishes crafted from fresh, high-quality ingredients and aromatic spices. From flavorful stews and tender meats to fresh injera and delicious vegetarian options, every meal celebrates Ethiopia’s rich culinary heritage. Immerse yourself in a warm, inviting atmosphere that honors Ethiopian culture and hospitality.",
    keywords: [
        "Ethiopian",
        "Restaurant",
        "Cuisine",
        "Cultural",
        "Food Gallery",
        "Ethiopian Food",
        "Ethiopian Cuisine",
        "Ethiopian Restaurant Near Me",
        "Best Ethiopian Restaurant",
        "Authentic Ethiopian Cuisine",
        "Traditional Ethiopian Food",
        "Ethiopian Cultural Food",
        "Ethiopian Food Gallery",
        "Ethiopian Dining Experience",
        "Ethiopian Food Recipes",
        "African Cuisine",
        "Ethiopian Traditional Dishes",
        "Ethiopian Food Menu",
        "Ethiopian Spices and Cuisine",
        "Ethiopian Food Tasting",
        "Ethiopian Coffee and Cuisine",
        "Ethiopian Culinary Experience",
        "Ethiopian Fine Dining",
        "Ethiopian Food Delivery",
        "Ethiopian Food Takeout",
        "Ethiopian Restaurant Reviews",
        "Explore Ethiopian Cuisine",
        "Ethiopian Vegan Food",
        "Ethiopian Vegetarian Cuisine",
        "Cultural Ethiopian Dining",
        "Ethiopian Food Photography",
        "Ethiopian Food Blog",
        "Ethiopian Street Food",
        "Ethiopian Home-Cooked Meals",
        "Ethiopian Food Specials",
        "Ethiopian Family Restaurant",
        "Modern Ethiopian Cuisine",
        "Authentic Ethiopian Cultural Cuisine",
        "Ethiopian Restaurant with Food Gallery",
        "Traditional Ethiopian Cuisine Near Me",
        "Ethiopian Food and Cultural Experience",
        "Explore Ethiopian Food and Recipes",
        "Ethiopian Fine Dining and Cultural Cuisine",
        "Ethiopian Cuisine and Spices for Food Lovers"]};
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