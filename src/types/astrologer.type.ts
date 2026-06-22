
export type TAstrologerReview = {
    user: {
        profilePicture?: string;
        firstName: string;
        lastName: string;
    };
    review: string;
    rating: number;
    createdAt: string;
};

export type TAstrologer = {
    _id: string;
    accountId?: string;
    profilePicture?: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    phoneNumber?: string;
    gender: string;
    consultLanguages: string[];
    areaOfPractice: string[];
    experience: "1" | "2" | "3" | "4" | "5" | "5+" | "10+" | "15+" | "20+";
    bio?: string;
    country: string;
    identity: {
        identityType: "aadharCard" | "panCard";
        frontSide: string;
        backSide: string;
        status: "pending" | "approved" | "rejected";
        rejectedReason?: string;
    }
    isIdentityVerified: boolean;
    isProfileCompleted: boolean;
    rating?: number;
    reviews?: TAstrologerReview[];
    availability?: {
        availableDays: string[];
        availableTime: {
            startTime: string;
            endTime: string;
        };
    };
};
