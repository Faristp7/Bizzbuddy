import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Enter bussiness name"),
  description: Yup.string().max(50, "description can have 50 words"),
  phone: Yup.string().matches(/^\d{10}$/, "10 numbers needed"),
  email: Yup.string().email("invalid email address"),
  location: Yup.string().min(2, "location is not valid"),
  bannerImage: Yup.mixed()
    .test("fileSize", "file size is to large ", (value) => {
      if (value instanceof File && value.size) {
        return value.size <= 10000000;
      }
      return true;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (value instanceof File && value.type) {
        return ["Image/jpeg", "image/png"].includes(value.type);
      }
      return true;
    }),
});
