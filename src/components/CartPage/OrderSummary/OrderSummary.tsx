import { useState } from "react";
import { FaShieldAlt, FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useCurrentUser, type TLoggedInUser } from "../../../redux/Features/Auth/authSlice";
import { useCart } from "../../../providers/CartProvider/CartProvider";
import Drawer from "../../Reusable/Drawer/Drawer";
import type { TAddress } from "../../../types/address.type";
import AddressCard from "../../MyProfilePage/MyAddresses/AddressCard";
import { useGetMyAddressesQuery } from "../../../redux/Features/Address/addressApi";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { backendBaseUrl } from "../../../redux/Api/baseApi";
import { useGetRazorpayKeyQuery } from "../../../redux/Features/User/userApi";
import toast from "react-hot-toast";
import { useProductCheckoutMutation } from "../../../redux/Features/ProductOrders/productOrdersApi";
import Button from "../../Reusable/Button/Button";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { cartItems } = useCart();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const { data } = useGetMyAddressesQuery({});
  const addresses = data?.data || [];
  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [productCheckout] = useProductCheckoutMutation();

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    console.log("Selected Address ID:", id);
  };

  const totalToPay = cartItems.reduce(
    (sum, item) => sum + item?.basePrice * item?.quantity,
    0,
  );

  const handlePlaceProductOrder = async () => {
    setIsDrawerOpen(true);
    if (!selectedAddressId) {
      return;
    } else {
      setIsDrawerOpen(false);
    }
    if (!user) {
      toast.error("Please login to proceed");
      // dispatch(openModal("login"));
      // dispatch(setRedirectPath("/cart"));
      return;
    }

    if (cartItems?.length < 1) {
      toast.error("Cart is empty");
      return;
    }
    setLoading(true);

    const payload = {
      amount: totalToPay,
    };

    let response;
    try {
      response = await productCheckout(payload).unwrap();
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    try {
      const options = {
        key: apiKey?.key,
        amount: response?.data?.amount,
        currency: "INR",
        name: "Astrotitan",
        description: "Test Transaction",
        image: "https://i.ibb.co/0jpqmJzJ/logo.png",
        order_id: response?.data?.id,
        callback_url: `${backendBaseUrl}/api/v1/product-order/verify-payment`,
        prefill: {
          name: user?.name,
          email: user?.email,
          userId: user?._id,
        },
        theme: { color: "#3b82f6" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      const orderedItems = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.basePrice,
      }));

      const productOrderData = {
        orderedItems,
        totalAmount: totalToPay,
        addressId: selectedAddressId,
      };

      localStorage.setItem(
        "productOrderData",
        JSON.stringify(productOrderData),
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
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
          onClick={handlePlaceProductOrder}
          className="w-full mt-4 py-3.5 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <FaShoppingBag className="w-4 h-4" />
          {loading ? "Please wait..." : <span>Proceed to Checkout</span>}
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
                onClick={handlePlaceProductOrder}
                label="Continue"
                className="py-2"
                isDisabled={!selectedAddressId}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default OrderSummary;
