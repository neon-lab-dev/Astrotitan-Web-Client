/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  IoCalendarOutline,
  IoChevronDown,
  IoChevronUp,
  IoBagOutline,
} from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import type { TProductOrder } from "../../../types/productOrder.type";

const MyOrderCard = ({ order }: { order: TProductOrder }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "shipped":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "delivered":
        return "bg-green-50 text-green-600 border-green-100";
      case "cancelled":
        return "bg-red-50 text-red-600 border-red-100";
      default:
        return "bg-neutral-20 text-neutral-10 border-neutral-30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status || "Unknown";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "shipped":
        return "🚚";
      case "delivered":
        return "✅";
      case "cancelled":
        return "❌";
      default:
        return "📦";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const itemCount = order?.orderedItems?.length || 0;

  return (
    <div
      className={`group bg-white border border-neutral-20 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20 ${
        order.status === "cancelled" ? "opacity-75" : ""
      }`}
    >
      {/* Order Header - Always Visible */}
      <div
        className="p-4 md:p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Order Icon */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary-5/10 flex items-center justify-center border border-primary-5/20">
              <IoBagOutline className="w-8 h-8 text-primary-5" />
            </div>
            <div
              className={`absolute -top-2 -left-2 px-2.5 py-0.5 rounded-lg border text-[9px] font-bold uppercase tracking-wider shadow-sm ${getStatusStyles(order.status)}`}
            >
              {getStatusLabel(order.status)}
            </div>
          </div>

          {/* Order Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold text-neutral-5">
                  Order #{order.orderId || order._id?.slice(-8).toUpperCase()}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-[10px] font-medium text-neutral-10 tracking-[0.15em]">
                  <span>Items: {itemCount}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-20" />
                  <span className="flex items-center gap-0.5">
                    <FaRupeeSign className="w-3 h-3" />
                    {order.totalAmount?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2">
              <div className="flex items-center gap-1.5 text-neutral-10 bg-neutral-20/30 px-2.5 py-1 rounded-lg">
                <IoCalendarOutline className="text-primary-10" size={14} />
                <span className="text-xs font-semibold font-Satoshi">
                  {formatDate(order.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-10 bg-neutral-20/30 px-2.5 py-1 rounded-lg">
                <span className="text-sm">{getStatusIcon(order.status)}</span>
                <span className="text-xs font-semibold font-Satoshi capitalize">
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 hover:bg-neutral-20 rounded-lg transition-all flex items-center gap-1 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              Details
              {isExpanded ? (
                <IoChevronUp className="w-5 h-5 text-neutral-10/70" />
              ) : (
                <IoChevronDown className="w-5 h-5 text-neutral-10/70" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Content - Shows all products */}
      {isExpanded && (
        <div className="border-t border-neutral-20 bg-neutral-20/10 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-neutral-5">
              Order Items
            </span>
            <span className="text-xs text-neutral-10/70">
              ({itemCount} items)
            </span>
          </div>

          <div className="space-y-3">
            {order?.orderedItems?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-2xl p-3 border border-neutral-20 hover:border-primary-5/20 transition-all"
              >
                <img
                  src={
                    item?.productId?.imageUrls?.[0] ||
                    "https://via.placeholder.com/64"
                  }
                  alt={item?.name || "Product"}
                  className="w-16 h-16 rounded-xl object-cover border border-neutral-20"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-neutral-5">
                    {item?.name || "Product"}
                  </h5>
                  <div className="flex items-center gap-3 mt-1 text-xs text-neutral-10/70">
                    <span>Qty: {item?.quantity || 1}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-20" />
                    <span className="flex items-center gap-0.5">
                      <FaRupeeSign className="w-3 h-3" />
                      {item?.price?.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-5">
                    ₹{(item?.price || 0) * (item?.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Footer */}
          <div className="mt-4 pt-4 border-t border-neutral-20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-xs text-neutral-10/70">
              <span>Order Placed: {formatDate(order.createdAt)}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-20" />
              <span className="text-green-500">Paid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-10/70">Total:</span>
              <span className="text-sm font-semibold text-neutral-5">
                ₹{order.totalAmount?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrderCard;
