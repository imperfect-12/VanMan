# VanMan — Moving Service Platform

A full-stack moving service marketplace where customers can get instant quotes and book moving jobs, and admins can manage bookings and assign team members.

> Inspired by a real student-run moving service in Germany — *"You help us by us helping you."*

**[Report a Bug](https://github.com/imperfect-12/VanMan/issues)**

---

## Features

### Customers

- Register and log in with JWT authentication stored in an HTTP-only cookie.
- Get a quote using the same pricing rules used when a booking is created.
- Book a move with pickup/drop locations, distance, date, and contact details.
- View personal bookings and their current status.

### Administrators

- View and edit all bookings, including service type and load size.
- Add, deactivate, and reactivate team members.
- Assign an available member to a booking.
- Automatically return an assigned member to `available` when a booking is
  completed or cancelled.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite 7, React Router 7, React Hook Form |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, HTTP-only cookies, bcryptjs |
| HTTP client | Axios |
| Styling | Tailwind CSS |

## Project Structure

```text
VanMan/
├── client/                 # React/Vite frontend
│   └── src/
│       ├── api/            # Axios configuration
│       ├── components/     # Reusable UI components
│       ├── contexts/       # Authentication state
│       ├── pages/          # Route-level pages
│       ├── routes/         # Routes and access guards
│       └── services/       # API calls
└── server/                 # Express/Mongoose backend
    ├── controllers/        # Request handlers
    ├── middleware/         # Authentication and role checks
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── test/               # Node test suite and smoke tests
    └── utils/              # Shared pricing logic
```

---

## Screenshots

> *(Will be adding soon)*

---

## Local Development

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- A local MongoDB instance or MongoDB Atlas database

### Backend

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` and replace the example values:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/vanman
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
```

Then start the API:

```bash
npm start
```

The server listens only after MongoDB connects. Its liveness endpoint is
`GET /health`; `GET /ready` returns `200` only while MongoDB is connected.

### Frontend

In another terminal:

```bash
cd client
npm install
```

Copy `client/.env.example` to `client/.env`:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Start the app:

```bash
npm run dev
```

The frontend is available at `http://localhost:5173` by default.

## Quality Checks

Run these before opening a pull request or deploying:

```bash
cd client
npm run lint
npm run build

cd ../server
npm test
node --check server.js
```

The server tests cover shared pricing, the booking/member release lifecycle,
and functional smoke checks for `/health` and `/ready`.

## API Reference

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/health` | Public | Process liveness |
| GET | `/ready` | Public | Database readiness |
| POST | `/api/auth/register` | Public | Register a customer |
| POST | `/api/auth/login` | Public | Log in and set the JWT cookie |
| POST | `/api/auth/logout` | User | Clear the JWT cookie |
| GET | `/api/auth/me` | User | Get the current user |
| POST | `/api/quotes` | User | Calculate a price estimate |
| POST | `/api/bookings` | User | Create a booking |
| GET | `/api/bookings/my` | User | Get the customer's bookings |
| GET | `/api/admin/bookings` | Admin | Get all bookings |
| PATCH | `/api/admin/bookings/:bookingid` | Admin | Edit a booking |
| PATCH | `/api/admin/bookings/:bookingid/assign` | Admin | Assign a member |
| GET | `/api/admin/members` | Admin | Get active members |
| POST | `/api/admin/members` | Admin | Add a member |
| DELETE | `/api/admin/members/:id` | Admin | Deactivate a member |
| PATCH | `/api/admin/members/:id/status` | Admin | Update member status |

## Deployment

Deploy the backend and frontend as separate services.

### Backend service

- Root directory: `server`
- Install/build command: `npm install`
- Start command: `npm start`
- Health check path: `/ready`

Set these environment variables:

```dotenv
MONGODB_URI=your-production-mongodb-connection-string
JWT_SECRET=your-long-random-production-secret
CLIENT_URL=https://your-frontend-domain
NODE_ENV=production
```

`PORT` is optional; most hosting platforms inject it automatically. Allow the
backend service's outbound addresses in MongoDB Atlas, and use a least-privilege
database user.

### Frontend static site

- Root directory: `client`
- Install/build command: `npm install && npm run build`
- Output directory: `dist`

Set this build-time environment variable:

```dotenv
VITE_API_URL=https://your-backend-domain/api
```

Configure the static host to rewrite unknown frontend paths (such as
`/dashboard` and `/admin`) to `index.html`, so React Router can handle them.
Rebuild the frontend whenever `VITE_API_URL` changes.

### Post-deployment checks

1. Confirm the backend returns `200` from `/health` and `/ready`.
2. Register a customer, log out, and log back in.
3. Create a quote and a booking; verify their prices agree.
4. Log in as an admin, edit the booking, and assign a member.
5. Complete or cancel the booking and verify the member becomes available.
6. Open a protected frontend URL directly and confirm the SPA rewrite works.

Because production authentication uses a cross-site secure cookie, the frontend
must use HTTPS, `CLIENT_URL` must match its exact origin, and the API requests
must continue sending credentials.

## License

MIT
