import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required("Enter bussiness name")
    .transform((value) => value.trim())
    .min(2, "too short"),
  description: Yup.string()
    .max(50, "description can have 50 words")
    .min(2, "add more words"),
  phone: Yup.string().matches(/^\d{10}$/, "10 numbers needed"),
  email: Yup.string().email("invalid email address"),
  location: Yup.string().min(2, "location is not valid").trim(),
  bannerImage: Yup.mixed()
    .test("fileSize", "file size is to large ", (value) => {
      if (value instanceof File && value.size) {
        return value.size <= 10000000; //10 MB
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value instanceof File && value.type) {
        return ["Image/jpeg", "image/png"].includes(value.type.toLowerCase());
      }
      return true;
    }),
});

export const editUserProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Enter you username")
    .min(2, "Too short")
    .max(9, "Too long")
    .trim(),
  email: Yup.string().email("invalid email"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "10 numbers needed")
    .required("Enter your phone number"),
  bannerImage: Yup.mixed()
    .test("fileSize", "file size is to large ", (value) => {
      if (value instanceof File && value.size) {
        return value.size <= 10000000; //10 MB
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value instanceof File && value.type) {
        return ["Image/jpeg", "image/png"].includes(value.type.toLowerCase());
      }
      return true;
    }),
});
