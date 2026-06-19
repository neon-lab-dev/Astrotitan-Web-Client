/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IoMailOutline,
  IoCallOutline,
  IoCalendarClearOutline,
  IoTimeOutline,
} from "react-icons/io5";
import {
  FaUserEdit,
  FaVenusMars,
  FaMapMarkerAlt,
  FaRegCompass,
} from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { TbZodiacLeo } from "react-icons/tb"; // Example Zodiac Icon

const PersonalDetails = ({ user }: { user: any }) => {
  // Mock zodiac sign - in a real app, this would be calculated or from props
  const zodiacSign = "Leo";

  const labelTextStyle = "text-[13px] font-medium text-neutral-10";
  const valueTextStyle = "font-medium text-neutral-5";

  return (
    <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight">
            Personal Details
          </h3>
          <p className="text-sm text-neutral-10 font-Satoshi mt-1">
            Manage your basic account information
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group">
          <HiPencil
            className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
            size={16}
          />
          Edit Profile
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {[
          { label: "Full Name", value: user.fullName, icon: <FaUserEdit /> },
          {
            label: "Email Address",
            value: user.email,
            icon: <IoMailOutline />,
          },
          {
            label: "Contact Number",
            value: user.phoneNumber,
            icon: <IoCallOutline />,
          },
          {
            label: "Gender & Country",
            value: `${user.gender} • ${user.country}`,
            icon: <FaVenusMars />,
          },
        ].map((item, idx) => (
          <div key={idx} className="group">
            <p className={labelTextStyle}>{item.label}</p>
            <div className="flex items-center gap-2 rounded-2xl group-hover:bg-neutral-20/50 transition-colors border border-transparent hover:border-neutral-20/30 mt-2">
              <div className="size-10 rounded-xl bg-neutral-20/50 flex items-center justify-center text-primary-5/60">
                {item.icon}
              </div>
              <p className={valueTextStyle}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Astrological Data Section */}
      <div className="flex items-center justify-between mb-5 mt-10">
        <h3 className="text-2xl font-semibold text-neutral-5/80 tracking-tight flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-primary-5/10 text-primary-5 flex items-center justify-center shadow-sm shadow-primary-5/20">
            <FaRegCompass size={20} />
          </span>
          Astrological Data
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Birth Date */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
          <div className="flex items-center gap-2 mb-3 text-neutral-10">
            <IoCalendarClearOutline size={16} />
            <p className={labelTextStyle}>Birth Date</p>
          </div>
          <p className={valueTextStyle}>{user.dateOfBirth}</p>
        </div>

        {/* Birth Time */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
          <div className="flex items-center gap-2 mb-3 text-neutral-10">
            <IoTimeOutline size={16} />
            <p className={labelTextStyle}>Birth Time</p>
          </div>
          <p className={valueTextStyle}>{user.timeOfBirth}</p>
        </div>

        {/* Birth Place */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
          <div className="flex items-center gap-2 mb-3 text-neutral-10">
            <FaMapMarkerAlt size={14} />
            <p className={labelTextStyle}>Birth Place</p>
          </div>
          <p className={valueTextStyle}>{user.placeOfBirth}</p>
        </div>

        {/* Zodiac Sign - Highlighted Card */}
        <div className="p-5 rounded-2xl bg-linear-to-br from-primary-5/10 to-transparent border border-primary-5/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary-10">
              <TbZodiacLeo size={18} />
              <p className={labelTextStyle}>Zodiac Sign</p>
            </div>
            <button
              title="Edit Zodiac"
              className="p-1.5 rounded-lg bg-white shadow-sm text-primary-5 transition-opacity"
            >
              <HiPencil size={12} />
            </button>
          </div>
          <p className={valueTextStyle}>{zodiacSign}</p>
          {/* Decorative Background Icon */}
          <TbZodiacLeo className="absolute -right-2 -bottom-2 text-primary-5/5 size-16 rotate-12" />
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-12 bg-neutral-20/30 p-6 rounded-4xl border border-neutral-20/50">
        <p className="text-[10px] font-bold font-Satoshi text-neutral-10 uppercase tracking-[0.2em] mb-5 text-center">
          Life Focus Areas
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {user.intents.map((intent: string, index: number) => (
            <span
              key={index}
              className="px-5 py-2 bg-white border border-neutral-20 text-neutral-5 rounded-full text-xs font-bold shadow-sm hover:border-primary-5 transition-colors cursor-default"
            >
              {intent}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
