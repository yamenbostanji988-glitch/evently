function Bookings({ bookings, onCancel }) {

    return (
        <section className="events-section" id="bookings">

            <div className="container">

                <div className="section-title">

                    <h2>My Bookings</h2>

                    <p>
                        Manage your booked events
                    </p>

                </div>

                <div className="row g-4">

                    {bookings.length > 0 ? (

                        bookings.map(function(booking) {

                            return (
                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={booking.id}
                                >

                                    <div className="card h-100 border-0 shadow-sm">

                                        <div className="event-image">
                                            {booking.icon}
                                        </div>

                                        <div className="card-body p-4">

                                            <h3 className="card-title">
                                                {booking.name}
                                            </h3>

                                            <p className="card-text">
                                                📅 {booking.date}
                                            </p>

                                            <p className="card-text">
                                                📍 {booking.location}
                                            </p>

                                            <p className="card-text">
                                                🏷️ Category: {booking.category}
                                            </p>

                                            <button
                                                className="btn btn-danger"
                                                onClick={function() {
                                                    onCancel(booking.id);
                                                }}
                                            >
                                                Cancel Booking
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );

                        })

                    ) : (

                        <div className="col-12 text-center">

                            <p className="text-muted">
                                No bookings yet.
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </section>
    );
}

export default Bookings;