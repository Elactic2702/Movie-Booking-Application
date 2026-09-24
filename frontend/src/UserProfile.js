import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import { deleteBooking, getUserBooking, getUserDetails } from "./api-helpers";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [bookingResponse, userResponse] = await Promise.all([
        getUserBooking(),
        getUserDetails(),
      ]);
      setBookings(bookingResponse.bookings || []);
      setUser(userResponse.user || null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Unable to load your profile.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
      setSnackbar({
        open: true,
        message: "Booking cancelled successfully.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Unable to cancel booking.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box minHeight="70vh" display="grid" placeItems="center">
        <CircularProgress sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1150, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      <Typography variant="overline" sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}>
        MY ACCOUNT
      </Typography>
      <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
        Profile
      </Typography>

      <Box
        mt={4}
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "300px 1fr" }}
        gap={3}
        alignItems="start"
      >
        <Card elevation={0} sx={{ border: "1px solid #e7e8ef", borderRadius: 4 }}>
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                mx: "auto",
                mb: 2,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              }}
            >
              <AccountCircleRoundedIcon sx={{ fontSize: 64 }} />
            </Avatar>
            <Typography variant="h5" fontWeight={800}>
              {user?.name || "User"}
            </Typography>
            <Typography color="text.secondary" mt={0.5} sx={{ wordBreak: "break-word" }}>
              {user?.email}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h4" fontWeight={900} color="#5b21b6">
              {bookings.length}
            </Typography>
            <Typography color="text.secondary">Total bookings</Typography>
          </CardContent>
        </Card>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="h5" fontWeight={800}>
                My Bookings
              </Typography>
              <Typography color="text.secondary">
                Your recent movie reservations
              </Typography>
            </Box>
            <Chip
              icon={<ConfirmationNumberRoundedIcon />}
              label={`${bookings.length} booking${bookings.length === 1 ? "" : "s"}`}
              sx={{ display: { xs: "none", sm: "flex" }, fontWeight: 700 }}
            />
          </Stack>

          {bookings.length === 0 ? (
            <Card elevation={0} sx={{ border: "1px dashed #c4b5fd", borderRadius: 4, p: 5, textAlign: "center" }}>
              <ConfirmationNumberRoundedIcon sx={{ fontSize: 54, color: "#a78bfa" }} />
              <Typography variant="h6" fontWeight={800} mt={1}>
                No bookings yet
              </Typography>
              <Typography color="text.secondary" mt={1}>
                Your confirmed tickets will appear here.
              </Typography>
            </Card>
          ) : (
            <Stack spacing={2}>
              {bookings.map((booking) => (
                <Card
                  key={booking.id}
                  elevation={0}
                  sx={{ border: "1px solid #e7e8ef", borderRadius: 4, overflow: "hidden" }}
                >
                  <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "120px 1fr auto" }}>
                    <Box
                      component="img"
                      src={booking.poster_url}
                      alt={booking.title}
                      sx={{ width: "100%", height: { xs: 220, sm: "100%" }, minHeight: 170, objectFit: "cover" }}
                    />

                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" fontWeight={800}>
                        {booking.title}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1.5}>
                        <Chip
                          size="small"
                          icon={<EventSeatRoundedIcon />}
                          label={`Seat ${booking.seat_number}`}
                          sx={{ fontWeight: 700 }}
                        />
                        <Chip
                          size="small"
                          icon={<CalendarMonthRoundedIcon />}
                          label={new Date(booking.booking_date).toDateString()}
                          sx={{ fontWeight: 700 }}
                        />
                      </Stack>
                    </CardContent>

                    <Box display="flex" alignItems="center" p={2}>
                      <Button
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteOutlineRoundedIcon />}
                        onClick={() => handleDelete(booking.id)}
                        sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default UserProfile;
