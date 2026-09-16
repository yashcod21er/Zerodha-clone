import React, { useState } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
    const location = useLocation();
    const [mobileTab, setMobileTab] = useState("watchlist"); // "watchlist" or "dashboard"

    const isHome = location.pathname === "/" || location.pathname === "";

    return (
        <GeneralContextProvider>
            {/* Mobile-Only Segmented Switcher for Home (Watchlist vs Overview) */}
            {isHome && (
                <div className="kite-mobile-view-toggle">
                    <button
                        type="button"
                        className={`mobile-tab-btn ${mobileTab === "watchlist" ? "active" : ""}`}
                        onClick={() => setMobileTab("watchlist")}
                    >
                        📊 Watchlist
                    </button>
                    <button
                        type="button"
                        className={`mobile-tab-btn ${mobileTab === "dashboard" ? "active" : ""}`}
                        onClick={() => setMobileTab("dashboard")}
                    >
                        📈 Overview
                    </button>
                </div>
            )}

            <div
                className={`dashboard-container ${
                    isHome ? `mobile-view-${mobileTab}` : "mobile-view-content"
                }`}
            >
                <div className="watchlist-wrapper">
                    <WatchList />
                </div>
                <main className="content">
                    <Routes>
                        <Route exact path="/" element={<Summary />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/holdings" element={<Holdings />} />
                        <Route path="/positions" element={<Positions />} />
                        <Route path="/funds" element={<Funds />} />
                        <Route path="/apps" element={<Apps />} />
                    </Routes>
                </main>
            </div>

            {/* Official Kite Mobile Bottom Navigation Bar */}
            <nav className="kite-bottom-nav">
                <Link
                    to="/"
                    onClick={() => setMobileTab("watchlist")}
                    className={`bottom-nav-item ${
                        isHome && mobileTab === "watchlist" ? "active" : ""
                    }`}
                >
                    <span className="bottom-nav-icon">📊</span>
                    <span className="bottom-nav-label">Watchlist</span>
                </Link>
                <Link
                    to="/orders"
                    className={`bottom-nav-item ${
                        location.pathname === "/orders" ? "active" : ""
                    }`}
                >
                    <span className="bottom-nav-icon">📋</span>
                    <span className="bottom-nav-label">Orders</span>
                </Link>
                <Link
                    to="/holdings"
                    className={`bottom-nav-item ${
                        location.pathname === "/holdings" ? "active" : ""
                    }`}
                >
                    <span className="bottom-nav-icon">💼</span>
                    <span className="bottom-nav-label">Holdings</span>
                </Link>
                <Link
                    to="/positions"
                    className={`bottom-nav-item ${
                        location.pathname === "/positions" ? "active" : ""
                    }`}
                >
                    <span className="bottom-nav-icon">📈</span>
                    <span className="bottom-nav-label">Positions</span>
                </Link>
                <Link
                    to="/funds"
                    className={`bottom-nav-item ${
                        location.pathname === "/funds" ? "active" : ""
                    }`}
                >
                    <span className="bottom-nav-icon">👤</span>
                    <span className="bottom-nav-label">Funds</span>
                </Link>
            </nav>
        </GeneralContextProvider>
    );
};

export default Dashboard;