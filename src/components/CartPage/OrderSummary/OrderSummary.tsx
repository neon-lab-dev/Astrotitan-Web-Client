import { FaShieldAlt, FaShoppingBag } from "react-icons/fa";

type TOrderSummary = {
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
}
const OrderSummary: React.FC<TOrderSummary> = ({ total, subtotal, shipping, tax }) => {
  return (
    <div className="lg:w-[35%] bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4 h-fit">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      {/* Price Breakdown */}
      <div className="space-y-3 py-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18%)</span>
          <span className="font-medium text-gray-900">
            ₹{tax.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-primary-5">
          ₹{total.toLocaleString()}
        </span>
      </div>

      {/* Checkout Button */}
      <button className="w-full mt-4 py-3.5 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
        <FaShoppingBag className="w-4 h-4" />
        Proceed to Checkout
      </button>

      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <FaShieldAlt className="w-3.5 h-3.5 text-primary-5" />
          <span>Secure Payment</span>
        </div>
        <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-primary-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>UPI</span>
        </div>
        <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-primary-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>PhonePe</span>
        </div>
        <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
        <div className="flex items-center gap-1.5">
          <svg
            className="w-3.5 h-3.5 text-primary-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>Paytm</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
