import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "Gojo Ethiopian Restaurant",
  description: "Authentic Ethiopian cuisine in the heart of the city",
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
      </body>
    </html>
  );
}
