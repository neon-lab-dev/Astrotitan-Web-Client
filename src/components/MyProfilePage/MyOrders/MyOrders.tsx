import { useState } from "react";
import { IoBagHandleOutline, IoFilterOutline } from "react-icons/io5";
import { IMAGES } from "../../../assets";
import MyOrderCard from "./MyOrderCard";

const MyOrders = () => {
  const [filter, setFilter] = useState("All");

  // Mock Data matching your requirements
  const orders = [
    {
      id: "ORD-7721",
      productName: "Natural 5 Mukhi Rudraksha",
      image: IMAGES.remediesImg1,
      date: "Oct 15, 2024",
      status: "pending",
      amount: "₹1,250",
      quantity: 1,
    },
    {
      id: "ORD-5542",
      productName: "Premium Vastu Pyramids (Set of 3)",
      image: IMAGES.remediesImg2,
      date: "Oct 08, 2024",
      status: "shipped",
      amount: "₹3,499",
      quantity: 1,
    },
    {
      id: "ORD-2210",
      productName: "Healing Amethyst Crystal Stone",
      image: IMAGES.remediesImg1,
      date: "Sept 25, 2024",
      status: "cancelled",
      amount: "₹890",
      quantity: 2,
    },
  ];

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter.toLowerCase());

  return (
    <div className="font-Satoshi animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="font-GeneralSans">
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            My Orders
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Track your product orders and delivery status
          </p>
        </div>

        <div className="relative">
          <IoFilterOutline
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-10"
            size={16}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-white border border-neutral-20 rounded-xl text-sm font-semibold text-neutral-5 outline-none focus:border-primary-5 appearance-none cursor-pointer"
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <MyOrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="py-24 text-center bg-white rounded-4xl border border-dashed border-neutral-20">
          <div className="w-16 h-16 bg-neutral-20/30 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-20">
            <IoBagHandleOutline size={30} />
          </div>
          <h4 className="text-lg font-bold text-neutral-5">No orders found</h4>
          <p className="text-neutral-10 text-sm mt-1">
            When you purchase items, they will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
