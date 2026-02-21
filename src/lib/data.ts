// Mock data structure tailored to pull from an /assets/couples/ directory in the future.
// In reality, this would dynamically read the directory content or fetch from an API.

export interface CoupleStory {
    id: string;
    name: string;
    category: "Luxury Wedding" | "Destination Elopement" | "Pre-Wedding Editorial";
    date: string;
    location: string;
    coverImage: string; // Used for grid
    heroImage: string; // Used for individual sub-page hero
    gallery: string[]; // masonry grid images
}

export const couples: CoupleStory[] = [
    {
        id: "aanya-rohan",
        name: "Aanya & Rohan",
        category: "Luxury Wedding",
        date: "September 2025",
        location: "Udaipur, India",
        coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1920&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=800&auto=format&fit=crop",
        ]
    },
    {
        id: "priya-aryan",
        name: "Priya & Aryan",
        category: "Pre-Wedding Editorial",
        date: "October 2025",
        location: "Jaipur, India",
        coverImage: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=800&auto=format&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1515516089376-88db1e26e974?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800&auto=format&fit=crop",
        ]
    },
    {
        id: "kavya-arjun",
        name: "Kavya & Arjun",
        category: "Destination Elopement",
        date: "August 2025",
        location: "Goa, India",
        coverImage: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=800&auto=format&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1920&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505944357431-27579db47558?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
        ]
    },
    {
        id: "chloe-james",
        name: "Chloe & James",
        category: "Luxury Wedding",
        date: "December 2025",
        location: "Santorini, Greece",
        coverImage: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
        heroImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1505944357431-27579db47558?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=800&auto=format&fit=crop",
        ]
    }
];

export async function getCoupleById(id: string): Promise<CoupleStory | undefined> {
    // Simulate network delay or file system reading
    return new Promise((resolve) => {
        setTimeout(() => resolve(couples.find(c => c.id === id)), 100);
    });
}
