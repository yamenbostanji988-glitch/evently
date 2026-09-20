# EVENTIFY

## Event Booking & Management System

EVENTIFY is a web-based event booking and management system that allows users to browse events, search and filter events, view event details, make bookings, and manage their bookings.

The system also provides an admin dashboard for managing events and viewing bookings.

## Features

### User Features

* Browse available events
* Search events
* Filter events by category
* View event details
* Book events
* View my bookings
* Cancel bookings
* Register an account
* Login

### Admin Features

* Admin dashboard
* View all events
* Add new events
* Edit existing events
* Delete events
* View all bookings
* View total events and bookings

## Technologies Used

* HTML
* CSS
* Flexbox
* Bootstrap
* JavaScript
* React
* Node.js
* Express.js
* JSON
* Git
* GitHub

## Project Structure

```text
Event-Booking-Management-System/
├── backend/
│   ├── events.js
│   ├── events.json
│   ├── bookings.js
│   ├── bookings.json
│   ├── server.js
│   └── package.json
├── frontend-react/
│   ├── src/
│   └── package.json
├── frontend/
├── .gitignore
└── README.md
```

## How to Run the Project

### Backend

Open a terminal and run:

```bash
cd backend
node server.js
```

The backend server runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and run:

```bash
cd frontend-react
npm run dev
```

The React application runs on:

```text
http://localhost:5173
```

## API Endpoints

### Events

```text
GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Bookings

```text
GET    /api/bookings
POST   /api/bookings
DELETE /api/bookings/:id
```

## Data Persistence

The project uses JSON files to store events and bookings data.

* `events.json` stores event information.
* `bookings.json` stores booking information.

## Project Purpose

This project was developed to demonstrate the practical use and integration of frontend and backend web development technologies in a complete event booking and management system.
