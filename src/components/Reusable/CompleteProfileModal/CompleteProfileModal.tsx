import { useState, useEffect } from "react";
import { ICONS } from "../../../assets";
import Button from "../Button/Button";
import BirthInfo from "./BirthInfo";
import GenderInfo from "./GenderInfo";
import IntentsInfo from "./IntentsInfo";
import NameInfo from "./NameInfo";
import ProfileCompleted from "./ProfileCompleted";

type TModalProps = {
  isModalOpen: boolean;
  // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  width?: string;
};

const CompleteProfileModal: React.FC<TModalProps> = ({
  isModalOpen,
  // setIsModalOpen,
  children,
  width = "w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%]",
}) => {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(20);

  useEffect(() => {
    setProgress((step / 5) * 100);
  }, [step]);

  const handleNextStep = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const getModalContent = (): { heading: string; description: string } => {
    switch (step) {
      case 1:
        return {
          heading: "What should we call you?",
          description: "This helps personalize your experience.",
        };
      case 2:
        return {
          heading: "Select your gender",
          description: "This helps us generate more accurate insights.",
        };
      case 3:
        return {
          heading: "Provide birth details",
          description: "This helps us generate more accurate Kundli insights.",
        };
      case 4:
        return {
          heading: "What would you like guidance on?",
          description: "Select your primary focus areas.",
        };
      case 5:
        return {
          heading: "Profile completed!",
          description: "Your personalized astrology experience is ready.",
        };
      default:
        return {
          heading: "",
          description: "",
        };
    }
  };

  const { heading, description } = getModalContent();

  const getGradientAngles = () => {
    const angle = (progress / 100) * 360;
    return {
      startAngle: 0,
      endAngle: angle,
    };
  };

  const { endAngle } = getGradientAngles();

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
        <div className="bg-neutral-15 px-4 py-5 rounded-t-lg border-b border-neutral-35/50">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousStep}
              className={`size-8 p-1.75 rounded-full bg-primary-25 flex items-center justify-center transition-all duration-300 ${
                step === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary-30"
              }`}
              disabled={step === 1}
            >
              <img src={ICONS.arrowLeft} alt="Previous" />
            </button>
            <div className="flex items-center gap-2">
              {/* Functional Radial Progress */}
              <div
                className="relative size-8 rounded-full transition-all duration-500 ease-out"
                style={{
                  background: `conic-gradient(from 0deg, #D4AF37 0deg ${endAngle}deg, #E8DFC8 ${endAngle}deg 360deg)`,
                }}
              >
                <div className="absolute inset-1.5 rounded-full bg-[#F5F2EA] flex items-center justify-center"></div>
              </div>

              {/* Text */}
              <div className="flex items-baseline gap-2 text-sm">
                <span className="text-neutral-5">Step {step}</span>
                <span className="text-neutral-25">of 5</span>
              </div>
            </div>
          </div>

          <h2 className="text-[21px] font-semibold text-neutral-5 mt-5">
            {heading}
          </h2>
          <p className="text-sm mt-1 text-neutral-5">{description}</p>
        </div>

        <div className="px-4 py-5 pb-8 flex flex-col gap-3 md:gap-6">
          {children}
          {step === 1 && <NameInfo />}
          {step === 2 && <GenderInfo />}
          {step === 3 && <BirthInfo />}
          {step === 4 && <IntentsInfo />}
          {step === 5 && <ProfileCompleted />}
          <div>
            <Button
              type="button"
              label={step === 5 ? "Complete" : "Continue"}
              variant="primary"
              rightIcon={step === 5 ? undefined : ICONS.arrowRight}
              className="w-full"
              onClick={handleNextStep}
              // isLoading={isLoading}
              // isDisabled={isLoading}
            />
            {step === 5 && (
              <p className="text-center text-neutral-5 font-GeneralSans text-sm mt-2">
                Redirecting to dashboard in{" "}
                <span className="font-medium text-primary-10">10 seconds</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
