import React from "react";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TollOutlinedIcon from "@mui/icons-material/TollOutlined";

const Funds = () => {
    return (
        <div className="funds-page">
            <div className="funds-banner">
                <p className="banner-text">Instant, zero-cost fund transfers with UPI</p>
                <div className="banner-actions">
                    <button className="kite-btn-green">Add funds</button>
                    <button className="kite-btn-blue">Withdraw</button>
                </div>
            </div>

            <div className="funds-grid">
                <div className="funds-column">
                    <div className="funds-card-header">
                        <AccountBalanceWalletOutlinedIcon className="card-icon" />
                        <h3>Equity</h3>
                    </div>

                    <div className="ledger-card">
                        <div className="ledger-highlight-row">
                            <span className="label">Available margin</span>
                            <span className="value primary-highlight">4,043.10</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Used margin</span>
                            <span className="value">3,757.30</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Available cash</span>
                            <span className="value">4,043.10</span>
                        </div>

                        <div className="ledger-divider"></div>

                        <div className="ledger-row">
                            <span className="label">Opening Balance</span>
                            <span className="value">4,043.10</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Payin</span>
                            <span className="value">4,064.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">SPAN</span>
                            <span className="value">0.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Delivery margin</span>
                            <span className="value">0.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Exposure</span>
                            <span className="value">0.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Options premium</span>
                            <span className="value">0.00</span>
                        </div>

                        <div className="ledger-divider"></div>

                        <div className="ledger-row">
                            <span className="label">Collateral (Liquid funds)</span>
                            <span className="value">0.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Collateral (Equity)</span>
                            <span className="value">0.00</span>
                        </div>
                        <div className="ledger-row">
                            <span className="label">Total Collateral</span>
                            <span className="value">0.00</span>
                        </div>
                    </div>
                </div>

                <div className="funds-column">
                    <div className="funds-card-header">
                        <TollOutlinedIcon className="card-icon" />
                        <h3>Commodity</h3>
                    </div>

                    <div className="commodity-empty-card">
                        <p className="commodity-msg">You don't have a commodity account</p>
                        <button className="kite-btn-blue">Open Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Funds;