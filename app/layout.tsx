import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/contexts/providers";
import SocialLinks from "@/components/SocialLinks";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Gojo Ethiopia Restaurant | Authentic Cuisine in San Jose",
  description:
    "Gojo Ethiopia Restaurant in San Jose offers authentic Ethiopian cuisine, vegan-friendly dishes, and traditional flavors in a warm and cultural dining experience.",
  keywords: [
    "Ethiopian restaurant San Jose",
    "Ethiopian food San Jose",
    "vegan Ethiopian cuisine",
    "authentic Ethiopian restaurant",
    "Gojo restaurant San Jose",
    "gojoethiopiarestaurantsj",
    "ethiopiarestaurantsj",
    "gojorestaurantsj",
    "ethiopiarestaurants",
    "Gojothiopia san jose",
    "Gojothiopia us",
    "Gojothiopia california",
    "Gojo",
    "ethiopiagojo",
    "gojoethiopiarestaurantsj",
    "gojoethiopiarestaurants",
    "gojoethiopiarestaurant",
    "gojoethiorestaurants",
    "gojorestaurants",
    "gojoethiopia",
    "gojoethiopiarest",
    "gojoethiopiafoods",
    "gojoethiopiafoodsmenu",
    "Restaurant",
    "Cuisine",
    "Cultural",
    "Gojo Food Gallery",
    "Ethiopian Food around US",
    "Ethiopian Cuisine at US",
    "Gojo Ethiopian Restaurant Near Me",
    "Ethiopian Restaurant near me",
    "Best gojo Ethiopia Restaurant",
    "Authentic Ethiopian Cuisine in gojo",
    "Traditional gojo Ethiopia Food",
    "Ethiopian Cultural Food",
    "Ethiopia gojo Food Gallery",
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
    "Ethiopian Cuisine and Spices for Food Lovers"
  ],
  alternates: {
    canonical: "https://www.gojoethiopiarestaurantsj.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.gojoethiopiarestaurantsj.com/",
    title: "Gojo Ethiopia Restaurant | Authentic Cuisine in San Jose, CA | Gojo Ethiopia Restaurant in san jose",
    description:
      "Enjoy authentic Ethiopia food in San Jose, CA. Gojo offers vegan-friendly dishes, traditional flavors, and a cozy cultural dining experience.",
    siteName: "Gojo Ethiopia Restaurant in sj",
    locale: "en_US",
    images: [
      {
        url: "https://www.gojoethiopiarestaurantsj.com/bg-new.jpg",
        width: 1200,
        height: 630,
        alt: "Gojo Ethiopian Restaurant in San Jose, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gojo Ethiopian Restaurant | Authentic Cuisine in San Jose, CA",
    description:
      "Authentic Ethiopian restaurant in San Jose, CA with vegan-friendly dishes and traditional flavors.",
    images: ["https://www.gojoethiopiarestaurantsj.com/bg-new.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  // optional but nice for SEO
  category: "restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <meta name="title" content="Gojo Ethiopian Restaurant | Authentic Ethiopian Cuisine in San Jose" />
        <meta name="description" content="Discover Gojo Ethiopian Restaurant in San Jose, CA — authentic Ethiopian cuisine, vegan-friendly dishes, traditional flavors, and a warm dining experience." />
        <meta name="keywords" content="Ethiopian restaurant San Jose, Ethiopian food San Jose, vegan Ethiopian cuisine, Gojo restaurant, authentic Ethiopian dining, San Jose restaurants" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.gojoethiopiarestaurantsj.com/" />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://www.gojoethiopiarestaurantsj.com/" />
        <meta property="og:title" content="Gojo Ethiopia Restaurant | Authentic Ethiopian Cuisine in San Jose" />
        <meta property="og:description" content="Enjoy authentic Ethiopian food in San Jose, CA. Gojo offers vegan-friendly dishes and traditional Ethiopian flavors in a cozy atmosphere." />
        <meta property="og:image" content="https://www.gojoethiopiarestaurantsj.com/og-image.jpg" />
        <meta property="og:site_name" content="Gojo Ethiopian Restaurant" />
        <meta property="og:locale" content="en_US" />
        {/* Local SEO (legacy meta tags) */}
        <meta name="google-site-verification" content="IZIuvMqQuBvscZQ7BBzhPtkt_Ha53UqeD8VMVSpwe4Y" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Jose" />
        <meta name="geo.position" content="37.3269;-121.9119" />
        <meta name="ICBM" content="37.3269, -121.9119" />
        <meta name="geo.streetAddress" content="1261 W San Carlos St" />
        <meta name="geo.postalCode" content="95126" />
        <meta
          name="keywords"
          content="Ethiopian restaurant San Jose, Ethiopian food San Jose, Gojo restaurant San Jose, authentic Ethiopian cuisine, vegan Ethiopian food San Jose, vegetarian Ethiopian cuisine, best Ethiopian restaurant San Jose, Ethiopian dining near me, Ethiopian cultural food, traditional Ethiopian dishes, Ethiopian coffee ceremony San Jose, Ethiopian food delivery San Jose, Ethiopian food takeout San Jose, Gojo Ethiopian Restaurant, African cuisine San Jose, Ethiopian family restaurant, modern Ethiopian cuisine, San Jose restaurants, authentic cultural dining San Jose"
        />

        {/* JSON-LD for Restaurant Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Gojo Ethiopian Restaurant",
              "image": [
                "https://www.gojoethiopiarestaurantsj.com/bg-new.jpg",
                "https://www.gojoethiopiarestaurantsj.com/og-gojo.jpg",
                "https://www.gojoethiopiarestaurantsj.com/shekla-picture-100.jpg",
                "https://www.gojoethiopiarestaurantsj.com/gojo-logo.png",
                "https://www.gojoethiopiarestaurantsj.com/gojo-bet-101.jpg",
                "https://www.gojoethiopiarestaurantsj.com/catering-catering-100.jpg",
                "https://www.gojoethiopiarestaurantsj.com/carousel/new-image-2.jpg",
                "https://www.gojoethiopiarestaurantsj.com/carousel/new-image-1.jpg",
              ],
              "url": "https://www.gojoethiopiarestaurantsj.com/",
              "telephone": "+1-408-295-9546",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1261 W San Carlos St",
                "addressLocality": "San Jose",
                "addressRegion": "CA",
                "postalCode": "95126",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.3269,
                "longitude": -121.9119
              },
              "servesCuisine": ["Ethiopian", "Vegan", "Vegetarian"],
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "11:00",
                  "closes": "22:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/",
                "https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/"
              ]
            })
          }}
        />


      </head>
      <body className="bg-slate-100">
        <Providers>{children}</Providers>
        <SocialLinks />
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
