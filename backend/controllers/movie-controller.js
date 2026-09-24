const jwt = require("jsonwebtoken");
const pool = require("../db/db");


const addMovie = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const extractedToken = authHeader.split(" ")[1];

        const decrypted = jwt.verify(
            extractedToken,
            process.env.SECRET_KEY
        );

        const adminId = decrypted.id;

        const {
            title,
            description,
            releaseDate,
            posterUrl,
            featured,
            actors
        } = req.body;

        if (
            !title ||
            title.trim() === "" ||
            !description ||
            description.trim() === "" ||
            !posterUrl ||
            posterUrl.trim() === ""
        ) {
            return res.status(422).json({
                message: "Invalid Inputs"
            });
        }

        const adminResult = await pool.query(
            "SELECT id FROM admins WHERE id = $1",
            [adminId]
        );

        if (adminResult.rows.length === 0) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        const result = await pool.query(
            `INSERT INTO movies
            (
                title,
                description,
                release_date,
                poster_url,
                featured,
                actors,
                admin_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                title,
                description,
                new Date(releaseDate),
                posterUrl,
                featured || false,
                JSON.stringify(actors || []),
                adminId
            ]
        );

        return res.status(201).json({
            movie: result.rows[0]
        });

    } catch (err) {

        if (
            err.name === "JsonWebTokenError" ||
            err.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        return res.status(500).json({
            message: err.message
        });
    }
};


const getAllMovie = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM movies
             ORDER BY id DESC`
        );

        return res.status(200).json({
            movies: result.rows
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


const getMovieById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            `SELECT *
             FROM movies
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Invalid Movie Id"
            });
        }

        return res.status(200).json({
            movie: result.rows[0]
        });

    } catch (err) {
        return res.status(500).json({
            message: "Invalid Movie ID"
        });
    }
};


module.exports = {
    addMovie,
    getAllMovie,
    getMovieById
};