import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ICONS } from "../../assets";
import { persistor } from "../../redux/store";
import { useCart } from "../../providers/CartProvider/CartProvider";
import Loader from "../../components/Shared/Loader/Loader";
import { useGetOrderStatusQuery } from "../../redux/Features/ProductOrders/productOrdersApi";

const PaymentSuccess = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [counter, setCounter] = useState<number | null>(null);
  const [navigatePath, setNavigatePath] = useState<string>("/");
  const hasRun = useRef(false);

  // Get order status
  const { data: orderData, isLoading: isOrderLoading } = useGetOrderStatusQuery(
    orderId,
    { skip: !orderId },
  );

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

  // Clear cart and redirect
  useEffect(() => {
    if (orderData?.data?.paymentStatus === "paid" && !hasRun.current) {
      hasRun.current = true;
      clearCart();
      persistor.flush();

      // Start redirect countdown
      setCounter(10);
      setNavigatePath("/dashboard/user/my-orders");
    }
  }, [orderData, clearCart]);

  if (isOrderLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-surface-30 flex items-center justify-center min-h-screen">
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

        {/* Order ID */}
        {orderId && (
          <p className="text-neutral-10 text-sm mt-2 text-center">
            Order ID:{" "}
            <span className="font-semibold text-primary-5">{orderId}</span>
          </p>
        )}

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
          onClick={() => navigate("/dashboard/user/my-orders")}
          className="mt-6 px-6 py-2.5 bg-primary-5 hover:bg-primary-10 text-white rounded-lg font-medium transition-colors shadow-sm"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
