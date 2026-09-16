import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SignUp() {
    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Calculate real-time password strength
    const calculateStrength = (pass) => {
        if (!pass) return { score: 0, label: "", color: "" };
        let score = 0;
        if (pass.length >= 8) score += 1;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
        if (/\d/.test(pass)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score += 1;

        if (score <= 1) return { score: 25, label: "Weak", color: "#df514c" };
        if (score === 2) return { score: 50, label: "Fair", color: "#ff9800" };
        if (score === 3) return { score: 75, label: "Good", color: "#2996e3" };
        return { score: 100, label: "Strong", color: "#4caf50" };
    };

    const strength = calculateStrength(formData.password);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const cleaned = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, [name]: cleaned }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        if (error) setError("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (formData.phone.length !== 10) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (!formData.email.trim() || !formData.email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        const result = await signup({
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (result.success) {
            // Smoothly redirect to home page where user can access the 3-dot menu or Kite
            window.location.href = "/";
        } else {
            setError(result.message);
        }
    };

    return (
        <section className="auth-section py-5" style={{ backgroundColor: "#ffffff" }}>
            <div className="container" style={{ maxWidth: "1140px" }}>
                {/* Official Zerodha Signup Page Header */}
                <div className="text-center mb-5">
                    <h1 style={{ fontSize: "2.35rem", fontWeight: "500", color: "#424242", letterSpacing: "-0.03em" }}>
                        Open a free demat and trading account online
                    </h1>
                    <p style={{ fontSize: "1.1rem", color: "#666", marginTop: "10px" }}>
                        Start investing brokerage-free and join a community of 1.5+ crore investors and traders
                    </p>
                </div>

                <div className="row align-items-center g-5">
                    {/* Left Column: Official Zerodha Illustration */}
                    <div className="col-lg-6 text-center">
                        <img
                            src="/images/signup.png"
                            alt="Open a Zerodha account"
                            className="img-fluid"
                            style={{ maxWidth: "490px", width: "100%" }}
                        />
                    </div>

                    {/* Right Column: Authentic Signup Form */}
                    <div className="col-lg-6">
                        <div
                            className="card border-0 p-4 p-md-5"
                            style={{
                                borderRadius: "6px",
                                background: "#ffffff",
                                border: "1px solid #e0e0e0",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <div className="mb-4">
                                <h2 className="fw-semibold text-dark mb-1" style={{ fontSize: "1.65rem", letterSpacing: "-0.02em" }}>
                                    Signup now
                                </h2>
                                <p className="text-muted small">
                                    Or track your existing application using your mobile number
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3" role="alert">
                                    <strong>Error: </strong> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} noValidate>
                                {/* Mobile Number */}
                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Mobile Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light text-muted fw-semibold" style={{ border: "1px solid #ddd" }}>
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-control py-2"
                                            placeholder="10-digit mobile number"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                    <div className="form-text small text-muted" style={{ fontSize: "0.78rem" }}>
                                        You will use this number to log in to Kite.
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control py-2"
                                        placeholder="Enter your name as per PAN"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email Address */}
                                <div className="mb-3">
                                    <label className="form-label text-secondary small fw-semibold">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control py-2"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <label className="form-label text-secondary small fw-semibold mb-0">Password</label>
                                        <button
                                            type="button"
                                            className="btn btn-link p-0 text-decoration-none small"
                                            style={{ fontSize: "0.82rem", color: "#387ed1" }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control py-2"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                    {/* Password Strength Indicator */}
                                    {formData.password && (
                                        <div className="mt-2">
                                            <div className="progress" style={{ height: "4px" }}>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${strength.score}%`,
                                                        backgroundColor: strength.color,
                                                        transition: "all 0.3s ease",
                                                    }}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between mt-1">
                                                <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
                                                    Strength: <strong style={{ color: strength.color }}>{strength.label}</strong>
                                                </span>
                                                <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
                                                    Min. 8 characters
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <small className="text-muted" style={{ fontSize: "0.78rem" }}>
                                        By proceeding, you agree to the Zerodha{" "}
                                        <span className="text-primary">terms of service</span> and{" "}
                                        <span className="text-primary">privacy policy</span>.
                                    </small>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-100 py-2 fw-semibold"
                                    style={{ backgroundColor: "#387ed1", borderColor: "#387ed1", fontSize: "1rem" }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Submitting...
                                        </>
                                    ) : (
                                        "Continue"
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-4 pt-3 border-top">
                                <span className="text-muted small">Already have an account? </span>
                                <Link to="/login" className="text-primary text-decoration-none fw-semibold small">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;