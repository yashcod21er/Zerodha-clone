import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Menu = () => {
    const location = useLocation();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

                <div className="nav-actions">
                    <button className="icon-btn" title="Notifications" aria-label="Notifications">
                        <NotificationsNoneOutlinedIcon className="nav-icon" />
                    </button>

                    <div
                        className="profile-pill"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                        <div className="avatar">ZU</div>
                        <span className="username">USERID</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Menu;