import { Link } from "react-router-dom";
import { IoArrowBack, IoCartOutline, IoSparkles } from "react-icons/io5";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import Container from "../../components/Reusable/Container/Container";
import CartItemCard from "../../components/CartPage/CartItemCard/CartItemCard";
import OrderSummary from "../../components/CartPage/OrderSummary/OrderSummary";
import { useCart } from "../../providers/CartProvider/CartProvider";

const Cart = () => {
  const {
    cartItems,
    getCartTotal,
    getCartItemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  // Calculate totals using the cart context
  const subtotal = getCartTotal();
  const itemCount = getCartItemCount();

  // Calculate shipping (free above ₹1000)
  const shipping = subtotal > 1000 ? 0 : 49;

  // Calculate tax (5%)
  const tax = Math.round(subtotal * 0.18);

  // Calculate total
  const total = subtotal + shipping + tax;

  return (
    <div className="pt-10 pb-14">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Cart", path: "/cart", isActive: true }]}
        />

        {/* Header */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
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
                const price = item.discountedPrice || item.basePrice;
                const originalPrice = item.discountedPrice
                  ? item.basePrice
                  : null;

                return (
                  <CartItemCard
                    key={item.productId}
                    item={item}
                    price={price}
                    originalPrice={originalPrice}
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}

              {/* Clear Cart Button */}
              {cartItems.length > 1 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>

            {/* Right - Order Summary */}
            <OrderSummary
              total={total}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
            />
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
