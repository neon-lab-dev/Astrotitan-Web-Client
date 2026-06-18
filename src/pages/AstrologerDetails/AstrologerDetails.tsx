import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoLanguageOutline,
  IoTimeOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdNavigateNext, MdVerified } from "react-icons/md";
import Container from "../../components/Reusable/Container/Container";
import AstrologerListCard from "../../components/AstrologerPage/AstrologerListCard/AstrologerListCard";
import { LuUserRoundCheck } from "react-icons/lu";
import { IMAGES } from "../../assets";

const AstrologerDetails = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const astrologer = {
    profilePicture: IMAGES.rahul,
    displayName: "Pandit Rahul Sir",
    firstName: "Rahul",
    lastName: "Sutradhar",
    gender: "male",
    experience: "8",
    country: "India",
    rating: 4.8,
    phoneNumber: "+91 98765 43210",
    email: "rahul@example.com",
    areaOfPractice: [
      "Career",
      "Marriage",
      "Health",
      "Education",
      "Vedic Astrology",
    ],
    consultLanguages: ["Hindi", "English", "Bengali"],
    availability: {
      availableDays: ["Mon", "Wed", "Fri", "Sat"],
      availableTime: { startTime: "09:00 AM", endTime: "06:00 PM" },
    },
    bio: "I am a highly experienced astrologer with over 8 years of practice. I specialize in Vedic astrology, horoscope reading, and providing guidance for career, marriage, and health-related issues. My goal is to provide clarity and actionable remedies for a better future.",
    reviews: [
      {
        user: {
          firstName: "Priya",
          lastName: "Sharma",
          profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
        },
        rating: 5,
        review:
          "Absolutely amazing experience! Pandit Rahul Sir provided accurate predictions and genuine guidance for my career.",
        createdAt: "2024-03-15T10:30:00Z",
      },
      {
        user: {
          firstName: "Amit",
          lastName: "Kumar",
          profilePicture: "https://randomuser.me/api/portraits/men/41.jpg",
        },
        rating: 4.5,
        review:
          "Very knowledgeable and patient astrologer. He helped me understand my marriage compatibility.",
        createdAt: "2024-03-10T14:20:00Z",
      },
      {
        user: {
          firstName: "Sneha",
          lastName: "Patel",
          profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
        },
        rating: 5,
        review:
          "I consulted him for health issues and got incredible insights. His remedies really worked for me.",
        createdAt: "2024-03-05T09:15:00Z",
      },
    ],
  };

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
        <nav className="flex items-center gap-2 text-sm font-GeneralSans">
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 hover:text-primary-5 transition-colors"
          >
            <IoHomeOutline className="w-4 h-4" />
            Home
          </Link>
          <MdNavigateNext className="w-4 h-4 text-gray-400" />
          <Link
            to="/astrologer"
            className="text-gray-500 hover:text-primary-5 transition-colors"
          >
            Astrologer
          </Link>
          <MdNavigateNext className="w-4 h-4 text-gray-400" />
          <span className="text-primary-5 font-medium">
            {astrologer?.displayName ||
              `${astrologer?.firstName} ${astrologer?.lastName}`}
          </span>
        </nav>

        <div className="flex gap-8 mt-5">
          {/* LEFT COLUMN: Main Info */}
          <div className="w-[65%] space-y-6">
            {/* Main Profile Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <img
                    src={astrologer.profilePicture}
                    alt={astrologer.displayName}
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
                        {astrologer.displayName}
                      </h1>
                      <div className="flex items-center gap-3 mt-2 text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          {renderStars(astrologer.rating)}
                          <span className="ml-1 text-slate-900">
                            {astrologer.rating}
                          </span>
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{astrologer.experience} Years Exp.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {astrologer.areaOfPractice.map((area, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-lg text-xs font-semibold"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  About Me
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {astrologer.bio}
                </p>
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
                    {astrologer.consultLanguages.join(", ")}
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
                    {astrologer.availability.availableDays.join(", ")}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {astrologer.availability.availableTime.startTime} -{" "}
                    {astrologer.availability.availableTime.endTime}
                  </p>
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
                      {astrologer.rating}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {astrologer.reviews.length} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {astrologer.reviews.map((review, i) => (
                  <div key={i} className="group">
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
                ))}
              </div>

              <button className="w-full mt-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                View All Reviews
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Booking Card */}
          <div className="w-[35%]">
            <p className="text-neutral-5 font-Satoshi font-medium mb-4">
              <LuUserRoundCheck className="inline mb-0.5 mr-1" /> More
              Astrologers
            </p>
            <AstrologerListCard />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AstrologerDetails;
