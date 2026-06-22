
export type TProduct = {
  _id: string;
  name: string;
  intent: string;
  category: string;
  description: string;
  quantity: number;
  imageUrls: string[];
  rating?: number;
  reviews?: {
    user: string;
    review: string;
    rating: number;
    images: string[];
  }[];
  basePrice: number;
  discountedPrice?: number;
  whyThisWork: string;
  targetAudience: string;
  howToUse: string;
  createdAt?: Date;
  updatedAt?: Date;
};