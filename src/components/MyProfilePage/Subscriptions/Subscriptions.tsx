import {
  IoCheckmarkCircle,
  IoCloseCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { useGetMySubscriptionQuery } from "../../../redux/Features/Subscription/subscriptionApi";
import { useState } from "react";
import Modal from "../../Reusable/Modal/Modal";
import CancelSubscription from "./CancelSubscription/CancelSubscription";
import { formatDate } from "./../../../utils/formatDate";
import Button from "../../Reusable/Button/Button";
import Plans from "./Plans";
import Loader from "../../Shared/Loader/Loader";

const Subscriptions = () => {
  const { data, isLoading } = useGetMySubscriptionQuery({});
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] =
    useState<boolean>(false);

  const subscription = data?.data || {};

  const isActive =
    subscription?.status === "active" && subscription?.isActive === true;
  const isCancelled = subscription?.status === "cancelled";
  const isExpired =
    subscription?.status === "expired" ||
    (subscription?.endDate &&
      new Date(subscription.endDate) < new Date() &&
      !isCancelled);

  const plans = [
    {
      name: "Basic Plan",
      price: 0,
      duration: "Forever",
      status: "Free Plan",
      isCurrent: true,
      features: [
        "Daily Horoscope Analysis",
        "Basic Kundli Analysis",
        "Unlimited Blog Reading",
        "Basic Remedy Recommendations",
        "Astrologer Recommendations",
      ],
      description: "Perfect for beginners exploring astrology",
    },
    {
      name: "Premium Plus",
      price: 250,
      duration: "per month",
      status: "Upgrade Now",
      isCurrent: false,
      features: [
        "Unlimited Calls & Chats",
        "Direct Consultation Booking",
        "Priority Access to Experts",
        "No Session Time Limits",
        "Advance Kundli Analysis",
        "Exclusive Advanced Remedies",
      ],
      description: "For those seeking deep personal guidance",
      highlight: true,
    },
  ];

  // Active Subscription View
  if (isActive) {
    return isLoading ? (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <>
        <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div>
            <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
              My Subscription
            </h3>
            <p className="text-sm text-neutral-10 font-Satoshi mt-1">
              You have an active Premium Plus subscription
            </p>
          </div>

          <div className="max-w-2xl mx-auto lg:mx-0 mt-8">
            <div className="bg-white rounded-[2.5rem] border-2 border-primary-5 shadow-2xl shadow-primary-5/10 p-8 relative overflow-hidden">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                  <IoCheckmarkCircle size={14} />
                  Active
                </span>
              </div>

              {/* Remaining Days */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-primary-5/10 text-primary-5">
                    <FaCrown size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-neutral-5">
                      Premium Plus
                    </h4>
                    <p className="text-xs text-neutral-10 font-medium">
                      {subscription.remainingDays || 0} days remaining
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-20/30 rounded-2xl mb-6">
                <div>
                  <p className="text-xs text-neutral-10">Start Date</p>
                  <p className="text-sm font-semibold text-neutral-5">
                    {new Date(subscription.startDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-10">End Date</p>
                  <p className="text-sm font-semibold text-neutral-5">
                    {new Date(subscription.endDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-10">Status</p>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold capitalize">
                    <IoCheckmarkCircle size={12} />
                    {subscription.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-neutral-10">Subscription ID</p>
                  <p className="text-sm font-semibold text-neutral-5">
                    {subscription.razorpaySubscriptionId || "N/A"}
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="grid grid-cols-2 space-y-3 mb-6">
                {plans[1].features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <IoCheckmarkCircle
                      className="shrink-0 text-primary-5"
                      size={20}
                    />
                    <span className="text-sm font-Satoshi font-medium text-neutral-10">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setIsCancelSubscriptionModalOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoCloseCircleOutline size={18} />
                Cancel Subscription
              </button>
              <p className="text-xs text-neutral-10 text-center mt-3">
                Your subscription will remain active until the end of the
                billing period.
              </p>
            </div>
          </div>
        </div>
        <Modal
          isModalOpen={isCancelSubscriptionModalOpen}
          setIsModalOpen={setIsCancelSubscriptionModalOpen}
        >
          <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
            Cancel Subscription
          </h2>
          <CancelSubscription
            setIsCancelSubscriptionModalOpen={setIsCancelSubscriptionModalOpen}
          />
        </Modal>
      </>
    );
  }

  // Cancelled Subscription View
  if (isCancelled) {
    return isLoading ? (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            Subscription Cancelled
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Your Premium Plus subscription has been cancelled.
          </p>
        </div>

        <div className="max-w-2xl mx-auto lg:mx-0 mt-8">
          <div className="bg-white rounded-[2.5rem] border border-neutral-20 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <IoWarningOutline className="w-10 h-10 text-primary-5" />
            </div>
            <h4 className="text-xl font-bold text-neutral-5">
              Subscription Cancelled
            </h4>
            <p className="text-sm text-neutral-10 mt-2 max-w-md mx-auto">
              Your Premium Plus subscription has been cancelled. You can
              resubscribe at any time to regain access to premium features.
            </p>
            <div className="mt-4 p-4 bg-neutral-20/30 rounded-xl text-left mb-6">
              <p className="text-xs text-neutral-10">Cancelled on</p>
              <p className="text-sm font-semibold text-neutral-5">
                {formatDate(subscription?.cancelDate)}
              </p>

              <p className="text-xs text-neutral-10 mt-3">Cancelled Reason</p>
              <p className="text-sm font-semibold text-neutral-5">
                {subscription?.cancelReason}
              </p>
            </div>
            <Button label="Resubscribe Now" />
          </div>
        </div>
      </div>
    );
  }

  // Expired Subscription View
  if (isExpired) {
    return isLoading ? (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    ) : (
      <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            Subscription Expired
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Your Premium Plus subscription has expired. Renew to continue
            enjoying premium features.
          </p>
        </div>

        <div className="max-w-2xl mx-auto lg:mx-0 mt-8">
          <div className="bg-white rounded-[2.5rem] border border-neutral-20 p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <IoCloseCircleOutline className="w-10 h-10 text-red-500" />
            </div>
            <h4 className="text-xl font-bold text-neutral-5">
              Your subscription has expired
            </h4>
            <p className="text-sm text-neutral-10 mt-2 max-w-md mx-auto mb-6">
              You no longer have access to premium features. Renew your
              subscription to continue enjoying unlimited calls, chats, and
              priority access.
            </p>
            <Button label="Renew Subscription" />
          </div>
        </div>
      </div>
    );
  }

  // If No Subscription then Showing Plans
  return <Plans plans={plans} />;
};

export default Subscriptions;
