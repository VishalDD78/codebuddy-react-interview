import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BackAndNextBtn from "./BackAndNextBtn";
import { useContext } from "react";
import { ActionContext } from "../store/store";

const validationSchema = Yup.object({
  emailId: Yup.string().required("Email is required").email("Invalid email address"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d.*\d)(?=.*[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least 2 capital letters, 2 small letters, 2 numbers, and 2 special characters",
    ),
});

const FormOne = () => {
  const { formData, handleFormChange } = useContext(ActionContext);
  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, errors, touched, isValid, setFieldValue }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Field
              name="emailId"
              type="email"
              as={TextField}
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              helperText={touched.emailId && errors.emailId}
              onChange={(e) => {
                setFieldValue("emailId", e.target.value);
                handleFormChange("emailId", e.target.value);
              }}
            />
            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              helperText={touched.password && errors.password}
              onChange={(e) => {
                setFieldValue("password", e.target.value);
                handleFormChange("password", e.target.value);
              }}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Save
            </Button>
          </Form>
          <BackAndNextBtn isValid={isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormOne;
