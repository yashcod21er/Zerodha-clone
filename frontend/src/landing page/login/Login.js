import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.phone.trim()) {
            setError("Please enter your registered mobile number or email.");
            return;
        }

        if (!formData.password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        const result = await login({
            phone: formData.phone,
            password: formData.password,
        });

        setLoading(false);

        if (result.success) {
            setSuccessMessage("Login successful! Welcome back to Zerodha.");
            setTimeout(() => {
                window.location.href = "/";
            }, 800);
        } else {
            setError(result.message);
        }
    };

    return (
        <section className="auth-section py-5">
            <div className="container" style={{ maxWidth: "480px" }}>
                <div
                    className="card border-0 shadow-sm p-4 p-md-5"
                    style={{ borderRadius: "12px", background: "#ffffff", border: "1px solid #f0f0f0" }}
                >
                    <div className="text-center mb-4">
                        <img
                            src="/images/logo.svg"
                            alt="Zerodha"
                            className="mb-3"
                            style={{ width: "160px", height: "auto" }}
                        />
                        <h2 className="fw-semibold text-dark mb-1" style={{ fontSize: "1.75rem" }}>
                            Login to Zerodha
                        </h2>
                        <p className="text-muted small">
                            Access your account, holdings, and Kite trading dashboard
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                            <strong>Error: </strong> {error}
                        </div>
                    )}

                    {successMessage && (
                        <div className="alert alert-success py-2 px-3 small rounded-3 mb-3" role="alert">
                            {successMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Mobile Number or Email */}
                        <div className="mb-3">
                            <label className="form-label text-secondary small fw-semibold">
                                Mobile Number or Email
                            </label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control py-2"
                                placeholder="10-digit mobile number or email"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <label className="form-label text-secondary small fw-semibold mb-0">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    className="btn btn-link p-0 text-decoration-none small"
                                    style={{ fontSize: "0.85rem", color: "#387ed1" }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="form-control py-2"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100 py-2 fw-semibold mt-2"
                            style={{ backgroundColor: "#387ed1", borderColor: "#387ed1", fontSize: "1rem" }}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Verifying credentials...
                                </>
                            ) : (
                                "Login to Account"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-4 pt-3 border-top">
                        <span className="text-muted small">Don't have an account? </span>
                        <Link to="/signup" className="text-primary text-decoration-none fw-semibold small">
                            Sign up now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
