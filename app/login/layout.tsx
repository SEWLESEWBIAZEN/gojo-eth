import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "Login | GojoEthiopia Restaurant San Jose",
  description:
    "Access your GojoEthiopia account to explore exclusive offers, manage reservations, and stay connected with San Jose’s authentic Ethiopian dining experience.",
  keywords: [
    "GojoEthiopia Login",
    "GojoEthiopia Account",
    "GojoEthiopia Reservations",
    "GojoEthiopia San Jose",
    "GojoEthiopia Restaurant",
    "Ethiopian Restaurant San Jose",
    "Best Ethiopian Restaurant San Jose",
    "Authentic Ethiopian Cuisine",
    "GojoEthiopia Member Access",
    "GojoEthiopia Dining Experience"
  ],
};


export default function LoginLayout({
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
