/* eslint-disable @typescript-eslint/no-explicit-any */

export type TPujaBooking = {
  _id: string;
  userId: any;
  name: string;
  phoneNumber: string;
  pujaId: {
    name: string;
  };
  preferredDate: string;
  purposeOfPuja: string;
  status: "pending" | "contacted" | "booked" | "notInterested";
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
};