import React from "react";
import Menu from "./Menu";

const TopBar = () => {
    return (
        <header className="topbar-container">
            <div className="indices-container">
                <div className="index-item">
                    <span className="index-title">NIFTY 50</span>
                    <span className="index-points up">24,541.15</span>
                    <span className="index-change up">+120.45 (+0.49%)</span>
                </div>
                <div className="index-divider"></div>
                <div className="index-item">
                    <span className="index-title">SENSEX</span>
                    <span className="index-points up">80,519.34</span>
                    <span className="index-change up">+384.20 (+0.48%)</span>
                </div>
            </div>

            <Menu />
        </header>
    );
};

export default TopBar;