import React from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import { Link } from "react-router-dom";

const Summary = () => {
    const user = (() => {
        try {
            const u = sessionStorage.getItem("kite_user");
            return u ? JSON.parse(u) : null;
        } catch {
            return null;
        }
    })();
    const displayName = user?.fullName?.split(" ")[0] || user?.phone || "Trader";

    return (
        <div className="summary-page">
            <div className="summary-header">
                <h2 className="greeting-text">Hi, {displayName}!</h2>
                <div className="header-divider"></div>
            </div>

            <div className="summary-section">
                <div className="section-title">
                    <AccountBalanceWalletOutlinedIcon className="section-icon" />
                    <h3>Equity</h3>
                </div>

                <div className="summary-card">
                    <div className="metric-primary">
                        <span className="metric-large">3.74k</span>
                        <span className="metric-label">Margin available</span>
                    </div>

                    <div className="card-divider"></div>

                    <div className="metric-secondary-list">
                        <div className="metric-row">
                            <span className="metric-name">Margins used</span>
                            <span className="metric-val">0</span>
                        </div>
                        <div className="metric-row">
                            <span className="metric-name">Opening balance</span>
                            <span className="metric-val">3.74k</span>
                        </div>
                    </div>
                </div>

                <div className="section-footer-link">
                    <Link to="/funds" className="text-link">View funds & statement →</Link>
                </div>
            </div>

            <div className="section-divider"></div>

            <div className="summary-section">
                <div className="section-title">
                    <BusinessCenterOutlinedIcon className="section-icon" />
                    <h3>Holdings (13)</h3>
                </div>

                <div className="summary-card">
                    <div className="metric-primary">
                        <div className="metric-pnl-group">
                            <span className="metric-large profit">1.55k</span>
                            <span className="pnl-badge profit">+5.20%</span>
                        </div>
                        <span className="metric-label">P&L</span>
                    </div>

                    <div className="card-divider"></div>

                    <div className="metric-secondary-list">
                        <div className="metric-row">
                            <span className="metric-name">Current value</span>
                            <span className="metric-val">31.43k</span>
                        </div>
                        <div className="metric-row">
                            <span className="metric-name">Investment</span>
                            <span className="metric-val">29.88k</span>
                        </div>
                    </div>
                </div>

                <div className="section-footer-link">
                    <Link to="/holdings" className="text-link">View all holdings →</Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;