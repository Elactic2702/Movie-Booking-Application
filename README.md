# 🎬 Movie Booking Application

A full-stack movie booking application built with **React.js, Node.js, Express.js, and PostgreSQL**.

The application allows users to browse available movies, view movie details, select a seat and booking date, and manage their bookings. Administrators can log in and add new movies to the platform.

---

## 🚀 Features

### 👤 User Features

- User registration and login
- Browse available movies
- Search movies from the navigation bar
- View movie details
- View movie poster, cast, description and release date
- Select seat number and booking date
- Confirm movie bookings
- View booking history
- Delete existing bookings
- User profile

### 🔐 Admin Features

- Admin login
- Admin authentication using JWT
- Add new movies
- Add movie poster URL
- Add movie description
- Add release date
- Add movie cast
- Mark movies as featured
- View administrator profile
- View movies added by the administrator

### 🗄️ Backend Features

- RESTful API architecture
- PostgreSQL database integration
- Secure password hashing
- JWT-based authentication
- Parameterized SQL queries
- CORS configuration
- Separate routes and controllers
- Error handling for API requests

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Redux
- Material UI (MUI)
- Axios
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- PostgreSQL
- `pg` PostgreSQL client
- JWT
- bcrypt/bcryptjs
- CORS
- dotenv

### Database

- PostgreSQL
- Neon PostgreSQL

---

## 📁 Project Structure

```text
Movie-Booking-Application/
│
├── backend/
│   ├── controllers/
│   │   ├── admin-controller.js
│   │   ├── booking-controller.js
│   │   ├── movie-controller.js
│   │   └── user-controller.js
│   │
│   ├── routes/
│   │   ├── admin-routes.js
│   │   ├── booking-routes.js
│   │   ├── movie-route.js
│   │   └── user-route.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/pages
│   │   ├── api-helpers.js
│   │   ├── App.js
│   │   ├── Auth.js
│   │   ├── Booking.js
│   │   ├── Header.js
│   │   ├── HomePage.js
│   │   ├── Movies.js
│   │   ├── MovieItem.js
│   │   ├── UserProfile.js
│   │   ├── AdminProfile.js
│   │   ├── AddMovies.js
│   │   ├── store.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md