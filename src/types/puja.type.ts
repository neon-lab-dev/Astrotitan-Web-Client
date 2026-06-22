
export type TPujaReview = {
  user: string;
  review: string;
  rating: number;
  images: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type TPuja = {
  _id: string;
  name: string;
  intent: string;
  category: string;
  description: string;
  imageUrls: string[];
  rating?: number;
  reviews: TPujaReview[];
  basePrice: number;
  discountedPrice?: number;
  targetAudience: string;
  howThisPujaPerformed: string;
  createdAt: string;
  updatedAt?: string;
};