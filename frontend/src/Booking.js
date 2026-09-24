import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMoviedetails, newBooking } from "./api-helpers";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  Divider,
  FormLabel,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import { useSelector } from "react-redux";

const seats = Array.from({ length: 12 }, (_, index) => index + 1);

const Booking = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMoviedetails(id);
        setMovie(response.movie);
      } catch (error) {
        console.error("FAILED TO LOAD MOVIE:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (event) => {
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputs.seatNumber || !inputs.date) {
      setSnackbar({
        open: true,
        message: "Please select a seat and booking date.",
        severity: "warning",
      });
      return;
    }

    try {
      await newBooking({
        seatNumber: inputs.seatNumber,
        date: inputs.date,
        movie: movie.id,
      });

      setInputs({ seatNumber: "", date: "" });
      setSnackbar({
        open: true,
        message: "Your booking has been confirmed successfully!",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Booking failed. Please try again.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box minHeight="70vh" display="grid" placeItems="center">
        <Stack alignItems="center" spacing={2}>
          <CircularProgress sx={{ color: "#7c3aed" }} />
          <Typography color="text.secondary">Loading movie details...</Typography>
        </Stack>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" py={12}>
        <MovieRoundedIcon sx={{ fontSize: 64, color: "#7c3aed" }} />
        <Typography variant="h5" fontWeight={800} mt={2}>
          Movie not found
        </Typography>
        <Button onClick={() => navigate("/movies")} sx={{ mt: 2 }}>
          Back to movies
        </Button>
      </Box>
    );
  }

  const actors = Array.isArray(movie.actors)
    ? movie.actors
    : movie.actors
      ? movie.actors.split(",").map((actor) => actor.trim()).filter(Boolean)
      : [];

  const today = new Date().toISOString().split("T")[0];

  return (
    <Box sx={{ maxWidth: 1180, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      <Box mb={4}>
        <Typography variant="overline" sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}>
          BOOK YOUR TICKETS
        </Typography>
        <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          {movie.title}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Choose your seat and date to complete your reservation.
        </Typography>
      </Box>

      {isUserLoggedIn ? (
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 0.9fr" }} gap={4}>
          <Paper
            elevation={0}
            sx={{
              overflow: "hidden",
              borderRadius: 4,
              border: "1px solid #e7e8ef",
              background: "#fff",
            }}
          >
            <Box sx={{ position: "relative", height: { xs: 380, md: 520 } }}>
              <Box
                component="img"
                src={movie.poster_url}
                alt={movie.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 45%, rgba(10,10,20,.9) 100%)",
                }}
              />
              <Box sx={{ position: "absolute", left: 24, right: 24, bottom: 24, color: "#fff" }}>
                <Chip
                  icon={<MovieRoundedIcon />}
                  label={movie.release_date ? new Date(movie.release_date).getFullYear() : "Movie"}
                  sx={{ mb: 1.5, color: "#fff", background: "rgba(124,58,237,.9)" }}
                />
                <Typography variant="h4" fontWeight={900}>
                  {movie.title}
                </Typography>
              </Box>
            </Box>

            <Box p={{ xs: 2.5, md: 3 }}>
              <Typography color="text.secondary" lineHeight={1.7}>
                {movie.description}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {actors.length > 0 ? (
                  actors.map((actor, index) => (
                    <Chip key={`${actor}-${index}`} label={actor} variant="outlined" />
                  ))
                ) : (
                  <Typography color="text.secondary">Cast information unavailable</Typography>
                )}
              </Stack>
            </Box>
          </Paper>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              border: "1px solid #e7e8ef",
              alignSelf: "start",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 2.5,
                  background: "#f1edff",
                  color: "#6d28d9",
                }}
              >
                <ConfirmationNumberRoundedIcon />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={800}>
                  Booking Details
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select your preferred seat
                </Typography>
              </Box>
            </Stack>

            <FormLabel sx={{ fontWeight: 700, color: "#171923" }}>
              Select Seat
            </FormLabel>

            <Box
              sx={{
                mt: 1.5,
                p: 2,
                borderRadius: 3,
                background: "#f8f7fc",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 1.2,
              }}
            >
              {seats.map((seat) => (
                <Button
                  key={seat}
                  type="button"
                  onClick={() => setInputs((prev) => ({ ...prev, seatNumber: String(seat) }))}
                  variant={inputs.seatNumber === String(seat) ? "contained" : "outlined"}
                  startIcon={<EventSeatRoundedIcon />}
                  sx={{
                    minWidth: 0,
                    py: 1.2,
                    borderRadius: 2,
                    fontWeight: 800,
                    color: inputs.seatNumber === String(seat) ? "#fff" : "#5b21b6",
                    borderColor: "#c4b5fd",
                    background:
                      inputs.seatNumber === String(seat)
                        ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                        : "#fff",
                  }}
                >
                  {seat}
                </Button>
              ))}
            </Box>

            <FormLabel sx={{ display: "block", mt: 3, mb: 1, fontWeight: 700, color: "#171923" }}>
              Booking Date
            </FormLabel>

            <TextField
              fullWidth
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
              inputProps={{ min: today }}
              InputProps={{
                startAdornment: <CalendarMonthRoundedIcon sx={{ mr: 1, color: "#7c3aed" }} />,
              }}
              required
            />

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 3,
                background: "#f8f7fc",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Selected seat
              </Typography>
              <Typography fontWeight={800}>
                {inputs.seatNumber ? `Seat ${inputs.seatNumber}` : "No seat selected"}
              </Typography>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<ConfirmationNumberRoundedIcon />}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                boxShadow: "0 10px 25px rgba(79,70,229,.2)",
              }}
            >
              Confirm Booking
            </Button>
          </Paper>
        </Box>
      ) : (
        <Dialog open PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
          <Box p={3}>
            <Typography variant="h5" fontWeight={800}>
              Login required
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Sign in to your CineBook account before booking a ticket.
            </Typography>
            <Stack direction="row" spacing={1.5} mt={3}>
              <Button variant="contained" onClick={() => navigate("/auth")} sx={{ borderRadius: 2.5 }}>
                Sign in
              </Button>
              <Button variant="outlined" onClick={() => navigate("/movies")} sx={{ borderRadius: 2.5 }}>
                Back
              </Button>
            </Stack>
          </Box>
        </Dialog>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4500}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          sx={{ borderRadius: 2.5 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Booking;
