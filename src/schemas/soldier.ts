import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Name is required"),
  unit: yup.object().required("Unit is required"),
  rank: yup.string().required("Rank is required"),
  serviceStartDate: yup.date().required("Service start date is required"),
  description: yup.string().required("Description is required"),
  picture: yup.string().required("Picture is required"),
  birthplace: yup.string().required("Birthplace is required"),
  dateOfBirth: yup.string().required("DOB is required"),
});
