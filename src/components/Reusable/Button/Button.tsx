/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";

type TButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
};

const Button = ({
  label,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
  leftIcon,
  rightIcon,
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
      disabled={disabled}
      className={twMerge(baseStyles, variants[variant], className)}
    >
      {leftIcon && (
        <img src={leftIcon} alt="" className="size-5.25 mt-0.5" />
      )}

      <span>{label}</span>

      {rightIcon && (
        <img src={rightIcon} alt="" className="size-5.25 mt-0.5" />
      )}
    </button>
  );
};

export default Button;