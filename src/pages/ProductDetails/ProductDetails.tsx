/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  IoCartOutline,
  IoStar,
  IoStarOutline,
  IoStarHalf,
  IoShareSocial,
} from "react-icons/io5";
import {
  FaPlus,
  FaMinus,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  useGetAllProductsQuery,
  useGetSingleProductByIdQuery,
} from "../../redux/Features/Product/productApi";
import type { TProduct } from "../../types/product.type";
import toast from "react-hot-toast";
import { useCart } from "../../providers/CartProvider/CartProvider";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleProductByIdQuery(id);
  const product = data?.data || {};
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "howToUse"
  >("description");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
      typeof rating === "number" && !isNaN(rating)
        ? Math.max(0, Math.min(5, rating))
        : 0;

    const full = Math.floor(validRating);
    const half = validRating % 1 >= 0.5;
    const empty = Math.max(0, 5 - full - (half ? 1 : 0));

    return (
      <div className="flex items-center gap-0.5">
        {full > 0 &&
          [...Array(full)].map((_, i) => (
            <IoStar
              key={`full-${i}`}
              className="w-4 h-4 text-yellow-400 fill-current"
            />
          ))}
        {half && (
          <IoStarHalf className="w-4 h-4 text-yellow-400 fill-current" />
        )}
        {empty > 0 &&
          [...Array(empty)].map((_, i) => (
            <IoStarOutline
              key={`empty-${i}`}
              className="w-4 h-4 text-gray-300"
            />
          ))}
      </div>
    );
  };

  const displayedReviews = showAllReviews
    ? product?.reviews
    : product?.reviews?.slice(0, 3);

  const { data: allProducts } = useGetAllProductsQuery({});

  const otherProducts = allProducts?.data?.data?.filter(
    (product: any) => product._id !== id,
  );

  const discount = product.discountedPrice
    ? Math.round(
        ((product.basePrice - product.discountedPrice) / product.basePrice) *
          100,
      )
    : 0;

  const handleAddProductToCart = () => {
    if (!id) return;

    const payload = {
      productId: id,
      name: product.name,
      image: product.imageUrls?.[0] || "",
      basePrice: product.basePrice,
      discountedPrice: product.discountedPrice,
      category: product.category,
      discount: discount,
      quantity: quantity,
    };
    addToCart(payload);
    toast.success("Added to cart!");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleShare = async () => {
  const shareData = {
    title: product?.name || "Check out this product",
    text: `Check out ${product?.name} - ${product?.description?.substring(0, 100) || ''}`,
    url: window.location.href,
  };

  try {
    // Check if Web Share API is supported
    if (navigator.share) {
      // Mobile - Use native share dialog
      await navigator.share(shareData);
    } else {
      // Desktop - Copy link to clipboard and show toast
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  } catch (error) {
    // User cancelled or error occurred
    if (error instanceof Error && error.name !== 'AbortError') {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      } catch (clipboardError: any) {
        console.log(clipboardError);
        toast.error("Unable to share or copy link");
      }
    }
  }
};

  return (
    <div className="pt-10 pb-14 font-GeneralSans">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Products", path: "/products" },
            { label: product.name, path: `/product/${id}`, isActive: true },
          ]}
        />

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left - Images */}
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <Swiper
                modules={[Thumbs, Autoplay]} // Removed Pagination and Navigation
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                thumbs={{ swiper: thumbsSwiper }}
                className="h-[400px]"
              >
                {product?.imageUrls?.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnails */}
            {product?.imageUrls?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress={true}
                className="thumb-swiper"
              >
                {product?.imageUrls?.map((image: string, index: number) => (
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
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  {product?.name}
                </h1>
                <button onClick={handleShare} className="p-2.5 rounded-full bg-neutral-25/20 hover:bg-gray-200 transition-colors shrink-0 ml-3">
                  <IoShareSocial />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  {renderStars(product?.rating)}
                  <span className="text-sm font-semibold text-gray-700">
                    {product?.rating}
                  </span>
                </div>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="text-sm text-gray-500">
                  {product?.reviews?.length} reviews
                </span>
                <span className="w-px h-4 bg-gray-300"></span>
                <span className="text-sm text-gray-500">{product?.intent}</span>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
                  {product?.category}
                </span>
                <span className="text-xs bg-green-50 text-green-600 px-2.5 py-0.5 rounded-full">
                  {product?.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-baseline gap-3">
                {product?.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary-5">
                      ₹{product?.discountedPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product?.basePrice}
                    </span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {discount}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary-5">
                    ₹{product?.basePrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            <p className="text-neutral-10 leading-relaxed">
              {product?.whyThisWork}
            </p>

            {/* Quantity & Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                >
                  <FaMinus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product?.quantity, quantity + 1))
                  }
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                >
                  <FaPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddProductToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-primary-5 hover:bg-primary-5/10 text-neutral-5 rounded-xl font-medium transition-colors shadow-sm"
              >
                <IoCartOutline className="w-5 h-5" />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  handleAddProductToCart();
                  navigate("/cart");
                }}
                className="px-6 py-3 bg-primary-5 hover:bg-primary-5/80 text-white rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
              >
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="flex flex-col items-center text-center">
                <FaTruck className="w-5 h-5 text-primary-5 mb-1.5" />
                <span className="text-xs text-gray-600 font-medium">
                  Free Shipping
                </span>
                <span className="text-[10px] text-gray-400">
                  On orders above ₹1000
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaShieldAlt className="w-5 h-5 text-primary-5 mb-1.5" />
                <span className="text-xs text-gray-600 font-medium">
                  Secure Payment
                </span>
                <span className="text-[10px] text-gray-400">
                  100% protected
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaExchangeAlt className="w-5 h-5 text-primary-5 mb-1.5" />
                <span className="text-xs text-gray-600 font-medium">
                  Easy Returns
                </span>
                <span className="text-[10px] text-gray-400">7 days policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "description"
                    ? "text-primary-5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
                {activeTab === "description" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("howToUse")}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "howToUse"
                    ? "text-primary-5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                How to Use
                {activeTab === "howToUse" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === "reviews"
                    ? "text-primary-5"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product?.reviews?.length})
                {activeTab === "reviews" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-5" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "description" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-neutral-5 mb-2">
                      Description
                    </h3>
                    <p className="text-neutral-10 leading-relaxed">
                      {product?.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-neutral-5 mb-2">
                      Why This Works
                    </h4>
                    <p className="text-neutral-10 leading-relaxed">
                      {product?.whyThisWork}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-5 mb-2 capitalize">
                      Who can use this product
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {product?.targetAudience}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "howToUse" && (
                <div>
                  <h3 className="font-medium text-neutral-5 mb-2">
                    How to Use This Product
                  </h3>
                  <div className="space-y-3">
                    {product?.howToUse
                      .split("\n")
                      .map((step: string, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary-5/10 text-primary-5 flex items-center justify-center text-xs font-bold shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-neutral-10">{step}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  {/* Review Summary */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900">
                        {product?.rating.toFixed(1)}
                      </div>
                      <div className="flex justify-center mt-1">
                        {renderStars(product?.rating)}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {product?.reviews.length} reviews
                      </div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = product?.reviews.filter(
                          (r: any) => Math.floor(r.rating) === star,
                        ).length;
                        const percentage =
                          product?.reviews.length > 0
                            ? (count / product?.reviews.length) * 100
                            : 0;
                        return (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-6">
                              {star}
                            </span>
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-5 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400 w-8">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-5">
                    {displayedReviews?.map((review: any, index: number) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <span className="text-sm font-medium text-gray-600">
                            {review?.user?.firstName?.[0] || ""}
                            {review?.user?.lastName?.[0] || ""}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">
                              {review?.user?.firstName || ""}{" "}
                              {review?.user?.lastName || ""}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDate(review?.createdAt)}
                            </span>
                          </div>
                          <div className="mt-0.5">
                            {renderStars(review?.rating || 0)}
                          </div>
                          <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                            {review?.review || ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {product?.reviews?.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="mt-4 text-sm text-primary-5 hover:text-primary-10 font-medium transition-colors"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `Show All ${product?.reviews?.length} Reviews`}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherProducts?.map((item: TProduct) => (
              <div
                key={item?._id}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-5/30 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={item?.imageUrls[0]}
                    alt="Product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-medium rounded-full">
                    SALE
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">{item?.category}</p>
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-5 transition-colors line-clamp-1">
                    {item?.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary-5">
                      ₹{item?.basePrice}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{item?.discountedPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-0.5">
                      <IoStar className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {item?.rating === 0 ? "Not Rated Yet" : item?.rating}
                      </span>
                    </div>
                    <Link
                      to={`/product/${item?._id}`}
                      className="px-4 py-1.5 text-sm text-primary-5 border border-primary-5 rounded-lg hover:bg-primary-5 hover:text-white transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Custom Thumbnail Styles */}
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

export default ProductDetails;
