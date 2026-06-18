/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoSearchOutline,
  IoArrowForward,
  IoGridOutline,
  IoListOutline,
} from "react-icons/io5";
import {
  FaStar,
  FaRegStar,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
  FaFire,
} from "react-icons/fa";
import { IMAGES } from "../../assets";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  // Intents Data
  const intents = [
    { label: "All", icon: "🌟", value: "All" },
    { label: "Career", icon: "💼", value: "Career" },
    { label: "Education", icon: "📚", value: "Education" },
    { label: "Marriage", icon: "💑", value: "Marriage" },
    { label: "Health", icon: "💪", value: "Health" },
    { label: "Business", icon: "📈", value: "Business" },
    { label: "Love", icon: "❤️", value: "Love" },
  ];

  // Categories Data
  const categories = [
    { label: "All", value: "All" },
    { label: "Vedic Astrology", value: "Vedic Astrology" },
    { label: "Gemstones", value: "Gemstones" },
    { label: "Puja Items", value: "Puja Items" },
    { label: "Books", value: "Books" },
    { label: "Courses", value: "Courses" },
    { label: "Consultations", value: "Consultations" },
  ];

  // Sort Options
  const sortOptions = [
    { label: "Most Popular", value: "popular" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "top-rated" },
    { label: "Newest", value: "newest" },
  ];

  // Dummy Products Data
  const products = [
    {
      id: "1",
      name: "Vedic Astrology Consultation",
      category: "Consultations",
      intent: "Career",
      price: 499,
      discountedPrice: 399,
      rating: 4.8,
      reviews: 127,
      image: IMAGES.kundliBannerBg,
      description: "Get personalized career guidance from expert astrologers",
      isFeatured: true,
      isNew: true,
    },
    {
      id: "2",
      name: "Natural Ruby Gemstone",
      category: "Gemstones",
      intent: "Marriage",
      price: 2499,
      discountedPrice: 1999,
      rating: 4.9,
      reviews: 89,
      image: IMAGES.kundliBannerBg,
      description: "Authentic ruby stone for love and relationship harmony",
      isFeatured: false,
      isNew: false,
    },
    {
      id: "3",
      name: "Complete Horoscope Report",
      category: "Vedic Astrology",
      intent: "Education",
      price: 799,
      discountedPrice: null,
      rating: 4.7,
      reviews: 215,
      image: IMAGES.kundliBannerBg,
      description: "Detailed 50-page horoscope analysis with predictions",
      isFeatured: true,
      isNew: false,
    },
    {
      id: "4",
      name: "Puja Kit - Lakshmi Puja",
      category: "Puja Items",
      intent: "Business",
      price: 1499,
      discountedPrice: 1299,
      rating: 4.6,
      reviews: 56,
      image: IMAGES.kundliBannerBg,
      description:
        "Complete puja kit with all necessary items and instructions",
      isFeatured: false,
      isNew: true,
    },
    {
      id: "5",
      name: "Learn Astrology Course",
      category: "Courses",
      intent: "Education",
      price: 2999,
      discountedPrice: 2499,
      rating: 4.9,
      reviews: 342,
      image: IMAGES.kundliBannerBg,
      description:
        "Master Vedic astrology with our comprehensive online course",
      isFeatured: false,
      isNew: false,
    },
    {
      id: "6",
      name: "Blue Sapphire Gemstone",
      category: "Gemstones",
      intent: "Career",
      price: 3999,
      discountedPrice: 3499,
      rating: 4.8,
      reviews: 78,
      image: IMAGES.kundliBannerBg,
      description: "Powerful blue sapphire for career success and prosperity",
      isFeatured: true,
      isNew: false,
    },
  ];

  // Filter products based on selected intent and category
  const filteredProducts = products.filter((product) => {
    const matchIntent =
      selectedIntent === "All" || product.intent === selectedIntent;
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchIntent && matchCategory && matchSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "top-rated":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return (b.reviews || 0) - (a.reviews || 0);
      default:
        return (b.reviews || 0) - (a.reviews || 0);
    }
  });

  const toggleWishlist = (productId: string) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
  };

  const renderStars = (rating: number = 0) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3.5 h-3.5 text-yellow-400" />
        ))}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="w-3.5 h-3.5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Breadcrumb */}
        <div className="pt-8">
          <Breadcrumb
            items={[{ label: "Products", path: "/products", isActive: true }]}
          />
        </div>

        {/* Hero Section */}
        <div className="relative mt-6 rounded-2xl overflow-hidden bg-gradient-to-r from-[#d4af37]/20 to-purple-600/20 p-8 md:p-12">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Discover Our Products
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Find authentic Vedic products, gemstones, books, and more to
              enhance your spiritual journey and bring positivity into your
              life.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-purple-600/10 rounded-full -mb-24"></div>
        </div>

        {/* Intents - Horizontal Scroll */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              Browse by Intent
            </h2>
            <span className="text-xs text-gray-400">—</span>
            <span className="text-xs text-gray-400">
              Select your area of interest
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
            {intents.map((intent) => (
              <button
                key={intent.value}
                onClick={() => setSelectedIntent(intent.value)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedIntent === intent.value
                    ? "bg-[#d4af37] text-white shadow-md scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="text-base">{intent.icon}</span>
                <span className="text-sm font-medium">{intent.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products by name or description..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm bg-white min-w-[150px]"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 transition-all text-sm bg-white min-w-[150px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-[#d4af37] text-white"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <IoGridOutline className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-[#d4af37] text-white"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <IoListOutline className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {sortedProducts.length}
            </span>{" "}
            products
            {selectedIntent !== "All" && (
              <span className="text-[#d4af37]"> • {selectedIntent}</span>
            )}
          </p>
          {sortedProducts.length === 0 && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIntent("All");
                setSelectedCategory("All");
              }}
              className="text-sm text-[#d4af37] hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid/List */}
        {sortedProducts.length > 0 ? (
          <div
            className={`mt-6 ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === "list" ? "h-48" : "h-56"
                    }`}
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isFeatured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-[#d4af37] text-white text-xs font-medium rounded-full">
                        <FaFire className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                    {product.isNew && (
                      <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                        New
                      </span>
                    )}
                    {product.discountedPrice && (
                      <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        {Math.round(
                          ((product.price - product.discountedPrice) /
                            product.price) *
                            100,
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-all"
                  >
                    {wishlist.has(product.id) ? (
                      <FaHeart className="w-4 h-4 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-4 h-4 text-gray-600" />
                    )}
                  </button>

                  {/* Intent Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                    {product.intent}
                  </div>
                </div>

                {/* Content */}
                <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-[#d4af37] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">
                    {renderStars(product.rating || 0)}
                    <span className="text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-3">
                    {product.discountedPrice ? (
                      <>
                        <span className="text-xl font-bold text-gray-900">
                          ₹{product.discountedPrice}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-green-600 font-medium">
                          Save ₹{product.price - product.discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Details
                      <IoArrowForward className="w-4 h-4" />
                    </Link>
                    <button className="px-4 py-2 bg-[#d4af37] hover:bg-[#b8941f] text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5">
                      <FaShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-12 text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any products matching your criteria. Try
              adjusting your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIntent("All");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-[#d4af37] text-white rounded-lg hover:bg-[#b8941f] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Products;
