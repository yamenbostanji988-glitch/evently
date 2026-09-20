import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Categories from "./components/Categories";
import Bookings from "./components/Bookings";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import AdminDashboard from "./components/AdminDashboard";

function App() {

    const [bookings, setBookings] = useState([]);

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);

    useEffect(function() {

        fetch("http://localhost:5000/api/bookings")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Could not load bookings.");
                }

                return response.json();
            })
            .then(function(data) {
                setBookings(data);
            })
            .catch(function(error) {
                console.error("Error loading bookings:", error);
            });

    }, []);

    function handleBooking(event) {

        const alreadyBooked = bookings.some(function(booking) {
            return booking.eventId === event.id;
        });

        if (alreadyBooked) {
            alert("You have already booked this event.");
            return;
        }

        const newBooking = {
            eventId: event.id,
            eventName: event.name,
            date: event.date,
            location: event.location,
            category: event.category,
            icon: event.icon
        };

        fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBooking)
        })
            .then(function(response) {

                if (!response.ok) {
                    return response.json().then(function(data) {
                        throw new Error(data.message);
                    });
                }

                return response.json();
            })
            .then(function(data) {

                setBookings(function(previousBookings) {
                    return [
                        ...previousBookings,
                        data
                    ];
                });

                alert(
                    "Booking Confirmed! You have successfully booked " +
                    event.name +
                    "."
                );
            })
            .catch(function(error) {
                console.error("Error creating booking:", error);
                alert(error.message);
            });
    }

    function handleCancelBooking(bookingId) {

        fetch(
            "http://localhost:5000/api/bookings/" + bookingId,
            {
                method: "DELETE"
            }
        )
            .then(function(response) {

                if (!response.ok) {
                    throw new Error("Could not cancel booking.");
                }

                return response.json();
            })
            .then(function() {

                setBookings(function(previousBookings) {
                    return previousBookings.filter(function(booking) {
                        return booking.id !== bookingId;
                    });
                });

                alert("Booking cancelled successfully.");
            })
            .catch(function(error) {
                console.error("Error cancelling booking:", error);
                alert("Could not cancel booking.");
            });
    }

    function handleRegister(user) {

        localStorage.setItem(
            "eventifyUser",
            JSON.stringify(user)
        );

        alert(
            "Registration successful! You can now login."
        );
    }

    function handleLogin(user) {

        const savedUser =
            localStorage.getItem("eventifyUser");

        if (!savedUser) {
            alert("No account found. Please register first.");
            return;
        }

        const registeredUser =
            JSON.parse(savedUser);

        if (
            registeredUser.email === user.email &&
            registeredUser.password === user.password
        ) {
            localStorage.setItem(
                "eventifyLoggedIn",
                "true"
            );

            alert(
                "Login successful! Welcome to EVENTIFY."
            );
        } else {
            alert(
                "Invalid email or password."
            );
        }
    }

    function openRegister() {
        setShowLogin(false);
        setShowRegister(true);
    }

    function openLogin() {
        setShowRegister(false);
        setShowLogin(true);
    }

    function openAdmin() {
        setShowAdmin(true);
    }

    function closeAdmin() {
        setShowAdmin(false);
    }

    return (
        <div>

            <Navbar
                onLogin={openLogin}
                onRegister={openRegister}
                onAdmin={openAdmin}
            />

            {!showAdmin ? (

                <>
                    <Hero />

                    <Events
                        onBook={handleBooking}
                    />

                    <Bookings
                        bookings={bookings}
                        onCancel={handleCancelBooking}
                    />

                    <Categories />

                    <Footer />
                </>

            ) : (

                <>

                    <AdminDashboard />

                    <div className="text-center py-4">

                        <button
                            className="btn btn-outline-primary"
                            onClick={closeAdmin}
                        >
                            Back to EVENTIFY
                        </button>

                    </div>

                    <Footer />

                </>

            )}

            <RegisterModal
                show={showRegister}
                onClose={function() {
                    setShowRegister(false);
                }}
                onRegister={handleRegister}
            />

            <LoginModal
                show={showLogin}
                onClose={function() {
                    setShowLogin(false);
                }}
                onLogin={handleLogin}
            />

        </div>
    );
}

export default App;