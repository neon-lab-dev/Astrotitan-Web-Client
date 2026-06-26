import Modal from "../../Reusable/Modal/Modal";
import { FaCrown } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
const SubscriptionWarningModal = ({
  isSubscriptionWarningModalOpen,
  setIsSubscriptionWarningModalOpen,
}: {
  isSubscriptionWarningModalOpen: boolean;
  setIsSubscriptionWarningModalOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  const features = [
    "Unlimited Calls & Chats",
    "Direct Consultation Booking",
    "Priority Access to Experts",
    "No Session Time Limits",
    "Advance Kundli Analysis",
    "Exclusive Advanced Remedies",
  ];
  return (
    <Modal
      isModalOpen={isSubscriptionWarningModalOpen}
      setIsModalOpen={setIsSubscriptionWarningModalOpen}
    >
      <div className="flex flex-col items-center text-center py-4">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-4">
          <FaCrown className="w-10 h-10 text-amber-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-neutral-5 font-Satoshi">
          Premium Subscription Required
        </h2>

        {/* Description */}
        <p className="text-neutral-10 text-sm mt-3 max-w-sm font-GeneralSans leading-relaxed">
          You need a Premium subscription to book consultations with
          astrologers. Upgrade now to unlock unlimited calls, chats, and
          priority access to experts.
        </p>

        {/* Feature List */}
        <div className="w-full mt-4 p-4 bg-neutral-20/30 rounded-xl text-left space-y-2">
          <p className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">
            ✦ Premium Benefits:
          </p>
          <ul className="space-y-1.5">
            {features?.map((feature) => (
              <li className="flex items-center gap-2 text-sm text-neutral-10">
                <span className="text-primary-5">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
          <button
            onClick={() => setIsSubscriptionWarningModalOpen(false)}
            className="flex-1 px-4 py-2.5 border border-neutral-20 hover:bg-neutral-20/50 text-neutral-10 rounded-xl font-medium transition-colors text-sm"
          >
            Cancel
          </button>
          <Link
            to={"/dashboard/user/subscriptions"}
            className="flex-1 px-4 py-2.5 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-medium transition-colors text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            View Plans
            <IoArrowForward className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionWarningModal;
