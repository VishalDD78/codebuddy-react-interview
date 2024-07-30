import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import BackAndNextBtn from "./BackAndNextBtn";
import * as Yup from "yup";
import { useContext } from "react";
import { ActionContext } from "../store/store";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  countryCode: Yup.string().required("Country code is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be numeric and exactly 10 digits"),
  acceptTermsAndCondition: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

const FormThree = () => {
  const { formData, handleFormChange, handleFormSubmit } = useContext(ActionContext);
  const navigate = useNavigate();
  return (
    <Box>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await handleFormSubmit();
          navigate("/posts");
        }}
      >
        {({ handleSubmit, touched, errors, isValid, values, setFieldValue }) => (
          <>
            <Form onSubmit={handleSubmit}>
              <InputLabel id="country-code">Country Code</InputLabel>
              <Field
                as={Select}
                labelId="country-code"
                fullWidth
                sx={{ mb: 2 }}
                name="countryCode"
                value={values.countryCode}
                onChange={(e) => {
                  setFieldValue("countryCode", e.target.value);
                  handleFormChange("countryCode", e.target.value);
                }}
              >
                <MenuItem value="+91">(+91)India</MenuItem>
                <MenuItem value="+1">(+1)America</MenuItem>
              </Field>
              <ErrorMessage
                name="countryCode"
                component={Typography}
                color="error"
                sx={{ mb: 2 }}
              />
              <Field
                name="phoneNumber"
                type="text"
                as={TextField}
                label="Phone Number"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                helperText={touched.phoneNumber && errors.phoneNumber}
                onChange={(e) => {
                  setFieldValue("phoneNumber", e.target.value);
                  handleFormChange("phoneNumber", e.target.value);
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Terms and Condition"
                checked={values.acceptTermsAndCondition}
                name="acceptTermsAndCondition"
                onChange={(e) => {
                  setFieldValue("acceptTermsAndCondition", e.target.checked);
                  handleFormChange("acceptTermsAndCondition", e.target.checked);
                }}
              />
              <ErrorMessage
                name="acceptTermsAndCondition"
                component={Typography}
                color="error"
                sx={{ mb: 2 }}
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

export default FormThree;
