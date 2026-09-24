import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { sendAdminAuthRequest } from "./api-helpers";
import { adminActions } from "./store";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const getData = async (data) => {
    try {
      const response = await sendAdminAuthRequest(data.inputs);

      localStorage.setItem("adminId", response.id);
      localStorage.setItem("token", response.token);
      dispatch(adminActions.login());
      navigate("/user-admin");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Admin login failed.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <AuthForm onSubmit={getData} isAdmin />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2.5 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Admin;
