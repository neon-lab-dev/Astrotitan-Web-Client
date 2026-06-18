import { IoEyeOutline } from "react-icons/io5";
import { ICONS, IMAGES } from "../../../assets";
import { FaHandshake } from "react-icons/fa";
import { Link } from "react-router-dom";

const AstrologerListCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 p-6">
      {/* Profile Section */}
      <div className="flex items-start gap-4">
        <img
          src={IMAGES.rahul}
          alt="Astrologer"
          className="size-25 rounded-full object-cover border-2 border-primary-5/30"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-neutral-5 font-Satoshi font-semibold text-xl">
                Rahul Sutradhar
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">5 years exp</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  Available
                </span>
              </div>
            </div>
            <span className="text-sm text-gray-500">⭐ 4.8</span>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            facilis nihil dolor ullam maiores.
          </p>
        </div>
      </div>

      {/* Areas of Practice */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["Health", "Marriage", "Career", "Education"].map((area, index) => (
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
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <img src={ICONS.time} alt="" className="size-5" />
              <span className="text-neutral-10">Mon-Fri, 9AM-6PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={ICONS.language} alt="" className="size-5" />
              <span className="text-neutral-10">Hindi, English</span>
            </div>
          </div>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to={`/astrologer/${1}`}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-5 border border-primary-5 rounded-lg hover:bg-primary-5/5 transition-colors"
          >
            <IoEyeOutline className="w-4 h-4" />
            Know More
          </Link>
          <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-primary-5 rounded-lg hover:bg-primary-10] transition-colors shadow-sm">
            <FaHandshake className="w-4 h-4" />
            Consult Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerListCard;
