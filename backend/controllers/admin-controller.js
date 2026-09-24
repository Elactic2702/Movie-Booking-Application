const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");


const addAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }

    try {
        const existingAdmin = await pool.query(
            "SELECT id FROM admins WHERE email = $1",
            [email]
        );

        if (existingAdmin.rows.length > 0) {
            return res.status(400).json({
                message: "Admin Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO admins (email, password)
             VALUES ($1, $2)
             RETURNING id, email`,
            [email, hashedPassword]
        );

        return res.status(201).json({
            message: "Admin Created",
            admin: result.rows[0]
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === ""
    ) {
        return res.status(400).json({
            message: "Invalid Inputs"
        });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM admins WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Admin not found"
            });
        }

        const existingAdmin = result.rows[0];

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingAdmin.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

        const token = jwt.sign(
            {
                id: existingAdmin.id
            },
            process.env.SECRET_KEY,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            message: "Authentication Successful",
            token,
            id: existingAdmin.id
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


const getAdmin = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, email
             FROM admins`
        );

        return res.status(200).json({
            admins: result.rows
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


const getAdminById = async (req, res) => {
    const id = req.params.id;

    try {
        const adminResult = await pool.query(
            `SELECT id, email
             FROM admins
             WHERE id = $1`,
            [id]
        );

        if (adminResult.rows.length === 0) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const moviesResult = await pool.query(
            `SELECT *
             FROM movies
             WHERE admin_id = $1`,
            [id]
        );

        return res.status(200).json({
            admin: {
                ...adminResult.rows[0],
                addedMovies: moviesResult.rows
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    addAdmin,
    adminLogin,
    getAdmin,
    getAdminById
};