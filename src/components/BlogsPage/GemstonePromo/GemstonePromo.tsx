import { Link } from "react-router-dom";

const GemstonePromo = () => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-amber-200 to-amber-400 flex items-center justify-center text-2xl">
          💎
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Gemstone Guide</h3>
          <p className="text-sm text-gray-500">Find your lucky gemstone</p>
          <Link
            to="/products"
            className="text-xs text-primary-10 font-medium hover:underline"
          >
            Discover Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GemstonePromo;
