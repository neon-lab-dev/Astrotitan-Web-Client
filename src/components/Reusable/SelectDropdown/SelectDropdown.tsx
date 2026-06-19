/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface DropdownProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  isRequired?: boolean;
  selected?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: any;
  onChangeEvent?: any;
  bgColor?: string;
  borderColor?: string;
}

const SelectDropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      label,
      options,
      error,
      isRequired = true,
      isDisabled,
      value,
      onChange,
      onChangeEvent,
      bgColor="bg-neutral-30",
      borderColor="border-neutral-35/60",
      ...rest
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e);
      onChangeEvent?.(e.target.value);
    };

    return (
      <div className="flex flex-col gap-2 font-GeneralSans w-full">
        {label && (
          <label className="flex flex-row items-center w-full justify-between text-neutral-65">
            <span className="text-neutral-10/90 leading-4.5 text-[15px] font-medium tracking-[-0.16]">
              {label}{" "}
              <span className="text-primary-10">{isRequired ? "*" : ""}</span>
            </span>
          </label>
        )}
        <select
          ref={ref}
          disabled={isDisabled}
          value={value}
          required={isRequired}
          onChange={handleChange}
          className={`cursor-pointer w-full px-4 py-3.5 rounded-lg border leading-4.5 focus:outline-none focus:border-primary-5 transition duration-300 placeholder:text-neutral-5/50 placeholder:text-sm ${isDisabled ? "cursor-not-allowed bg-neutral-35" : bgColor} ${
            error ? "border-red-500" : borderColor
          }`}
          {...rest}
        >
          <option value="" disabled selected>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option?.value} className="capitalize">
              {option?.label}
            </option>
          ))}
        </select>
        {error && typeof error.message === "string" && (
          <p className="text-xs text-red-500 mt-1">{error.message}</p>
        )}
      </div>
    );
  },
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;
