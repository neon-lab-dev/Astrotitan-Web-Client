import { useState } from "react";
import {
  IoSearchOutline,
  IoGridOutline,
  IoListOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { IMAGES } from "../../assets";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import ProductHero from "../../components/ProductsPage/ProductHero/ProductHero";
import Intents from "../../components/ProductsPage/Intents/Intents";
import ProductCard from "../../components/ProductsPage/ProductCard/ProductCard";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  return (
    <div className="pt-10 pb-14">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Products", path: "/products", isActive: true }]}
        />
        <ProductHero />
        <Intents
          selectedIntent={selectedIntent}
          setSelectedIntent={setSelectedIntent}
        />

        {/* Filters and Search */}
        <div className="mt-6 ">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-5 focus:ring-2 focus:ring-primary-5/15 transition-all text-sm bg-white hover:bg-white placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="relative min-w-40">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-5 focus:ring-2 focus:ring-primary-5/15 transition-all text-sm bg-white hover:bg-white appearance-none cursor-pointer pr-10"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-primary-5 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IoGridOutline className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-primary-5 text-white shadow-sm"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <IoListOutline className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Active Filters Count */}
              {(selectedCategory !== "All" || searchTerm) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  <IoCloseOutline className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {products.length}
            </span>{" "}
            products
            {selectedIntent !== "All" && (
              <span className="text-primary-5"> • {selectedIntent}</span>
            )}
          </p>
          {products.length === 0 && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIntent("All");
                setSelectedCategory("All");
              }}
              className="text-sm text-primary-5 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Product Grid/List */}
        {products.length > 0 ? (
          <div
            className={`mt-6 ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }`}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
              />
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
              className="mt-4 px-6 py-2 bg-primary-5 text-white rounded-lg hover:bg-primary-10 transition-colors"
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
