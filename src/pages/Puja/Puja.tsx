import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import PujaCard from "../../components/PujaPage/PujaCard/PujaCard";
import { useGetAllPujaQuery } from "../../redux/Features/Puja/pujaApi";
import type { TPuja } from "../../types/puja.type";

const Puja = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data } = useGetAllPujaQuery({
    keyword: searchTerm,
    category: selectedCategory,
    intent: selectedIntent,
  });

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
    { label: "Rudra", value: "Rudra" },
    { label: "Ganapati", value: "Ganapati" },
    { label: "Lakshmi", value: "Lakshmi" },
    { label: "Durga", value: "Durga" },
    { label: "Shiva", value: "Shiva" },
    { label: "Saraswati", value: "Saraswati" },
    { label: "Hanuman", value: "Hanuman" },
  ];

  const pujas = data?.data?.pujas as TPuja[];
  console.log(pujas);

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
              className="bg-white px-3 py-2.25 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-5 text-sm cursor-pointer"
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
            <span className="font-semibold text-gray-900">{pujas?.length}</span>{" "}
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
        {pujas?.length > 0 ? (
          <div className="space-y-6 mt-6">
            {pujas?.map((puja: TPuja) => (
              <PujaCard puja={puja} key={puja?._id} />
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
