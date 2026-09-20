function Navbar({ onLogin, onRegister, onAdmin }) {

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-white shadow-sm">

                <div className="container">

                    <a
                        className="navbar-brand fw-bold text-primary"
                        href="#"
                    >
                        EVENTIFY
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#eventifyNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="eventifyNavbar"
                    >

                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                >
                                    Home
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#events"
                                >
                                    Events
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#bookings"
                                >
                                    My Bookings
                                </a>
                            </li>

                            <li className="nav-item">
                                <button
                                    type="button"
                                    className="nav-link btn btn-link"
                                    onClick={onAdmin}
                                >
                                    Admin
                                </button>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                >
                                    About
                                </a>
                            </li>

                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                >
                                    Contact
                                </a>
                            </li>

                        </ul>

                        <div className="d-flex gap-2">

                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={onLogin}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onRegister}
                            >
                                Register
                            </button>

                        </div>

                    </div>

                </div>

            </nav>
        </header>
    );
}

export default Navbar;
