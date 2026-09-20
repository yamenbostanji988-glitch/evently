function EventCard({ event, onViewDetails }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">

            <div className="card h-100 border-0 shadow-sm">

                <div className="event-image">
                    {event.icon}
                </div>

                <div className="card-body p-4">

                    <h3 className="card-title">
                        {event.name}
                    </h3>

                    <p className="card-text">
                        📅 {event.date}
                    </p>

                    <p className="card-text">
                        📍 {event.location}
                    </p>

                    <p className="card-text">
                        🏷️ Category: {event.category}
                    </p>

                    <button
                        className="btn btn-primary mt-2"
                        onClick={function() {
                            onViewDetails(event);
                        }}
                    >
                        View Details
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EventCard;