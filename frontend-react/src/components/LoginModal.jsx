
import { useState } from "react";

function LoginModal({ show, onClose, onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {

        event.preventDefault();

        if (
            email.trim() === "" ||
            password === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        const user = {
            email: email.trim(),
            password: password
        };

        onLogin(user);

        setEmail("");
        setPassword("");

        onClose();
    }

    if (!show) {
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
                            Login
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={function(event) {
                                        setEmail(event.target.value);
                                    }}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={function(event) {
                                        setPassword(event.target.value);
                                    }}
                                />

                            </div>

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
                                type="submit"
                                className="btn btn-primary"
                            >
                                Login
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default LoginModal;

