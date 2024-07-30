import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import BackAndNextBtn from "./BackAndNextBtn";
import * as Yup from "yup";
import { useContext } from "react";
import { ActionContext } from "../store/store";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name must only contains alphabatic characters")
    .min(2, "First Name must be at lease 2 characters long")
    .max(50, "First Name must be at most 50 characters long"),
  lastName: Yup.string().matches(/^[A-Za-z]+$/, "Last Name must contains alphabatic characters"),
  address: Yup.string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters long"),
});

const FormTwo = () => {
  const { formData, handleFormChange } = useContext(ActionContext);
  return (
    <Box>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, touched, errors, isValid, setFieldValue }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <Field
                name="firstName"
                type="text"
                as={TextField}
                label="First Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                helperText={touched.firstName && errors.firstName}
                onChange={(e) => {
                  setFieldValue("firstName", e.target.value);
                  handleFormChange("firstName", e.target.value);
                }}
              />
              <Field
                name="lastName"
                type="text"
                as={TextField}
                label="Last Name"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                helperText={touched.lastName && errors.lastName}
                onChange={(e) => {
                  setFieldValue("lastName", e.target.value);
                  handleFormChange("lastName", e.target.value);
                }}
              />
              <Field
                name="address"
                type="text"
                as={TextField}
                label="Address"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                helperText={touched.address && errors.address}
                onChange={(e) => {
                  setFieldValue("address", e.target.value);
                  handleFormChange("address", e.target.value);
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
    </Box>
  );
};

export default FormTwo;
