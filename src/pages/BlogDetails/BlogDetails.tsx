import AppDownload from "../../components/BlogsPage/AppDownload/AppDownload";
import AstrologerPromo from "../../components/BlogsPage/AstrologerPromo/AstrologerPromo";
import FollowSocialMedia from "../../components/BlogsPage/FollowSocialMedia/FollowSocialMedia";
import GemstonePromo from "../../components/BlogsPage/GemstonePromo/GemstonePromo";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { FaCalendarAlt, FaTag } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import Container from "../../components/Reusable/Container/Container";
import AuthorInfo from "../../components/BlogDetailsPage/AuthorInfo/AuthorInfo";
import { useParams } from "react-router-dom";
import { useGetSingleBlogByIdQuery } from "../../redux/Features/Blog/blogApi";
import { formatDate } from "../../utils/formatDate";

const BlogDetails = () => {
  const { id } = useParams();
  const { data } = useGetSingleBlogByIdQuery(id);
  const blog = data?.data || {};
  const {
    title,
    thumbnail,
    category,
    zodiacSpecific,
    addedBy,
    createdAt,
    content,
  } = blog;

  return (
    <div className="pt-10 pb-14">
      <Container>
        <Breadcrumb
          items={[
            { label: "Blogs", path: "/blogs" },
            {
              label: title || "Blog Details",
              path: "/blogs",
              isActive: true,
            },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left - Blog Content */}
          <div className="lg:w-[65%] space-y-6">
            <h1 className="text-neutral-5 text-3xl font-semibold font-GeneralSans">
              {title}
            </h1>

            {/* Meta Info with Zodiac Sign */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-10 mt-4 mb-6">
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="w-3.5 h-3.5 text-primary-5" />
                <span>{formatDate(createdAt)}</span>
              </div>
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5">
                <FaTag className="w-3.5 h-3.5 text-primary-5" />
                <span className="text-sm text-neutral-10">
                  {category || "Uncategorized"}
                </span>
              </div>

              {zodiacSpecific?.zodiacSign && (
                <>
                  <span className="text-gray-300">|</span>
                  <div className="flex items-center gap-1.5">
                    <IoStarOutline className="w-3.5 h-3.5 text-primary-5" />
                    <span className="text-sm text-neutral-10 font-medium">
                      {zodiacSpecific.zodiacSign}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Featured Image */}
            <img
              src={thumbnail}
              alt={title}
              className="rounded-lg w-full h-100 object-cover"
            />

            {/* Content */}
            <div
              className="text-neutral-5 mt-2 font-Satoshi leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[35%] space-y-5 h-fit sticky top-4">
            <AuthorInfo author={addedBy} />
            <AppDownload />
            <AstrologerPromo />
            <GemstonePromo />
            <FollowSocialMedia />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
