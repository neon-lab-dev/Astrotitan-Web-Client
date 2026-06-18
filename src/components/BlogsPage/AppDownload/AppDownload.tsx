import { IMAGES } from "../../../assets";
import { IoDownloadOutline } from "react-icons/io5";

const AppDownload = () => {
  return (
    <div className="bg-linear-to-br from-blue-600 to-blue-800 rounded-xl p-5 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white/20 rounded-full p-3">
            <IoDownloadOutline className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Download App</h3>
            <p className="text-blue-100 text-sm">Get astrology on the go</p>
          </div>
        </div>
        <div className="flex gap-3">
          {/* Google Play Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/30 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:scale-105"
          >
            <img src={IMAGES.playStore} alt="" className="w-6" />
            <div>
              <p className="text-[10px] leading-tight text-white/70">
                GET IT ON
              </p>
              <p className="text-sm font-semibold leading-tight">Google Play</p>
            </div>
          </a>

          {/* App Store Button */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/30 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg transition-all hover:scale-105"
          >
            <img src={IMAGES.appStore} alt="" className="w-6" />
            <div>
              <p className="text-[10px] leading-tight text-white/70">
                Download on the
              </p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
