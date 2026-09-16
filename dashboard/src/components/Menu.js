import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Menu = ({ onLogout }) => {
    const location = useLocation();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("kite_user");
            if (saved) {
                setUser(JSON.parse(saved));
            }
        } catch {
            setUser(null);
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navItems = [
        { name: "Dashboard", path: "/" },
        { name: "Orders", path: "/orders" },
        { name: "Holdings", path: "/holdings" },
        { name: "Positions", path: "/positions" },
        { name: "Funds", path: "/funds" },
        { name: "Apps", path: "/apps" },
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "";
        }
        return location.pathname.startsWith(path);
    };

    // Generate initials from name or fallback
    const getInitials = () => {
        if (!user || !user.fullName) return "ZU";
        const parts = user.fullName.trim().split(" ");
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return user.fullName.slice(0, 2).toUpperCase();
    };

    const handleLogoutClick = () => {
        sessionStorage.removeItem("kite_token");
        sessionStorage.removeItem("kite_user");
        setIsProfileDropdownOpen(false);
        if (onLogout) {
            onLogout();
        } else {
            window.location.reload();
        }
    };

    return (
        <nav className="menu-container">
            <Link to="/" className="logo-link">
                <img src="logo.svg" className="kite-logo" alt="Kite by Zerodha" />
            </Link>

            <div className="menus">
                <ul className="nav-links">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="nav-divider"></div>

                <div className="nav-actions" style={{ position: "relative" }} ref={dropdownRef}>
                    <button className="icon-btn" title="Notifications" aria-label="Notifications">
                        <NotificationsNoneOutlinedIcon className="nav-icon" />
                    </button>

                    <div
                        className="profile-pill"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                        title="View Profile & Settings"
                    >
                        <div className="avatar">{getInitials()}</div>
                        <span className="username">
                            {user?.clientId || user?.phone || "USERID"}
                        </span>
                    </div>

                    {/* Profile Dropdown */}
                    {isProfileDropdownOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "42px",
                                right: 0,
                                width: "240px",
                                backgroundColor: "#ffffff",
                                borderRadius: "6px",
                                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                                border: "1px solid #e0e0e0",
                                zIndex: 1000,
                                padding: "12px 0",
                                textAlign: "left",
                                fontSize: "13px",
                            }}
                        >
                            <div style={{ padding: "8px 16px", borderBottom: "1px solid #f0f0f0" }}>
                                <div style={{ fontWeight: "600", color: "#333", fontSize: "14px" }}>
                                    {user?.fullName || "Kite Trader"}
                                </div>
                                <div style={{ color: "#888", fontSize: "12px", marginTop: "2px" }}>
                                    {user?.email || "trader@zerodha.com"}
                                </div>
                                <div style={{ color: "#ff5722", fontSize: "11px", fontWeight: "600", marginTop: "4px" }}>
                                    ID: {user?.clientId || "ZH8665"} • +91 {user?.phone || ""}
                                </div>
                            </div>

                            <div style={{ padding: "6px 0" }}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const port = window.location.port;
                                        const frontendPort = port === "3000" ? "3001" : "3000";
                                        window.location.href = `http://${window.location.hostname}:${frontendPort}`;
                                    }}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 16px",
                                        color: "#444",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7f7f7")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Zerodha Website
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const port = window.location.port;
                                        const frontendPort = port === "3000" ? "3001" : "3000";
                                        window.location.href = `http://${window.location.hostname}:${frontendPort}/support`;
                                    }}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 16px",
                                        color: "#444",
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                        transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7f7f7")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Support &amp; Tickets
                                </button>
                            </div>

                            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "6px" }}>
                                <button
                                    onClick={handleLogoutClick}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "8px 16px",
                                        background: "none",
                                        border: "none",
                                        textAlign: "left",
                                        color: "#d32f2f",
                                        fontWeight: "500",
                                        cursor: "pointer",
                                        fontSize: "13px",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#fdf2f2")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
                                >
                                    Logout from Kite
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Menu;