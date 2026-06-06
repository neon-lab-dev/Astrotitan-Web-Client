/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextInput from "../../Reusable/TextInput/TextInput";
import Button from "../../Reusable/Button/Button";

import { ICONS } from "../../../assets";
import { emailValidator } from "../../../utils/emailValidator";
import type { TAuthModalType } from "../../Shared/Navbar/Navbar";
import { useSignupMutation } from "../../../redux/Features/Auth/authApi";

type TFormData = {
  email: string;
  phoneNumber: string;
};

const Signup = ({
  setAuthModalType,
  setVerifyOtpFor,
}: {
  setAuthModalType: React.Dispatch<React.SetStateAction<TAuthModalType>>;
  setVerifyOtpFor: React.Dispatch<
    React.SetStateAction<"login" | "signup" | null>
  >;
}) => {
  const [signupType, setSignupType] = useState<"email" | "phoneNumber">(
    "phoneNumber",
  );
  const [signup, { isLoading }] = useSignupMutation();
  const [signupError, setSignupError] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TFormData>();

  const isEmailAuth = signupType === "email";

  const handleSignup = async (data: TFormData) => {
    try {
      const payload = {
        phoneNumber: data.phoneNumber || "",
        email: data.email || "",
        role: "user",
      };

      const response = await signup(payload).unwrap();
      if (response?.success) {
        localStorage.setItem("emailOrPhone", data.email || data.phoneNumber);
        setVerifyOtpFor("signup");
        setAuthModalType("verifyOtp");
      }
    } catch (err: any) {
      setSignupError(err?.data?.message);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSignup)}>
      {/* Input Field */}
      {isEmailAuth ? (
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          error={errors.email}
          {...register("email", {
            required: "Email is required",
            setValueAs: (value) => value?.replace(/\s+/g, "") || "",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
            validate: (value) => {
              if (!value) return true;
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
            minLength: {
              value: 10,
              message: "Please enter a valid mobile number",
            },
            maxLength: {
              value: 10,
              message: "Please enter a valid 10-digit mobile number",
            },
            pattern: {
              value: /^[0-9]+$/,
              message: "Please enter only numbers",
            },
          })}
        />
      )}

      {signupError && (
        <p className="text-red-500 text-sm mt-2">{signupError}</p>
      )}

      <div className="flex flex-col items-center justify-between mt-3 md:mt-6">
        {/* Submit Button */}
        <Button
          type="submit"
          label="Send OTP"
          variant="primary"
          rightIcon={ICONS.arrowRight}
          className="w-full"
          isDisabled={isLoading}
          isLoading={isLoading}
        />

        <div className="flex items-center justify-center gap-3 my-4">
          <hr className="w-37 h-px border border-neutral-25/60" />
          <p className="text-neutral-25 font-Satoshi text-sm">OR</p>
          <hr className="w-37 h-px border border-neutral-25/60" />
        </div>

        <Button
          type="button"
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
            type="button"
            onClick={() => setAuthModalType("login")}
            className="text-primary-10 font-medium underline"
          >
            Login
          </button>
        </div>

        {/* Terms */}
        <p className="text-center text-neutral-5 font-GeneralSans text-sm leading-6 mt-7">
          By continuing, you agree to our{" "}
          <Link
            to="/terms-and-conditions"
            target="_blank"
            className="font-medium underline"
          >
            Terms & Conditions
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
