/* eslint-disable react-refresh/only-export-components */
// FormContext.tsx
import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";

export type TProfileFormData = {
  // Step 1: NameInfo
  firstName: string;
  lastName: string;
  
  // Step 2: GenderInfo
  gender: string;
  
  // Step 3: BirthInfo
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  
  // Step 4: IntentsInfo
  intents: string[];
};

const defaultValues: TProfileFormData = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
  intents: [],
};

const FormContext = createContext<UseFormReturn<TProfileFormData> | null>(null);

export const useProfileForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useProfileForm must be used within FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<TProfileFormData>({
    defaultValues,
    mode: "onChange",
  });

  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};