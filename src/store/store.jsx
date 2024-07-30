import { createContext, useState } from "react";

export const ActionContext = createContext();

const ActionContextProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const FormTitles = ["Form 1", "Form 2", "Form 3"];

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: true,
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  const handleFormSubmit = async () => {
    const { acceptTermsAndCondition, ...dataTosend } = formData;
    console.log(dataTosend);

    try {
      const res = await fetch("https://codebuddy.review/submit", {
        method: "POST",
        body: JSON.stringify(dataTosend),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      console.log("Submission successful", result);
    } catch (error) {
      console.log("Error during submission", error);
    }
  };

  return (
    <ActionContext.Provider
      value={{ page, handleSetPage, FormTitles, formData, handleFormChange, handleFormSubmit }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export default ActionContextProvider;
