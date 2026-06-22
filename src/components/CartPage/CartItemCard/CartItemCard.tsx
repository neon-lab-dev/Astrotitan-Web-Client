import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

// Types
export interface TCartItem {
  productId: string;
  name: string;
  image: string;
  basePrice: number;
  discountedPrice?: number | null;
  category: string;
  quantity: number;
  inStock?: boolean;
}

interface CartItemCardProps {
  item: TCartItem;
  price: number;
  originalPrice: number | null;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

const CartItemCard = ({
  item,
  price,
  originalPrice,
  onRemove,
  onUpdateQuantity,
}: CartItemCardProps) => {
  const itemId = item.productId;

  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(itemId as string, newQuantity);
  };

  const handleRemove = () => {
    onRemove(itemId as string);
  };

  // Calculate savings
  const savings = originalPrice ? originalPrice - price : 0;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border ${
        item.inStock !== false
          ? "border-gray-200"
          : "border-red-200 bg-red-50/30"
      } p-4 md:p-5 hover:shadow-md transition-shadow duration-300`}
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
          />
          {item.inStock === false && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-medium px-2 py-1 bg-red-500 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <Link
                to={`/product/${itemId}`}
                className="text-base font-semibold text-gray-900 hover:text-primary-5 transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
              <div className="flex items-center gap-2 mt-1">
                {item.discountedPrice ? (
                  <>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{originalPrice}
                    </span>
                    {savings > 0 && (
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">
                        Save ₹{savings}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    ₹{price}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            {item.inStock !== false && (
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => handleQuantityUpdate(item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                  aria-label="Decrease quantity"
                >
                  <FaMinus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityUpdate(item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                  aria-label="Increase quantity"
                >
                  <FaPlus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <IoTrashOutline className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
