/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
  useGetSingleAddressByIdQuery,
} from "../../../redux/Features/Address/addressApi";
import TextInput from "../../Reusable/TextInput/TextInput";
import { useForm } from "react-hook-form";
import Button from "../../Reusable/Button/Button";
import toast from "react-hot-toast";

type TAddressFormData = {
  type: "home" | "office" | "other";
  fullName: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
};

type TAddOrEditAddressFormProps = {
  actionType: "add" | "edit";
  addressId?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const AddOrEditAddressForm: React.FC<TAddOrEditAddressFormProps> = ({
  actionType,
  addressId,
  onCancel,
  onSuccess,
}) => {
  const [addressType, setAddressType] = useState<"home" | "office" | "other">(
    "home",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TAddressFormData>();

  const [addAddress] = useAddAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  // Fetch address data if editing
  const { data: addressData, isLoading: isAddressLoading } =
    useGetSingleAddressByIdQuery(addressId as string, {
      skip: actionType !== "edit" || !addressId,
    });

  // Set default values when editing
  useEffect(() => {
    if (actionType === "edit" && addressData?.data) {
      const address = addressData.data;
      setAddressType(address.type || "home");
      setValue("type", address.type || "home");
      setValue("fullName", address.fullName || "");
      setValue("phoneNumber", address.phoneNumber || "");
      setValue("alternativePhoneNumber", address.alternativePhoneNumber || "");
      setValue("addressLine1", address.addressLine1 || "");
      setValue("addressLine2", address.addressLine2 || "");
      setValue("city", address.city || "");
      setValue("state", address.state || "");
      setValue("pinCode", address.pinCode || "");
      setValue("country", address.country || "India");
    }
  }, [actionType, addressData, setValue]);

  const addressTypeOptions = [
    { label: "Home", value: "home" },
    { label: "Office", value: "office" },
    { label: "Other", value: "other" },
  ];

  const onSubmit = async (data: TAddressFormData) => {
    setIsSubmitting(true);
    try {
      if (actionType === "add") {
        const payload = {
          ...data,
          type: addressType,
        };
        await addAddress(payload).unwrap();
        toast.success("Address added successfully!");
      } else {
        await updateAddress({ id: addressId, data }).unwrap();
        toast.success("Address updated successfully!");
      }
      reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save address");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAddressLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary-5 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
      {/* Address Type Radio */}
      <div>
        <label className="text-sm font-medium text-neutral-10 block mb-2">
          Address Type <span className="text-primary-5">*</span>
        </label>
        <div className="flex items-center gap-6">
          {addressTypeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="addressType"
                value={option.value}
                checked={addressType === option.value}
                onChange={(e) => {
                  setAddressType(e.target.value as "home" | "office");
                  setValue("type", e.target.value as "home" | "office");
                }}
                className="hidden"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  addressType === option.value
                    ? "border-primary-5"
                    : "border-gray-300 group-hover:border-primary-5/50"
                }`}
              >
                {addressType === option.value && (
                  <div className="w-2 h-2 rounded-full bg-primary-5" />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  addressType === option.value
                    ? "text-primary-5 font-medium"
                    : "text-neutral-5 group-hover:text-primary-5/70"
                }`}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Full Name */}
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName}
        {...register("fullName", {
          required: "Full name is required",
        })}
      />

      {/* Phone Number */}
      <TextInput
        label="Mobile Number"
        placeholder="Enter your 10-digit mobile number"
        error={errors.phoneNumber}
        {...register("phoneNumber", {
          required: "Mobile number is required",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Please enter a valid 10-digit mobile number",
          },
        })}
      />

      {/* Alternative Phone Number */}
      <TextInput
        label="Alternative Phone Number (Optional)"
        placeholder="Enter alternative phone number"
        error={errors.alternativePhoneNumber}
        {...register("alternativePhoneNumber", {
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Please enter a valid 10-digit mobile number",
          },
        })}
        isRequired={false}
      />

      {/* Address Line 1 */}
      <TextInput
        label="Address Line 1"
        placeholder="Enter street address, building name, flat number"
        error={errors.addressLine1}
        {...register("addressLine1", {
          required: "Address line 1 is required",
        })}
      />

      {/* Address Line 2 */}
      <TextInput
        label="Address Line 2 (Optional)"
        placeholder="Enter landmark, area, locality"
        error={errors.addressLine2}
        {...register("addressLine2")}
        isRequired={false}
      />

      {/* City, State, PinCode */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextInput
          label="City"
          placeholder="Enter your city"
          error={errors.city}
          {...register("city", {
            required: "City is required",
          })}
        />

        <TextInput
          label="State"
          placeholder="Enter your state"
          error={errors.state}
          {...register("state", {
            required: "State is required",
          })}
        />

        <TextInput
          label="Pincode"
          placeholder="Enter 6-digit pincode"
          error={errors.pinCode}
          {...register("pinCode", {
            required: "Pincode is required",
            pattern: {
              value: /^[0-9]{6}$/,
              message: "Please enter a valid 6-digit pincode",
            },
          })}
        />
      </div>

      {/* Country */}
      <TextInput
        label="Country"
        placeholder="Enter your country"
        error={errors.country}
        {...register("country", {
          required: "Country is required",
        })}
      />

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          label={actionType === "add" ? "Save Address" : "Update Address"}
          variant="primary"
          className="w-full md:w-auto"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        />
        <Button
          type="button"
          label="Cancel"
          variant="secondary"
          className="w-full md:w-auto"
          onClick={onCancel}
        />
      </div>
    </form>
  );
};

export default AddOrEditAddressForm;
