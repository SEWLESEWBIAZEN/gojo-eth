import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700"], // optional: specify weights you want
});

export const metadata: Metadata = {
  title: "Sign Up | GojoEthiopia Restaurant San Jose",
  description:
    "Create your GojoEthiopia account to join our community, explore exclusive offers, manage reservations, and enjoy authentic Ethiopian dining in San Jose.",
  keywords: [
    "GojoEthiopia Sign Up",
    "GojoEthiopia Register",
    "Create GojoEthiopia Account",
    "Join GojoEthiopia",
    "GojoEthiopia Reservations",
    "GojoEthiopia San Jose",
    "GojoEthiopia Restaurant",
    "Ethiopian Restaurant San Jose",
    "Best Ethiopian Restaurant San Jose",
    "Authentic Ethiopian Cuisine",
    "GojoEthiopia Member Registration",
    "GojoEthiopia Dining Experience"
  ],
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${inter.variable} font-sans`}>{children}</div>;
}
