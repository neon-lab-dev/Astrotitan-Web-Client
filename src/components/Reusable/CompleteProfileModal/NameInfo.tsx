/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";

const NameInfo = () => {
  const {
    register,
    formState: { errors },
  } = useForm<any>();
  return (
    <form className="flex flex-col gap-3 md:gap-5">
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        error={errors.firstName}
        {...register("firstName", {
          required: "First name is required",
        })}
      />

      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        error={errors.lastName}
        {...register("lastName", {
          required: "Last name is required",
        })}
      />
    </form>
  );
};

export default NameInfo;
