import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/contexts/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import SocialLinks from "@/components/SocialLinks";
import { Analytics } from "@vercel/analytics/next"


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "🍴Gojo | Ethiopian | Restaurant",
  description: "🥄 Savor the rich and diverse flavors of Ethiopian cuisine without leaving the city. 🍴 Our restaurant brings you a carefully curated menu of authentic dishes, highlighting the bold spices, wholesome ingredients, and traditional cooking techniques of Ethiopia. Whether you’re enjoying a hearty platter, sampling our signature vegetarian specialties, or experiencing a traditional coffee ceremony, every visit is a journey into Ethiopia’s food culture. Experience the heart and soul of Ethiopian cuisine in a vibrant city setting. Our chefs prepare each dish with authentic recipes, combining fresh ingredients and aromatic spices to create a culinary experience that is both rich and memorable. From classic stews to traditional breads and flavorful sides, our restaurant offers an inviting space to enjoy the warmth, culture, and flavors of Ethiopia.",
  keywords: ["🍴", "🥄",
    "Ethiopian",
    "Gojo",
    "gojo",
    "gojoethiopianrestaurantsj",
    "gojoethiopianrestaurants",
    "gojoethiopianrestaurant",
    "gojoethiorestaurants",
    "gojorestaurants",
    "gojoethiopian",
    "gojoethiopianrest",
    "gojoethiopianfoods",
    "gojoethiopiafoodsmenu",
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
      <head>
        {/* <!-- Basic SEO --> */}
        <meta name="title" content="Gojo Ethiopian Restaurant | Authentic Ethiopian Cuisine in San Jose" />
        <meta name="description" content="Discover Gojo Ethiopian Restaurant in San Jose, CA — authentic Ethiopian cuisine, vegan-friendly dishes, traditional flavors, and a warm dining experience." />
        <meta name="keywords" content="Ethiopian restaurant San Jose, Ethiopian food San Jose, vegan Ethiopian cuisine, Gojo restaurant, authentic Ethiopian dining, San Jose restaurants" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.gojoethiopiarestaurantsj.com/" />

        {/* <!-- Open Graph (Social SEO) --> */}
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://www.gojoethiopiarestaurantsj.com/" />
        <meta property="og:title" content="Gojo Ethiopian Restaurant | Authentic Ethiopian Cuisine in San Jose" />
        <meta property="og:description" content="Enjoy authentic Ethiopian food in San Jose, CA. Gojo offers vegan-friendly dishes and traditional Ethiopian flavors in a cozy atmosphere." />
        {/*  <!-- replace with real image --> */}
        <meta property="og:image" content="https://www.gojoethiopiarestaurantsj.com/bg-new.jpg" />
        <meta property="og:site_name" content="Gojo Ethiopian Restaurant" />
        <meta property="og:locale" content="en_US" />

        {/* <!-- Twitter (Social SEO) --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gojo Ethiopian Restaurant | Authentic Ethiopian Cuisine in San Jose" />
        <meta name="twitter:description" content="Authentic Ethiopian restaurant in San Jose, CA with vegan-friendly options and traditional cuisine." />
        {/*  <!-- replace with real image --> */}
        <meta name="twitter:image" content="https://www.gojoethiopiarestaurantsj.com/bg-new.jpg" />

        {/* <!-- Local SEO (Google Maps / Restaurant Schema) --> */}       
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Jose" />
        <meta name="geo.position" content="37.3269;-121.9119" />
        <meta name="ICBM" content="37.3269, -121.9119" />
        <meta name="geo.streetAddress" content="1261 W San Carlos St" />
        <meta name="geo.postalCode" content="95126" />

      </head>
      <body className="bg-slate-100">
        <Providers>
          {children}
        </Providers>
        <SocialLinks />
        <Toaster position="top-right" richColors />
      </body>
    </html>


  );
}
