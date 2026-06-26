import { IoLanguageOutline, IoTimeOutline } from "react-icons/io5";
import type { TAvailability } from "../../../types/astrologer.type";

const SpecializedDetails = ({consultLanguages, availability} : {consultLanguages:string[], availability:TAvailability }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-start gap-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
          <IoLanguageOutline size={22} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Languages
          </p>
          <p className="text-slate-700 font-medium mt-1">
            {consultLanguages?.join(", ")}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl border border-slate-100 flex items-start gap-4">
        <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
          <IoTimeOutline size={22} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Availability
          </p>
          <p className="text-slate-700 font-medium mt-1">
            {availability?.availableDays?.join(", ")}
          </p>
          {availability?.availableTime?.startTime ? (
            <p className="text-xs text-slate-500 mt-0.5">
              {availability?.availableTime?.startTime} -{" "}
              {availability?.availableTime?.endTime}
            </p>
          ) : (
            <p className="text-xs text-slate-500 mt-0.5">
              PLease contact for availability
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecializedDetails;
