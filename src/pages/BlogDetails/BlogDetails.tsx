import { IMAGES } from "../../assets";
import AppDownload from "../../components/BlogsPage/AppDownload/AppDownload";
import AstrologerPromo from "../../components/BlogsPage/AstrologerPromo/AstrologerPromo";
import FollowSocialMedia from "../../components/BlogsPage/FollowSocialMedia/FollowSocialMedia";
import GemstonePromo from "../../components/BlogsPage/GemstonePromo/GemstonePromo";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import Container from "../../components/Reusable/Container/Container";
import AuthorInfo from "../../components/BlogDetailsPage/AuthorInfo/AuthorInfo";

const BlogDetails = () => {
  // Dummy author data
  const author = {
    name: "Rishi Raj",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Senior Vedic Astrologer",
    experience: "12 years",
    bio: "Expert in Vedic astrology, horoscope reading, and gemstone recommendations.",
  };

  return (
    <div className="pt-10 pb-14">
      <Container>
        <Breadcrumb
          items={[
            { label: "Blogs", path: "/blogs" },
            {
              label: "How to find your zodiac sign in 2026?",
              path: "/blogs",
              isActive: true,
            },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left - Blog List */}
          <div className="lg:w-[65%] space-y-6">
            <h1 className="text-neutral-5 text-3xl font-semibold font-GeneralSans">
              How to find your zodiac sign in 2026?
            </h1>

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
              <span className="text-gray-300">|</span>
              <div className="flex items-center gap-1.5">
                <FaTag className="w-3.5 h-3.5 text-primary-5" />
                <span className="text-sm text-neutral-10">Vedic Astrology</span>
              </div>
            </div>

            <img
              src={IMAGES.kundliBannerBg}
              alt="Blog"
              className="rounded-lg w-full h-100 object-cover"
            />

            <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
              voluptas illum porro dolor, ut nihil aperiam amet consectetur
              saepe enim. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Error, maiores! Recusandae, officiis dolorum? Quibusdam
              error cumque a quia maxime, adipisci esse harum consectetur.
              Explicabo eligendi, necessitatibus voluptatibus error
              reprehenderit laborum!
            </p>

            <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
              voluptas illum porro dolor, ut nihil aperiam amet consectetur
              saepe enim. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Error, maiores! Recusandae, officiis dolorum? Quibusdam
              error cumque a quia maxime, adipisci esse harum consectetur.
              Explicabo eligendi, necessitatibus voluptatibus error
              reprehenderit laborum!
            </p>

            <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
              voluptas illum porro dolor, ut nihil aperiam amet consectetur
              saepe enim. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Error, maiores! Recusandae, officiis dolorum? Quibusdam
              error cumque a quia maxime, adipisci esse harum consectetur.
              Explicabo eligendi, necessitatibus voluptatibus error
              reprehenderit laborum!
            </p>

            <p className="text-neutral-5 mt-2 font-Satoshi leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
              voluptas illum porro dolor, ut nihil aperiam amet consectetur
              saepe enim. Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Error, maiores! Recusandae, officiis dolorum? Quibusdam
              error cumque a quia maxime, adipisci esse harum consectetur.
              Explicabo eligendi, necessitatibus voluptatibus error
              reprehenderit laborum!
            </p>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-[35%] space-y-5 sticky top-3 h-fit">
            <AuthorInfo author={author} />
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
