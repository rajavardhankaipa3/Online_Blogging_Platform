
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        try {
            setLoading(true);

            await api.post("/users/register", formData);

            alert("Registration successful! Please login.");
            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p>Join our blogging community</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
