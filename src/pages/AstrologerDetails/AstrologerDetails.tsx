import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import {
  useGetAllAstrologersQuery,
  useGetSingleAstrologerByIdQuery,
} from "../../redux/Features/Astrologer/astrologerApi";
import type { TAstrologer } from "../../types/astrologer.type";
import LogoLoader from "../../components/Reusable/LogoLoader/LogoLoader";
import MoreConsultants from "../../components/AstrologerDetailsPage/MoreConsultants/MoreConsultants";
import Reviews from "../../components/AstrologerDetailsPage/Reviews/Reviews";
import SpecializedDetails from "../../components/AstrologerDetailsPage/SpecializedDetails/SpecializedDetails";
import AstrologerProfileInfo from "../../components/AstrologerDetailsPage/AstrologerProfileInfo/AstrologerProfileInfo";

const AstrologerDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleAstrologerByIdQuery(id);
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

  const { data: allAstrologers, isLoading: isAllAstrologersLoading } =
    useGetAllAstrologersQuery({});
  const astrologersExceptCurrent =
    allAstrologers?.data?.astrologers?.filter(
      (astrologer: TAstrologer) => astrologer._id !== _id,
    ) || [];

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

  if (isLoading || isAllAstrologersLoading) {
    return <LogoLoader />;
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-10">
      {/* <LogoLoader /> */}
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
          {/* LEFT COLUMN */}
          <div className="w-[65%] space-y-6">
            <AstrologerProfileInfo
              data={{
                profilePicture,
                displayName,
                rating,
                experience,
                areaOfPractice,
                bio,
              }}
              renderStars={renderStars}
            />

            <SpecializedDetails
              consultLanguages={consultLanguages}
              availability={availability}
            />

            <Reviews
              rating={rating}
              reviews={reviews}
              renderStars={renderStars}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-[35%]">
            <MoreConsultants data={astrologersExceptCurrent} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AstrologerDetails;
