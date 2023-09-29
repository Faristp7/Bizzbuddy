import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  businessName: Yup.string().required("Enter bussiness name"),
  description: Yup.string().max(50, "description can have 50 words"),
  phone: Yup.string().matches(/^\d{10}$/, "10 numbers needed"),
  email: Yup.string().email("invalid email address"),
  location: Yup.string().min(2 , "location is not valid"),
  tags: Yup.string().required("Add some tags"),
});

