const express = require("express");
const cors = require("cors");
const { getEvents, saveEvents } = require("./events");
const { getBookings, saveBookings } = require("./bookings");

const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());

app.get("/", function(req, res) {
    res.json({
        message: "EVENTIFY API is running successfully."
    });
});

app.get("/api/events", function(req, res) {
    const events = getEvents();

    res.json(events);
});

app.post("/api/events", function(req, res) {

    const events = getEvents();

    const newEvent = {
        id: events.length > 0
            ? Math.max(...events.map(function(event) {
                return event.id;
            })) + 1
            : 1,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        icon: req.body.icon,
        description: req.body.description
    };

    events.push(newEvent);

    saveEvents(events);

    res.status(201).json(newEvent);
});

app.put("/api/events/:id", function(req, res) {

    const events = getEvents();

    const eventId = Number(req.params.id);

    const eventIndex = events.findIndex(function(event) {
        return event.id === eventId;
    });

    if (eventIndex === -1) {
        return res.status(404).json({
            message: "Event not found."
        });
    }

    events[eventIndex] = {
        id: eventId,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        icon: req.body.icon,
        description: req.body.description
    };

    saveEvents(events);

    res.json(events[eventIndex]);
});

app.delete("/api/events/:id", function(req, res) {

    const events = getEvents();

    const eventId = Number(req.params.id);

    const eventIndex = events.findIndex(function(event) {
        return event.id === eventId;
    });

    if (eventIndex === -1) {
        return res.status(404).json({
            message: "Event not found."
        });
    }

    const deletedEvent = events.splice(eventIndex, 1);

    saveEvents(events);

    res.json({
        message: "Event deleted successfully.",
        event: deletedEvent[0]
    });
});

app.get("/api/bookings", function(req, res) {

    const bookings = getBookings();

    res.json(bookings);
});

app.post("/api/bookings", function(req, res) {

    const bookings = getBookings();

    const alreadyBooked = bookings.some(function(booking) {
        return booking.eventId === req.body.eventId;
    });

    if (alreadyBooked) {
        return res.status(400).json({
            message: "This event is already booked."
        });
    }

    const newBooking = {
        id: bookings.length > 0
            ? Math.max(...bookings.map(function(booking) {
                return booking.id;
            })) + 1
            : 1,
        eventId: req.body.eventId,
        eventName: req.body.eventName,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
        icon: req.body.icon
    };

    bookings.push(newBooking);

    saveBookings(bookings);

    res.status(201).json(newBooking);
});

app.delete("/api/bookings/:id", function(req, res) {

    const bookings = getBookings();

    const bookingId = Number(req.params.id);

    const bookingIndex = bookings.findIndex(function(booking) {
        return booking.id === bookingId;
    });

    if (bookingIndex === -1) {
        return res.status(404).json({
            message: "Booking not found."
        });
    }

    const deletedBooking = bookings.splice(bookingIndex, 1);

    saveBookings(bookings);

    res.json({
        message: "Booking cancelled successfully.",
        booking: deletedBooking[0]
    });
});

app.listen(PORT, "127.0.0.1", function() {
    console.log("EVENTIFY server is running on port " + PORT);
});

setInterval(function() {
}, 1000);
