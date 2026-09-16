import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";
import { API_BASE_URL } from "../config/api";

const defaultIndices = {
    nifty50: {
        points: 24541.15,
        change: 120.45,
        percent: 0.49,
        isDown: false,
        formattedPoints: "24,541.15",
        formattedChange: "+120.45 (+0.49%)",
    },
    sensex: {
        points: 80519.34,
        change: 384.20,
        percent: 0.48,
        isDown: false,
        formattedPoints: "80,519.34",
        formattedChange: "+384.20 (+0.48%)",
    },
};

const TopBar = ({ onLogout }) => {
    const [indices, setIndices] = useState(defaultIndices);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchIndices = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/market/indices`);
                if (isMounted && res.data?.success && res.data?.indices) {
                    setIndices(res.data.indices);
                    setIsLive(true);
                }
            } catch (err) {
                // Silently retain current indices
            }
        };

        fetchIndices();
        const interval = setInterval(fetchIndices, 15000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <header className="topbar-container">
            <div className="indices-container">
                <div className="index-item">
                    <span className="index-title">NIFTY 50</span>
                    <span className={`index-points ${indices.nifty50.isDown ? "down" : "up"}`}>
                        {indices.nifty50.formattedPoints || indices.nifty50.points}
                    </span>
                    <span className={`index-change ${indices.nifty50.isDown ? "down" : "up"}`}>
                        {indices.nifty50.formattedChange}
                    </span>
                </div>
                <div className="index-divider"></div>
                <div className="index-item">
                    <span className="index-title">SENSEX</span>
                    <span className={`index-points ${indices.sensex.isDown ? "down" : "up"}`}>
                        {indices.sensex.formattedPoints || indices.sensex.points}
                    </span>
                    <span className={`index-change ${indices.sensex.isDown ? "down" : "up"}`}>
                        {indices.sensex.formattedChange}
                    </span>
                </div>
                <div className="live-feed-badge" title="Live Market Feed powered by Twelve Data">
                    <span className={`live-dot ${isLive ? "active" : ""}`}></span>
                    <span className="live-text">LIVE</span>
                </div>
            </div>

            <Menu onLogout={onLogout} />
        </header>
    );
};

export default TopBar;