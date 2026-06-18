/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFire, FaRegStar, FaShoppingCart, FaStar } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductCard = ({ product, viewMode } : any) => {
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
    <div
      key={product.id}
      className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : ""}`}
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
            <span className="flex items-center gap-1 px-2.5 py-1 bg-primary-5 text-white text-xs font-medium rounded-full">
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
                ((product.price - product.discountedPrice) / product.price) *
                  100,
              )}
              % OFF
            </span>
          )}
        </div>

        {/* Intent Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
          {product.intent}
        </div>
      </div>

      {/* Content */}
      <div className={`p-5 ${viewMode === "list" ? "flex-1" : ""}`}>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-5 transition-colors line-clamp-1">
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
          <span className="text-sm text-gray-500">({product.reviews})</span>
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
          <button className="px-4 py-2 bg-primary-5 hover:bg-primary-10 text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5">
            <FaShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
