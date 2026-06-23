/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../../redux/Features/User/userApi";
import SelectDropdown from "../../Reusable/SelectDropdown/SelectDropdown";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useEffect } from "react";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";

type TFormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phone: string;
  gender: string;
};
const UpdatePersonalInfo = ({
  defaultValues,
  onClose,
}: {
  defaultValues: any;
  onClose: () => void;
}) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
    setValue,
  } = useForm<TFormData>();

  useEffect(() => {
    setValue("firstName", defaultValues?.profile?.firstName);
    setValue("lastName", defaultValues?.profile?.lastName);
    setValue("phoneNumber", defaultValues?.account?.phoneNumber);
    setValue("gender", defaultValues?.profile?.gender);
  }, [setValue, defaultValues]);

  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Non-Binary",
      value: "non-binary",
    },
  ];

  const handleUpdatePersonalInfo = async (data: TFormData) => {
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
      };

      const response = await updateProfile(payload).unwrap();
      if (response?.success) {
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleUpdatePersonalInfo)}
      className="space-y-5"
    >
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
        isRequired={false}
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
        isRequired={false}
      />

      <TextInput
        label="Mobile Number"
        placeholder="Enter your mobile number"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          required: "Mobile number is required",
          minLength: {
            value: 10,
            message: "Mobile number must be at least 10 characters",
          },
          maxLength: {
            value: 10,
            message: "Mobile number must be at most 10 characters",
          },
        })}
        isRequired={false}
      />

      <SelectDropdown
        label="Gender"
        error={errors.lastName}
        options={genders}
        {...register("lastName", {
          required: "Last name is required",
          minLength: {
            value: 2,
            message: "Last name must be at least 2 characters",
          },
        })}
        isRequired={false}
      />
      
      <Button
        type="submit"
        label="Submit"
        rightIcon={ICONS.arrowRight}
        className="w-full"
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </form>
  );
};

export default UpdatePersonalInfo;
