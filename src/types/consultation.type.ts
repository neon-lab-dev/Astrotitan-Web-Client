
export type TConsultation = {
    _id: string;
    user: string;           // User who requested
    astrologer:
    {
        accountId: string;
        displayName: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
        _id: string
    }      // Astrologer who received the request
    method: "chat" | "call";         // Consultation method
    status: "pending" | "accepted" | "declined" | "ended";
    consultationFor: string;
    acceptedAt?: string;
    declinedAt?: string;
    endedAt?: string;
    // endedBy?: "user" | "astrologer";
    startedAt?: string;                // When chat actually started
    duration?: number;               // Duration in minutes (for call)
    rating?: number;
    review?: string;
    createdAt?: string;
    updatedAt?: string;
};