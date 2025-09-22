// src/app/layout.tsx
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
  // Primary SEO Metadata
  title: "GojoEthiopia Restaurant San Jose, CA - Authentic Cuisine in San Jose",
  description: "Gojo Ethiopian Restaurant in San Jose offers authentic Ethiopian cuisine, vegan-friendly dishes, and traditional flavors in a warm and cultural dining experience. We are the best Ethiopian restaurant in San Jose. Ethiopian restaurant in San Jose. Authentic Ethiopian food near me. Best vegan Ethiopian restaurant in San Jose.",

  // No need for a keywords meta tag. Search engines largely ignore it.
  // Instead, ensure your description and page content use these keywords naturally.
  // For reference, a good strategy is to use the most important keywords in the description.
  // E.g., "Ethiopian restaurant San Jose", "authentic Ethiopian cuisine", "vegan-friendly dishes".

  // Canonical URL for deduplication
  alternates: {
    canonical: "https://gojoethiopiarestaurantsj.com",
  },
  icons: {
    icon: "/favicon.png", // points to public/favicon.png
  },
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    url: "https://gojoethiopiarestaurantsj.com",
    title: "Gojo Ethiopian Restaurant in San Jose",
    description: "Enjoy authentic Ethiopian food in San Jose. We offer vegan-friendly dishes, traditional flavors, and a cozy cultural dining experience. Call us at (408) 295-9546 to order.",
    siteName: "Gojo Ethiopian Restaurant",
    locale: "en_US",
    images: [
      {
        url: "https://gojoethiopiarestaurantsj.com/bg-new.jpg", // A visually appealing hero image
        width: 1200,
        height: 630,
        alt: "Gojo Ethiopian Restaurant interior and food",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Gojo Ethiopian Restaurant | Best Ethiopian Food in San Jose",
    description: "Find the best authentic Ethiopian food in San Jose, CA. Gojo offers vegan-friendly dishes and a warm cultural dining experience.",
    images: ["https://gojoethiopiarestaurantsj.com/bg-new.jpg"],
  },

  // Robots meta tag. These are the default values, but it's good practice to be explicit.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1, // Allows Google to show more text
      'max-image-preview': 'large',
      'max-video-preview': -1,
    }
  },

  // Schema.org metadata for better search snippet
  verification: {
    google: "IZIuvMqQuBvscZQ7BBzhPtkt_Ha53UqeD8VMVSpwe4Y",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />

        <title className="s123-js-pjax">GOJO ETHIOPIAN RESTAURANT</title>
        <meta property="og:name" className="s123-js-pjax" content="GOJO ETHIOPIA RESTAURANT" />
        <meta property="og:site_name" className="s123-js-pjax" content="GOJO ETHIOPIAN RESTAURANT" />
        <meta property="og:image" content="https://gojoethiopiarestaurantsj.com/bg-new.jpg" className="s123-js-pjax" />
        <meta property="og:see_also" className="s123-js-pjax" content="https://gojoethiopiarestaurantsj.com" />
        <meta itemProp="name" content="GOJO ETHIOPIA RESTAURANT" className="s123-js-pjax" />
        <meta name="robots" content="all" className="s123-js-pjax" />
        {/* JSON-LD Schema.org for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Gojo Ethiopian Restaurant San Jose",
              "logo": "https://gojoethiopiarestaurantsj.com/favicon.png",
              "image": "https://gojoethiopiarestaurantsj.com/bg-new.jpg", // Use a single, high-quality main image
              "url": "https://gojoethiopiarestaurantsj.com/",
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
              "servesCuisine": ["Ethiopian", "Vegan", "Vegetarian", "African","Gojo","cultural"],
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "11:00",
                  "closes": "22:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/people/Gojo-Ethiopian-restaurant/61559731198758/",
                "https://www.instagram.com/explore/locations/124599994303682/gojo-ethiopian-restaurant/"
              ],
              "hasMenu": {
                "@type": "Menu",
                "url": "https://gojoethiopiarestaurantsj.com/#menu" // Link to your menu page
              },
              "acceptsReservations": "True", // Or "True" if applicable
              "aggregateRating": { // Add this section if you have customer reviews
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              },
              "description": "Gojo Ethiopian Restaurant in San Jose, CA. Enjoy authentic Ethiopian cuisine, vegan-friendly dishes, and a traditional dining experience."
            }),
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