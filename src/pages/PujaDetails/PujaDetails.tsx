/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack, IoCheckmarkCircle } from "react-icons/io5";
import { FaStar, FaRegStar, FaStarHalfAlt, FaUserCircle } from "react-icons/fa";
import { FaOm } from "react-icons/fa6";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Button from "../../components/Reusable/Button/Button";
import Modal from "../../components/Reusable/Modal/Modal";
import BookPujaForm from "../../components/PujaPage/BookPujaForm/BookPujaForm";
import {
  useGetAllPujaQuery,
  useGetSinglePujaByIdQuery,
} from "../../redux/Features/Puja/pujaApi";
import type { TPuja } from "../../types/puja.type";
import LogoLoader from "../../components/Reusable/LogoLoader/LogoLoader";

const PujaDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSinglePujaByIdQuery(id);
  const puja = data?.data || {};
  const [activeTab, setActiveTab] = useState<
    "description" | "howToPerform" | "reviews"
  >("description");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isBookPujaModalOpen, setIsBookPujaModalOpen] =
    useState<boolean>(false);
  const { data: alPuja, isLoading: isAllPujaLoading } = useGetAllPujaQuery({});

  // Other Pujas
  const otherPujas = alPuja?.data?.pujas?.filter(
    (puja: any) => puja._id !== id,
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number = 0) => {
    // Ensure rating is a valid number
    const validRating =
      typeof rating === "number" && !isNaN(rating) ? rating : 0;

    const full = Math.floor(validRating);
    const half = validRating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
          />
        ))}
        {half && (
          <FaStarHalfAlt className="w-4 h-4 text-yellow-400 fill-current" />
        )}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-neutral-35" />
        ))}
      </div>
    );
  };

  const displayedReviews = showAllReviews
    ? puja?.reviews
    : puja?.reviews?.slice(0, 3);

  if (isLoading || isAllPujaLoading) {
    return <LogoLoader />;
  }

  return (
    <div className="pt-10 pb-14">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Pujas", path: "/pujas" },
            { label: puja.name, path: `/puja/${id}`, isActive: true },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Left Column - 65% */}
          <div className="lg:w-[65%] space-y-6">
            {/* Images */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 overflow-hidden">
              <Swiper
                modules={[Pagination, Navigation, Thumbs, Autoplay]}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                thumbs={{ swiper: thumbsSwiper }}
                className="h-100"
              >
                {puja?.imageUrls?.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${puja?.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            {puja?.imageUrls?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                className="thumb-swiper"
              >
                {puja?.imageUrls?.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div className="cursor-pointer rounded-xl overflow-hidden border-2 border-transparent hover:border-primary-5 transition-all">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Title & Basic Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-6">
              <div>
                <h1 className="text-2xl font-bold text-neutral-5 leading-tight">
                  {puja?.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-neutral-25 bg-neutral-30 px-2.5 py-0.5 rounded-full">
                    {puja?.category}
                  </span>
                  <span className="text-xs text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    {puja?.intent}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  {renderStars(puja?.rating)}
                  <span className="text-sm font-semibold text-neutral-5">
                    {puja?.rating?.toFixed(1)}
                  </span>
                </div>
                <span className="w-px h-4 bg-neutral-35"></span>
                <span className="text-sm text-neutral-25">
                  {puja?.reviews?.length} reviews
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 overflow-hidden">
              <div className="flex border-b border-neutral-30 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === "description"
                      ? "text-primary-5"
                      : "text-neutral-25 hover:text-neutral-5"
                  }`}
                >
                  Description
                  {activeTab === "description" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("howToPerform")}
                  className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === "howToPerform"
                      ? "text-primary-5"
                      : "text-neutral-25 hover:text-neutral-5"
                  }`}
                >
                  How to Perform
                  {activeTab === "howToPerform" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === "reviews"
                      ? "text-primary-5"
                      : "text-neutral-25 hover:text-neutral-5"
                  }`}
                >
                  Reviews ({puja?.reviews?.length})
                  {activeTab === "reviews" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                  )}
                </button>
              </div>

              <div className="p-6">
                {activeTab === "description" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-5 mb-2">
                        Description
                      </h3>
                      <p className="text-neutral-10 leading-relaxed text-sm">
                        {puja?.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-30">
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-25 uppercase tracking-wider mb-1">
                          Target Audience
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {puja?.targetAudience
                            ?.split(",")
                            ?.map((audience: string) => (
                              <span
                                key={audience}
                                className="px-2.5 py-1 bg-neutral-30 text-neutral-10 rounded-full text-xs"
                              >
                                {audience.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                      {/* <div>
                        <h4 className="text-xs font-semibold text-neutral-25 uppercase tracking-wider mb-1">
                          How This Puja Performed
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                            {puja?.howThisPujaPerformed}
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                )}

                {activeTab === "howToPerform" && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-5 mb-3">
                      How This Puja is Performed
                    </h3>
                    <div className="space-y-3">
                      {puja.howThisPujaPerformed
                        .split("\n")
                        .map((step: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary-5/10 text-primary-5 flex items-center justify-center text-xs font-bold shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-neutral-10 text-sm">{step}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-neutral-30">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-5">
                          {puja?.rating.toFixed(1)}
                        </div>
                        <div className="flex justify-center mt-1">
                          {renderStars(puja?.rating)}
                        </div>
                        <div className="text-sm text-neutral-25 mt-1">
                          {puja?.reviews.length} reviews
                        </div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = puja?.reviews.filter(
                            (r: any) => Math.floor(r.rating) === star,
                          ).length;
                          const percentage =
                            puja?.reviews.length > 0
                              ? (count / puja?.reviews.length) * 100
                              : 0;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs text-neutral-25 w-6">
                                {star}
                              </span>
                              <div className="flex-1 h-1.5 bg-neutral-30 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary-5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-neutral-35 w-8">
                                {count}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {displayedReviews?.map((review: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-30 flex items-center justify-center shrink-0">
                            <FaUserCircle className="w-6 h-6 text-neutral-35" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-neutral-5 text-sm">
                                {review.user.firstName} {review.user.lastName}
                              </span>
                              <span className="text-xs text-neutral-35">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <div className="mt-0.5">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-neutral-10 mt-1.5 leading-relaxed">
                              {review.review}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {puja?.reviews?.length > 3 && (
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="mt-4 text-sm text-primary-5 hover:text-primary-10 font-medium transition-colors"
                      >
                        {showAllReviews
                          ? "Show Less"
                          : `Show All ${puja?.reviews?.length} Reviews`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 35% */}
          <div className="lg:w-[35%] space-y-5">
            {/* Price & Booking Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-6 sticky top-26">
              <div className="flex items-center gap-2 mb-2">
                <FaOm className="w-4 h-4 text-primary-5" />
                <span className="text-xs font-medium text-neutral-25">
                  Sacred Ritual
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                {puja?.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary-5">
                      ₹{puja?.discountedPrice}
                    </span>
                    <span className="text-base text-neutral-35 line-through">
                      ₹{puja?.basePrice}
                    </span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {Math.round(
                        ((puja?.basePrice - puja?.discountedPrice) /
                          puja?.basePrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary-5">
                    ₹{puja?.basePrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-35 mt-1">
                Inclusive of all taxes
              </p>

              <Button
                onClick={() => setIsBookPujaModalOpen(true)}
                label="Book Now"
                className="w-full mt-4"
              />

              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-neutral-30">
                <div className="flex items-center gap-1.5 text-xs text-neutral-25">
                  <IoCheckmarkCircle className="w-3.5 h-3.5 text-green-500" />
                  Secure Payment
                </div>
                <span className="w-px h-4 bg-neutral-35"></span>
                <div className="flex items-center gap-1.5 text-xs text-neutral-25">
                  <IoCheckmarkCircle className="w-3.5 h-3.5 text-green-500" />
                  Priest Verified
                </div>
              </div>
            </div>

            {/* Includes Section */}
            {/* <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-5">
              <h3 className="text-sm font-semibold text-neutral-5 mb-3">
                This Puja Includes
              </h3>
              <div className="flex flex-wrap gap-2">
                {puja.includes.map((item: string) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-neutral-30 text-neutral-10 rounded-lg text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div> */}

            {/* Related Pujas */}
            {otherPujas?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-5">
                <h3 className="text-sm font-semibold text-neutral-5 mb-3">
                  Other Pujas You May Like
                </h3>
                <div className="space-y-3">
                  {otherPujas?.map((puja: TPuja) => (
                    <Link
                      key={puja._id}
                      to={`/puja/${puja?._id}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-30 transition-colors group"
                    >
                      <img
                        src={puja?.imageUrls[0]}
                        alt={puja?.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-neutral-5 group-hover:text-primary-5 transition-colors line-clamp-1">
                          {puja?.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(puja?.rating ?? 0) ? "text-yellow-400 fill-current" : "text-neutral-35"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-neutral-25">
                            {puja?.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {puja?.discountedPrice ? (
                            <>
                              <span className="text-sm font-bold text-primary-5">
                                ₹{puja?.discountedPrice}
                              </span>
                              <span className="text-xs text-neutral-35 line-through">
                                ₹{puja?.basePrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold text-primary-5">
                              ₹{puja?.basePrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <IoArrowBack className="w-4 h-4 text-neutral-35 rotate-180 group-hover:text-primary-5 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Custom Styles */}
      <style>{`
        .thumb-swiper .swiper-slide-thumb-active {
          border-color: #d4af37 !important;
        }
        .thumb-swiper .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .thumb-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
        .thumb-swiper .swiper-slide:hover {
          opacity: 1;
        }
      `}</style>

      <Modal
        isModalOpen={isBookPujaModalOpen}
        setIsModalOpen={setIsBookPujaModalOpen}
      >
        <BookPujaForm pujaId={puja._id} />
      </Modal>
    </div>
  );
};

export default PujaDetails;
