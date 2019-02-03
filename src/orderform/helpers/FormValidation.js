import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  parent_name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("First name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  order_type: Yup.string().required("Must choose pizza ..silly"),
  quantity_pizza: Yup.number()
    .moreThan(0, "Must have 1 or more slices")
    .required("Number of slices required"),
  grade: Yup.number()
    .moreThan(0, "Grade too low")
    .lessThan(13, "Grade too high"),
  teacher: Yup.string()
    .min(2, "Too short!")
    .required("Must be a teacher name")
});
