import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onSubmit, isAdmin }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ inputs, signup: isAdmin ? false : isSignup });
  };

  return (
    <Dialog
      open
      onClose={() => navigate("/")}
      PaperProps={{
        sx: {
          width: "min(460px, calc(100vw - 32px))",
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          p: 4,
          background: "linear-gradient(135deg,#171923,#312e81)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            mx: "auto",
            mb: 2,
            display: "grid",
            placeItems: "center",
            borderRadius: "50%",
            background: "rgba(255,255,255,.12)",
          }}
        >
          {isSignup ? <PersonAddRoundedIcon /> : <LockRoundedIcon />}
        </Box>

        <Typography variant="h4" fontWeight={800}>
          {isSignup ? "Create account" : isAdmin ? "Admin login" : "Welcome back"}
        </Typography>

        <Typography sx={{ mt: 1, color: "rgba(255,255,255,.7)" }}>
          {isSignup
            ? "Create your CineBook account to start booking."
            : "Sign in to continue to CineBook."}
        </Typography>
      </Box>

      <Box sx={{ p: { xs: 3, sm: 4 } }}>
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 10, right: 10, color: "#fff" }}
        >
          <ClearRoundedIcon />
        </IconButton>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={1.5}>
            {!isAdmin && isSignup && (
              <>
                <FormLabel>Name</FormLabel>
                <TextField
                  value={inputs.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Your name"
                  fullWidth
                  required
                />
              </>
            )}

            <FormLabel>Email</FormLabel>
            <TextField
              value={inputs.email}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="you@example.com"
              fullWidth
              required
            />

            <FormLabel>Password</FormLabel>
            <TextField
              value={inputs.password}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter your password"
              fullWidth
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.4,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              }}
            >
              {isSignup ? "Create account" : "Sign in"}
            </Button>

            {!isAdmin && (
              <Button
                onClick={() => setIsSignup((value) => !value)}
                sx={{
                  mt: 1,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "New here? Create an account"}
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default AuthForm;
