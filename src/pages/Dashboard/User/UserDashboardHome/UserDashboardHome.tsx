/* eslint-disable react-hooks/set-state-in-effect */
import { GoArrowUpRight } from "react-icons/go";
import { ICONS, IMAGES } from "../../../../assets";
import Button from "../../../../components/Reusable/Button/Button";
import Container from "../../../../components/Reusable/Container/Container";
import { Link } from "react-router-dom";
import AstrologerCard from "./AstrologerCard";
import Modal from "../../../../components/Reusable/Modal/Modal";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "../../../../redux/Features/User/userApi";
import { useGetAllAstrologersQuery } from "../../../../redux/Features/Astrologer/astrologerApi";
import type { TAstrologer } from "../../../../types/astrologer.type";
import { useGetAllBlogsQuery } from "../../../../redux/Features/Blog/blogApi";
import type { TBlog } from "../../../../types/blog.type";

const UserDashboardHome = () => {
  const { data, isLoading } = useGetMeQuery({});
  const myProfile = data?.data?.profile;
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation(
    {},
  );
  const { data: astrologers } = useGetAllAstrologersQuery({});
  const { data: blogs } = useGetAllBlogsQuery({});
  console.log(blogs);
  const [selectedZodiacSign, setSelectedZodiacSign] = useState<string>("");
  const [isZodiacSignModalOpen, setIsZodiacSignModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    if (isLoading || !data) return;

    const isZodiacSignAdded = data?.data?.profile?.zodiacSign;
    if (!isZodiacSignAdded || isZodiacSignAdded === "") {
      setIsZodiacSignModalOpen(true);
    }
  }, [data, isLoading]);

  const zodiacSigns = [
    {
      name: "Aries",
      icon: ICONS.aries,
    },
    {
      name: "Taurus",
      icon: ICONS.taurus,
    },
    {
      name: "Gemini",
      icon: ICONS.gemini,
    },
    {
      name: "Cancer",
      icon: ICONS.cancer,
    },
    {
      name: "Leo",
      icon: ICONS.leo,
    },
    // {
    //   name: "Virgo",
    // //   icon: ICONS.virgo,
    // },
  ];

  const handleAddZodiacSign = () => {
    try {
      const payload = {
        zodiacSign: selectedZodiacSign,
      };
      updateProfile(payload);
      setIsZodiacSignModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="font-GeneralSans py-8">
      <Container>
        <h3 className="text-neutral-5 text-xl font-medium">
          Good morning,{" "}
          <span className="font-semibold">
            {myProfile?.firstName} {myProfile?.lastName}
          </span>
        </h3>
        <p className="text-neutral-5 text-sm mt-1.5">
          A quick overview of how today’s planetary positions may influence your
          day.
        </p>
        {/* Horoscope banner */}
        <div className="relative rounded-2xl w-full h-100 mt-5">
          <img
            src={IMAGES.dailyHoroscopeBannerBg}
            alt=""
            className="rounded-2xl absolute w-full h-full object-cover"
          />
          <div className="bg-neutral-5/60 absolute top-0 bottom-0 right-0 left-0 rounded-2xl" />

          <div className="absolute p-6 w-full h-full flex items-center">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-[35px] xl:text-[40px] 2xl:text-[45px] font-sans font-semibold text-white">
                Today's Cosmic Pulse
              </h2>
              <p className="text-base font-GeneralSans leading-7.75 text-white mt-1 mb-4 max-w-200">
                Discover the celestial guidance uniquely aligned for you today.
                Let the cosmic energies illuminate your path and bring clarity
                to your journey ahead.
              </p>
              <Button
                rightIcon={ICONS.arrowRight}
                label="Reveal Today's Insight"
              />
            </div>

            <div className="bg-neutral-5 rounded-3xl px-3 py-2 text-white text-sm absolute top-6 right-6">
              {new Date()
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, "/")}
            </div>
          </div>
        </div>

        {/* Intents */}
        <div className="mt-12">
          <h3 className="text-neutral-5 text-xl font-semibold">
            Intent Support Levels
          </h3>
          <p className="text-neutral-5 text-sm mt-1.5">
            Shows how supportive today’s planetary energies are for different
            areas of life.
          </p>

          <div className="flex items-center gap-4 mt-6">
            {[1, 2, 3, 4, 5, 6, 7]?.map((_, index) => (
              <div
                key={index}
                className="relative w-46 overflow-hidden bg-neutral-15 border border-primary-5 rounded-xl"
              >
                <div className="p-4">
                  <div
                    className="relative size-8 rounded-full transition-all duration-500 ease-out"
                    style={{
                      background: `conic-gradient(from 0deg, #D4AF37 0deg 50deg, #E8DFC8 80deg 360deg)`,
                    }}
                  >
                    <div className="absolute inset-1.5 rounded-full bg-[#F5F2EA] flex items-center justify-center"></div>
                  </div>

                  <h3 className="text-neutral-5 text-xl font-semibold mt-2">
                    75%
                  </h3>
                  <p className="text-neutral-10 text-sm mt-1">Love</p>
                </div>

                <img
                  src={ICONS.love}
                  alt=""
                  className="absolute -top-4 -right-5 w-28 opacity-10"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Kundli banner */}
        <div className="relative rounded-2xl w-full h-70 mt-12">
          <img
            src={IMAGES.kundliBannerBg}
            alt=""
            className="rounded-2xl absolute w-full h-full object-cover"
          />
          <div className="bg-neutral-5/60 absolute top-0 bottom-0 right-0 left-0 rounded-2xl" />

          <div className="absolute bottom-2 p-6 w-full flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold font-sans text-white">
                Today's Cosmic Pulse
              </h2>
              <p className="text-sm font-GeneralSans text-white mt-1">
                Saturn influences discipline & patience.
              </p>
            </div>
            <Link
              to="/kundli"
              className="bg-primary-5/50 hover:bg-primary-5/80 transition duration-300 rounded-full size-10 flex items-center justify-center text-white"
            >
              <GoArrowUpRight className="text-xl" />
            </Link>
          </div>
        </div>

        {/* Featured astrologers */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-neutral-5 text-xl font-semibold">
                Featured Astrologers
              </h3>
              <p className="text-neutral-5 text-sm mt-1.5">
                Verified experts who help interpret charts and planetary
                periods.
              </p>
            </div>
            <Link to={"/astrologer"} className="flex items-center gap-1.5">
              View All <img src={ICONS.arrowRight} alt="" className="size-5" />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-4 mt-6">
            {astrologers?.data?.astrologers?.map((astrologer: TAstrologer) => (
              <AstrologerCard key={astrologer._id} astrologer={astrologer} />
            ))}
          </div>
        </div>

        {/* Featured Blogs */}
        <div className="mt-12">
          <h3 className="text-neutral-5 text-xl font-semibold">
            Featured Blogs
          </h3>
          <p className="text-neutral-5 text-sm mt-1.5">
            Discover insightful articles from our community of astrologers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {blogs?.data?.data?.map((blog: TBlog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </Container>

      <Modal
        isModalOpen={isZodiacSignModalOpen}
        setIsModalOpen={setIsZodiacSignModalOpen}
        width="w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%]"
      >
        <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
          Select your Zodiac Sign
        </h2>
        <p className="text-sm font-GeneralSans text-center mt-1 mb-8">
          It helps us generate more accurate Kundli insights
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {zodiacSigns?.map((sign) => (
            <button
              key={sign?.name}
              onClick={() => setSelectedZodiacSign(sign?.name)}
              className={`flex flex-col items-center p-5 rounded-xl transition duration-300 ${
                selectedZodiacSign === sign?.name
                  ? "bg-neutral-15 border border-primary-5"
                  : "hover:bg-neutral-15 hover:border hover:border-primary-5 border border-transparent"
              }`}
            >
              <img src={sign?.icon} alt={sign?.name} className="w-14" />
              <p
                className={`text-neutral-5 font-semibold mt-3 ${
                  selectedZodiacSign === sign?.name ? "text-primary-5" : ""
                }`}
              >
                {sign?.name}
              </p>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            label="Submit"
            variant="primary"
            rightIcon={ICONS.arrowRight}
            isLoading={isUpdating}
            isDisabled={isUpdating}
            onClick={handleAddZodiacSign}
            className="w-fit"
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserDashboardHome;
