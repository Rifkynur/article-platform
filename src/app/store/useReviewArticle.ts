import { create } from "zustand";

type FormSchema = {
  title: string;
  category: string;
  content: string;
  image?: File;
};

type FormStore = {
  formData: FormSchema;
  setFormDataReview: (data: FormSchema) => void;
  resetFormData: () => void;
};

export const useFormReview = create<FormStore>((set) => ({
  formData: {
    title: "",
    category: "",
    content: "",
    image: undefined,
  },
  setFormDataReview: (data: FormSchema) => set({ formData: data }),
  resetFormData: () => set({ formData: { title: "", category: "", content: "", image: undefined } }),
}));
