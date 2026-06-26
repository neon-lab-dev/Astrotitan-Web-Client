/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import {
  IoCheckmarkCircle,
  IoDiamondOutline,
  IoFlashOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { useGetRazorpayKeyQuery } from "../../../redux/Features/User/userApi";
import { useSelector } from "react-redux";
import {
  useCurrentUser,
  type TLoggedInUser,
} from "../../../redux/Features/Auth/authSlice";
import toast from "react-hot-toast";
import {
  useCreateRazorpayOrderMutation,
  usePurchaseSubscriptionMutation,
} from "../../../redux/Features/Subscription/subscriptionApi";
import { useNavigate } from "react-router-dom";

const Plans = ({plans} : {plans:any}) => {
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as TLoggedInUser;
  const [loading, setLoading] = useState<boolean>(false);
  const { data: apiKey } = useGetRazorpayKeyQuery({});
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [purchaseSubscription] = usePurchaseSubscriptionMutation();

  const handleCheckoutSubscription = async () => {
    if (!user) {
      toast.error("Please login to proceed");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order (not subscription yet)
      const response = await createRazorpayOrder({
        amount: 250,
      }).unwrap();

      const orderData = response?.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: apiKey?.key,
        amount: orderData.amount,
        currency: "INR",
        name: "Astrotitan",
        description: "Premium Subscription Membership",
        image: "https://i.ibb.co/0jpqmJzJ/logo.png",
        order_id: orderData.id,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phoneNumber,
        },
        theme: { color: "#d4af37" },
        // Step 3: Handle payment success
        handler: function (response: any) {
          console.log(response);
          // Payment successful - now create subscription
          handlePaymentSuccess();
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Failed to initiate payment");
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      await purchaseSubscription({

      }).unwrap();

      toast.success("Subscription activated successfully!");
      // Redirect or refresh
      navigate("/dashboard/user/subscriptions");
    } catch (error) {
      console.error("Failed to activate subscription:", error);
      toast.error(
        "Payment successful but subscription activation failed. Please contact support.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
          Subscription Plans
        </h3>
        <p className="text-sm text-neutral-10 font-Satoshi mt-1">
          Choose a plan that fits your spiritual journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto lg:mx-0 mt-12">
        {plans.map((plan:any, index:number) => (
          <div
            key={index}
            className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 ${
              plan.highlight
                ? "bg-white border-2 border-primary-5 shadow-2xl shadow-primary-5/10 scale-105 z-10"
                : "bg-white border border-neutral-20 hover:border-neutral-30"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-5 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg">
                Recommended
              </div>
            )}

            <div className="flex justify-between items-start mb-6">
              <div>
                <h4
                  className={`text-xl font-bold ${plan.highlight ? "text-primary-10" : "text-neutral-5"}`}
                >
                  {plan.name}
                </h4>
                <p className="text-xs text-neutral-10 font-medium mt-1 uppercase tracking-widest">
                  {plan.description}
                </p>
              </div>
              <div
                className={`p-3 rounded-2xl ${plan.highlight ? "bg-primary-5/10 text-primary-5" : "bg-neutral-20/50 text-primary-5"}`}
              >
                {plan.highlight ? (
                  <FaCrown size={24} />
                ) : (
                  <IoShieldCheckmarkOutline size={24} />
                )}
              </div>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-neutral-5">
                ₹{plan.price}
              </span>
              <span className="text-neutral-10 text-sm ml-2 font-medium">
                / {plan.duration}
              </span>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature:string, index:number) => (
                <li key={index} className="flex items-center gap-3">
                  <IoCheckmarkCircle
                    className={`shrink-0 ${plan.highlight ? "text-primary-5" : "text-green-500/60"}`}
                    size={20}
                  />
                  <span className="text-sm font-Satoshi font-medium text-neutral-10 italic">
                    {feature}
                  </span>
                </li>
              ))}
              {plan.highlight && (
                <li className="flex items-center gap-3">
                  <IoFlashOutline
                    className="text-primary-5 animate-pulse"
                    size={20}
                  />
                  <span className="text-sm font-Satoshi font-bold text-primary-10">
                    24/7 Priority Support
                  </span>
                </li>
              )}
            </ul>

            {/* Action Button */}
            <button
              onClick={() => handleCheckoutSubscription()}
              disabled={plan.isCurrent}
              className={`w-full py-4 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                plan.isCurrent
                  ? "bg-white text-primary-5 cursor-default border border-neutral-20"
                  : "bg-primary-5 text-white hover:bg-primary-5 shadow-lg shadow-slate-900/10 hover:shadow-primary-5/20 active:scale-95"
              }`}
            >
              {plan.isCurrent && <IoCheckmarkCircle size={18} />}
              {plan.status}
              {!plan.isCurrent && (
                <IoDiamondOutline className="ml-1" size={16} />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
