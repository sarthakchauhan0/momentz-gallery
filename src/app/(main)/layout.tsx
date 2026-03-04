import { AnimationWrapper } from "@/components/layout/AnimationWrapper";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <AnimationWrapper>
                <main className="flex-grow">{children}</main>
            </AnimationWrapper>
            <Footer />
        </>
    );
}
