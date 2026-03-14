// Mock data structure tailored to pull from an /assets/couples/ directory in the future.
// In reality, this would dynamically read the directory content or fetch from an API.

export interface CoupleStory {
    id: string;
    name: string;
    category: "Destination" | "Pre-Wedding" | "Traditional";
    date: string;
    location: string;
    coverImage: string; // Used for grid
    heroImage: string; // Used for individual sub-page hero
    gallery: string[]; // masonry grid images
}

export const couples: CoupleStory[] = [
    {
        id: "silvia-and-aitor",
        name: "Silvia & Aitor",
        category: "Destination",
        date: "September 2025",
        location: "Mallorca, Spain",
        coverImage: "/assets/gallery/Destination/silvia-and-aitor/1.webp",
        heroImage: "/assets/gallery/Destination/silvia-and-aitor/1.webp",
        gallery: [
            "/assets/gallery/Destination/silvia-and-aitor/1.webp",
            "/assets/gallery/Destination/silvia-and-aitor/2.webp",
            "/assets/gallery/Destination/silvia-and-aitor/3.webp",
            "/assets/gallery/Destination/silvia-and-aitor/4.webp",
            "/assets/gallery/Destination/silvia-and-aitor/5.webp",
            "/assets/gallery/Destination/silvia-and-aitor/6.webp",
            "/assets/gallery/Destination/silvia-and-aitor/7.webp",
            "/assets/gallery/Destination/silvia-and-aitor/8.webp",
            "/assets/gallery/Destination/silvia-and-aitor/9.webp",
            "/assets/gallery/Destination/silvia-and-aitor/10.webp",
            "/assets/gallery/Destination/silvia-and-aitor/11.webp",
            "/assets/gallery/Destination/silvia-and-aitor/12.webp",
        ]
    },
    {
        id: "tejaswini-and-vaibhav",
        name: "Tejaswini & Vaibhav",
        category: "Pre-Wedding",
        date: "October 2025",
        location: "New Delhi, India",
        coverImage: "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/1.webp",
        heroImage: "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/1.webp",
        gallery: [
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/1.webp",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/2.webp",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/3.webp",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/4.webp",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/5.webp",
        ]
    },
    {
        id: "aishwarya-and-rohan",
        name: "Aishwarya & Rohan",
        category: "Traditional",
        date: "December 2025",
        location: "Mumbai, India",
        coverImage: "/assets/gallery/Traditional/Aishwarya-and-Rohan/1.webp",
        heroImage: "/assets/gallery/Traditional/Aishwarya-and-Rohan/1.webp",
        gallery: [
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/1.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/2.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/3.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/4.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/5.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/6.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/7.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/8.webp",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/9.webp",
        ]
    }
];

export async function getCoupleById(id: string): Promise<CoupleStory | undefined> {
    // Simulate network delay or file system reading
    return new Promise((resolve) => {
        setTimeout(() => resolve(couples.find(c => c.id === id)), 100);
    });
}
