import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import LocalMoviesRoundedIcon from "@mui/icons-material/LocalMoviesRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";
import { getAllMovies } from "./api-helpers";

const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.error("Failed to load movies:", err));
  }, []);

  return (
    <Box sx={{ background: "#f5f7fb", minHeight: "calc(100vh - 72px)" }}>
      <Box
        sx={{
          minHeight: { xs: 460, md: 560 },
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundImage:
            "linear-gradient(90deg,rgba(10,10,20,.94) 0%,rgba(10,10,20,.7) 48%,rgba(10,10,20,.2) 100%),url(https://i.ytimg.com/vi/flXhA8DOi84/maxresdefault.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            px: { xs: 3, md: 6 },
            color: "#fff",
          }}
        >
          <Chip
            icon={<LocalMoviesRoundedIcon />}
            label="CINEBOOK"
            sx={{
              mb: 2,
              color: "#fff",
              background: "rgba(124,58,237,.85)",
              fontWeight: 800,
            }}
          />

          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              maxWidth: 700,
              fontSize: { xs: "2.8rem", md: "5rem" },
              lineHeight: 1.04,
            }}
          >
            Your next movie night starts here.
          </Typography>

          <Typography
            sx={{
              maxWidth: 600,
              mt: 2,
              color: "rgba(255,255,255,.82)",
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Browse movies, choose your seat, and confirm your booking in a few
            clicks.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
            <Button
              component={Link}
              to="/movies"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                px: 3,
                py: 1.4,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 800,
                background: "linear-gradient(135deg,#8b5cf6,#4f46e5)",
                "&:hover": {
                  background: "linear-gradient(135deg,#7c3aed,#4338ca)",
                },
              }}
            >
              Browse Movies
            </Button>

            <Button
              component={Link}
              to="/auth"
              variant="outlined"
              size="large"
              sx={{
                px: 3,
                py: 1.4,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                color: "#fff",
                borderColor: "rgba(255,255,255,.45)",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 }, py: 7 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="overline"
            sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}
          >
            NOW SHOWING
          </Typography>
          <Typography variant="h4" fontWeight={800}>
            Latest Releases
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Pick something you want to watch tonight.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {movies.slice(0, 4).map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.poster_url}
              releaseDate={movie.release_date}
            />
          ))}
        </Box>

        {movies.length > 0 && (
          <Box textAlign="center" mt={4}>
            <Button
              component={Link}
              to="/movies"
              variant="outlined"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                color: "#5b21b6",
                borderColor: "#c4b5fd",
              }}
            >
              View all movies
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Homepage;
