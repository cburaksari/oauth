import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setMessage("Registration successful! You can now log in.");
            navigate("/login");
        } else {
            const errorText = await response.text();
            setMessage("Registration failed: " + errorText);
        }
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", marginTop: "50px" }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ display: "block", marginBottom: "10px", width: "100%" }}
                />
                <button type="submit" style={{ width: "100%" }}>
                    Register
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}
