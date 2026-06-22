import { BiCalendar } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { formatDate } from "../../../../utils/formatDate";
import { Link } from "react-router-dom";
import type { TBlog } from "../../../../types/blog.type";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  const {
    _id,
    title,
    thumbnail,
    category,
    zodiacSpecific,
    addedBy,
    createdAt,
  } = blog;
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group font-GeneralSans flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white border border-primary-5 shadow-xl text-primary-10 text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Zodiac Sign Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-10 text-xs font-semibold rounded-full shadow-sm">
            ♌ {zodiacSpecific?.zodiacSign}
          </span>
        </div>
      </div>

      {/* Content Section - flex column to push button to bottom */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg font-medium text-neutral-5 mb-2 line-clamp-2 group-hover:text-primary-10 transition-colors duration-200">
          {title}
        </h3>

        {/* Meta Information - takes remaining space */}
        <div className="flex-1">
          <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
            {addedBy && (
              <div className="flex items-center gap-1">
                <FaUser className="w-3 h-3" />
                <span>{addedBy?.displayName}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <BiCalendar className="w-3 h-3" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mt-0 mb-3"></div>

        {/* Read More Link - always at bottom */}
        <Link
          to={`/blog/${_id}`}
          className="flex items-center justify-between shrink-0"
        >
          <span className="text-primary-10 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Read Article
            <GoArrowUpRight className="mt-0.5" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
