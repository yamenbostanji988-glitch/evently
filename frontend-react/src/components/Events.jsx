
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

function Events({ onBook }) {

    const [events, setEvents] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(function() {

        fetch("http://localhost:5000/api/events")
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Server response was not successful.");
                }

                return response.json();
            })
            .then(function(data) {
                console.log("Events loaded from API:", data);
                setEvents(data);
            })
            .catch(function(error) {
                console.error("Error loading events:", error);
                alert("Could not load events from the server.");
            });

    }, []);

    const filteredEvents = events.filter(function(event) {

        const matchesSearch = event.name
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    function handleViewDetails(event) {
        setSelectedEvent(event);
    }

    function handleCloseModal() {
        setSelectedEvent(null);
    }

    return (
        <section className="events-section" id="events">

            <div className="container">

                <div className="section-title">

                    <h2>Featured Events</h2>

                    <p>
                        Discover our upcoming events
                    </p>

                </div>

                <div className="row justify-content-center mb-4">

                    <div className="col-12 col-md-8">

                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search events..."
                                value={searchText}
                                onChange={function(event) {
                                    setSearchText(event.target.value);
                                }}
                            />

                            <button className="btn btn-primary">
                                Search
                            </button>

                        </div>

                    </div>

                </div>

                <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">

                    {[
                        "All",
                        "Music",
                        "Technology",
                        "Education",
                        "Sports",
                        "Art"
                    ].map(function(category) {

                        return (
                            <button
                                key={category}
                                className={
                                    selectedCategory === category
                                        ? "btn btn-primary"
                                        : "btn btn-outline-primary"
                                }
                                onClick={function() {
                                    setSelectedCategory(category);
                                }}
                            >
                                {category}
                            </button>
                        );

                    })}

                </div>

                <div className="row g-4">

                    {filteredEvents.length > 0 ? (

                        filteredEvents.map(function(event) {

                            return (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onViewDetails={handleViewDetails}
                                />
                            );

                        })

                    ) : (

                        <div className="col-12 text-center">

                            <p className="text-muted">
                                No events found.
                            </p>

                        </div>

                    )}

                </div>

            </div>

            <EventModal
                event={selectedEvent}
                onClose={handleCloseModal}
                onBook={function() {
                    onBook(selectedEvent);
                    setSelectedEvent(null);
                }}
            />

        </section>
    );
}

export default Events;

