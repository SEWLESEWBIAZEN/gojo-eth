import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Gojo Ethiopian Restaurant",
    description: "Authentic Ethiopian cuisine in the heart of the city",
    keywords: ["Ethiopian", "Restaurant", "Cuisine", "Cultural", "Food Gallery"],

};

export default function GalleryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
