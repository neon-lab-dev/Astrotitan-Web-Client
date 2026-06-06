import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";

interface BirthInfoFormData {
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

const BirthInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthInfoFormData>();

  const onSubmit = (data: BirthInfoFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <TextInput
        label="Date of Birth"
        placeholder="DD/MM/YYYY"
        type="date"
        error={errors.dateOfBirth}
        {...register("dateOfBirth", {
          required: "Date of birth is required",
        })}
      />

      <TextInput
        label="Time of Birth"
        placeholder="HH:MM"
        type="time"
        error={errors.timeOfBirth}
        {...register("timeOfBirth", {
          required: "Time of birth is required",
        })}
      />

      <TextInput
        label="Place of Birth"
        placeholder="Enter place of birth (e.g., Mumbai, India)"
        error={errors.placeOfBirth}
        {...register("placeOfBirth", {
          required: "Place of birth is required",
        })}
      />
    </form>
  );
};

export default BirthInfo;