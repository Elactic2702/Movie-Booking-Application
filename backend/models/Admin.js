const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: 6
    },

    addedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies"
    }]
});

const admin = mongoose.model("admin", AdminSchema);

module.exports = admin;