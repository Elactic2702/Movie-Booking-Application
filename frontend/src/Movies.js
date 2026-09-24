import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { getAllMovies } from "./api-helpers";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies || []))
      .catch((err) => console.error("Failed to load movies:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ maxWidth: 1280, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      <Box textAlign="center" mb={5}>
        <Typography
          variant="overline"
          sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}
        >
          EXPLORE
        </Typography>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          All Movies
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Discover a movie and reserve your seats in a few clicks.
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress sx={{ color: "#7c3aed" }} />
        </Box>
      ) : movies.length === 0 ? (
        <Box
          textAlign="center"
          py={10}
          borderRadius={4}
          sx={{ background: "#fff", border: "1px solid #e7e8ef" }}
        >
          <Typography variant="h6" fontWeight={700}>
            No movies available yet
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Movies added by the administrator will appear here.
          </Typography>
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" flexWrap="wrap">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.poster_url}
              releaseDate={movie.release_date}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
