import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "Gojo Ethiopian Restaurant",
  description: "Authentic Ethiopian cuisine in the heart of the city",
  keywords: ["Ethiopian", "Restaurant", "Cuisine","Cultural", "Food Gallery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-slate-100">
        {children}
         <Toaster position="top-right" richColors/>
      </body>
    </html>
  );
}
