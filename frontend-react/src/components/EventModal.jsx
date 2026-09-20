function EventModal({ event, onClose, onBook }) {

    if (!event) {
        return null;
    }

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            {event.name}
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="text-center mb-4">
                            <div className="event-image">
                                {event.icon}
                            </div>
                        </div>

                        <p>
                            📅 <strong>Date:</strong> {event.date}
                        </p>

                        <p>
                            📍 <strong>Location:</strong> {event.location}
                        </p>

                        <p>
                            🏷️ <strong>Category:</strong> {event.category}
                        </p>

                        <p>
                            {event.description}
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onBook}
                        >
                            Book Now
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default EventModal;