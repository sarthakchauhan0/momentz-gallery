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
        coverImage: "/assets/gallery/Destination/Silvia-and-Aitor/IMG_4544.jpg",
        heroImage: "/assets/gallery/Destination/Silvia-and-Aitor/IMG_4544.jpg",
        gallery: [
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18142.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18215.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18232.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18242.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18252.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18308.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18311.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18313.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18327.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18376.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18400.jpg",
            "/assets/gallery/Destination/Silvia-and-Aitor/_AN18401.jpg",
        ]
    },
    {
        id: "tejaswini-and-vaibhav",
        name: "Tejaswini & Vaibhav",
        category: "Pre-Wedding",
        date: "October 2025",
        location: "New Delhi, India",
        coverImage: "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/03a.jpg",
        heroImage: "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/03a.jpg",
        gallery: [
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/03a.jpg",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/04.jpg",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/05.jpg",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/06.jpg",
            "/assets/gallery/Pre-Wedding/Tejaswini-and-Vaibhav/07.jpg",
        ]
    },
    {
        id: "aishwarya-and-rohan",
        name: "Aishwarya & Rohan",
        category: "Traditional",
        date: "December 2025",
        location: "Mumbai, India",
        coverImage: "/assets/gallery/Traditional/Aishwarya-and-Rohan/02.jpg",
        heroImage: "/assets/gallery/Traditional/Aishwarya-and-Rohan/02.jpg",
        gallery: [
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/02.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/10.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/11.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/13.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/14.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/15.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/27.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/29.jpg",
            "/assets/gallery/Traditional/Aishwarya-and-Rohan/33.jpg",
        ]
    }
];

export async function getCoupleById(id: string): Promise<CoupleStory | undefined> {
    // Simulate network delay or file system reading
    return new Promise((resolve) => {
        setTimeout(() => resolve(couples.find(c => c.id === id)), 100);
    });
}
