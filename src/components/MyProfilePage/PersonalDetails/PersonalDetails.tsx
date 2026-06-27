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
import { useGetMeQuery } from "../../../redux/Features/User/userApi";
import { formatDate } from "../../../utils/formatDate";
import Modal from "../../Reusable/Modal/Modal";
import { useState } from "react";
import UpdatePersonalInfo from "./UpdatePersonalInfo";
import UpdateBirthInfo from "./UpdateBirthInfo";
import UpdateIntentsInfo from "./UpdateIntentsInfo";
import UpdateZodiacSignModal from "../../UserDashboardHomePage/UpdateZodiacSignModal/UpdateZodiacSignModal";
import Loader from "../../Shared/Loader/Loader";

const PersonalDetails = () => {
  const { data, isLoading } = useGetMeQuery({});
  const profile = data?.data?.profile || {};
  const account = data?.data?.account || {};

  const [updateFor, setUpdateFor] = useState<
    "personalInfo" | "birthInfo" | "intentsInfo"
  >("personalInfo");
  const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] =
    useState<boolean>(false);
  const [isUpdateZodiacSignModalOpen, setIsUpdateZodiacSignModalOpen] =
    useState<boolean>(false);

  const labelTextStyle = "text-xs md:text-[13px] font-medium text-neutral-10";
  const valueTextStyle = "text-sm md:text-base font-medium text-neutral-5";

  if (isLoading) {
    return (
      <div className="min-h-150 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="font-GeneralSans animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-5/80 tracking-tight">
              Personal Details
            </h3>
            <p className="text-sm text-neutral-10 font-Satoshi mt-1">
              Manage your basic account information
            </p>
          </div>
          <button
            onClick={() => {
              setUpdateFor("personalInfo");
              setUpdateProfileModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group"
          >
            <HiPencil
              className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
              size={16}
            />
            Update
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {[
            {
              label: "Full Name",
              value: profile?.fullName,
              icon: <FaUserEdit />,
            },
            {
              label: "Email Address",
              value: account?.email,
              icon: <IoMailOutline />,
            },
            {
              label: "Mobile Number",
              value: account?.phoneNumber || "Not Provided",
              icon: <IoCallOutline />,
            },
            {
              label: "Gender",
              value: profile?.gender,
              icon: <FaVenusMars />,
            },
          ].map((item, idx) => (
            <div key={idx} className="group">
              <p className={labelTextStyle}>{item.label}</p>
              <div className="flex items-center gap-2 rounded-2xl group-hover:bg-neutral-20/50 transition-colors border border-transparent hover:border-neutral-20/30 mt-2">
                <div className="size-10 rounded-xl bg-neutral-20/50 flex items-center justify-center text-primary-5/60">
                  {item.icon}
                </div>
                <p
                  className={`text-sm md:text-base font-medium text-neutral-5 ${item?.label === "Gender" ? "capitalize" : ""}`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Astrological Data Section */}
        <div className="flex items-center justify-between mb-5 mt-10">
          <h3 className="text-xl md:text-2xl font-semibold text-neutral-5/80 tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-primary-5/10 text-primary-5 flex items-center justify-center shadow-sm shadow-primary-5/20">
              <FaRegCompass size={20} />
            </span>
            Astrological Data
          </h3>
          <button
            onClick={() => {
              setUpdateFor("birthInfo");
              setUpdateProfileModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-20 rounded-xl text-sm font-medium text-neutral-5 hover:text-white hover:bg-primary-5 hover:shadow-sm transition-all group"
          >
            <HiPencil
              className="text-primary-5 group-hover:text-white group-hover:scale-110 transition-transform"
              size={16}
            />
            Update
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Birth Date */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
            <div className="flex items-center gap-2 mb-3 text-neutral-10">
              <IoCalendarClearOutline size={16} />
              <p className={labelTextStyle}>Birth Date</p>
            </div>
            <p className={valueTextStyle}>{formatDate(profile?.dateOfBirth)}</p>
          </div>

          {/* Birth Time */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
            <div className="flex items-center gap-2 mb-3 text-neutral-10">
              <IoTimeOutline size={16} />
              <p className={labelTextStyle}>Birth Time</p>
            </div>
            <p className={valueTextStyle}>{profile?.timeOfBirth}</p>
          </div>

          {/* Birth Place */}
          <div className="p-5 rounded-2xl bg-white border border-neutral-20 hover:border-primary-5/30 hover:shadow-md hover:shadow-primary-5/5 transition-all">
            <div className="flex items-center gap-2 mb-3 text-neutral-10">
              <FaMapMarkerAlt size={14} />
              <p className={labelTextStyle}>Birth Place</p>
            </div>
            <p className={valueTextStyle}>{profile?.placeOfBirth}</p>
          </div>

          {/* Zodiac Sign - Highlighted Card */}
          <div className="p-5 rounded-2xl bg-linear-to-br from-primary-5/10 to-transparent border border-primary-5/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-primary-10">
                <TbZodiacLeo size={18} />
                <p className={labelTextStyle}>Zodiac Sign</p>
              </div>
              <button
                onClick={() => setIsUpdateZodiacSignModalOpen(true)}
                title="Edit Zodiac"
                className="p-1.5 rounded-lg bg-white shadow-sm text-primary-5 transition-opacity"
              >
                <HiPencil size={12} />
              </button>
            </div>
            <p className={valueTextStyle}>
              {profile?.zodiacSign || "Not Provided"}
            </p>
            {/* Decorative Background Icon */}
            <TbZodiacLeo className="absolute -right-2 -bottom-2 text-primary-5/5 size-16 rotate-12" />
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mt-6 md:mt-6 bg-neutral-20/30 p-6 rounded-2xl md:rounded-4xl border border-neutral-20/50 relative">
          <button
            onClick={() => {
              setUpdateFor("intentsInfo");
              setUpdateProfileModalOpen(true);
            }}
            className="p-1.5 rounded-lg bg-white shadow-sm text-primary-5 transition-opacity absolute top-3 right-3"
          >
            <HiPencil size={12} />
          </button>
          <p className="text-[10px] font-bold font-Satoshi text-neutral-10 uppercase tracking-[0.2em] mb-5 text-center">
            Life Focus Areas
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {profile?.intents?.map((intent: string, index: number) => (
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
      <Modal
        isModalOpen={isUpdateProfileModalOpen}
        setIsModalOpen={setUpdateProfileModalOpen}
      >
        <h2 className="text-xl font-Satoshi font-semibold text-center text-neutral-5 mb-6">
          Update Personal Information
        </h2>
        {updateFor === "personalInfo" ? (
          <UpdatePersonalInfo
            defaultValues={data?.data || {}}
            onClose={() => setUpdateProfileModalOpen(false)}
          />
        ) : updateFor === "birthInfo" ? (
          <UpdateBirthInfo
            defaultValues={profile || {}}
            onClose={() => setUpdateProfileModalOpen(false)}
          />
        ) : (
          <UpdateIntentsInfo
            defaultValues={profile || {}}
            onClose={() => setUpdateProfileModalOpen(false)}
          />
        )}
      </Modal>

      <UpdateZodiacSignModal
        isModalOpen={isUpdateZodiacSignModalOpen}
        setIsModalOpen={setIsUpdateZodiacSignModalOpen}
        zodiacSign={profile?.zodiacSign}
      />
    </>
  );
};

export default PersonalDetails;
