const pool = require("../db/db");


const Booking = async (req, res) => {
    const { movie, date, seatNumber, user } = req.body;

    const client = await pool.connect();

    try {
        const existingMovie = await client.query(
            "SELECT id FROM movies WHERE id = $1",
            [movie]
        );

        if (existingMovie.rows.length === 0) {
            return res.status(404).json({
                message: "Movie not found by given id"
            });
        }

        const existingUser = await client.query(
            "SELECT id FROM users WHERE id = $1",
            [user]
        );

        if (existingUser.rows.length === 0) {
            return res.status(404).json({
                message: "User not found by given id"
            });
        }

        await client.query("BEGIN");

        const bookingResult = await client.query(
            `INSERT INTO bookings
            (
                movie_id,
                user_id,
                booking_date,
                seat_number
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [
                movie,
                user,
                new Date(date),
                seatNumber
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            newBooking: bookingResult.rows[0]
        });

    } catch (err) {

        await client.query("ROLLBACK");

        return res.status(500).json({
            message: err.message
        });

    } finally {
        client.release();
    }
};


const deleteBooking = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            `DELETE FROM bookings
             WHERE id = $1
             RETURNING id`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Booking not found by given id"
            });
        }

        return res.status(200).json({
            message: "Booking deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    Booking,
    deleteBooking
};