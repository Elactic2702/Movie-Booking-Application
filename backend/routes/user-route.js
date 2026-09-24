const express = require("express");

const {
    getAllUser,
    signUp,
    updateUser,
    deleteUser,
    logIn,
    getBookingofUser,
    getUserById
} = require("../controllers/user-controller");

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/signup", signUp);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.post("/login", logIn);

userRouter.get("/bookings/:id", getBookingofUser);

userRouter.get("/:id", getUserById);

module.exports = userRouter;