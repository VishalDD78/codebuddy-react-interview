import { useContext } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import { Box, Paper, Typography } from "@mui/material";
import { ActionContext } from "../store/store";
import styles from "./MultiForm.module.css";

const MultiForm = () => {
  const { page, FormTitles } = useContext(ActionContext);

  const FormPageDisplay = () => {
    if (page === 0) {
      return <FormOne />;
    } else if (page === 1) {
      return <FormTwo />;
    } else {
      return <FormThree />;
    }
  };

  return (
    <Paper className={styles.form__container} elevation={10}>
      <Box sx={{ mb: 2 }} className="header">
        <Typography variant="h4">{FormTitles[page]}</Typography>
      </Box>
      <Box className="body">{FormPageDisplay()}</Box>
    </Paper>
  );
};

export default MultiForm;
