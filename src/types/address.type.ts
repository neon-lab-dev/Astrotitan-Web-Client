
export type TAddress = {
  _id: string;
  userId: string;
  type: "home" | "office" | "other";
  fullName: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  createdAt?: string;
  updatedAt?: string;
};