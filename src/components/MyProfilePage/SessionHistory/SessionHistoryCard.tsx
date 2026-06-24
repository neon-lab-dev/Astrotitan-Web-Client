/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoHourglassOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import type { TConsultation } from "../../../types/consultation.type";

const SessionHistoryCard = ({ booking }: { booking: TConsultation }) => {
  console.log(booking);
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-50 text-green-600 border-green-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "ended":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-neutral-20 text-neutral-10 border-neutral-30";
    }
  };
  return (
    <div
      key={booking?._id}
      className={`group relative bg-white border border-primary-5/30 rounded-3xl p-4 md:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-20/40 hover:border-primary-5/20`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        {/* Consultant Photo + Status Badge */}
        <div className="relative shrink-0">
          <img
            src={booking?.astrologer?.profilePicture}
            alt={booking?.astrologer?.displayName}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm ring-2 ring-transparent group-hover:ring-primary-5/10 transition-all"
          />
          <div
            className={`absolute -top-2 -left-2 px-2 py-0.5 rounded-lg border text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${getStatusStyles(booking.status)}`}
          >
            {booking?.status === "pending" && <IoHourglassOutline size={10} />}
            {booking?.status}
          </div>
        </div>

        {/* Booking Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-neutral-5">
                {booking?.astrologer?.displayName}
              </h4>
              <p className="text-sm text-neutral-10 font-Satoshi truncate max-w-62 md:max-w-md">
                <span className="text-neutral-10">Purpose:</span>{" "}
                {booking?.consultationFor}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4">
            <div className="flex items-center gap-1.5 text-neutral-10 bg-neutral-20/30 px-2.5 py-1 rounded-lg">
              <IoCalendarOutline className="text-neutral-5" size={14} />
              <span className="text-xs font-semibold font-Satoshi">
                {formatDate(booking?.createdAt as string)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-neutral-25 uppercase tracking-widest ml-auto">
              ID: {booking?._id}
            </span>
          </div>
        </div>

        {/* Actions Side */}
        <div className="flex md:flex-col gap-2 md:border-l md:border-neutral-20 md:pl-5 min-w-37">
          {/* Logic for Accepted and Ended (Both show Chat Now) */}
          {(booking?.status === "accepted" || booking?.status === "ended") && (
            <Link
              to={`/dashboard/user/chat/${booking?._id}`}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all 
        ${
          booking?.status === "accepted"
            ? "bg-primary-5 text-white shadow-lg shadow-primary-5/20 hover:bg-primary-10 active:scale-95 cursor-pointer"
            : "bg-neutral-20/40 text-neutral-25 border border-neutral-20 cursor-not-allowed opacity-70"
        }`}
            >
              <IoChatbubblesOutline size={18} />
              Chat Now
            </Link>
          )}

          {/* Logic for Pending */}
          {booking?.status === "pending" && (
            <div className="w-full py-3 bg-neutral-20/20 text-neutral-25 rounded-xl text-sm font-bold text-center cursor-default border border-dashed border-neutral-20">
              Awaiting...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistoryCard;
