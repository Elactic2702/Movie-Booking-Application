import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Movies from "./Movies";
import Auth from "./Auth";
import Admin from "./Admin";
import Booking from "./Booking";
import UserProfile from "./UserProfile";
import AddMovies from "./AddMovies";
import AdminProfile from "./AdminProfile";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/add" element={<AddMovies />} />
        <Route path="/user-admin" element={<AdminProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;