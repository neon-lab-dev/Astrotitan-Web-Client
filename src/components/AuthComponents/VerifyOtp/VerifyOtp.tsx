/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {
//   useVerifyOtpMutation,
//   useResendOtpMutation,
//   useVerifyResetPasswordOtpMutation,
// } from "../../../redux/features/auth/authApi";

type TFormData = {
  email: string;
  otp: string;
};

const VerifyOtp = ({
  verifyOtpFor,
}: {
  verifyOtpFor: "login" | "signup" | null;
}) => {
  console.log(verifyOtpFor);
  // API Integrations
  // const [verifyOtp] = useVerifyOtpMutation();
  // const [resendOtp, { isLoading: isResendOtpLoading }] =
  //   useResendOtpMutation();
  // const [verifyResetPasswordOtp] =
  //   useVerifyResetPasswordOtpMutation();

  // Navigation & Redux
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<TFormData>();

  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  console.log(email);
  console.log(phoneNumber);

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("signupEmail");
    const phoneNumber = localStorage.getItem("forgetPasswordPhNo");

    setEmail(email);
    setPhoneNumber(phoneNumber);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return;

    const newOtpValues = [...otpValues];

    newOtpValues[idx] = val;

    setOtpValues(newOtpValues);

    setValue("otp", newOtpValues.join(""));

    // Clear OTP error once user starts typing again
    clearErrors("otp");

    trigger("otp");

    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Auto submit when all digits are filled
    if (newOtpValues.every((digit) => digit !== "")) {
      handleSubmit(handleVerifyOtp)();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "Backspace" && otpValues[idx] === "" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (data: TFormData) => {
    console.log("OTP Submitted:", data);

    try {
      // API Payload
      // const payload = {
      //   phoneNumber,
      //   otp: data.otp,
      // };
      // API Call
      // const response = await verifyResetPasswordOtp(payload).unwrap();
      // Success Handling
      // if (response?.success) {
      //   navigate("/reset-password", {
      //     state: { navigateFrom: "verify-otp" },
      //   });
      // }
    } catch (err) {
      console.error("OTP verification failed:", err);

      setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please try again.",
      });
    }
  };

  const handleResend = async () => {
    setOtpValues(["", "", "", ""]);

    try {
      // API Payload
      // const payload = {
      //   phoneNumber,
      // };

      // API Call
      // const res = await resendOtp(payload);

      // Success Handling
      // if (res?.data?.success) {
      //   setTimeLeft(120);
      //   setCanResend(false);
      // }

      // Temporary UI Reset
      setTimeLeft(120);
      setCanResend(false);
    } catch (err) {
      console.error("Resend OTP failed:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);

    const s = seconds % 60;

    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <form
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col items-center gap-6 font-Nunito"
    >
      {/* OTP Error */}
      {/* {errors?.otp && (
          <p className="text-red-500 text-sm">
            {errors?.otp?.message}
          </p>
        )} */}

      {/* OTP Inputs */}
      <div className="flex items-center gap-5 md:gap-8">
        <div className="flex gap-2 md:gap-4 justify-center">
          {otpValues.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="one-time-code"
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[idx] = el;
              }}
              className={`bg-neutral-30 size-10 md:size-14 2xl:size-17 text-center text-xl rounded-lg lg:rounded-xl border transition-colors focus:outline-none ${
                digit && !errors.otp && !isSubmitting
                  ? "border-primary-5 text-primary-5 focus:border-primary-5"
                  : isSubmitting
                    ? "border-primary-5 opacity-40 animate-pulse text-primary-5"
                    : errors?.otp
                      ? "border-red-500 focus:border-red-500 text-red-500"
                      : "border-neutral-35 focus:border-primary-5 text-primary-5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Loading Spinner */}
      {isSubmitting && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-primary-5 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Resend Section */}
      <div className="flex items-center">
        {canResend ? (
          <Button
            type="submit"
            label="Resend OTP"
            variant="primary"
            rightIcon={ICONS.arrowRight}
            className="w-fit"
            // isLoading={isLoading}
            // isDisabled={isLoading}
            onClick={handleResend}
          />
        ) : (
          <p className="text-sm md:text-base leading-6 text-neutral-5">
            Didn't receive OTP? Resend in{" "}
            <span className="font-semibold">{formatTime(timeLeft)}</span>
          </p>
        )}
      </div>
    </form>
  );
};

export default VerifyOtp;
