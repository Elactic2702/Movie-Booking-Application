import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import { getAllMovies } from "./api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.error("Header movie search:", err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15, 15, 25, .96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          maxWidth: 1280,
          width: "100%",
          mx: "auto",
          gap: 2,
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: "fit-content",
            mr: { xs: 0, md: 3 },
          }}
        >
          <IconButton
            sx={{
              color: "#a78bfa",
              background: "rgba(124,58,237,.15)",
              "&:hover": { background: "rgba(124,58,237,.25)" },
            }}
          >
            <TheaterComedyRoundedIcon />
          </IconButton>

          <Typography
            fontWeight={900}
            sx={{
              display: { xs: "none", sm: "block" },
              letterSpacing: 0.5,
            }}
          >
            CineBook
          </Typography>
        </Box>

        <Autocomplete
          freeSolo
          size="small"
          options={movies}
          getOptionLabel={(movie) =>
            typeof movie === "string" ? movie : movie.title || ""
          }
          onChange={(event, movie) => {
            if (movie && typeof movie !== "string") {
              navigate(`/booking/${movie.id}`);
            }
          }}
          sx={{
            flex: 1,
            maxWidth: 430,
            mx: "auto",
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: 3,
              background: "rgba(255,255,255,.08)",
              "& fieldset": { borderColor: "rgba(255,255,255,.14)" },
              "&:hover fieldset": { borderColor: "rgba(167,139,250,.7)" },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "rgba(255,255,255,.65)",
              opacity: 1,
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Search movies..." />
          )}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, md: 1 },
            ml: "auto",
          }}
        >
          <Button
            component={Link}
            to="/movies"
            sx={{ color: "#fff", textTransform: "none", fontWeight: 700 }}
          >
            Movies
          </Button>

          {!isAdminLoggedIn && !isUserLoggedIn && (
            <>
              <Button
                component={Link}
                to="/auth"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                  display: { xs: "none", sm: "inline-flex" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/admin"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,.35)",
                  borderRadius: 2.5,
                  textTransform: "none",
                  display: { xs: "none", sm: "inline-flex" },
                }}
              >
                Admin
              </Button>
            </>
          )}

          {isUserLoggedIn && (
            <>
              <Button
                component={Link}
                to="/user"
                sx={{ color: "#fff", textTransform: "none", fontWeight: 700 }}
              >
                Profile
              </Button>
              <Button
                onClick={() => logout(false)}
                sx={{
                  color: "#c4b5fd",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Logout
              </Button>
            </>
          )}

          {isAdminLoggedIn && (
            <>
              <Button
                component={Link}
                to="/add"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 700,
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                Add Movie
              </Button>
              <Button
                component={Link}
                to="/user-admin"
                sx={{ color: "#fff", textTransform: "none", fontWeight: 700 }}
              >
                Profile
              </Button>
              <Button
                onClick={() => logout(true)}
                sx={{
                  color: "#c4b5fd",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
