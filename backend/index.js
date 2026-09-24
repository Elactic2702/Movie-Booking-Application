const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const pool = require("./db/db");

const userRouter = require("./routes/user-route");
const adminRouter = require("./routes/admin-routes");
const movieRouter = require("./routes/movie-route");
const bookingRouter = require("./routes/booking-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Movie Booking API is running"
    });
});

app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);
app.use("/booking", bookingRouter);

const PORT = process.env.PORT || 2500;

const startServer = async () => {
    try {
        await pool.query("SELECT NOW()");

        console.log("PostgreSQL database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("PostgreSQL connection failed:");
        console.error(error);
    }
};

startServer();