# VanMan – Moving Service Platform

A full-stack moving service marketplace where customers can get instant quotes and book moving jobs, and admins can manage bookings and assign team members.

> Inspired by a real student-run moving service in Germany — *"You help us by us helping you."*

**[Live Demo](#)** · **[Report a Bug](https://github.com/imperfect-12/VanMan/issues)**

---

## Screenshots

> *(Will be adding soon)*

---

## Features

**Customers**
- Register and log in securely
- Get an instant price estimate based on service type, load size, and distance
- Book a moving job with pickup/drop location, date, and contact details
- View all personal bookings and their current status

**Admins**
- View and manage all bookings across the platform
- Add, remove, and update the status of team members
- Assign available members to pending bookings

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router v7, React Hook Form |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JWT via httpOnly cookies, bcryptjs |
| HTTP Client | Axios |
| Maps | Leaflet, React-Leaflet *(planned)* |

---

## Project Structure

```
VanMan/
├── client/                 # React frontend
│   └── src/
│       ├── api/            # Axios instance
│       ├── components/     # Reusable UI components
│       ├── contexts/       # AuthContext
│       ├── pages/          # Route-level pages
│       ├── routes/         # AppRoutes, protected routes
│       └── services/       # API call functions
│
└── server/                 # Express backend
    ├── controllers/        # Route handler logic
    ├── middleware/         # Auth and role checks
    ├── models/             # Mongoose schemas
    └── routes/             # API route definitions
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/imperfect-12/VanMan.git
cd VanMan
```

### 2. Set up the server

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm start
```

### 3. Set up the client

```bash
cd client
npm install
```

Start the client:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register a new customer |
| POST | `/api/auth/login` | Public | Log in and receive JWT cookie |
| POST | `/api/auth/logout` | User | Clear auth cookie |
| GET | `/api/auth/me` | User | Get current user profile |
| POST | `/api/quotes` | User | Get a price estimate |
| POST | `/api/bookings` | User | Create a new booking |
| GET | `/api/bookings/my` | User | Get current user's bookings |
| GET | `/api/admin/bookings` | Admin | Get all bookings |
| GET | `/api/admin/members` | Admin | Get all members |
| POST | `/api/admin/members` | Admin | Add a new member |
| DELETE | `/api/admin/members/:id` | Admin | Deactivate a member |
| PATCH | `/api/admin/members/:id/status` | Admin | Update member status |
| PATCH | `/api/admin/bookings/:id/assign` | Admin | Assign a member to a booking |

---

## Roadmap

- [x] Customer auth (register, login, logout)
- [x] Quote price estimation engine
- [x] Booking creation and management
- [x] Admin dashboard — bookings and member management
- [x] Member assignment workflow
- [ ] CSS and visual polish
- [ ] Client-side route guards
- [ ] Member-facing dashboard
- [ ] Leaflet map integration for pickup/drop locations
- [ ] Real-time booking status updates with Socket.io
- [ ] Deployment

---

## License

MIT
