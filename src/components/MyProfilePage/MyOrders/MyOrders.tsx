import { useState } from "react";
import {
  IoBagHandleOutline,
  IoCalendarOutline,
  IoCubeOutline,
  IoFilterOutline,
} from "react-icons/io5";
import { IMAGES } from "../../../assets";

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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "shipped":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-neutral-20 text-neutral-10 border-neutral-30";
    }
  };

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
          <div
            key={order.id}
            className={`group bg-white border border-neutral-20 rounded-[1.5rem] p-4 md:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20 ${
              order.status === "cancelled" ? "opacity-75" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              {/* Product Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={order.image}
                  alt={order.productName}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-sm border border-neutral-20/50"
                />
                <div
                  className={`absolute -top-2 -left-2 px-2 py-0.5 rounded-lg border text-[9px] font-bold uppercase tracking-wider shadow-sm ${getStatusStyles(order.status)}`}
                >
                  {order.status}
                </div>
              </div>

              {/* Order Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-neutral-5 font-bold text-lg">
                      {order.productName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-[10px] font-medium text-neutral-10 tracking-[0.15em]">
                      ID: {order.id}
                      <span className="w-1 h-1 rounded-full bg-neutral-20" />
                      Qty: {order.quantity}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                  <div className="flex items-center gap-1.5 text-neutral-10 bg-neutral-20/30 px-2.5 py-1 rounded-lg">
                    <IoCalendarOutline className="text-primary-10" size={14} />
                    <span className="text-xs font-semibold font-Satoshi">
                      {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-10 bg-neutral-20/30 px-2.5 py-1 rounded-lg">
                    <IoCubeOutline className="text-primary-10" size={14} />
                    <span className="text-xs font-semibold font-Satoshi capitalize">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action & Price Side */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto md:border-l md:border-neutral-20 md:pl-6 gap-3">
                <div className="text-right">
                  <p className="text-neutral-10 font-medium mb-0.5">
                    Total Amount
                  </p>
                  <p className="text-xl font-bold text-neutral-5">
                    {order.amount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[2rem] border border-dashed border-neutral-20">
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
