import { IoEyeOutline } from "react-icons/io5";
import { ICONS } from "../../../assets";
import { FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { TAstrologer } from "../../../types/astrologer.type";
import { useState } from "react";
import BookAstrologerModal from "../BookAstrologerModal/BookAstrologerModal";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";
import SubscriptionWarningModal from "../SubscriptionWarningModal/SubscriptionWarningModal";

const AstrologerListCard = ({
  isActionButtonsVisible = true,
  astrologer,
}: {
  isActionButtonsVisible?: boolean;
  astrologer: TAstrologer;
}) => {
  const {
    _id,
    firstName,
    lastName,
    experience,
    bio,
    areaOfPractice,
    profilePicture,
    availability,
    consultLanguages,
    rating,
  } = astrologer;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubscriptionWarningModalOpen, setIsSubscriptionWarningModalOpen] =
    useState<boolean>(false);
  const { data } = useGetMeQuery({});

  const profile = data?.data?.profile || {};

  const handleOpenBookingModal = () => {
    if (profile?.isPremiumUser) {
      setIsModalOpen(true);
    } else {
      setIsSubscriptionWarningModalOpen(true);
    }
  };
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-6">
        {/* Profile Section */}
        <div className="flex flex-col mf:flex-row items-start gap-4">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Astrologer"
              className="size-25 rounded-full object-cover border-2 border-primary-5/30"
            />
          ) : (
            <div className="size-25 rounded-full object-cover border-2 border-primary-5/30 flex items-center justify-center">
              <img src={ICONS.user} alt="Astrologer" className="size-12" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <Link
                  to={`/astrologer/${_id}`}
                  className="text-neutral-5 font-Satoshi font-semibold text-xl hover:underline"
                >
                  {firstName} {lastName}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">
                    {experience} years exp
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Available
                  </span>
                </div>
              </div>
              {rating !==0 && (
                <span className="text-sm text-gray-500">⭐ {rating}</span>
              )}
            </div>
            <p className="text-gray-600 text-sm mt-2 line-clamp-2">{bio}</p>
          </div>
        </div>

        {/* Areas of Practice */}
        <div className="flex flex-wrap gap-2 mt-4">
          {areaOfPractice?.map((area: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-5/10 text-primary-10 rounded-full text-sm font-medium"
            >
              {area}
            </span>
          ))}
        </div>

        <hr className="border border-gray-100 my-4" />

        {/* Bottom Section */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Left - Availability & Languages */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 text-sm">
              {availability?.availableDays && availability?.availableTime && (
                <div className="flex items-center gap-1.5">
                  <img src={ICONS.time} alt="" className="size-5" />
                  <span className="text-neutral-10">
                    {availability?.availableDays &&
                    availability?.availableDays?.length > 0 &&
                    availability?.availableTime ? (
                      <>
                        {availability.availableDays
                          .map((day: string) => day.substring(0, 3))
                          .join(", ")}
                        <span className="text-neutral-25 mx-1">•</span>
                        {availability.availableTime.startTime} -{" "}
                        {availability.availableTime.endTime}
                      </>
                    ) : (
                      "Not Available"
                    )}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5">
                <img src={ICONS.language} alt="" className="size-5" />
                <span className="text-neutral-10">
                  {consultLanguages?.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Right - Buttons */}
          {isActionButtonsVisible && (
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to={`/astrologer/${_id}`}
                className="flex items-center gap-2 px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-5 border border-primary-5 rounded-lg hover:bg-primary-5/5 transition-colors"
              >
                <IoEyeOutline className="w-4 h-4" />
                Know More
              </Link>
              <button
                onClick={handleOpenBookingModal}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary-5 rounded-lg hover:bg-primary-10] transition-colors shadow-sm"
              >
                <FaHandshake className="w-4 h-4" />
                Consult Now
              </button>
            </div>
          )}
        </div>
      </div>

      <SubscriptionWarningModal
        isSubscriptionWarningModalOpen={isSubscriptionWarningModalOpen}
        setIsSubscriptionWarningModalOpen={setIsSubscriptionWarningModalOpen}
      />
      <BookAstrologerModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        astrologerId={_id as string}
      />
    </>
  );
};

export default AstrologerListCard;
