import * as yup from "yup";

export default yup.object({
  name: yup.string().required("Name is required"),
  country: yup.object().required("Country is required"),
  unit: yup.string().required("Unit is required"),
  serviceStartDate: yup.date().required("Service start date is required"),
});
