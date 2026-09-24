import axios from "axios";

const API_URL = "http://localhost:2500";

/* =========================
   MOVIES
========================= */

export const getAllMovies = async () => {
    try {
        const res = await axios.get(`${API_URL}/movies`);

        console.log("MOVIES API RESPONSE:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "MOVIES API ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const getMoviedetails = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/movies/${id}`);

        console.log("MOVIE DETAILS:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "MOVIE DETAILS ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};

export const addMovie = async (data) => {
    try {
        const res = await axios.post(
            `${API_URL}/movies/add`,
            {
                title: data.title,
                description: data.description,
                releaseDate: data.releaseDate,
                posterUrl: data.posterUrl,
                actors: data.actors,
                admin: localStorage.getItem("adminId"),
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log("MOVIE ADDED:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "ADD MOVIE ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   USER AUTHENTICATION
========================= */

export const sendUserAuthRequest = async (data, signup) => {
    try {
        const endpoint = signup ? "signup" : "login";

        const res = await axios.post(
            `${API_URL}/users/${endpoint}`,
            {
                name: signup ? data.name : "",
                email: data.email,
                password: data.password,
            }
        );

        console.log("USER AUTH RESPONSE:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "USER AUTH ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   ADMIN AUTHENTICATION
========================= */

export const sendAdminAuthRequest = async (data) => {
    try {
        const res = await axios.post(`${API_URL}/admin/login`, {
            email: data.email,
            password: data.password,
        });

        console.log("ADMIN LOGIN RESPONSE:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "ADMIN LOGIN ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   USER DETAILS
========================= */

export const getUserDetails = async () => {
    try {
        const id = localStorage.getItem("userId");

        if (!id) {
            throw new Error("User is not logged in");
        }

        const res = await axios.get(`${API_URL}/users/${id}`);

        console.log("USER DETAILS:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "USER DETAILS ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   USER BOOKINGS
========================= */

export const getUserBooking = async () => {
    try {
        const id = localStorage.getItem("userId");

        if (!id) {
            throw new Error("User is not logged in");
        }

        const res = await axios.get(
            `${API_URL}/users/bookings/${id}`
        );

        console.log("USER BOOKINGS:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "USER BOOKINGS ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   CREATE BOOKING
========================= */

export const newBooking = async (data) => {
    try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            throw new Error("User is not logged in");
        }

        const res = await axios.post(`${API_URL}/booking`, {
            movie: data.movie,
            seatNumber: data.seatNumber,
            date: data.date,
            user: userId,
        });

        console.log("BOOKING RESPONSE:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "CREATE BOOKING ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   DELETE BOOKING
========================= */

export const deleteBooking = async (id) => {
    try {
        const res = await axios.delete(
            `${API_URL}/booking/${id}`
        );

        console.log("DELETE BOOKING RESPONSE:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "DELETE BOOKING ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};


/* =========================
   ADMIN DETAILS
========================= */

export const getAdminById = async () => {
    try {
        const adminId = localStorage.getItem("adminId");

        if (!adminId) {
            throw new Error("Admin is not logged in");
        }

        const res = await axios.get(
            `${API_URL}/admin/${adminId}`
        );

        console.log("ADMIN DETAILS:", res.data);

        return res.data;
    } catch (error) {
        console.error(
            "ADMIN DETAILS ERROR:",
            error.response?.data || error.message
        );
        throw error;
    }
};