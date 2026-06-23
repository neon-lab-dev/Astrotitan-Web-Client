/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { zodiacSigns } from "../../../constants/constants";
import Modal from "../../Reusable/Modal/Modal";
import { useUpdateProfileMutation } from "../../../redux/Features/User/userApi";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import toast from "react-hot-toast";

type TUpdateZodiacSignModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: any;
  zodiacSign?: string;
  onSuccess?: () => void;
};

const UpdateZodiacSignModal: React.FC<TUpdateZodiacSignModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  zodiacSign,
  onSuccess,
}) => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation(
    {},
  );
  const [selectedZodiacSign, setSelectedZodiacSign] = useState<string>("");

  // Set default selected zodiac sign from props
  useEffect(() => {
    if (zodiacSign) {
      setSelectedZodiacSign(zodiacSign);
    }
  }, [zodiacSign]);

  // Reset selection when modal opens
  useEffect(() => {
    if (isModalOpen && zodiacSign) {
      setSelectedZodiacSign(zodiacSign);
    }
  }, [isModalOpen, zodiacSign]);

  const handleAddZodiacSign = async () => {
    if (!selectedZodiacSign) {
      toast.error("Please select a zodiac sign");
      return;
    }

    try {
      const payload = {
        zodiacSign: selectedZodiacSign,
      };
      const response = await updateProfile(payload).unwrap();

      if (response?.success) {
        toast.success("Zodiac sign updated successfully!");
        setIsModalOpen(false);
        onSuccess?.();
      }
    } catch (err: any) {
      console.error("Error updating zodiac sign:", err);
      toast.error(err?.data?.message || "Failed to update zodiac sign");
    }
  };

  return (
    <Modal
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      width="w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%]"
    >
      <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
        {zodiacSign ? "Update Your Zodiac Sign" : "Select Your Zodiac Sign"}
      </h2>
      <p className="text-sm font-GeneralSans text-center mt-1 mb-8">
        {zodiacSign
          ? "Update your zodiac sign for more accurate Kundli insights"
          : "It helps us generate more accurate Kundli insights"}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {zodiacSigns?.map((sign) => {
          const isSelected = selectedZodiacSign === sign?.name;

          return (
            <button
              key={sign?.name}
              onClick={() => setSelectedZodiacSign(sign?.name)}
              className={`flex flex-col items-center p-5 rounded-xl transition duration-300 relative ${
                isSelected
                  ? "bg-neutral-15 border-2 border-primary-5 shadow-md shadow-primary-5/10"
                  : "hover:bg-neutral-15 hover:border hover:border-primary-5 border-2 border-transparent"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-5 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}

              <img src={sign?.icon} alt={sign?.name} className="w-14" />
              <p
                className={`font-semibold mt-3 transition-colors ${
                  isSelected ? "text-primary-5" : "text-neutral-5"
                }`}
              >
                {sign?.name}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <Button
          type="button"
          label="Cancel"
          variant="secondary"
          onClick={() => setIsModalOpen(false)}
          className="w-fit"
        />
        <Button
          type="button"
          label={zodiacSign ? "Update" : "Submit"}
          variant="primary"
          rightIcon={ICONS.arrowRight}
          isLoading={isUpdating}
          isDisabled={isUpdating || !selectedZodiacSign}
          onClick={handleAddZodiacSign}
          className="w-fit"
        />
      </div>
    </Modal>
  );
};

export default UpdateZodiacSignModal;
