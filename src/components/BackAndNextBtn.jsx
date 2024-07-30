import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { ActionContext } from "../store/store";

const BackAndNextBtn = ({ isValid }) => {
  const { page, handleSetPage, FormTitles } = useContext(ActionContext);
  return (
    <Box
      className="footer"
      sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 2, mt: 2 }}
    >
      <Button variant="contained" disabled={page === 0} onClick={() => handleSetPage(page - 1)}>
        Back
      </Button>
      <Button
        variant="contained"
        disabled={page === FormTitles.length - 1 || !isValid}
        onClick={() => handleSetPage(page + 1)}
      >
        Save and Next
      </Button>
    </Box>
  );
};

export default BackAndNextBtn;
