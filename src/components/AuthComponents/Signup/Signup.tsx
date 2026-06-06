import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";

import { ICONS } from "../../../assets";
import { emailValidator } from "../../../utils/emailValidator";
import type { TAuthModalType } from "../../Shared/Navbar/Navbar";

type TFormData = {
  email: string;
  phoneNumber: string;
};

const Signup = ({
  setAuthModalType,
}: {
  setAuthModalType: React.Dispatch<React.SetStateAction<TAuthModalType>>;
}) => {
  const [signupType, setSignupType] = useState<"email" | "phoneNumber">(
    "phoneNumber",
  );

  const {
    register,
    formState: { errors },
    // handleSubmit,
    // reset,
  } = useForm<TFormData>();

  const isEmailAuth = signupType === "email";

  return (
    <form
    // onSubmit={handleSubmit(handleSignup)}
    >
      {/* Input Field */}
      {isEmailAuth ? (
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",

            setValueAs: (value) => value.replace(/\s+/g, ""),

            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },

            validate: (value) => {
              const domain = value.split("@")[1];

              if (!domain) return true;

              const distance = emailValidator(domain, "gmail.com");

              if (distance <= 2 && domain !== "gmail.com") {
                return `Wrong Gmail format. Did you mean ${
                  value.split("@")[0]
                }@gmail.com?`;
              }

              return true;
            },
          })}
        />
      ) : (
        <TextInput
          label="Mobile Number"
          placeholder="Enter your mobile number"
          error={errors.phoneNumber}
          {...register("phoneNumber", {
            required: "Mobile number is required",
          })}
        />
      )}

      <div className="flex flex-col items-center justify-between mt-3 md:mt-6">
        {/* Submit Button */}
        <Button
          type="submit"
          label="Send OTP"
          variant="primary"
          rightIcon={ICONS.arrowRight}
          className="w-full"
        />

        <div className="flex items-center justify-center gap-3 my-4">
          <hr className="w-37 h-px border border-neutral-25/60" />
          <p className="text-neutral-25 font-Satoshi text-sm">OR</p>
          <hr className="w-37 h-px border border-neutral-25/60" />
        </div>
        <Button
          label={
            signupType === "email"
              ? "Continue with Mobile Number"
              : "Continue with Email Address"
          }
          variant="secondary"
          leftIcon={signupType === "email" ? ICONS.phone : ICONS.email}
          className="w-full"
          onClick={() =>
            setSignupType(signupType === "email" ? "phoneNumber" : "email")
          }
        />

        <div className="font-Satoshi flex items-center gap-1 my-4">
          <p className="text-neutral-5">Already have an account?</p>
          <button
            onClick={() => setAuthModalType("login")}
            className="text-primary-10 font-medium underline"
          >
            Login
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-neutral-5 font-GeneralSans text-sm leading-6 mt-7">
          By continuing, you agree to our{" "}
          <Link to="/terms-and-conditions" className="font-medium underline">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;