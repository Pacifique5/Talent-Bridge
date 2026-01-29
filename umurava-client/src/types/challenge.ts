export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: number;
    targetUrl?: string; // Optional target URL for security challenges
    createdAt: string;
}
