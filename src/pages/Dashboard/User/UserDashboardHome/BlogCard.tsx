import { BiCalendar } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";

interface BlogCardProps {
  image: string;
  title: string;
  zodiacSign: string;
  category: string;
  date?: string;
  readTime?: string;
  author?: string;
  onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  zodiacSign,
  category,
  date = "Jan 15, 2026",
  author = "Astrologer",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group font-GeneralSans"
    >
      {/* Image Section */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary-10 text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>

        {/* Zodiac Sign Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-10 text-xs font-semibold rounded-full shadow-sm">
            ♌ {zodiacSign}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-medium text-neutral-5 mb-2 line-clamp-2 group-hover:text-primary-10 transition-colors duration-200">
          {title}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center gap-3 text-gray-500 text-xs mb-3">
          {author && (
            <div className="flex items-center gap-1">
              <FaUser className="w-3 h-3" />
              <span>{author}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <BiCalendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-3"></div>

        {/* Read More Link */}
        <div className="flex items-center justify-between">
          <span className="text-primary-10 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Read Article
            <GoArrowUpRight className="mt-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
