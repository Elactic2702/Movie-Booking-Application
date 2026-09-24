import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import { Link } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      elevation={0}
      sx={{
        width: 270,
        minHeight: 430,
        m: 1.5,
        overflow: "hidden",
        borderRadius: 4,
        border: "1px solid #e7e8ef",
        background: "#fff",
        transition: "transform .25s ease, box-shadow .25s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 18px 45px rgba(30,34,60,.14)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="310"
        image={posterUrl}
        alt={title}
        sx={{ objectFit: "cover", background: "#e9eaf0" }}
      />

      <CardContent sx={{ pb: 1.5 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          noWrap
          title={title}
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            icon={<CalendarMonthRoundedIcon />}
            label={releaseDate ? new Date(releaseDate).getFullYear() : "N/A"}
            sx={{
              borderRadius: 2,
              background: "#f1edff",
              color: "#5b21b6",
              fontWeight: 600,
            }}
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          fullWidth
          component={Link}
          to={`/booking/${id}`}
          variant="contained"
          startIcon={<ConfirmationNumberRoundedIcon />}
          sx={{
            borderRadius: 2.5,
            py: 1.1,
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
            boxShadow: "none",
            "&:hover": {
              background: "linear-gradient(135deg,#6d28d9,#4338ca)",
              boxShadow: "none",
            },
          }}
        >
          Book Tickets
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
