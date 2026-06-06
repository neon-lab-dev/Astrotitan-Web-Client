import { ICONS } from "../../../assets";

type TModalProps = {
  isModalOpen: boolean;
  // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
};
const CompleteProfileModal: React.FC<TModalProps> = ({
  isModalOpen,
  // setIsModalOpen,
  children,
  width = "w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%]",
}) => {
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-200000000 bg-neutral-5/60 backdrop-blur-xs flex items-center justify-center font-Nunito transition-all duration-500 font-Satoshi`}
    >
      <div
        className={`${
          isModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${width} h-fit max-h-[70vh] overflow-y-auto bg-white rounded-lg transition-all duration-300 relative`}
      >
        {/* Header */}
        <div className="bg-neutral-15 px-4 py-5 rounded-t-lg border-b border-neutral-35">
          <div className="flex items-center justify-between">
            <button className="size-6 rounded-full bg-primary-25 flex items-center justify-center">
              <img src={ICONS.arrowLeft} alt="" />
            </button>
            <div className="flex items-center gap-2">
              {/* Radial Progress */}
              <div
                className="relative h-16 w-16 rounded-full"
                style={{
                  background:
                    "conic-gradient(#D4AF37 0deg 180deg, #E8DFC8 180deg 360deg)",
                }}
              >
                <div className="absolute inset-3 rounded-full bg-[#F5F2EA]" />
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-2 text-sm">
                <span className="text-neutral-5">Step 3</span>
                <span className="text-neutral-25">of 6</span>
              </div>
            </div>
          </div>

          <h2 className="text-[21px] font-semibold text-neutral-5 mt-5">
            Select your date of birth
          </h2>
          <p className="text-sm mt-2 text-neutral-5">
            Used to calculate your birth chart accurately.
          </p>
        </div>

        <div className="px-4 py-5">{children}</div>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
