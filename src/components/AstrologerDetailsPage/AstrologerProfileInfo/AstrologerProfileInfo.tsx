import { MdVerified } from "react-icons/md";
import type { TAstrologer } from "../../../types/astrologer.type";
import BookAstrologerModal from "../../AstrologerPage/BookAstrologerModal/BookAstrologerModal";
import { useState } from "react";
import SubscriptionWarningModal from "../../AstrologerPage/SubscriptionWarningModal/SubscriptionWarningModal";
import { useGetMeQuery } from "../../../redux/Features/User/userApi";

const AstrologerProfileInfo = ({
  data,
  renderStars,
}: {
  data: Partial<TAstrologer>;
  renderStars: (rating: number) => React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubscriptionWarningModalOpen, setIsSubscriptionWarningModalOpen] =
    useState<boolean>(false);

  const { data: myProfile } = useGetMeQuery({});

  const profile = myProfile?.data?.profile || {};

  const {
    _id,
    displayName,
    experience,
    bio,
    areaOfPractice,
    profilePicture,
    rating,
  } = data;

  const handleOpenBookingModal = () => {
    if (profile?.isPremiumUser) {
      setIsModalOpen(true);
    } else {
      setIsSubscriptionWarningModalOpen(true);
    }
  };
  return (
    <>
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <img
              src={profilePicture}
              alt={displayName}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg shadow-black/5"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-white">
              <MdVerified size={18} />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {displayName}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    {renderStars(rating as number)}
                    <span className="ml-1 text-slate-900">{rating}</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{experience} Years Exp.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              {areaOfPractice?.map((area: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-xs font-semibold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleOpenBookingModal}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary-5 rounded-lg hover:bg-primary-10] transition-colors shadow-sm h-fit"
          >
            Consult Now
          </button>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-slate-900 mb-3">About Me</h3>
          <p className="text-slate-600 leading-relaxed">{bio}</p>
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

export default AstrologerProfileInfo;
