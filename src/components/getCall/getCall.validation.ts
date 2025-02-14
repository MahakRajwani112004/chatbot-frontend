import * as Yup from "yup";

export const GetCallvalidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().matches(/^\d{10}$/, "Phone must be 10 digits"),
  task: Yup.string().required("Please enter a query"),
});
