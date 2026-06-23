/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../../redux/Features/User/userApi";
import { useEffect, useState } from "react";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import toast from "react-hot-toast";
import { intents } from "../../../constants/constants";

type TFormData = {
  intents: string[];
};

type TUpdateIntentsInfoProps = {
  defaultValues?: {
    intents?: string[];
  };
  onClose: () => void;
};

const UpdateIntentsInfo = ({
  defaultValues,
  onClose,
}: TUpdateIntentsInfoProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [selectedIntents, setSelectedIntents] = useState<string[]>([]);

  const { setValue } = useForm<TFormData>();

  // Set default values when available
  useEffect(() => {
    if (defaultValues?.intents) {
      setSelectedIntents(defaultValues.intents);
      setValue("intents", defaultValues.intents);
    }
  }, [defaultValues, setValue]);

  const toggleIntent = (intentLabel: string) => {
    const newSelection = selectedIntents.includes(intentLabel)
      ? selectedIntents.filter((item) => item !== intentLabel)
      : [...selectedIntents, intentLabel];

    setSelectedIntents(newSelection);
    setValue("intents", newSelection, { shouldValidate: true });
  };

  const handleUpdateIntents = async () => {
    if (selectedIntents.length === 0) {
      toast.error("Please select at least one intent");
      return;
    }

    try {
      const payload = {
        intents: selectedIntents,
      };

      const response = await updateProfile(payload).unwrap();

      if (response?.success) {
        toast.success("Intents updated successfully!");
        onClose();
      }
    } catch (err: any) {
      console.error("Error updating intents:", err);
      toast.error(err?.data?.message || "Failed to update intents");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateIntents();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {intents?.map((intent) => {
          const isSelected = selectedIntents.includes(intent.label);

          return (
            <button
              key={intent.label}
              type="button"
              onClick={() => toggleIntent(intent.label)}
              className={`
                w-full px-4 py-3.5 rounded-lg border transition-all duration-300
                flex items-center gap-3
                ${
                  isSelected
                    ? "bg-primary-5/30 border-primary-5 shadow-md shadow-primary-5/20"
                    : "bg-neutral-30 border-neutral-35/60 hover:border-neutral-35 hover:bg-neutral-20/50"
                }
                focus:outline-none focus:border-primary-5
                leading-4.5 group
              `}
            >
              {/* Intent Icon */}
              <img
                src={intent.icon}
                alt={intent.label}
                className={`w-5 h-5 transition-all duration-200`}
              />

              {/* Intent Label */}
              <span
                className={`font-medium flex-1 text-left ${
                  isSelected ? "text-neutral-5 font-semibold" : "text-gray-700"
                }`}
              >
                {intent.label}
              </span>

              {/* Selection Indicator */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                  ${
                    isSelected
                      ? "bg-primary-5 border-primary-5/40"
                      : "bg-transparent border-gray-400 group-hover:border-primary-5"
                  }
                `}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3 text-white"
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
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        label={
          selectedIntents.length > 0
            ? "Update Intents"
            : "Select at least one intent"
        }
        rightIcon={ICONS.arrowRight}
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading || selectedIntents.length === 0}
      />
    </form>
  );
};

export default UpdateIntentsInfo;
