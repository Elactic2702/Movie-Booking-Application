const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    actors: [{
        type: String,
        required: true
    }],

    releaseDate: {
        type: Date,
        required: true
    },

    posterUrl: {
        type: String,
        required: true
    },

    featured: {
        type: Boolean,
        default: false
    },

    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }],

    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true
    }
});

const Movie = mongoose.model("Movies", MovieSchema);

module.exports = Movie;