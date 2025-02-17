import * as Yup from "yup";

export const GetCallvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone must be 10 digits"),
  task: Yup.string().required("Please enter a query"),
});
