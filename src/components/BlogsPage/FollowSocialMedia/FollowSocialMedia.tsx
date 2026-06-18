import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const FollowSocialMedia = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 text-center">
        Follow Us
      </h3>
      <div className="flex justify-center gap-3">
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/80 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Facebook"
        >
          <FaFacebook className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-linear-to-tr from-[#E4405F] to-[#F56040] hover:opacity-80 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Instagram"
        >
          <FaInstagram className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          aria-label="Twitter"
        >
          <FaTwitter className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-[#FF0000] hover:bg-[#FF0000]/80 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          aria-label="YouTube"
        >
          <FaYoutube className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#25D366]/80 text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-4 h-4" />
        </a>
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">
        Follow us for daily astrology updates
      </p>
    </div>
  );
};

export default FollowSocialMedia;
