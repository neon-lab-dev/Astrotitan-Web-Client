import {
  IoCalendarOutline,
  IoChatbubblesOutline,
  IoHourglassOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import type { TConsultation } from "../../../types/consultation.type";
import { useDispatch } from "react-redux";
import { setSelectedConsultation } from "../../../redux/Features/Consultation/consultationChatSlice";

const SessionHistoryCard = ({ booking }: { booking: TConsultation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChatNow = () => {
    // ✅ Get the other participant - the ASTROLOGER (not the user)
    const participant = booking?.astrologer;

    if (!participant) {
      console.error("No participant found");
      return;
    }

    console.log(booking);

    // Store selected consultation in Redux
    dispatch(
      setSelectedConsultation({
        consultationId: booking._id,
        participant: {
          _id: participant.accountId,
          name: participant?.displayName,
          firstName: participant?.firstName,
          lastName: participant?.lastName,
          profilePicture: participant?.profilePicture,
          accountId: participant?.accountId,
          role: "astrologer",
        },
      }),
    );

    // Navigate to chat page
    navigate(`/dashboard/user/chat/${booking._id}`);
  };

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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "pending":
        return "Pending";
      case "ended":
        return "Ended";
      default:
        return status || "Unknown";
    }
  };

  return (
    <div
      className={`group relative bg-white border rounded-3xl p-4 md:p-5 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-20/40 ${
        booking?.status === "pending"
          ? "border-amber-200/50"
          : booking?.status === "accepted"
            ? "border-green-200/50"
            : "border-primary-5/30"
      }`}
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
            className={`absolute -top-2 -left-2 px-2.5 py-0.5 rounded-lg border text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${getStatusStyles(booking.status)}`}
          >
            {booking?.status === "pending" && <IoHourglassOutline size={10} />}
            {getStatusLabel(booking.status)}
          </div>
        </div>

        {/* Booking Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-semibold text-neutral-5">
                {booking?.astrologer?.displayName || "Astrologer"}
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
              ID: {booking?._id?.slice(-8).toUpperCase()}
            </span>
          </div>

          {/* Request Message (if any) */}
          {booking?.requestMessage && (
            <p className="text-xs text-neutral-35 mt-2 italic">
              "{booking.requestMessage}"
            </p>
          )}
        </div>

        {/* Actions Side */}
        <div className="flex md:flex-col gap-2 md:border-l md:border-neutral-20 md:pl-5 min-w-37">
          {/* Accepted - Show Chat Now */}
          {booking?.status === "accepted" && (
            <button
              onClick={handleChatNow}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary-5 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-5/20 hover:bg-primary-10 active:scale-95"
            >
              <IoChatbubblesOutline size={18} />
              Chat Now
            </button>
          )}

          {/* Ended - Show Chat Ended */}
          {booking?.status === "ended" && (
            <button
              onClick={handleChatNow}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-neutral-20/40 text-neutral-25 border border-neutral-20 rounded-xl text-sm font-bold cursor-not-allowed opacity-70"
              disabled
            >
              <IoChatbubblesOutline size={18} />
              Chat Ended
            </button>
          )}

          {/* Pending - Show Awaiting */}
          {booking?.status === "pending" && (
            <div className="w-full py-3 bg-amber-50/50 text-amber-600 rounded-xl text-sm font-bold text-center border border-amber-200/50">
              Awaiting Response...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistoryCard;
