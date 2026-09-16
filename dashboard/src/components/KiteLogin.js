import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const KiteLogin = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.phone.trim()) {
            setError("Please enter your registered mobile number or User ID.");
            return;
        }

        if (!formData.password) {
            setError("Please enter your password.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/login`,
                {
                    phone: formData.phone,
                    password: formData.password,
                },
                { withCredentials: true }
            );

            if (res.data.success && res.data.token) {
                sessionStorage.setItem("kite_token", res.data.token);
                sessionStorage.setItem("kite_user", JSON.stringify(res.data.user));
                if (onLoginSuccess) {
                    onLoginSuccess(res.data.user);
                }
            } else {
                setError(res.data.message || "Invalid credentials.");
            }
        } catch (err) {
            console.error("[Kite Login Error]", err, "Attempted Target:", `${API_BASE_URL}/auth/login`);
            const msg =
                err.response?.data?.message ||
                (err.message === "Network Error"
                    ? `Network connection error. Unable to reach backend at ${API_BASE_URL}. Please verify backend is awake.`
                    : err.message) ||
                "Unable to connect to Zerodha Kite authentication server.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#fcfcfc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "390px",
                    background: "#ffffff",
                    border: "1px solid #ededed",
                    borderRadius: "8px",
                    padding: "40px 32px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                    textAlign: "center",
                }}
            >
                {/* Kite Logo */}
                <div style={{ marginBottom: "24px" }}>
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            margin: "0 auto 12px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, #ff5722 0%, #f44336 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.6rem",
                            boxShadow: "0 4px 10px rgba(255, 87, 34, 0.3)",
                        }}
                    >
                        K
                    </div>
                    <h2
                        style={{
                            fontSize: "1.45rem",
                            fontWeight: "500",
                            color: "#444",
                            margin: "0 0 6px",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Login to Kite
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: "#888", margin: 0 }}>
                        Enter your mobile number and password to trade
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            backgroundColor: "#fdf2f2",
                            color: "#d32f2f",
                            border: "1px solid #f8d7da",
                            borderRadius: "4px",
                            padding: "10px 14px",
                            fontSize: "0.85rem",
                            marginBottom: "18px",
                            textAlign: "left",
                        }}
                    >
                        <strong>Error: </strong> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
                    {/* Mobile number */}
                    <div style={{ marginBottom: "18px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "0.8rem",
                                color: "#666",
                                fontWeight: "500",
                                marginBottom: "6px",
                            }}
                        >
                            Mobile number (or Client ID)
                        </label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span
                                style={{
                                    backgroundColor: "#f7f7f7",
                                    border: "1px solid #ddd",
                                    borderRight: "none",
                                    borderRadius: "4px 0 0 4px",
                                    padding: "9px 12px",
                                    fontSize: "0.88rem",
                                    color: "#666",
                                    fontWeight: "500",
                                }}
                            >
                                +91
                            </span>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="10-digit mobile number"
                                style={{
                                    flex: 1,
                                    padding: "9px 12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "0 4px 4px 0",
                                    fontSize: "0.92rem",
                                    outline: "none",
                                }}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: "22px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "6px",
                            }}
                        >
                            <label
                                style={{
                                    fontSize: "0.8rem",
                                    color: "#666",
                                    fontWeight: "500",
                                    margin: 0,
                                }}
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#387ed1",
                                    fontSize: "0.78rem",
                                    cursor: "pointer",
                                    padding: 0,
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            style={{
                                width: "100%",
                                boxSizing: "border-box",
                                padding: "9px 12px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                fontSize: "0.92rem",
                                outline: "none",
                            }}
                            required
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "11px",
                            backgroundColor: "#ff5722",
                            border: "none",
                            borderRadius: "4px",
                            color: "#fff",
                            fontSize: "0.95rem",
                            fontWeight: "500",
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s ease",
                            boxShadow: "0 2px 4px rgba(255, 87, 34, 0.2)",
                        }}
                    >
                        {loading ? "Logging in to Kite..." : "Login"}
                    </button>
                </form>

                {/* Footer Signup Link */}
                <div
                    style={{
                        marginTop: "24px",
                        paddingTop: "16px",
                        borderTop: "1px solid #f0f0f0",
                        fontSize: "0.82rem",
                        color: "#777",
                    }}
                >
                    Don't have a Zerodha account?{" "}
                    <button
                        type="button"
                        onClick={() => {
                            if (process.env.REACT_APP_ZERODHA_URL) {
                                window.location.href = `${process.env.REACT_APP_ZERODHA_URL}/signup`;
                                return;
                            }
                            const port = window.location.port;
                            const frontendPort = port === "3000" ? "3001" : "3000";
                            window.location.href = `http://${window.location.hostname}:${frontendPort}/signup`;
                        }}
                        style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "#387ed1",
                            fontWeight: "500",
                            cursor: "pointer",
                            fontSize: "0.82rem",
                        }}
                    >
                        Sign up now
                    </button>
                </div>
            </div>

            <div
                style={{
                    marginTop: "20px",
                    textAlign: "center",
                    fontSize: "0.78rem",
                    color: "#aaa",
                }}
            >
                Protected by Bank-grade 256-bit encryption &amp; JWT stateless authentication.
            </div>
        </div>
    );
};

export default KiteLogin;
