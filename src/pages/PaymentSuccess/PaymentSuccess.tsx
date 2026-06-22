import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICONS } from "../../assets";
import { useCreateProductOrderMutation } from "../../redux/Features/ProductOrders/productOrdersApi";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store";
import { useCart } from "../../providers/CartProvider/CartProvider";
import Loader from "../../components/Shared/Loader/Loader";

const PaymentSuccess = () => {
  const { clearCart } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [counter, setCounter] = useState<number | null>(null);
  const [navigatePath, setNavigatePath] = useState<string>("/");
  const hasRun = useRef(false);

  const [createProductOrder, { isLoading: isPlacingOrder }] =
    useCreateProductOrderMutation();

  // Redirect countdown
  useEffect(() => {
    if (counter === null) return;

    const interval = setInterval(() => {
      setCounter((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    const timeout = setTimeout(() => {
      navigate(navigatePath);
    }, counter * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [counter, navigate, navigatePath]);

  // Handle product order creation
  useEffect(() => {
    if (!orderId || hasRun.current) return;
    hasRun.current = true;

    const handleProductOrder = async () => {
      try {
        const productOrderData = localStorage.getItem("productOrderData");

        if (!productOrderData) {
          console.error("No product order data found in localStorage");
          return;
        }

        const parsedData = JSON.parse(productOrderData);

        const response = await createProductOrder(parsedData).unwrap();

        if (response?.success) {
          localStorage.removeItem("productOrderData");
          clearCart();
          await persistor.flush();

          // Start redirect countdown
          setCounter(10);
          setNavigatePath("/dashboard/user/my-orders");
        }
      } catch (error) {
        console.error("Failed to create product order:", error);
      }
    };

    handleProductOrder();
  }, [orderId, createProductOrder, dispatch]);

  return (
    <div className="bg-surface-30 flex items-center justify-center min-h-screen">
      {isPlacingOrder ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center px-4 max-w-md mx-auto">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-primary-5 flex items-center justify-center mb-4">
            <img src={ICONS.tickMark} alt="Success" className="w-8 h-8" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-5 text-center">
            Payment Successful!
          </h1>

          {/* Description */}
          <p className="text-neutral-10 text-sm md:text-base font-medium leading-relaxed mt-3 text-center">
            Your product order has been successfully placed. You can track your
            order status from the dashboard.
          </p>

          {/* Countdown */}
          {counter !== null && (
            <p className="text-neutral-10 text-sm mt-4 text-center">
              You will be redirected to the dashboard in{" "}
              <span className="font-semibold text-primary-5">{counter}</span>{" "}
              second{counter !== 1 && "s"}...
            </p>
          )}

          {/* Manual Navigation Button */}
          <button
            onClick={() => navigate("/dashboard/my-orders")}
            className="mt-6 px-6 py-2.5 bg-primary-5 hover:bg-primary-10 text-white rounded-lg font-medium transition-colors shadow-sm"
          >
            Go to My Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
