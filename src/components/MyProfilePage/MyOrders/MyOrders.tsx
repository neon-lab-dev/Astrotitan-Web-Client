import { useState } from "react";
import { IoBagHandleOutline, IoFilterOutline } from "react-icons/io5";
import MyOrderCard from "./MyOrderCard";
import { useGetMyProductOrdersQuery } from "../../../redux/Features/ProductOrders/productOrdersApi";
import type { TProductOrder } from "../../../types/productOrder.type";
import Loader from "../../Shared/Loader/Loader";

const MyOrders = () => {
  const [status, setStatus] = useState("All");
  const { data, isLoading } = useGetMyProductOrdersQuery({ status });

  const orders = data?.data?.orders || [];

  if (isLoading) {
    return (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="font-Satoshi animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header with Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="font-GeneralSans">
          <h3 className="text-xl md:text-2xl font-semibold text-neutral-5/80 tracking-tight">
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-white border border-neutral-20 rounded-xl text-sm font-semibold text-neutral-5 outline-none focus:border-primary-5 appearance-none cursor-pointer"
          >
            <option value="All">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders?.map((order: TProductOrder) => (
          <MyOrderCard key={order?._id} order={order} />
        ))}
      </div>

      {/* Empty State */}
      {orders?.length === 0 && (
        <div className="py-24 text-center bg-white rounded-4xl border border-dashed border-neutral-20">
          <div className="w-16 h-16 bg-primary-5 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-20">
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
