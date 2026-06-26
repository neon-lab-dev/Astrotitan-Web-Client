import { BiBriefcase } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import Button from "../../../../components/Reusable/Button/Button";
import type { TAstrologer } from "../../../../types/astrologer.type";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const AstrologerCard = ({
  astrologer,
}: {
  isActionButtonsVisible?: boolean;
  astrologer: TAstrologer;
}) => {
  const {
    _id,
    displayName,
    experience,
    bio,
    areaOfPractice,
    profilePicture,
    rating,
  } = astrologer;
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 max-w-xs w-full">
      {/* Image Section - Circle */}
      <div className="flex justify-center pt-5 pb-2">
        <div className="relative">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={displayName}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary-5/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary-5/10 border-4 border-primary-5/20 flex items-center justify-center">
              <IoPerson className="w-14 h-14 text-primary-5/60" />
            </div>
          )}
          {rating !== 0 && (
            <div className="absolute -bottom-1 right-0 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
              <FaStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-gray-800">
                {rating}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3 pt-1">
        {/* Name */}
        <div className="text-center mb-2">
          <h3 className="text-base font-bold text-gray-800">{displayName}</h3>
          <div className="flex items-center justify-center gap-1 text-gray-600 mt-0.5">
            <BiBriefcase className="w-3 h-3" />
            <span className="text-xs font-medium">
              {experience} Years Experience
            </span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-xs leading-relaxed mb-2 line-clamp-2 text-center">
          {bio}
        </p>

        {/* Area of Practice */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1 justify-center">
            {areaOfPractice.slice(0, 2).map((area: string, index: number) => (
              <span
                key={index}
                className="px-1.5 py-0.5 bg-primary-5/20 text-primary-10 text-[10px] rounded-full font-medium"
              >
                {area}
              </span>
            ))}
            {areaOfPractice.length > 2 && (
              <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full font-medium">
                +{areaOfPractice.length - 2}
              </span>
            )}
          </div>
        </div>

        <Link to={`/astrologer/${_id}`}>
          <Button
            label="View Profile"
            className="px-5 2xl:px-8 py-1.5 w-full text-sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default AstrologerCard;
