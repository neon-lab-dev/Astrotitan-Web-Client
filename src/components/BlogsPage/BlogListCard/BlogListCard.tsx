import { FaCalendarAlt, FaUser, FaTag } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { TBlog } from "../../../types/blog.type";
import { formatDate } from "../../../utils/formatDate";

const BlogListCard = ({ blog }: { blog: TBlog }) => {
  const {
    _id,
    title,
    thumbnail,
    content,
    category,
    zodiacSpecific,
    addedBy,
    createdAt,
  } = blog;

  // Strip HTML tags for plain text preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const plainText = typeof content === "string" ? stripHtml(content) : "";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-5">
      <img
        src={thumbnail}
        alt="Blog"
        className="rounded-lg w-full h-100 object-cover"
      />

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-10 mt-4 mb-3">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt className="w-3.5 h-3.5 text-primary-5" />
          <span>{formatDate(createdAt)}</span>
        </div>
        <span className="text-gray-300">|</span>
        <div className="flex items-center gap-1.5">
          <FaUser className="w-3.5 h-3.5 text-primary-5" />
          <span>{addedBy?.displayName || "Unknown"}</span>
        </div>

        {category && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-5/10 text-primary-5 rounded-full text-xs font-medium">
            <FaTag className="w-3 h-3" />
            {category}
          </span>
        )}
        {zodiacSpecific?.zodiacSign && (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
            <IoStarOutline className="w-3 h-3" />
            {zodiacSpecific.zodiacSign}
          </span>
        )}
      </div>

      {/* Title */}
      <Link
        to={`/blog/${_id}`}
        className="text-neutral-5 text-2xl font-medium font-Satoshi hover:text-primary-5 hover:underline transition-colors"
      >
        {title}
      </Link>

      {/* Content Preview - 2 lines */}
      <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed line-clamp-2">
        {plainText}
      </p>

      {/* Read More Button */}
      <Link
        to={`/blog/${_id}`}
        className="inline-flex items-center gap-2 mt-4 text-primary-5 font-semibold text-sm hover:gap-3 transition-all duration-300 group"
      >
        Read More
        <svg
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
};

export default BlogListCard;