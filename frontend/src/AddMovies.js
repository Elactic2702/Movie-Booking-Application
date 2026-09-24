import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import { useNavigate } from "react-router-dom";
import { addMovie } from "./api-helpers";

const AddMovies = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const addActor = () => {
    const value = actor.trim();
    if (!value) return;
    setActors((prev) => [...prev, value]);
    setActor("");
  };

  const removeActor = (index) => {
    setActors((prev) => prev.filter((_, actorIndex) => actorIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputs.title || !inputs.description || !inputs.posterUrl || !inputs.releaseDate) {
      setSnackbar({
        open: true,
        message: "Please complete all required movie details.",
        severity: "warning",
      });
      return;
    }

    try {
      setSaving(true);
      await addMovie({ ...inputs, actors });

      setInputs({
        title: "",
        description: "",
        posterUrl: "",
        releaseDate: "",
        featured: false,
      });
      setActors([]);
      setActor("");

      setSnackbar({
        open: true,
        message: "Movie added successfully.",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Unable to add movie.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", px: { xs: 2, md: 4 }, py: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="overline" sx={{ color: "#7c3aed", fontWeight: 800, letterSpacing: 2 }}>
          ADMIN
        </Typography>
        <Typography variant="h3" fontWeight={900} sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
          Add a New Movie
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Add movie information to make it available for users.
        </Typography>
      </Box>

      <Card
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          p: { xs: 2.5, md: 4 },
          borderRadius: 4,
          border: "1px solid #e7e8ef",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
          <Box sx={{ width: 46, height: 46, display: "grid", placeItems: "center", borderRadius: 2.5, background: "#f1edff", color: "#6d28d9" }}>
            <MovieCreationRoundedIcon />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={800}>Movie Information</Typography>
            <Typography variant="body2" color="text.secondary">Fields marked required should be completed.</Typography>
          </Box>
        </Stack>

        <Stack spacing={2.2}>
          <TextField label="Movie title" name="title" value={inputs.title} onChange={handleChange} required fullWidth />
          <TextField label="Description" name="description" value={inputs.description} onChange={handleChange} required multiline minRows={4} fullWidth />
          <TextField label="Poster URL" name="posterUrl" value={inputs.posterUrl} onChange={handleChange} required fullWidth />

          {inputs.posterUrl && (
            <Box
              component="img"
              src={inputs.posterUrl}
              alt="Movie poster preview"
              onError={(event) => { event.currentTarget.style.display = "none"; }}
              sx={{ width: 150, height: 210, objectFit: "cover", borderRadius: 3, border: "1px solid #e7e8ef" }}
            />
          )}

          <TextField
            label="Release date"
            name="releaseDate"
            type="date"
            value={inputs.releaseDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />

          <Box>
            <Typography fontWeight={700} mb={1}>Cast</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <TextField
                fullWidth
                value={actor}
                onChange={(event) => setActor(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addActor();
                  }
                }}
                placeholder="Actor name"
              />
              <Button type="button" variant="outlined" onClick={addActor} startIcon={<AddRoundedIcon />} sx={{ borderRadius: 2.5, minWidth: 120 }}>
                Add
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1.5}>
              {actors.map((name, index) => (
                <Chip
                  key={`${name}-${index}`}
                  label={name}
                  onDelete={() => removeActor(index)}
                  deleteIcon={<DeleteOutlineRoundedIcon />}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={inputs.featured}
                onChange={(event) => setInputs((prev) => ({ ...prev, featured: event.target.checked }))}
              />
            }
            label="Mark this movie as featured"
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} pt={1}>
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={<AddPhotoAlternateRoundedIcon />}
              sx={{
                flex: 1,
                py: 1.4,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 800,
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              }}
            >
              {saving ? "Adding movie..." : "Add Movie"}
            </Button>
            <Button type="button" variant="outlined" onClick={() => navigate("/movies")} sx={{ borderRadius: 2.5, textTransform: "none", fontWeight: 700 }}>
              View Movies
            </Button>
          </Stack>
        </Stack>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2.5 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddMovies;
