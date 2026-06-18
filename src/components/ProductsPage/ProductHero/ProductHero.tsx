import { IMAGES } from "../../../assets";

const ProductHero = () => {
  return (
    <div className="relative mt-6 rounded-2xl overflow-hidden h-70 md:h-80">
      {/* Background Image */}
      <img
        src={IMAGES.test}
        alt="Products banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Discover Our Products
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
            Find authentic Vedic products, gemstones, books, and more to enhance
            your spiritual journey and bring positivity into your life.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-5/20 rounded-full -mr-32 -mt-32 z-10"></div>
      <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-purple-600/20 rounded-full -mb-24 z-10"></div>
    </div>
  );
};

export default ProductHero;
