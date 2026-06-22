import { useForm } from "react-hook-form";
import { ICONS } from "../../../assets";
import Button from "../../Reusable/Button/Button";
import TextInput from "../../Reusable/TextInput/TextInput";
import Textarea from "../../Reusable/TextArea/TextArea";
import { useBookPujaMutation } from "../../../redux/Features/Puja/pujaBookingApi";
import SuccessMessage from "./SuccessMessage";

type TFormData = {
  name: string;
  phoneNumber: string;
  preferredDate: string;
  purposeOfPuja: string;
};
const BookPujaForm = ({ pujaId }: { pujaId: string }) => {
  const [bookPuja, { isLoading,isSuccess }] = useBookPujaMutation();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<TFormData>();

  const handleBookPuja = async (data: TFormData) => {
    try {
      const payload = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        preferredDate: data.preferredDate,
        purposeOfPuja: data.purposeOfPuja,
        pujaId: pujaId,
      };

      await bookPuja(payload).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  return isSuccess ? (
   <SuccessMessage/>
  ) : (
    <form onSubmit={handleSubmit(handleBookPuja)}>
      <h2 className="text-2xl font-Satoshi font-semibold text-center text-neutral-5">
        Book Puja
      </h2>
      <p className="text-sm font-GeneralSans text-center mt-1 mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, beatae!
      </p>

      <div className="flex flex-col gap-5">
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.name}
          {...register("name", {
            required: "Name is required",
          })}
        />

        <TextInput
          label="Mobile Number"
          placeholder="Enter your 10-digit mobile number (e.g., 98765 43210)"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number",
            },
            minLength: {
              value: 10,
              message: "Mobile number must be exactly 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Mobile number must be exactly 10 digits",
            },
            validate: (value) => {
              if (value && /^(\d)\1{9}$/.test(value)) {
                return "Please enter a valid mobile number";
              }
              return true;
            },
          })}
        />

        <TextInput
          label="Preferred Date"
          type="date"
          placeholder="Select your preferred date and time for the puja"
          error={errors.preferredDate}
          {...register("preferredDate", {
            required: "Preferred date is required",
          })}
        />

        <Textarea
          label="Purpose of Puja"
          placeholder="Tell us why you want to perform this puja (e.g., Career growth, Marriage, Health, Business success, Family peace, Removing obstacles)"
          error={errors.purposeOfPuja}
          {...register("purposeOfPuja", {
            required: "Purpose of puja is required",
          })}
        />

        {/* {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )} */}
        <Button
          type="submit"
          label={"Submit"}
          rightIcon={ICONS.arrowRight}
          className="w-full max-w-125"
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>

      <p className="text-neutral-5 font-Satoshi text-sm mt-3 md:mt-6 text-center">
        Our team will reach out to you within 24 hours.
      </p>
    </form>
  );
};

export default BookPujaForm;
