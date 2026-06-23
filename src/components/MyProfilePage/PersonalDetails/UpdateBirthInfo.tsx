/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../../redux/Features/User/userApi";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useEffect } from "react";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import toast from "react-hot-toast";

type TFormData = {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
};

type TUpdateBirthInfoProps = {
  defaultValues?: {
    dateOfBirth?: string;
    timeOfBirth?: string;
    placeOfBirth?: string;
  };
  onClose: () => void;
};

const UpdateBirthInfo = ({
  defaultValues,
  onClose,
}: TUpdateBirthInfoProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TFormData>();

  // Set default values when available
  useEffect(() => {
    if (defaultValues) {
      // Format date for input (YYYY-MM-DD)
      if (defaultValues.dateOfBirth) {
        const date = new Date(defaultValues.dateOfBirth);
        if (!isNaN(date.getTime())) {
          setValue("dateOfBirth", date.toISOString().split("T")[0]);
        }
      }

      if (defaultValues.timeOfBirth) {
        // Format time for input (HH:MM)
        const time = defaultValues.timeOfBirth;
        if (time && time.includes(":")) {
          const [hours, minutes] = time.split(":");
          setValue(
            "timeOfBirth",
            `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
          );
        }
      }

      if (defaultValues.placeOfBirth) {
        setValue("placeOfBirth", defaultValues.placeOfBirth);
      }
    }
  }, [setValue, defaultValues]);

  const handleUpdateBirthInfo = async (data: TFormData) => {
    try {
      const payload = {
        dateOfBirth: data.dateOfBirth,
        timeOfBirth: data.timeOfBirth,
        placeOfBirth: data.placeOfBirth,
      };

      const response = await updateProfile(payload).unwrap();

      if (response?.success) {
        toast.success("Birth information updated successfully!");
        onClose();
      }
    } catch (err: any) {
      console.error("Error updating birth info:", err);
      toast.error(err?.data?.message || "Failed to update birth information");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateBirthInfo)} className="space-y-5">
      {/* Date of Birth */}
      <TextInput
        label="Date of Birth"
        placeholder="Select your date of birth"
        type="date"
        error={errors.dateOfBirth}
        {...register("dateOfBirth", {
          required: "Date of birth is required",
          validate: {
            notFuture: (value) => {
              if (!value) return true;
              const selectedDate = new Date(value);
              const today = new Date();
              return (
                selectedDate <= today || "Date of birth cannot be in the future"
              );
            },
            minAge: (value) => {
              if (!value) return true;
              const selectedDate = new Date(value);
              const today = new Date();
              let age = today.getFullYear() - selectedDate.getFullYear();
              const monthDiff = today.getMonth() - selectedDate.getMonth();

              if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < selectedDate.getDate())
              ) {
                age--;
              }
              return age >= 18 || "You must be at least 18 years old";
            },
          },
        })}
      />

      {/* Time of Birth */}
      <TextInput
        label="Time of Birth"
        placeholder="Select your time of birth"
        type="time"
        error={errors.timeOfBirth}
        {...register("timeOfBirth", {
          required: "Time of birth is required",
        })}
      />

      {/* Place of Birth */}
      <TextInput
        label="Place of Birth"
        placeholder="Enter place of birth (e.g., Mumbai, India)"
        error={errors.placeOfBirth}
        {...register("placeOfBirth", {
          required: "Place of birth is required",
          minLength: {
            value: 2,
            message: "Please enter a valid place",
          },
        })}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        label="Update Birth Information"
        rightIcon={ICONS.arrowRight}
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </form>
  );
};

export default UpdateBirthInfo;
