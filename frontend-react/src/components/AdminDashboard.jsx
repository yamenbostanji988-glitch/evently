import { useEffect, useState } from "react";

function AdminDashboard() {

    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        date: "",
        location: "",
        category: "Music",
        icon: "🎵",
        description: ""
    });

    useEffect(function() {
        loadEvents();
        loadBookings();
    }, []);

    function loadEvents() {

        fetch("http://localhost:5000/api/events")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setEvents(data);
            })
            .catch(function(error) {
                console.error("Error loading events:", error);
            });
    }

    function loadBookings() {

        fetch("http://localhost:5000/api/bookings")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setBookings(data);
            })
            .catch(function(error) {
                console.error("Error loading bookings:", error);
            });
    }

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData(function(previousData) {
            return {
                ...previousData,
                [name]: value
            };
        });
    }

    function handleSubmit(event) {

        event.preventDefault();

        const url = editingEvent
            ? "http://localhost:5000/api/events/" + editingEvent.id
            : "http://localhost:5000/api/events";

        const method = editingEvent ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(function(response) {
                return response.json();
            })
            .then(function() {

                loadEvents();

                setShowForm(false);
                setEditingEvent(null);

                setFormData({
                    name: "",
                    date: "",
                    location: "",
                    category: "Music",
                    icon: "🎵",
                    description: ""
                });
            })
            .catch(function(error) {
                console.error("Error saving event:", error);
            });
    }

    function handleEdit(event) {

        setEditingEvent(event);

        setFormData({
            name: event.name,
            date: event.date,
            location: event.location,
            category: event.category,
            icon: event.icon,
            description: event.description
        });

        setShowForm(true);
    }

    function handleDelete(eventId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        fetch(
            "http://localhost:5000/api/events/" + eventId,
            {
                method: "DELETE"
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                loadEvents();
            })
            .catch(function(error) {
                console.error("Error deleting event:", error);
            });
    }

    function handleDeleteBooking(bookingId) {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) {
            return;
        }

        fetch(
            "http://localhost:5000/api/bookings/" + bookingId,
            {
                method: "DELETE"
            }
        )
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                loadBookings();
            })
            .catch(function(error) {
                console.error("Error cancelling booking:", error);
            });
    }

    function openAddForm() {

        setEditingEvent(null);

        setFormData({
            name: "",
            date: "",
            location: "",
            category: "Music",
            icon: "🎵",
            description: ""
        });

        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingEvent(null);
    }

    return (
        <section className="py-5 bg-light">

            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>
                        <h1 className="fw-bold">
                            Admin Dashboard
                        </h1>

                        <p className="text-muted mb-0">
                            Manage EVENTIFY events and bookings
                        </p>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={openAddForm}
                    >
                        + Add Event
                    </button>

                </div>

                <div className="row g-4 mb-4">

                    <div className="col-md-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Events
                                </h6>

                                <h2 className="fw-bold">
                                    {events.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Bookings
                                </h6>

                                <h2 className="fw-bold">
                                    {bookings.length}
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {showForm && (

                    <div className="card border-0 shadow-sm mb-4">

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h3 className="mb-0">
                                    {editingEvent
                                        ? "Edit Event"
                                        : "Add New Event"}
                                </h3>

                                <button
                                    className="btn-close"
                                    onClick={closeForm}
                                ></button>

                            </div>

                            <form onSubmit={handleSubmit}>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Event Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Date
                                        </label>

                                        <input
                                            type="text"
                                            name="date"
                                            className="form-control"
                                            placeholder="October 25, 2026"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            name="location"
                                            className="form-control"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Category
                                        </label>

                                        <select
                                            name="category"
                                            className="form-select"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            <option>Music</option>
                                            <option>Technology</option>
                                            <option>Education</option>
                                            <option>Sports</option>
                                            <option>Art</option>
                                        </select>

                                    </div>

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Icon
                                        </label>

                                        <input
                                            type="text"
                                            name="icon"
                                            className="form-control"
                                            value={formData.icon}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <div className="col-12">

                                        <label className="form-label">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            className="form-control"
                                            rows="3"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>

                                </div>

                                <div className="mt-4 d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        {editingEvent
                                            ? "Update Event"
                                            : "Add Event"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeForm}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )}

                <div className="card border-0 shadow-sm mb-5">

                    <div className="card-body p-0">

                        <div className="p-4 border-bottom">

                            <h3 className="mb-1">
                                Events Management
                            </h3>

                            <p className="text-muted mb-0">
                                Add, edit, and delete events
                            </p>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover mb-0">

                                <thead className="table-light">

                                    <tr>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Category</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {events.map(function(event) {

                                        return (
                                            <tr key={event.id}>

                                                <td>
                                                    {event.icon} {event.name}
                                                </td>

                                                <td>
                                                    {event.date}
                                                </td>

                                                <td>
                                                    {event.category}
                                                </td>

                                                <td>
                                                    {event.location}
                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={function() {
                                                                handleEdit(event);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={function() {
                                                                handleDelete(event.id);
                                                            }}
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">

                        <div className="p-4 border-bottom">

                            <h3 className="mb-1">
                                Bookings Management
                            </h3>

                            <p className="text-muted mb-0">
                                View and manage customer bookings
                            </p>

                        </div>

                        <div className="table-responsive">

                            <table className="table table-hover mb-0">

                                <thead className="table-light">

                                    <tr>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Location</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {bookings.length > 0 ? (

                                        bookings.map(function(booking) {

                                            return (
                                                <tr key={booking.id}>

                                                    <td>
                                                        {booking.icon} {booking.eventName}
                                                    </td>

                                                    <td>
                                                        {booking.date}
                                                    </td>

                                                    <td>
                                                        {booking.location}
                                                    </td>

                                                    <td>
                                                        {booking.category}
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={function() {
                                                                handleDeleteBooking(booking.id);
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>

                                                    </td>

                                                </tr>
                                            );

                                        })

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center text-muted py-4"
                                            >
                                                No bookings found.
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AdminDashboard;