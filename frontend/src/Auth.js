import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { sendUserAuthRequest } from "./api-helpers";
import { userActions } from "./store";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const getData = async (data) => {
    try {
      const response = await sendUserAuthRequest(data.inputs, data.signup);

      if (data.signup) {
        setSnackbar({
          open: true,
          message: "Account created successfully. Please sign in.",
          severity: "success",
        });
        return;
      }

      if (response.id) {
        localStorage.setItem("userId", response.id);
        dispatch(userActions.login());
        navigate("/movies");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Authentication failed. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <AuthForm onSubmit={getData} isAdmin={false} />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2.5 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Auth;
