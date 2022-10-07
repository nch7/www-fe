import * as yup from "yup";

export const propertySchema = yup.object({
  name: yup
    .string()
    .typeError("Must be a string")
    .required("Name is required"),
  boughtFrom: yup
    .string()
    .typeError("Must be a string")
    .required("Field is required"),
  location: yup
    .string()
    .typeError("Must be a string")
    .required("Location is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileSize", "The file is too large, max: 1mb", (value) => {
      if (!value) return true;
      console.log(value);
      return value.size <= 1000000;
    }),
  legalDoc: yup
    .mixed()
    .required("Legal Document is required, max: 1mb")
    .test("fileSize", "The file is too large", (value) => {
      if (!value) return true;
      return value.size <= 1000000;
    }),
});

export type PropertyFormData = yup.InferType<typeof propertySchema>;
