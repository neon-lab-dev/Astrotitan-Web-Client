import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextInput from "../../../components/Reusable/TextInput/TextInput";
import Button from "../../../components/Reusable/Button/Button";

import { ICONS } from "../../../assets";
import { emailValidator } from "../../../utils/emailValidator";

type TFormData = {
  email: string;
  phoneNumber: string;
};

const Signup = () => {
  const [authMethod, setAuthMethod] = useState<"email" | "phoneNumber">(
    "phoneNumber",
  );

  const {
    register,
    formState: { errors },
    // handleSubmit,
    // reset,
  } = useForm<TFormData>();

  const isEmailAuth = authMethod === "email";

  const toggleAuthMethod = () => {
    setAuthMethod(isEmailAuth ? "phoneNumber" : "email");
  };

  return (
    <form
    // onSubmit={handleSubmit(handleSignup)}
    >
      <div className="flex flex-col items-center gap-6">
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

        {/* Submit Button */}
        <Button
          type="submit"
          label="Send OTP"
          variant="primary"
          rightIcon={ICONS.arrowRight}
          className="w-full max-w-125"
        />

        {/* Login Redirect */}
        <div className="font-GeneralSans flex items-center justify-center gap-1 text-sm">
          <p className="text-neutral-5">Already have an account?</p>

          <Link to="/auth/login" className="text-primary-10 font-medium">
            Login Now
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3">
          <hr className="w-37 h-px border border-neutral-25/60" />
          <p className="text-neutral-25 font-GeneralSans text-sm">OR</p>
          <hr className="w-37 h-px border border-neutral-25/60" />
        </div>

        {/* Toggle Auth Method */}
        <Button
          type="button"
          label={
            isEmailAuth
              ? "Continue with Mobile Number"
              : "Continue with Email Address"
          }
          variant="secondary"
          className="w-full max-w-125"
          leftIcon={isEmailAuth ? ICONS.phone : ICONS.email}
          onClick={toggleAuthMethod}
        />

        {/* Terms */}
        <p className="text-center text-neutral-5 font-GeneralSans text-sm leading-6">
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
