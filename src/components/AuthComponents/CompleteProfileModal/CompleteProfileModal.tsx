import { useState, useEffect } from "react";
import { ICONS } from "../../../assets";
import BirthInfo from "./BirthInfo";
import GenderInfo from "./GenderInfo";
import IntentsInfo from "./IntentsInfo";
import NameInfo from "./NameInfo";
import ProfileCompleted from "./ProfileCompleted";
import { FormProvider, useProfileForm } from "../../../contexts/FormContext";
import Button from "../../Reusable/Button/Button";
import { useCompleteUserProfileMutation } from "../../../redux/Features/Auth/authApi";
import { useNavigate } from "react-router-dom";

type TModalProps = {
  isModalOpen: boolean;
  children?: React.ReactNode;
  width?: string;
};

const ModalContent = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(20);
  const [countdown, setCountdown] = useState<number>(5);
  const { trigger, getValues } = useProfileForm();
  const [completeUserProfile] = useCompleteUserProfileMutation();

  useEffect(() => {
    setProgress((step / 5) * 100);
  }, [step]);

  // Countdown effect for step 5
  useEffect(() => {
    if (step === 5 && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (step === 5 && countdown === 0) {
      navigate("/dashboard");
    }
  }, [step, countdown, navigate]);

  const validateStep = async (currentStep: number): Promise<boolean> => {
    switch (currentStep) {
      case 1:
        return await trigger(["firstName", "lastName"]);
      case 2:
        return await trigger("gender");
      case 3:
        return await trigger(["dateOfBirth", "timeOfBirth", "placeOfBirth"]);
      case 4:
        return await trigger("intents");
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const isStepValid = await validateStep(step);

    if (!isStepValid) {
      return;
    }

    if (step === 4) {
      // Submit on step 4
      await handleSubmit();
    } else if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    const formData = getValues();

    try {
      const response = await completeUserProfile(formData).unwrap();

      if (response.success) {
        setStep(5);
        setCountdown(5);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
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
  const endAngle = (progress / 100) * 360;

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 z-200000000 bg-neutral-5/60 backdrop-blur-xs flex items-center justify-center font-Satoshi transition-all duration-500`}
    >
      <div
        className={`w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] h-fit max-h-[85vh] overflow-y-auto bg-white rounded-lg transition-all duration-300 relative`}
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
              <div
                className="relative size-8 rounded-full transition-all duration-500 ease-out"
                style={{
                  background: `conic-gradient(from 0deg, #D4AF37 0deg ${endAngle}deg, #E8DFC8 ${endAngle}deg 360deg)`,
                }}
              >
                <div className="absolute inset-1.5 rounded-full bg-[#F5F2EA] flex items-center justify-center"></div>
              </div>
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
          {step === 1 && <NameInfo />}
          {step === 2 && <GenderInfo />}
          {step === 3 && <BirthInfo />}
          {step === 4 && <IntentsInfo />}
          {step === 5 && <ProfileCompleted />}

          <div>
            <Button
              type="button"
              label={
                step === 4
                  ? "Submit"
                  : step === 5
                    ? "Go To Dashboard"
                    : "Continue"
              }
              variant="primary"
              rightIcon={step === 5 ? undefined : ICONS.arrowRight}
              className="w-full"
              onClick={handleNextStep}
              // isLoading={isSubmitting}
              // isDisabled={isSubmitting}
            />
            {step === 5 && (
              <p className="text-center text-neutral-5 font-GeneralSans text-sm mt-2">
                Redirecting to dashboard in{" "}
                <span className="font-medium text-primary-10">
                  {countdown} seconds
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CompleteProfileModal: React.FC<TModalProps> = ({
  isModalOpen,
  // children,
}) => {
  if (!isModalOpen) return null;

  return (
    <FormProvider>
      <ModalContent />
    </FormProvider>
  );
};

export default CompleteProfileModal;
