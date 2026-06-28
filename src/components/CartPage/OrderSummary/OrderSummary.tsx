/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FaShieldAlt, FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../redux/Features/Auth/authSlice";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import Drawer from "../../Reusable/Drawer/Drawer";
import type { TAddress } from "../../../types/address.type";
import AddressCard from "../../MyProfilePage/MyAddresses/AddressCard";
import { useGetMyAddressesQuery } from "../../../redux/Features/Address/addressApi";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  useCreateProductOrderMutation,
  useVerifyPaymentMutation,
} from "../../../redux/Features/ProductOrders/productOrdersApi";
import Button from "../../Reusable/Button/Button";
import { useGetRazorpayKeyQuery } from "../../../redux/Features/User/userApi";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type TOrderSummary = {
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
};

const OrderSummary: React.FC<TOrderSummary> = ({
  total,
  subtotal,
  shipping,
  tax,
}) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { cartItems, clearCart } = useCart();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState<boolean>(false);

  const { data: addressesData } = useGetMyAddressesQuery({});
  const { data: razorpayKeyData } = useGetRazorpayKeyQuery({});
  const [createProductOrder] = useCreateProductOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();

  const addresses = addressesData?.data || [];
  const razorpayKey = razorpayKeyData?.key;

  // Check if Razorpay is loaded
  useEffect(() => {
    const checkRazorpay = () => {
      if (window.Razorpay) {
        setIsRazorpayLoaded(true);
        console.log("Razorpay is loaded");
      } else {
        console.log("⏳ Waiting for Razorpay to load...");
        // Check again after 1 second
        setTimeout(checkRazorpay, 1000);
      }
    };

    // Check immediately
    if (window.Razorpay) {
      setIsRazorpayLoaded(true);
      console.log("Razorpay already loaded");
    } else {
      // Wait for Razorpay to load
      checkRazorpay();
    }

    // Also listen for Razorpay loading event
    const handleRazorpayLoad = () => {
      setIsRazorpayLoaded(true);
      console.log("Razorpay loaded via event");
    };

    window.addEventListener("razorpay-loaded", handleRazorpayLoad);

    return () => {
      window.removeEventListener("razorpay-loaded", handleRazorpayLoad);
    };
  }, []);

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  // Open drawer
  const handleOpenDrawer = () => {
    setSelectedAddressId(null);
    setIsDrawerOpen(true);
  };

  // Continue after selecting address
  const handleContinue = async () => {
    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }

    // Check if Razorpay is loaded
    if (!isRazorpayLoaded) {
      toast.error("Payment system is loading. Please wait...");
      return;
    }

    if (!razorpayKey) {
      toast.error("Payment key not found. Please try again.");
      return;
    }

    // Close drawer
    setIsDrawerOpen(false);

    // Small delay to allow drawer close animation
    setTimeout(() => {
      handlePlaceProductOrder();
    }, 300);
  };

  const handlePlaceProductOrder = async () => {
    // Double-check Razorpay is loaded
    if (!isRazorpayLoaded) {
      toast.error("Payment system is not ready. Please refresh and try again.");
      return;
    }

    // Validate user
    if (!user) {
      toast.error("Please login to proceed");
      return;
    }

    // Validate cart
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    // Validate address
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    setIsPlacingOrder(true);

    try {
      // Prepare order items
      const orderedItems = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.basePrice || 0,
      }));

      // Calculate total
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.basePrice || 0) * (item.quantity || 0),
        0,
      );

      // Create order in backend
      const orderResponse = await createProductOrder({
        orderedItems,
        totalAmount: totalAmount,
        addressId: selectedAddressId,
      }).unwrap();

      if (!orderResponse?.success) {
        throw new Error("Failed to create order");
      }

      const { order, razorpayOrder } = orderResponse.data;

      console.log("Order created:", order);
      console.log("Razorpay Order:", razorpayOrder);

      // Open Razorpay Checkout
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Astrotitan",
        description: `Order #${order.orderId}`,
        image: "https://i.ibb.co.com/6JsDTXJh/logo.webp",
        order_id: razorpayOrder.id,
        prefill: {
          name: user.name || "User",
          email: user.email || "",
          contact: user.phoneNumber || "",
        },
        theme: {
          color: "#d4af37",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setIsPlacingOrder(false);
            toast.error("Payment cancelled");
          },
        },
        handler: function (response: any) {
          console.log("Payment success:", response);
          handleVerifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature,
            order._id,
          );
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

      setLoading(false);
      setIsPlacingOrder(false);
    } catch (error: any) {
      console.error("❌ Order creation error:", error);
      toast.error(error?.message || "Failed to place order");
      setLoading(false);
      setIsPlacingOrder(false);
    }
  };

  const handleVerifyPayment = async (
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    orderId: string,
  ) => {
    try {
      const payload = {
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        orderId,
      };
      const response = await verifyPayment(payload).unwrap();
      console.log(response);
      if (response.success) {
        clearCart();
        navigate(`/payment-success?orderId=${orderId}`);
      }
    } catch (error: any) {
      console.error("❌ Payment verification error:", error);
      toast.error("Payment verification failed");
      navigate("/payment-failed");
    } finally {
      setLoading(false);
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
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
        <button
          onClick={handleOpenDrawer}
          disabled={loading || isPlacingOrder}
          className="w-full mt-4 py-3.5 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaShoppingBag className="w-4 h-4" />
          {loading || isPlacingOrder ? "Processing..." : "Proceed to Checkout"}
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

      {/* Address Drawer */}
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        position="left"
        width="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%]"
        bgColor="bg-white"
      >
        <div>
          <h2 className="text-neutral-5/90 font-semibold text-lg leading-snug">
            Select Address
          </h2>
          <div className="space-y-6 mt-6">
            {addresses?.map((address: TAddress) => (
              <AddressCard
                key={address._id}
                address={address}
                isActionButtonVisible={false}
                onSelect={handleSelectAddress}
                isSelected={selectedAddressId === address._id}
                showRadio={true}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Link
              to="/dashboard/user/addresses"
              className="flex items-center gap-2 text-sm font-medium text-primary-5"
            >
              <IoAdd size={18} />
              Add New Address
            </Link>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsDrawerOpen(false)}
                variant="secondary"
                label="Cancel"
                className="py-2"
              />
              <Button
                onClick={handleContinue}
                label="Continue"
                className="py-2"
                isDisabled={!selectedAddressId || loading || isPlacingOrder}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default OrderSummary;
