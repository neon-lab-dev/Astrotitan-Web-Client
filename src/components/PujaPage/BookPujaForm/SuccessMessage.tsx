import { Link } from "react-router-dom";
import Button from "../../Reusable/Button/Button";

const SuccessMessage = () => {
  return (
    <div className="flex flex-col items-center text-center py-10">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-4">
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
        Puja Booked Successfully! 🎉
      </h3>

      {/* Description */}
      <p className="text-neutral-10 font-GeneralSans text-sm mt-3 max-w-sm mb-8">
        Our team will reach out to you within 24 hours with further details.
      </p>

      <Link to="/dashboard/user/puja-bookings">
        <Button label="View My Bookings" className="text-sm 2xl:text-sm" />
      </Link>
    </div>
  );
};

export default SuccessMessage;
