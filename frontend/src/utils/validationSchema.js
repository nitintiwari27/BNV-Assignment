import * as yup from "yup";

/**
 * Shared Yup validation schema for Add/Edit User forms
 */
export const userSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),

  lastName: yup.string().required("Last name is required"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Please select a gender")
    .required("Gender is required"),

  status: yup
    .string()
    .oneOf(["Active", "Inactive"], "Please select a status")
    .required("Status is required"),

  location: yup.string().optional(),
});
