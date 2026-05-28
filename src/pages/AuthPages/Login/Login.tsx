import { useForm } from "react-hook-form";
import TextInput from "../../../components/Reusable/TextInput/TextInput";
import { emailValidator } from "../../../utils/emailValidator";
import Button from "../../../components/Reusable/Button/Button";
import { ICONS } from "../../../assets";
import { Link } from "react-router-dom";
import { useState } from "react";

type TFormData = {
  email: string;
  phoneNumber: string;
};

const Login = () => {
  const [loginType, setLoginType] = useState<"email" | "phoneNumber">(
    "phoneNumber",
  );
  const {
    register,
    // handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<TFormData>();
  return (
    <form
    //   onSubmit={handleSubmit(handleSigIn)}
    >
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex flex-col gap-6">
          {loginType === "email" ? (
            <TextInput
              label="Email"
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
                    return (
                      "Wrong Gmail Format. Did you mean " +
                      value.split("@")[0] +
                      "@gmail.com?"
                    );
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
        </div>

        <div className="flex flex-col gap-6 items-center justify-between">
          <Button
            type="submit"
            label="Send OTP"
            variant="primary"
            rightIcon={ICONS.arrowRight}
            className="w-full max-w-125"
            // isLoading={isLoading}
            // isDisabled={isLoading}
          />

          <div className="font-GeneralSans flex items-center gap-1">
            <p className="text-neutral-5">New User?</p>
            <Link to="/auth/signup" className="text-primary-10 font-medium">
              Signup Now
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3">
            <hr className="w-37 h-px border border-neutral-25/60" />
            <p className="text-neutral-25 font-GeneralSans text-sm">OR</p>
            <hr className="w-37 h-px border border-neutral-25/60" />
          </div>
          <Button
            label={
              loginType === "email"
                ? "Login with Email Address"
                : "Login with Mobile Number"
            }
            variant="secondary"
            leftIcon={loginType === "email" ? ICONS.email : ICONS.phone}
            className="w-full max-w-125"
            onClick={() =>
              setLoginType(loginType === "email" ? "phoneNumber" : "email")
            }
          />

          <p className="text-neutral-5 font-GeneralSans text-sm">
            By continuing, you agree to our{" "}
            <Link to="/terms-and-conditions" className="font-medium underline">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
