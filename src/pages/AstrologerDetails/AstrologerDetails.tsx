import { useState } from "react";
import { IoLanguageOutline, IoTimeOutline } from "react-icons/io5";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Container from "../../components/Reusable/Container/Container";
import AstrologerListCard from "../../components/AstrologerPage/AstrologerListCard/AstrologerListCard";
import { LuUserRoundCheck } from "react-icons/lu";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import {
  useGetAllAstrologersQuery,
  useGetSingleAstrologerByIdQuery,
} from "../../redux/Features/Astrologer/astrologerApi";
import type {
  TAstrologer,
  TAstrologerReview,
} from "../../types/astrologer.type";

const AstrologerDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleAstrologerByIdQuery(id);
  const astrologerData = data?.data || {};
  const {
    _id,
    firstName,
    lastName,
    displayName,
    experience,
    bio,
    areaOfPractice,
    profilePicture,
    availability,
    consultLanguages,
    reviews,
    rating,
  } = astrologerData;

  const { data: allAstrologers } = useGetAllAstrologersQuery({});
  const astrologersExceptCurrent =
    allAstrologers?.data?.astrologers?.filter(
      (astrologer: TAstrologer) => astrologer._id !== _id,
    ) || [];
  const [showAllReviews, setShowAllReviews] = useState(false);

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < full)
            return <FaStar key={i} className="text-yellow-500 w-4 h-4" />;
          if (i === full && half)
            return (
              <FaStarHalfAlt key={i} className="text-yellow-500 w-4 h-4" />
            );
          return <FaRegStar key={i} className="text-gray-300 w-4 h-4" />;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-10">
      <Container>
        <Breadcrumb
          items={[
            { label: "Astrologer", path: "/astrologer" },
            {
              label: displayName || `${firstName} ${lastName}`,
              isActive: true,
            },
          ]}
        />

        <div className="flex gap-8 mt-5">
          {/* LEFT COLUMN: Main Info */}
          <div className="w-[65%] space-y-6">
            {/* Main Profile Card */}
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
                          {renderStars(rating)}
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

                <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary-5 rounded-lg hover:bg-primary-10] transition-colors shadow-sm h-fit">
                  Consult Now
                </button>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  About Me
                </h3>
                <p className="text-slate-600 leading-relaxed">{bio}</p>
              </div>
            </div>

            {/* Specialized Details Grid */}
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

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  User Reviews
                </h3>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 leading-none">
                      {rating}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {reviews?.length} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {reviews && reviews.length > 0 ? (
                  reviews?.map((review: TAstrologerReview, index: number) => (
                    <div key={index} className="group">
                      <div className="flex gap-4">
                        <img
                          src={review.user.profilePicture}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                          alt=""
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900">
                              {review.user.firstName} {review.user.lastName}
                            </h4>
                            <span className="text-xs text-slate-400 font-medium">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-1 mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl group-hover:bg-slate-100/50 transition-colors">
                            {review.review}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Empty State
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <svg
                        className="w-10 h-10 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">
                      No Reviews Yet
                    </h3>
                    <p className="text-sm text-slate-400 max-w-sm">
                      Be the first to share your experience and help others make
                      informed decisions.
                    </p>
                  </div>
                )}
              </div>

              {reviews?.length > 4 && (
                <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  View All Reviews
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Card */}
          <div className="w-[35%]">
            <p className="text-neutral-5 font-Satoshi font-medium mb-4">
              <LuUserRoundCheck className="inline mb-0.5 mr-1" /> More
              Astrologers
            </p>
            {astrologersExceptCurrent?.map((astrologer: TAstrologer) => (
              <AstrologerListCard
                key={astrologer?._id}
                astrologer={astrologer}
                isActionButtonsVisible={false}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AstrologerDetails;
