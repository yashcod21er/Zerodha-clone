import React, { useState } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import KiteLogin from "./KiteLogin";

const Home = () => {
    // Kite has its own dedicated session.
    // Whenever a user navigates to Kite, it opens the Kite login page unless logged in during this Kite session.
    const [user, setUser] = useState(() => {
        try {
            const saved = sessionStorage.getItem("kite_user");
            const token = sessionStorage.getItem("kite_token");
            return saved && token ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("kite_token");
        sessionStorage.removeItem("kite_user");
        setUser(null);
    };

    if (!user) {
        return <KiteLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <>
            <TopBar onLogout={handleLogout} />
            <Dashboard user={user} />
        </>
    );
};

export default Home;