import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import MovieItem from "./MovieItem";
import { getAllMovies } from "./api-helpers";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        console.log("Movies from API:", data);
        setMovies(data.movies || []);
      })
      .catch((err) => {
        console.error("Failed to load movies:", err);
      });
  }, []);

  return (
    <Box margin="auto" marginTop={4}>
      <Typography
        variant="h4"
        padding={2}
        textAlign="center"
        bgcolor="#900C3F"
        width="40%"
        color="white"
        margin="auto"
      >
        All Movies
      </Typography>

      <Box
        width="100%"
        margin="auto"
        marginTop={5}
        padding={4}
        display="flex"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
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
    </Box>
  );
};

export default Movies;