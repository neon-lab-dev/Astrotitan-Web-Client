import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoPersonOutline,
} from "react-icons/io5";

const PujaBookingCard = ({ puja }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Completed":
        return "bg-green-50 text-green-600 border-green-100";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-neutral-20 text-neutral-10 border-neutral-30";
    }
  };

  const labelTextStyle = "text-[13px] font-medium text-neutral-10";
  const valueTextStyle = "font-medium text-neutral-5";


  return (
    <div className="group bg-white border border-neutral-20 rounded-4xl p-6 md:p-8 hover:shadow-xl hover:shadow-neutral-20/40 transition-all duration-300 font-GeneralSans">

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h4 className="text-xl font-bold text-neutral-5">
              {puja.pujaName}
            </h4>
            <div
              className={`px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${getStatusStyles(puja.status)}`}
            >
              {puja.status === "Completed" && (
                <IoCheckmarkCircleOutline size={12} />
              )}
              {puja.status}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-20/30 flex items-center justify-center text-primary-5">
                <IoCalendarOutline size={16} />
              </div>
              <div>
                <p className={labelTextStyle}>
                  Date
                </p>
                <p className={valueTextStyle}>
                  {puja.preferredDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-20/30 flex items-center justify-center text-primary-5">
                <IoPersonOutline size={16} />
              </div>
              <div>
                <p className={labelTextStyle}>
                  Booked For
                </p>
                <p className={valueTextStyle}>
                  {puja.pujaBookedFor}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className={labelTextStyle}>
              Purpose of Puja
            </p>
            <p className="text-neutral-5 leading-relaxed">
              "{puja.purposeOfPuja}"
            </p>
          </div>

          {/* Admin Notes Callout */}
          {puja.adminNotes && (
            <div className="bg-neutral-20/20 border border-neutral-20/50 rounded-2xl p-4 flex gap-3">
              <IoInformationCircleOutline
                className="shrink-0 text-primary-5"
                size={20}
              />
              <div>
                <p className="text-[11px] font-bold text-neutral-5 uppercase tracking-wider mb-1">
                  Admin Instructions
                </p>
                <p className="text-sm text-neutral-10 leading-relaxed font-Satoshi">
                  {puja.adminNotes}
                </p>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default PujaBookingCard;
