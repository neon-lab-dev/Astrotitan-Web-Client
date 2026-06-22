import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

const AstrologerPromo = () => {
  return (
    <div
      className="relative rounded-xl p-5 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #6B2FA0 0%, #9B4DCA 50%, #D4AF37 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)",
        }}
      ></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
              ⭐ Featured
            </span>
            <h3 className="font-bold text-lg mt-2">Talk to an Astrologer</h3>
            <p className="text-white/80 text-sm">Personalized guidance</p>
            <Link to="/astrologer" className="mt-3 flex items-center gap-1.5 px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors w-fit">
              Book Now
              <IoArrowForward className="w-3 h-3" />
            </Link>
          </div>
          <div className="text-4xl">🔮</div>
        </div>
      </div>
    </div>
  );
};

export default AstrologerPromo;
