/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";
import { useProfileForm } from "../../../contexts/FormContext";

const GenderInfo = () => {
  const { setValue, watch } = useProfileForm();
  const formSelectedGender = watch("gender");
  const [selectedGender, setSelectedGender] = useState<string>(formSelectedGender || "");

  // Sync local state with form state
  useEffect(() => {
    setSelectedGender(formSelectedGender || "");
  }, [formSelectedGender]);

  const genders = [
    {
      id: "male",
      label: "Male",
      icon: FaMars,
    },
    {
      id: "female",
      label: "Female",
      icon: FaVenus,
    },
    {
      id: "non-binary",
      label: "Non-Binary",
      icon: FaGenderless,
    },
  ];

  const handleGenderSelect = (genderId: string) => {
    setSelectedGender(genderId);
    setValue("gender", genderId, { shouldValidate: true });
  };

  return (
    <form className="w-full">
      <div className="flex flex-col gap-3">
        {genders.map((gender) => {
          const isSelected = selectedGender === gender.id;
          const Icon = gender.icon;

          return (
            <button
              key={gender.id}
              type="button"
              onClick={() => handleGenderSelect(gender.id)}
              className={`
                w-full px-4 py-3.5 rounded-lg border transition-all duration-300
                flex items-center gap-3
                ${
                  isSelected
                    ? "border-primary-5 bg-primary-5/10"
                    : "border-neutral-35/60 bg-neutral-30 hover:border-neutral-35"
                }
                focus:outline-none focus:border-primary-5
              `}
            >
              <Icon
                className={`text-2xl text-gray-600 transition-transform duration-200 ${
                  isSelected ? "scale-110 text-primary-5" : ""
                }`}
              />
              <span
                className={`flex-1 text-left font-medium leading-4.5 ${
                  isSelected ? "text-primary-5 font-semibold" : "text-gray-700"
                }`}
              >
                {gender.label}
              </span>

              {isSelected && (
                <div className="w-2 h-2 rounded-full bg-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </form>
  );
};

export default GenderInfo;