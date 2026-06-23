/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useProfileForm } from "../../../contexts/FormContext";
import { intents } from "../../../constants/constants";

const IntentsInfo = () => {
  const { setValue, watch } = useProfileForm();
  const formSelectedIntents = watch("intents") || [];
  
  // Use local state but sync with form state
  const [selectedIntents, setSelectedIntents] = useState<string[]>(formSelectedIntents);

  // Sync local state with form state when form changes
  useEffect(() => {
    setSelectedIntents(formSelectedIntents);
  }, [formSelectedIntents]);

  const toggleIntent = (intentLabel: string) => {
    const newSelection = selectedIntents.includes(intentLabel)
      ? selectedIntents.filter(item => item !== intentLabel)
      : [...selectedIntents, intentLabel];
    
    setSelectedIntents(newSelection);
    setValue("intents", newSelection, { shouldValidate: true });
  };

  return (
    <form className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {intents?.map((intent) => {
          const isSelected = selectedIntents.includes(intent.label);

          return (
            <button
              key={intent.label}
              type="button"
              onClick={() => toggleIntent(intent.label)}
              className={`
                w-full px-4 py-3.5 rounded-lg border transition-all duration-300
                flex items-center gap-3
                ${isSelected 
                  ? "bg-primary-5 border-primary-5" 
                  : "bg-neutral-30 border-neutral-35/60 hover:border-neutral-35"
                }
                focus:outline-none focus:border-primary-5
                leading-4.5
              `}
            >
              <img 
                src={intent.icon} 
                alt={intent.label}
                className={`w-5 h-5 transition-all duration-200 ${
                  isSelected ? "brightness-0 invert" : ""
                }`}
              />
              
              <span className={`font-medium flex-1 text-left ${
                isSelected ? "text-white font-semibold" : "text-gray-700"
              }`}>
                {intent.label}
              </span>
              
              {/* Circle indicator on the right side */}
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isSelected 
                  ? "bg-white border-white" 
                  : "bg-transparent border-gray-400"
                }
              `}>
                {isSelected && (
                  <svg className="w-3 h-3 text-primary-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </form>
  );
};

export default IntentsInfo;