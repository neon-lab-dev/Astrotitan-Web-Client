import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoArrowBack,
  IoTrashOutline,
  IoCartOutline,
  IoSparkles,
} from "react-icons/io5";
import {
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaGift,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";
import { IMAGES } from "../../assets";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Vedic Astrology Consultation",
      category: "Consultations",
      price: 499,
      discountedPrice: 399,
      quantity: 1,
      image: IMAGES.kundliBannerBg,
      inStock: true,
    },
    {
      id: "2",
      name: "Natural Ruby Gemstone",
      category: "Gemstones",
      price: 2499,
      discountedPrice: 1999,
      quantity: 2,
      image: IMAGES.kundliBannerBg,
      inStock: true,
    },
    {
      id: "3",
      name: "Complete Horoscope Report",
      category: "Vedic Astrology",
      price: 799,
      discountedPrice: null,
      quantity: 1,
      image: IMAGES.kundliBannerBg,
      inStock: false,
    },
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discountedPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  const discount = cartItems.reduce((sum, item) => {
    if (item.discountedPrice) {
      return sum + (item.price - item.discountedPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const shipping = subtotal > 1000 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        {/* Breadcrumb */}
        <div className="pt-8">
          <Breadcrumb
            items={[{ label: "Cart", path: "/cart", isActive: true }]}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-2 text-gray-500 hover:text-primary-5 transition-colors text-sm"
          >
            <IoArrowBack className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            {/* Left - Cart Items */}
            <div className="lg:w-[65%] space-y-4">
              {/* Cart Items List */}
              {cartItems.map((item) => {
                const price = item.discountedPrice || item.price;
                const originalPrice = item.discountedPrice ? item.price : null;

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl shadow-sm border ${
                      item.inStock
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
                        {!item.inStock && (
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
                              to={`/product/${item.id}`}
                              className="text-base font-semibold text-gray-900 hover:text-primary-5 transition-colors line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.discountedPrice ? (
                                <>
                                  <span className="text-lg font-bold text-gray-900">
                                    ₹{price}
                                  </span>
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{originalPrice}
                                  </span>
                                  <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">
                                    Save ₹{discount}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-gray-900">
                                  ₹{price}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          {item.inStock && (
                            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                              >
                                <FaMinus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors text-gray-600 hover:text-gray-900"
                              >
                                <FaPlus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => removeItem(item.id)}
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
              })}
            </div>

            {/* Right - Order Summary */}
            <div className="lg:w-[35%] space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3 py-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium text-gray-900">
                      ₹{tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary-5">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-4 py-3.5 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-semibold transition-colors shadow-sm flex items-center justify-center gap-2">
                  <FaShoppingBag className="w-4 h-4" />
                  Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <FaShieldAlt className="w-3.5 h-3.5 text-primary-5" />
                    <span>Secure Payment</span>
                  </div>
                  <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>UPI</span>
                  </div>
                  <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>PhonePe</span>
                  </div>
                  <span className="w-px h-4 bg-gray-200 hidden sm:block"></span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-primary-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span>Paytm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="mt-12 text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <IoCartOutline className="w-12 h-12 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 max-w-sm mx-auto">
              Looks like you haven't added any products to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary-5 hover:bg-[#b8941f] text-white rounded-xl font-medium transition-colors shadow-sm"
            >
              Start Shopping
              <IoSparkles className="w-4 h-4" />
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cart;
