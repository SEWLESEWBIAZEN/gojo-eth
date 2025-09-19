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
  title: "Gojo Ethiopian Restaurant | Authentic Cuisine in San Jose, CA",
  description:
    "Gojo Ethiopian Restaurant in San Jose offers authentic Ethiopian cuisine, vegan-friendly dishes, and traditional flavors in a warm and cultural dining experience.",
  keywords: [
    "Ethiopian restaurant San Jose",
    "Ethiopian food San Jose",
    "vegan Ethiopian cuisine",
    "authentic Ethiopian restaurant",
    "Gojo restaurant San Jose",
  ],
  alternates: {
    canonical: "https://www.gojoethiopiarestaurantsj.com/",
  },
  openGraph: {
    type: "website",
    url: "https://www.gojoethiopiarestaurantsj.com/",
    title: "Gojo Ethiopian Restaurant | Authentic Cuisine in San Jose, CA",
    description:
      "Enjoy authentic Ethiopian food in San Jose, CA. Gojo offers vegan-friendly dishes, traditional flavors, and a cozy cultural dining experience.",
    siteName: "Gojo Ethiopian Restaurant",
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
        {/* Local SEO (legacy meta tags) */}
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Jose" />
        <meta name="geo.position" content="37.3269;-121.9119" />
        <meta name="ICBM" content="37.3269, -121.9119" />
        <meta name="geo.streetAddress" content="1261 W San Carlos St" />
        <meta name="geo.postalCode" content="95126" />
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
