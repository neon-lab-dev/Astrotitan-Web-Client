/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "../../Reusable/Button/Button";
import { ICONS } from "../../../assets";
import {
  useResendLoginOtpMutation,
  useResendSignupOtpMutation,
  useVerifyLoginOtpMutation,
  useVerifySignupOtpMutation,
} from "../../../redux/Features/Auth/authApi";
import { setUser } from "../../../redux/Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

type TFormData = {
  email: string;
  otp: string;
};

const VerifyOtp = ({
  verifyOtpFor,
}: {
  verifyOtpFor: "login" | "signup" | null;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // API Integrations
  const [verifySignupOtp] = useVerifySignupOtpMutation();
  const [verifyLoginOtp] = useVerifyLoginOtpMutation();
  const [resendSignupOtp] = useResendSignupOtpMutation();
  const [resendLoginOtp] = useResendLoginOtpMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
    setError,
    clearErrors,
  } = useForm<TFormData>();

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [emailOrPhone, setEmailOrPhone] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const emailOrPhone = localStorage.getItem("emailOrPhone") || "";
    setEmailOrPhone(emailOrPhone);
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

  useEffect(() => {
    if (isVerified && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isVerified && countdown === 0) {
      if (verifyOtpFor === "signup") {
        window.location.href = "/complete-profile";
      } else if (verifyOtpFor === "login") {
        window.location.href = "/dashboard";
      }
    }
  }, [isVerified, countdown, verifyOtpFor]);

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
      // Submit the form programmatically
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }
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
    try {
      let response;

      if (verifyOtpFor === "signup") {
        const payload = {
          emailOrPhone,
          otp: data.otp,
        };
        response = await verifySignupOtp(payload).unwrap();

        if (response?.success) {
          dispatch(
            setUser({
              user: response?.data?.user,
              token: response?.data?.accessToken,
            }),
          );
          setIsVerified(true);
          setCountdown(5);
        } else {
          setError("otp", {
            type: "manual",
            message: response?.message || "Invalid OTP. Please try again.",
          });
        }
      } else if (verifyOtpFor === "login") {
        const payload = {
          emailOrPhone,
          otp: data.otp,
        };
        response = await verifyLoginOtp(payload).unwrap();

        if (response?.success) {
          dispatch(
            setUser({
              user: response?.data?.user,
              token: response?.data?.accessToken,
            }),
          );
          navigate("/dashboard");
        } else {
          setError("otp", {
            type: "manual",
            message: response?.message || "Invalid OTP. Please try again.",
          });
        }
      }
    } catch (err: any) {
      setError("otp", {
        type: "manual",
        message: err?.data?.message || "Invalid OTP. Please try again.",
      });
    }
  };

  const handleResend = async () => {
    setOtpValues(["", "", "", ""]);
    setValue("otp", "");
    clearErrors("otp");

    try {
      let response;

      if (verifyOtpFor === "signup") {
        const payload = {
          emailOrPhone,
        };
        response = await resendSignupOtp(payload).unwrap();
      } else if (verifyOtpFor === "login") {
        const payload = {
          emailOrPhone,
        };
        response = await resendLoginOtp(payload).unwrap();
      }

      if (response?.success) {
        setTimeLeft(120);
        setCanResend(false);
      } else {
        console.error("Resend failed:", response?.message);
      }
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
      ref={formRef}
      onSubmit={handleSubmit(handleVerifyOtp)}
      className="flex flex-col items-center gap-6 font-Nunito"
    >
      {/* OTP Error */}
      {errors?.otp && !isVerified && (
        <p className="text-red-500 text-sm text-center">
          {errors?.otp?.message}
        </p>
      )}

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
      {isSubmitting && !isVerified && (
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-primary-5 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Success Message */}
      {isVerified && (
        <p className="text-center text-neutral-5 font-GeneralSans text-sm mt-2">
          <span className="text-green-700">OTP is verified.</span> Redirecting to
          next step in{" "}
          <span className="font-medium text-primary-10">
            {countdown} seconds
          </span>
        </p>
      )}

      {/* Resend Section - Hide when verified */}
      {!isVerified && (
        <div className="flex items-center">
          {canResend ? (
            <Button
              type="button"
              label="Resend OTP"
              variant="primary"
              rightIcon={ICONS.arrowRight}
              className="w-fit"
              onClick={handleResend}
            />
          ) : (
            <p className="text-sm md:text-base leading-6 text-neutral-5">
              Didn't receive OTP? Resend in{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>
          )}
        </div>
      )}
    </form>
  );
};

export default VerifyOtp;
