# 🎬 CineBook — Movie Booking Application

A full-stack movie booking web application built with **React.js, Node.js, Express.js, and PostgreSQL**.

CineBook allows users to browse movies, view movie details, book seats, manage their profiles, and view their booking history. It also provides an admin dashboard for managing movies.

---

## 🚀 Project Overview

CineBook is a full-stack web application designed to demonstrate real-world frontend and backend development.

The application follows a client-server architecture:

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT + bcrypt
- **API Communication:** REST APIs using Axios
- **Database Hosting:** Neon PostgreSQL

The project includes separate user and admin workflows with authentication, movie management, and booking functionality.

---

## ✨ Features

### 👤 User Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Browse available movies
- Search movies
- View movie details
- View movie poster, description, release date, and actors
- Select seats
- Select booking date
- Book movie tickets
- View booking history
- Cancel bookings
- View user profile
- Responsive and modern UI

### 🛠️ Admin Features

- Admin login
- JWT-protected admin operations
- Admin dashboard
- View admin profile
- Add movies
- Add movie poster URL
- Add movie description
- Add release date
- Add actors/cast
- Mark movies as featured
- View movies added by the admin

---

## 🖥️ Application Screens

### Home Page

The home page provides:

- CineBook branding
- Movie search
- Hero section
- Featured/latest movies
- Navigation to movies and authentication

### Movies Page

Users can:

- Browse available movies
- Search movies
- View movie information
- Open the booking page

### Movie Booking

Users can:

- View movie details
- Select seats
- Select a booking date
- Confirm their booking

### User Profile

Users can:

- View their account information
- See total bookings
- View booking history
- Cancel existing bookings

### Admin Dashboard

Admins can:

- View admin information
- View movie statistics
- View their movie library
- Add new movies

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Material UI
- Axios
- Redux
- HTML5
- CSS3
- JavaScript ES6+

### Backend

- Node.js
- Express.js
- REST APIs
- JWT
- bcryptjs
- CORS
- dotenv

### Database

- PostgreSQL
- Neon PostgreSQL
- node-postgres (`pg`)

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm
- Postman

---

## 🏗️ Project Architecture

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
│   ├── db/
│   │   └── db.js
│   │
│   ├── routes/
│   │   ├── admin-routes.js
│   │   ├── booking-routes.js
│   │   ├── movie-route.js
│   │   └── user-route.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── AddMovies.js
│   │   ├── Admin.js
│   │   ├── AdminProfile.js
│   │   ├── Auth.js
│   │   ├── AuthForm.js
│   │   ├── Booking.js
│   │   ├── Header.js
│   │   ├── HomePage.js
│   │   ├── MovieItem.js
│   │   ├── Movies.js
│   │   ├── UserProfile.js
│   │   ├── api-helpers.js
│   │   ├── index.css
│   │   ├── App.js
│   │   └── store.js
│   │
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
| Component            | URL                                              |
| -------------------- | ------------------------------------------------ |
| Frontend             | [http://localhost:3000](http://localhost:3000)   |
| Backend              | [http://localhost:2500](http://localhost:2500)   |
| Backend Health Check | [http://localhost:2500/](http://localhost:2500/) |
