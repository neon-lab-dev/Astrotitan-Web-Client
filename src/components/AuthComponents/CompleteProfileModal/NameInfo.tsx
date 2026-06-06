import { useProfileForm } from "../../../contexts/FormContext";
import TextInput from "../../Reusable/TextInput/TextInput";

const NameInfo = () => {
  const {
    register,
    formState: { errors },
  } = useProfileForm();

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        error={errors.firstName}
        {...register("firstName", {
          required: "First name is required",
          minLength: {
            value: 2,
            message: "First name must be at least 2 characters",
          },
        })}
      />

      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        error={errors.lastName}
        {...register("lastName", {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        })}
      />
    </div>
  );
};

export default NameInfo;