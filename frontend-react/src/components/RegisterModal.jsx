import { useState } from "react";

function RegisterModal({ show, onClose, onRegister }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {

        event.preventDefault();

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            password === ""
        ) {
            alert("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        const user = {
            name: name.trim(),
            email: email.trim(),
            password: password
        };

        onRegister(user);

        setName("");
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
                            Create Account
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
                                    Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={function(event) {
                                        setName(event.target.value);
                                    }}
                                />

                            </div>

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
                                Register
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default RegisterModal;