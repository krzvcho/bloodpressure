import { Modal, Box, Typography, Button } from "@mui/material";
import { useGlobalErrorsStore } from "../../../stores/useGlobalErrorsStore";
import { redirect } from "react-router-dom";

export const AuthErrorModal = () => {
  const { authErrors, clearAuthErrors } = useGlobalErrorsStore();
  const isOpen = authErrors.length > 0;

  const handleClose = () => {
    clearAuthErrors();
    redirect("/auth");
  };

  console.log("AuthErrorModal authErrors:", authErrors);
  return (
    <Modal open={isOpen} onClose={clearAuthErrors}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Authentication Error
        </Typography>
        <Typography variant="body2" color="error" mb={3}>
          {authErrors.join(" ")}
        </Typography>
        <Button variant="contained" onClick={handleClose} fullWidth>
          OK
        </Button>
      </Box>
    </Modal>
  );
};
