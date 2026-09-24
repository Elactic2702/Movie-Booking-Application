import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getMoviedetails,
    newBooking,
} from "./api-helpers";

import {
    Box,
    Button,
    Dialog,
    FormLabel,
    TextField,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";

const labelStyle = {
    mt: 4,
    mb: 2,
};

const Booking = () => {
    const isUserLoggedIn = useSelector(
        (state) => state.user.isLoggedIn
    );

    const navigate = useNavigate();
    const { id } = useParams();

    const [inputs, setInputs] = useState({
        seatNumber: "",
        date: "",
    });

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingMessage, setBookingMessage] = useState("");

    /* =========================
       GET MOVIE DETAILS
    ========================= */

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);

                const response = await getMoviedetails(id);

                console.log("MOVIE DETAILS RESPONSE:", response);

                setMovie(response.movie);
            } catch (error) {
                console.error("FAILED TO LOAD MOVIE:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    /* =========================
       HANDLE INPUT
    ========================= */

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    /* =========================
       CREATE BOOKING
    ========================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputs.seatNumber || !inputs.date) {
            alert("Please enter seat number and date.");
            return;
        }

        try {
            console.log("BOOKING INPUT:", inputs);
            console.log("MOVIE ID:", movie.id);

            const response = await newBooking({
                seatNumber: inputs.seatNumber,
                date: inputs.date,
                movie: movie.id,
            });

            console.log("BOOKING SUCCESS:", response);

            setBookingMessage(
                "Booking confirmed successfully!"
            );

            setInputs({
                seatNumber: "",
                date: "",
            });
        } catch (error) {
            console.error(
                "BOOKING FAILED:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Booking failed. Please try again."
            );
        }
    };

    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return (
            <Typography
                variant="h5"
                textAlign="center"
                marginTop={5}
            >
                Loading movie details...
            </Typography>
        );
    }

    /* =========================
       MOVIE NOT FOUND
    ========================= */

    if (!movie) {
        return (
            <Typography
                variant="h5"
                textAlign="center"
                marginTop={5}
            >
                Movie not found.
            </Typography>
        );
    }

    /* =========================
       ACTORS
    ========================= */

    const actors = Array.isArray(movie.actors)
        ? movie.actors
        : movie.actors
            ? movie.actors
                .split(",")
                .map((actor) => actor.trim())
                .filter(Boolean)
            : [];

    /* =========================
       PAGE
    ========================= */

    return (
        <Box>
            {isUserLoggedIn ? (
                <>
                    <Typography
                        variant="h4"
                        align="center"
                        margin={2}
                    >
                        Book Tickets for {movie.title}
                    </Typography>

                    {bookingMessage && (
                        <Typography
                            variant="h6"
                            align="center"
                            color="success.main"
                            margin={2}
                        >
                            {bookingMessage}
                        </Typography>
                    )}

                    <Box
                        display="flex"
                        margin={6}
                        gap={4}
                        flexWrap="wrap"
                    >
                        {/* =========================
                            MOVIE INFORMATION
                        ========================= */}

                        <Box
                            display="flex"
                            flexDirection="column"
                            width="50vw"
                            minWidth="350px"
                            justifyContent="center"
                        >
                            <Box
                                width="40vw"
                                minWidth="300px"
                                height="50vh"
                                margin={1.5}
                            >
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                />
                            </Box>

                            <Typography
                                variant="body1"
                                fontStyle="italic"
                                margin={1.5}
                                padding={1}
                                borderLeft={1}
                            >
                                {movie.description}
                            </Typography>

                            {/* CAST */}

                            <Box
                                display="flex"
                                flexWrap="wrap"
                                margin={1}
                            >
                                <Typography fontStyle="italic">
                                    Cast:&nbsp;
                                </Typography>

                                {actors.length > 0 ? (
                                    actors.map((actor, index) => (
                                        <Typography
                                            key={index}
                                            fontStyle="italic"
                                        >
                                            {actor}
                                            {index <
                                                actors.length - 1
                                                ? ", "
                                                : ""}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography fontStyle="italic">
                                        Not available
                                    </Typography>
                                )}
                            </Box>

                            {/* RELEASE DATE */}

                            <Typography
                                margin={1}
                                fontStyle="italic"
                            >
                                Release Date:{" "}
                                {movie.release_date
                                    ? new Date(
                                        movie.release_date
                                    ).toDateString()
                                    : "Not available"}
                            </Typography>
                        </Box>

                        {/* =========================
                            BOOKING FORM
                        ========================= */}

                        <form onSubmit={handleSubmit}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignContent="center"
                                margin={5}
                                width="35vw"
                                minWidth="300px"
                                padding={3}
                                borderRadius={5}
                                boxShadow="10px 10px 10px #ccc"
                            >
                                <Typography
                                    variant="h5"
                                    align="center"
                                    mb={1}
                                >
                                    Booking Details
                                </Typography>

                                <FormLabel sx={labelStyle}>
                                    Seat Number
                                </FormLabel>

                                <TextField
                                    value={inputs.seatNumber}
                                    onChange={handleChange}
                                    name="seatNumber"
                                    type="number"
                                    margin="normal"
                                    variant="standard"
                                    required
                                />

                                <FormLabel sx={labelStyle}>
                                    Pick a Date
                                </FormLabel>

                                <TextField
                                    value={inputs.date}
                                    onChange={handleChange}
                                    name="date"
                                    type="date"
                                    margin="normal"
                                    variant="standard"
                                    required
                                />

                                <Button
                                    sx={{
                                        borderRadius: 5,
                                        margin: 6,
                                    }}
                                    variant="outlined"
                                    color="success"
                                    type="submit"
                                >
                                    Confirm Booking
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </>
            ) : (
                <Dialog
                    open={true}
                    PaperProps={{
                        style: {
                            borderRadius: 10,
                        },
                    }}
                >
                    <Box margin={4}>
                        <Typography
                            variant="h5"
                            padding={1}
                        >
                            User Not Logged In
                        </Typography>

                        <Typography
                            variant="h6"
                            padding={1}
                        >
                            You need to login to proceed further.
                        </Typography>

                        <Box align="center" mt={3}>
                            <Button
                                onClick={() =>
                                    navigate("/auth")
                                }
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    borderRadius: 2,
                                    margin: 1,
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                onClick={() =>
                                    navigate("/")
                                }
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    borderRadius: 2,
                                    margin: 1,
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Dialog>
            )}
        </Box>
    );
};

export default Booking;