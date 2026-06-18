import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { IMAGES } from "../../../assets";
import { Link } from "react-router-dom";

const BlogListCard = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
      <img
        src={IMAGES.kundliBannerBg}
        alt="Blog"
        className="rounded-lg w-full h-100 object-cover"
      />
      <div className="flex items-center gap-4 text-sm text-neutral-10 mt-4 mb-6">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt className="w-3.5 h-3.5 text-primary-5" />
          <span>27th of June 2024</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <FaUser className="w-3.5 h-3.5 text-primary-5" />
          <span>Rishi Raj</span>
        </div>
      </div>

      <Link
        to={`/blog/${1}`}
        className="text-neutral-5 text-2xl font-medium font-Satoshi hover:text-primary-5 hover:underline transition-colors"
      >
        How to find your zodiac sign in 2026?
      </Link>
      <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. In voluptas
        illum porro dolor, ut nihil aperiam amet consectetur saepe enim.
      </p>
    </div>
  );
};

export default BlogListCard;
