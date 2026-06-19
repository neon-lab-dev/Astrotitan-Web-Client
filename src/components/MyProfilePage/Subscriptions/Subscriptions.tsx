import {
  IoCheckmarkCircle,
  IoFlashOutline,
  IoShieldCheckmarkOutline,
  IoDiamondOutline,
} from "react-icons/io5";
import { FaCrown } from "react-icons/fa";

const Subscriptions = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "₹0",
      duration: "Forever",
      status: "Current Plan",
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
      price: "₹999",
      duration: "per month",
      status: "Upgrade Now",
      isCurrent: false,
      features: [
        "Unlimited Calls & Chats",
        "Direct Consultation Booking",
        "Priority Access to Experts",
        "No Session Time Limits",
        "Exclusive Advanced Remedies",
      ],
      description: "For those seeking deep personal guidance",
      highlight: true,
    },
  ];

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
        {plans.map((plan, index) => (
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
                {plan.price}
              </span>
              <span className="text-neutral-10 text-sm ml-2 font-medium">
                / {plan.duration}
              </span>
            </div>

            {/* Feature List */}
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
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

export default Subscriptions;
