const bcrypt = require("bcryptjs");
const pool = require("../db/db");

// ===============================
// GET ALL USERS
// ===============================
const getAllUser = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email
             FROM users
             ORDER BY id`
        );

        return res.status(200).json({
            users: result.rows
        });

    } catch (error) {
        console.error("GET ALL USERS ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch users",
            error: error.message || String(error)
        });
    }
};


// ===============================
// SIGN UP
// ===============================
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await pool.query(
            `SELECT id
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (name, email, password)
             VALUES ($1, $2, $3)
             RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        return res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);

        return res.status(500).json({
            message: "Signup failed",
            error: error.message || String(error)
        });
    }
};


// ===============================
// UPDATE USER
// ===============================
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;

        const fields = [];
        const values = [];

        if (name) {
            fields.push(`name = $${values.length + 1}`);
            values.push(name);
        }

        if (email) {
            fields.push(`email = $${values.length + 1}`);
            values.push(email);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            fields.push(`password = $${values.length + 1}`);
            values.push(hashedPassword);
        }

        if (fields.length === 0) {
            return res.status(400).json({
                message: "No data to update"
            });
        }

        values.push(id);

        const result = await pool.query(
            `UPDATE users
             SET ${fields.join(", ")}
             WHERE id = $${values.length}
             RETURNING id, name, email`,
            values
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("UPDATE USER ERROR:", error);

        return res.status(500).json({
            message: "Update failed",
            error: error.message || String(error)
        });
    }
};


// ===============================
// DELETE USER
// ===============================
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING id, name, email`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        return res.status(500).json({
            message: "Delete failed",
            error: error.message || String(error)
        });
    }
};


// ===============================
// LOGIN
// ===============================
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const result = await pool.query(
            `SELECT *
             FROM users
             WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const existingUser = result.rows[0];

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            id: existingUser.id
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Login failed",
            error: error.message || String(error)
        });
    }
};


// ===============================
// GET BOOKINGS OF USER
// ===============================
const getBookingofUser = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT
                b.id,
                b.booking_date,
                b.seat_number,
                m.id AS movie_id,
                m.title,
                m.description,
                m.poster_url,
                m.release_date
             FROM bookings b
             JOIN movies m
                ON b.movie_id = m.id
             WHERE b.user_id = $1
             ORDER BY b.id DESC`,
            [id]
        );

        return res.status(200).json({
            bookings: result.rows
        });

    } catch (error) {
        console.error("GET USER BOOKINGS ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message || String(error)
        });
    }
};


// ===============================
// GET USER BY ID
// ===============================
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `SELECT id, name, email
             FROM users
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user: result.rows[0]
        });

    } catch (error) {
        console.error("GET USER BY ID ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch user",
            error: error.message || String(error)
        });
    }
};


// ===============================
// EXPORT CONTROLLERS
// ===============================
module.exports = {
    getAllUser,
    signUp,
    updateUser,
    deleteUser,
    logIn,
    getBookingofUser,
    getUserById
};