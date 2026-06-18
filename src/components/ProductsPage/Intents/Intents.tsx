/* eslint-disable @typescript-eslint/no-explicit-any */
const Intents = ({selectedIntent, setSelectedIntent} : any) => {
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
  return (
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
                ? "bg-primary-5 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span className="text-base">{intent.icon}</span>
            <span className="text-sm font-medium">{intent.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Intents;
