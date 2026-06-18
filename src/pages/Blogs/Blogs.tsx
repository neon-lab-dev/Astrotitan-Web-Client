import { IoSearchOutline } from "react-icons/io5";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { useState } from "react";
import BlogListCard from "../../components/BlogsPage/BlogListCard/BlogListCard";
import AppDownload from "../../components/BlogsPage/AppDownload/AppDownload";
import AstrologerPromo from "../../components/BlogsPage/AstrologerPromo/AstrologerPromo";
import GemstonePromo from "../../components/BlogsPage/GemstonePromo/GemstonePromo";
import FollowSocialMedia from "../../components/BlogsPage/FollowSocialMedia/FollowSocialMedia";

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Vedic Astrology",
    "Horoscope",
    "Zodiac Signs",
    "Kundali",
    "Gemstones",
    "Puja & Rituals",
    "Numerology",
    "Tarot Reading",
  ];

  return (
    <div className="pt-10 pb-14">
      <div className="max-w-6xl w-full mx-auto px-5 2xl:px-0">
        <Breadcrumb
          items={[{ label: "Blogs", path: "/blogs", isActive: true }]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-5">
          {/* Left - Blog List */}
          <div className="lg:w-[65%] space-y-6">
            {/* Search Bar */}
            <div className="relative w-full">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-10 focus:ring-2 focus:ring-primary-10/20 transition duration-300 bg-white"
                placeholder="Search blogs by title, author, or keyword..."
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary-10 text-white shadow-sm"
                      : "bg-neutral-40/20 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <BlogListCard />
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[35%] space-y-5 sticky top-3 h-fit">
            <AppDownload />
            <AstrologerPromo />
            <GemstonePromo />
            <FollowSocialMedia />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
