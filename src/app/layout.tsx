import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AnimationWrapper } from "@/components/layout/AnimationWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
      <body className="font-sans min-h-screen flex flex-col antialiased">
        <Navbar />
        <AnimationWrapper>
          <main className="flex-grow">{children}</main>
        </AnimationWrapper>
        <Footer />
      </body>
    </html>
  );
}
