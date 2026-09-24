import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";
import { getAdminById } from "./api-helpers";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminById()
      .then((response) => setAdmin(response.admin))
      .catch((err) => setError(err.response?.data?.message || "Unable to load admin profile."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box minHeight="70vh" display="grid" placeItems="center">
        <CircularProgress sx={{ color: "#7c3aed" }} />
      </Box>
    );
  }

  if (error || !admin) {
    return (
      <Box maxWidth={700} mx="auto" px={2} py={8}>
        <Alert severity="error" sx={{ borderRadius: 3 }}>
          {error || "Admin profile not found."}
        </Alert>
      </Box>
    );
  }

  const movies = admin.addedMovies || [];

  return (
    <Box sx={{ maxWidth: 1150, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      <Typography variant="overline" sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}>
        ADMIN AREA
      </Typography>
      <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
        Dashboard
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
              <AdminPanelSettingsRoundedIcon sx={{ fontSize: 48 }} />
            </Avatar>

            <Typography variant="h5" fontWeight={800}>
              Administrator
            </Typography>
            <Typography color="text.secondary" mt={0.5} sx={{ wordBreak: "break-word" }}>
              {admin.email}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h4" fontWeight={900} color="#5b21b6">
              {movies.length}
            </Typography>
            <Typography color="text.secondary">Movies added</Typography>
          </CardContent>
        </Card>

        <Box>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="h5" fontWeight={800}>
                Movie Library
              </Typography>
              <Typography color="text.secondary">
                Movies added through your administrator account
              </Typography>
            </Box>
            <Chip icon={<MovieRoundedIcon />} label={`${movies.length} movies`} sx={{ display: { xs: "none", sm: "flex" }, fontWeight: 700 }} />
          </Stack>

          {movies.length === 0 ? (
            <Card elevation={0} sx={{ border: "1px dashed #c4b5fd", borderRadius: 4, p: 5, textAlign: "center" }}>
              <MovieRoundedIcon sx={{ fontSize: 54, color: "#a78bfa" }} />
              <Typography variant="h6" fontWeight={800} mt={1}>
                No movies added yet
              </Typography>
            </Card>
          ) : (
            <Stack spacing={2}>
              {movies.map((movie) => (
                <Card key={movie.id} elevation={0} sx={{ border: "1px solid #e7e8ef", borderRadius: 4 }}>
                  <Box display="grid" gridTemplateColumns={{ xs: "90px 1fr", sm: "120px 1fr" }}>
                    <Box
                      component="img"
                      src={movie.poster_url}
                      alt={movie.title}
                      sx={{ width: "100%", height: "100%", minHeight: 130, objectFit: "cover", borderRadius: "16px 0 0 16px" }}
                    />
                    <CardContent sx={{ p: 2.5 }}>
                      <Typography variant="h6" fontWeight={800}>
                        {movie.title}
                      </Typography>
                      <Typography color="text.secondary" mt={0.5} sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {movie.description}
                      </Typography>
                      <Chip
                        size="small"
                        label={movie.release_date ? new Date(movie.release_date).getFullYear() : "Release date unavailable"}
                        sx={{ mt: 1.5, background: "#f1edff", color: "#5b21b6", fontWeight: 700 }}
                      />
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminProfile;
