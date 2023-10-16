import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  businessName: Yup.string()
    .required("Enter bussiness name")
    .transform((value) => value.trim())
    .min(2, "too short"),
  description: Yup.string()
    .max(50, "description can have 50 words")
    .min(5, "add more words"),
  phone: Yup.string().matches(/^\d{10}$/, "10 numbers needed"),
  email: Yup.string().email("invalid email address"),
  location: Yup.string().min(2, "location is not valid").trim(),
  bannerImage: Yup.mixed()
    .nullable()
    .test("fileSize", "file size is to large ", (value) => {
      if (value === null) {
        return true;
      }
      if (value instanceof File && value.size) {
        return value.size <= 10000000; //10 MB
      }
      return false;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value === null) {
        return true;
      }
      if (value instanceof File && value.type) {
        return ["Image/jpeg", "image/png"].includes(value.type.toLowerCase());
      }
      return false;
    }),
});

export const editUserProfileValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Enter your username")
    .min(2, "Too short")
    .max(9, "Too long")
    .trim(),
  email: Yup.string().email("invalid email"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "10 numbers needed")
    .required("Enter your phone number"),
  Profilephoto: Yup.mixed()
    .nullable()
    .test("fileSize", "file size is to large ", (value) => {
      if (value === null) return true;
      if (value instanceof File && value.size) {
        return value.size <= 10000000; //10 MB
      }
      return false;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value === null) return true;
      if (value instanceof File && value.type) {
        return ["image/jpeg", "image/png"].includes(value.type.toLowerCase());
      }
      return false;
    }),
});

export const createPostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(80, "Title must be at most 80 characters long")
    .required(),
  description: Yup.string()
    .max(800, "Description must be at most 800 characters long")
    .required(),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "file size is to large ", (value) => {
      if (value === null) return true;
      if (value instanceof File && value.size) {
        return value.size <= 10000000; //10 MB
      }
      return false;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value === null) return true;
      if (value instanceof File && value.type) {
        return ["image/jpeg", "image/png"].includes(value.type.toLowerCase());
      }
      return false;
    }),
});

export const editPostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .max(80, "Title must be at most 80 characters long")
    .required(),
  description: Yup.string()
    .max(800, "Description must be at most 800 characters long")
    .required(),
});
