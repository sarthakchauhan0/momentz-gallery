import { AnimationWrapper } from "@/components/layout/AnimationWrapper";

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AnimationWrapper>
            <main className="flex-grow">{children}</main>
        </AnimationWrapper>
    );
}
