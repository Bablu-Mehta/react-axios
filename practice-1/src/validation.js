import * as yup from "yup";

export const schema = yup.object().shape({
  fullname: yup.string().required("Enter Your FullName."),
  username: yup.string().required("Enter the Desired Username"),
  email: yup.string().email().required("Enter the Correct Email."),
});
