import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IMAGES } from "../../assets";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import PujaCard from "../../components/PujaPage/PujaCard/PujaCard";

const Puja = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Intents - Horizontal scroll on top
  const intents = [
    { label: "All", icon: "🔱", value: "All" },
    { label: "Career", icon: "💼", value: "Career" },
    { label: "Education", icon: "📚", value: "Education" },
    { label: "Marriage", icon: "💑", value: "Marriage" },
    { label: "Health", icon: "💪", value: "Health" },
    { label: "Wealth", icon: "💰", value: "Wealth" },
    { label: "Peace", icon: "🕊️", value: "Peace" },
  ];

  const categories = [
    { label: "All Deities", value: "All" },
    { label: "Ganapati", value: "Ganapati" },
    { label: "Lakshmi", value: "Lakshmi" },
    { label: "Durga", value: "Durga" },
    { label: "Shiva", value: "Shiva" },
    { label: "Saraswati", value: "Saraswati" },
    { label: "Hanuman", value: "Hanuman" },
  ];

  const pujas = [
    {
      id: "1",
      name: "Ganapati Puja for Success",
      deity: "Ganapati",
      category: "Ganapati",
      intent: "Career",
      description:
        "Invoke Lord Ganesha's blessings for success, wisdom, and removing obstacles from your path. This powerful puja is performed with 108 modaks and sacred mantras.",
      price: 999,
      discountedPrice: 799,
      rating: 4.9,
      reviews: 156,
      image: IMAGES.kundliBannerBg,
      duration: "2-3 hours",
      priests: 2,
      isFeatured: true,
      isNew: true,
      benefits: ["Removes obstacles", "Brings success", "Enhances wisdom"],
    },
    {
      id: "2",
      name: "Lakshmi Puja for Wealth & Prosperity",
      deity: "Lakshmi",
      category: "Lakshmi",
      intent: "Wealth",
      description:
        "Attract abundance, prosperity, and financial stability with Goddess Lakshmi's divine blessings. Includes special rituals for wealth manifestation.",
      price: 1499,
      discountedPrice: 1299,
      rating: 4.8,
      reviews: 89,
      image: IMAGES.kundliBannerBg,
      duration: "3-4 hours",
      priests: 3,
      isFeatured: false,
      isNew: false,
      benefits: ["Financial growth", "Business success", "Material abundance"],
    },
    {
      id: "3",
      name: "Durga Puja for Protection & Strength",
      deity: "Durga",
      category: "Durga",
      intent: "Health",
      description:
        "Seek protection and inner strength from Goddess Durga. This puja includes chanting of Durga Saptashati and powerful mantras for courage.",
      price: 1999,
      discountedPrice: null,
      rating: 4.7,
      reviews: 215,
      image: IMAGES.kundliBannerBg,
      duration: "4-5 hours",
      priests: 4,
      isFeatured: true,
      isNew: false,
      benefits: ["Protection", "Inner strength", "Courage"],
    },
    {
      id: "4",
      name: "Shiva Puja for Inner Peace",
      deity: "Shiva",
      category: "Shiva",
      intent: "Peace",
      description:
        "Find inner peace, mental clarity, and spiritual growth with Lord Shiva's blessings. Includes Rudra Abhishekam and Maha Mrityunjaya mantra chanting.",
      price: 799,
      discountedPrice: 699,
      rating: 4.6,
      reviews: 56,
      image: IMAGES.kundliBannerBg,
      duration: "2-3 hours",
      priests: 2,
      isFeatured: false,
      isNew: true,
      benefits: ["Mental peace", "Spiritual growth", "Stress relief"],
    },
  ];

  return (
    <div className="pt-10 pb-14">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Pujas", path: "/pujas", isActive: true }]}
        />

        {/* Intents*/}
        <div className="mt-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-gray-500">
              Filter by Intent:
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {intents.map((intent) => (
              <button
                key={intent.value}
                onClick={() => setSelectedIntent(intent.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-sm ${
                  selectedIntent === intent.value
                    ? "bg-primary-5 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="text-base">{intent.icon}</span>
                {intent.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Bar*/}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {/* Search Bar - Prominent */}
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
          <div className="hidden md:flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white px-3 py-[9px] rounded-xl border border-gray-200 focus:outline-none focus:border-primary-5 text-sm cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">{pujas.length}</span>{" "}
            divine rituals
          </span>
          {selectedIntent !== "All" && (
            <span className="text-xs bg-primary-5/10 text-primary-5 px-2 py-0.5 rounded-full">
              {selectedIntent}
            </span>
          )}
          {selectedCategory !== "All" && (
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
              {selectedCategory}
            </span>
          )}
        </div>

        {/* Puja Cards - Full width, one per row */}
        {pujas.length > 0 ? (
          <div className="space-y-6 mt-6">
            {pujas.map((puja) => (
              <PujaCard puja={puja} key={puja.id} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16">
            <div className="text-6xl mb-4">🪔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No pujas found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any pujas matching your criteria. Try adjusting
              your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIntent("All");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-primary-5 text-white rounded-lg hover:bg-primary-10 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Puja;
