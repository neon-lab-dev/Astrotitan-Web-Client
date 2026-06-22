
export interface TProductOrderItem {
  productId: string;
  name: string
  quantity: number;
  price: number;
}

export interface TProductOrder {
  _id: string;
  orderId: string;
  userId: string;
  addressId: string;
  orderedItems: TProductOrderItem[];
  totalAmount: number;
  status: "pending" | "shipped" | "cancelled";
  createdAt: string;
  updatedAt: string;
}