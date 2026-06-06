import { useProfileForm } from "../../../contexts/FormContext";
import TextInput from "../../Reusable/TextInput/TextInput";

const BirthInfo = () => {
  const {
    register,
    formState: { errors },
  } = useProfileForm();

  return (
    <div className="w-full space-y-4">
      <TextInput
        label="Date of Birth"
        placeholder="DD/MM/YYYY"
        type="date"
        error={errors.dateOfBirth}
        {...register("dateOfBirth", {
          required: "Date of birth is required",
          validate: {
            notFuture: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              return selectedDate <= today || "Date of birth cannot be in the future";
            },
            minAge: (value) => {
              const selectedDate = new Date(value);
              const today = new Date();
              let age = today.getFullYear() - selectedDate.getFullYear();
              const monthDiff = today.getMonth() - selectedDate.getMonth();
              
              if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                age--;
              }
              return age >= 18 || "You must be at least 18 years old";
            },
          },
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
          minLength: {
            value: 2,
            message: "Please enter a valid place",
          },
        })}
      />
    </div>
  );
};

export default BirthInfo;