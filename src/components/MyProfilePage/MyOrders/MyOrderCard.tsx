import { IoCalendarOutline, IoCubeOutline } from "react-icons/io5";

const MyOrderCard = ({ order }) => {
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
    <div
      className={`group bg-white border border-neutral-20 rounded-3xl p-4 md:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20 ${
        order.status === "cancelled" ? "opacity-75" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
        {/* Product Image */}
        <div className="relative shrink-0">
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
              <h4 className="text-lg font-semibold text-neutral-5">
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
            <p className="text-neutral-10 font-medium mb-0.5">Total Amount</p>
            <p className="text-xl font-bold text-neutral-5">{order.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
