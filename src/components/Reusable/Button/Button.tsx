/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";

type TButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  isLoading?: boolean;
  loadingText?: string;
};

const Button = ({
  label,
  variant = "primary",
  className,
  onClick,
  type = "button",
  isDisabled = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText = "Loading...",
}: TButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-5 2xl:px-8 py-3 rounded-[48px] font-Satoshi font-medium leading-5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-5 border border-primary-5 text-neutral-5 hover:opacity-90",

    secondary:
      "border border-primary-5 text-neutral-5 hover:bg-primary-5/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={twMerge(baseStyles, variants[variant], className)}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin size-5.25"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <img src={leftIcon} alt="" className="size-5.25 mt-0.5" />
          )}
          <span>{label}</span>
          {rightIcon && (
            <img src={rightIcon} alt="" className="size-5.25 mt-0.5" />
          )}
        </>
      )}
    </button>
  );
};

export default Button;