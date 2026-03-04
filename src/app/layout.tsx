import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PersistentOverlay } from "@/components/layout/PersistentOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: "Momentz Gallery",
  description: "High-end, editorial, and cinematic couple photography.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans min-h-screen flex flex-col antialiased cursor-none">
        <CustomCursor />
        <PersistentOverlay />
        {children}
      </body>
    </html>
  );
}
