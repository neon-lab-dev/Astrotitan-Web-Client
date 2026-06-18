/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  IoArrowBack,
  IoHeartOutline,
  IoHeart,
  IoCheckmarkCircle,
} from "react-icons/io5";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FaOm } from "react-icons/fa6";
import { IMAGES } from "../../assets";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Button from "../../components/Reusable/Button/Button";

const PujaDetails = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "howToPerform" | "reviews">("description");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const puja = {
    _id: "1",
    name: "Ganapati Puja for Success",
    intent: "Career",
    category: "Ganapati Puja",
    description:
      "Invoke Lord Ganesha's blessings for success, wisdom, and removing obstacles from your path. This powerful puja is performed with 108 modaks, sacred mantras, and Vedic rituals to bring prosperity and remove all hurdles from your life. The puja is conducted by experienced Vedic priests with complete samagri.",
    imageUrls: [
      IMAGES.kundliBannerBg,
      IMAGES.kundliBannerBg,
      IMAGES.kundliBannerBg,
      IMAGES.kundliBannerBg,
    ],
    rating: 4.9,
    reviews: [
      {
        user: { firstName: "Priya", lastName: "Sharma" },
        review: "Absolutely amazing experience! The puja was performed with great devotion and accuracy.",
        rating: 5,
        images: [],
        createdAt: "2024-03-15T10:30:00Z",
      },
      {
        user: { firstName: "Amit", lastName: "Kumar" },
        review: "Very well organized. Felt the divine presence during the puja.",
        rating: 4.5,
        images: [],
        createdAt: "2024-03-10T14:20:00Z",
      },
      {
        user: { firstName: "Sneha", lastName: "Patel" },
        review: "Incredible experience! My obstacles were removed and I got a new job within a month.",
        rating: 5,
        images: [],
        createdAt: "2024-03-05T09:15:00Z",
      },
    ],
    basePrice: 999,
    discountedPrice: 799,
    targetAudience: "Professionals, Business Owners, Students, Job Seekers",
    howThisPujaPerformed:
      "1. The puja begins with Ganesh Sthapana and Kalash Sthapana\n2. 108 Ganesh mantras are chanted with modak offerings\n3. Sankalpa is taken with your name and birth details\n4. Ganapati Atharvashirsha is recited 21 times\n5. Aarti and Prasad distribution concludes the puja\n6. A detailed puja report with photos and video is provided",
    duration: "2-3 hours",
    priests: 2,
    benefits: ["Removes obstacles", "Brings success", "Enhances wisdom", "Provides clarity"],
    includes: ["108 Modaks", "Sacred Samagri", "Prasad", "Puja Report", "Photo/Video"],
  };

  // Related Pujas
  const relatedPujas = [
    { id: "2", name: "Lakshmi Puja for Wealth", image: IMAGES.kundliBannerBg, price: 1499, discountedPrice: 1299, rating: 4.8 },
    { id: "3", name: "Durga Puja for Protection", image: IMAGES.kundliBannerBg, price: 1999, discountedPrice: null, rating: 4.7 },
    { id: "4", name: "Shiva Puja for Peace", image: IMAGES.kundliBannerBg, price: 799, discountedPrice: 699, rating: 4.6 },
    { id: "5", name: "Saraswati Puja for Education", image: IMAGES.kundliBannerBg, price: 899, discountedPrice: 799, rating: 4.9 },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
        {half && <FaStarHalfAlt className="w-4 h-4 text-yellow-400 fill-current" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-4 h-4 text-neutral-35" />
        ))}
      </div>
    );
  };

  const displayedReviews = showAllReviews ? puja.reviews : puja.reviews.slice(0, 3);

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
                {puja.imageUrls.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${puja.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            {puja.imageUrls.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                className="thumb-swiper"
              >
                {puja.imageUrls.map((image: string, index: number) => (
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
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-neutral-5 leading-tight">
                    {puja.name}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-neutral-25 bg-neutral-30 px-2.5 py-0.5 rounded-full">
                      {puja.category}
                    </span>
                    <span className="text-xs text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                      {puja.intent}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2.5 rounded-full bg-neutral-30 hover:bg-neutral-15 transition-colors shrink-0 ml-3"
                >
                  {isWishlisted ? (
                    <IoHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <IoHeartOutline className="w-5 h-5 text-neutral-10" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  {renderStars(puja.rating)}
                  <span className="text-sm font-semibold text-neutral-5">
                    {puja.rating.toFixed(1)}
                  </span>
                </div>
                <span className="w-px h-4 bg-neutral-35"></span>
                <span className="text-sm text-neutral-25">
                  {puja.reviews.length} reviews
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
                  Reviews ({puja.reviews.length})
                  {activeTab === "reviews" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                  )}
                </button>
              </div>

              <div className="p-6">
                {activeTab === "description" && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-5 mb-2">Description</h3>
                      <p className="text-neutral-10 leading-relaxed text-sm">{puja.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-neutral-30">
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-25 uppercase tracking-wider mb-1">
                          Target Audience
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {puja.targetAudience.split(",").map((audience: string) => (
                            <span key={audience} className="px-2.5 py-1 bg-neutral-30 text-neutral-10 rounded-full text-xs">
                              {audience.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-25 uppercase tracking-wider mb-1">
                          Benefits
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {puja.benefits.map((benefit: string) => (
                            <span key={benefit} className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs">
                              ✦ {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "howToPerform" && (
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-5 mb-3">How This Puja is Performed</h3>
                    <div className="space-y-3">
                      {puja.howThisPujaPerformed.split("\n").map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary-5/10 text-primary-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
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
                        <div className="text-4xl font-bold text-neutral-5">{puja.rating.toFixed(1)}</div>
                        <div className="flex justify-center mt-1">{renderStars(puja.rating)}</div>
                        <div className="text-sm text-neutral-25 mt-1">{puja.reviews.length} reviews</div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = puja.reviews.filter((r: any) => Math.floor(r.rating) === star).length;
                          const percentage = puja.reviews.length > 0 ? (count / puja.reviews.length) * 100 : 0;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs text-neutral-25 w-6">{star}</span>
                              <div className="flex-1 h-1.5 bg-neutral-30 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary-5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-xs text-neutral-35 w-8">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-5">
                      {displayedReviews.map((review: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-neutral-30 flex items-center justify-center shrink-0">
                            <FaUserCircle className="w-6 h-6 text-neutral-35" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-neutral-5 text-sm">
                                {review.user.firstName} {review.user.lastName}
                              </span>
                              <span className="text-xs text-neutral-35">{formatDate(review.createdAt)}</span>
                            </div>
                            <div className="mt-0.5">{renderStars(review.rating)}</div>
                            <p className="text-sm text-neutral-10 mt-1.5 leading-relaxed">{review.review}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {puja.reviews.length > 3 && (
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="mt-4 text-sm text-primary-5 hover:text-primary-10 font-medium transition-colors"
                      >
                        {showAllReviews ? "Show Less" : `Show All ${puja.reviews.length} Reviews`}
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
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-2">
                <FaOm className="w-4 h-4 text-primary-5" />
                <span className="text-xs font-medium text-neutral-25">Sacred Ritual</span>
              </div>

              <div className="flex items-baseline gap-3">
                {puja.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary-5">
                      ₹{puja.discountedPrice}
                    </span>
                    <span className="text-base text-neutral-35 line-through">
                      ₹{puja.basePrice}
                    </span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {Math.round(((puja.basePrice - puja.discountedPrice) / puja.basePrice) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary-5">
                    ₹{puja.basePrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-35 mt-1">Inclusive of all taxes</p>

              <Button label="Book Now" className="w-full mt-4" />

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
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-5">
              <h3 className="text-sm font-semibold text-neutral-5 mb-3">This Puja Includes</h3>
              <div className="flex flex-wrap gap-2">
                {puja.includes.map((item: string) => (
                  <span key={item} className="px-3 py-1.5 bg-neutral-30 text-neutral-10 rounded-lg text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Pujas */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-30 p-5">
              <h3 className="text-sm font-semibold text-neutral-5 mb-3">Other Pujas You May Like</h3>
              <div className="space-y-3">
                {relatedPujas.map((p) => (
                  <Link
                    key={p.id}
                    to={`/puja/${p.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-30 transition-colors group"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-neutral-5 group-hover:text-primary-5 transition-colors line-clamp-1">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? 'text-yellow-400 fill-current' : 'text-neutral-35'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-neutral-25">{p.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        {p.discountedPrice ? (
                          <>
                            <span className="text-sm font-bold text-primary-5">₹{p.discountedPrice}</span>
                            <span className="text-xs text-neutral-35 line-through">₹{p.price}</span>
                          </>
                        ) : (
                          <span className="text-sm font-bold text-primary-5">₹{p.price}</span>
                        )}
                      </div>
                    </div>
                    <IoArrowBack className="w-4 h-4 text-neutral-35 rotate-180 group-hover:text-primary-5 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
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
    </div>
  );
};

export default PujaDetails;