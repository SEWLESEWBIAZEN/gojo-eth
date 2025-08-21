import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/contexts/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SocialLinks from "@/components/SocialLinks";


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "🍴Gojo | Ethiopian | Restaurant",
  description: "🥄 Savor the rich and diverse flavors of Ethiopian cuisine without leaving the city. 🍴 Our restaurant brings you a carefully curated menu of authentic dishes, highlighting the bold spices, wholesome ingredients, and traditional cooking techniques of Ethiopia. Whether you’re enjoying a hearty platter, sampling our signature vegetarian specialties, or experiencing a traditional coffee ceremony, every visit is a journey into Ethiopia’s food culture. Experience the heart and soul of Ethiopian cuisine in a vibrant city setting. Our chefs prepare each dish with authentic recipes, combining fresh ingredients and aromatic spices to create a culinary experience that is both rich and memorable. From classic stews to traditional breads and flavorful sides, our restaurant offers an inviting space to enjoy the warmth, culture, and flavors of Ethiopia.",
  keywords: ["🍴","🥄",
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
    "Ethiopian Cuisine and Spices for Food Lovers"]
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-slate-100">
         <Providers>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
         </Providers>
          <SocialLinks />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
