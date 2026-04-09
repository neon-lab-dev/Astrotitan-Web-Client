import { twMerge } from "tailwind-merge";

type TButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  label,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled = false,
}: TButtonProps) => {
  const baseStyles =
    "px-6 md:px-8 py-4 rounded-[48px] text-neutral-5 font-GeneralSans font-medium leading-5 transition-all duration-200";

  const variants = {
    primary:
      "bg-primary-5 border border-primary-5 hover:opacity-90",
    secondary:
      "border border-primary-10 hover:bg-primary-10 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(baseStyles, variants[variant], className)}
    >
      {label}
    </button>
  );
};

export default Button;