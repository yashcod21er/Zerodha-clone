import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config/api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY", defaultPrice = null }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(defaultPrice ? Number(defaultPrice) : 100.0);
    const [orderType, setOrderType] = useState("MIS"); // MIS or CNC
    const [priceType, setPriceType] = useState("MARKET"); // MARKET or LIMIT
    const [tab, setTab] = useState("REGULAR"); // REGULAR, COVER, AMO
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (defaultPrice) {
            setStockPrice(Number(defaultPrice));
        }
    }, [defaultPrice]);

    const { closeBuyWindow } = useContext(GeneralContext);
    const isSell = mode === "SELL";

    const marginRequired = (Number(stockQuantity) * Number(stockPrice) * (orderType === "MIS" ? 0.2 : 1.0)).toFixed(2);

    const handleOrderSubmit = async () => {
        setErrorMessage("");
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/newOrder`, {
                name: uid,
                qty: Number(stockQuantity),
                price: Number(stockPrice),
                mode: isSell ? "SELL" : "BUY",
                product: orderType,
                orderType: priceType,
            });

            alert(res.data.message || `${isSell ? "Sell" : "Buy"} order confirmed!`);
            closeBuyWindow();
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Failed to place order.";
            setErrorMessage(message);
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        closeBuyWindow();
    };

    return (
        <div className="kite-modal-backdrop" onClick={handleCancelClick}>
            <div
                className="kite-buy-window"
                id="buy-window"
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`buy-window-header ${isSell ? "sell" : "buy"}`}>
                    <div className="header-top">
                        <div className="stock-info">
                            <span className="action-tag">{isSell ? "Sell" : "Buy"}</span>
                            <span className="stock-name">{uid || "STOCK"}</span>
                            <span className="exchange-tag">NSE</span>
                        </div>
                        <button className="close-btn" onClick={handleCancelClick}>✕</button>
                    </div>

                    <div className="order-tabs">
                        <span
                            className={`order-tab ${tab === "REGULAR" ? "active" : ""}`}
                            onClick={() => setTab("REGULAR")}
                        >
                            Regular
                        </span>
                        <span
                            className={`order-tab ${tab === "COVER" ? "active" : ""}`}
                            onClick={() => setTab("COVER")}
                        >
                            Cover
                        </span>
                        <span
                            className={`order-tab ${tab === "AMO" ? "active" : ""}`}
                            onClick={() => setTab("AMO")}
                        >
                            AMO
                        </span>
                    </div>
                </div>

                <div className="buy-window-body">
                    {errorMessage && (
                        <div className="order-error-banner">
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    <div className="product-type-row">
                        <label className={`radio-pill ${orderType === "MIS" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="orderType"
                                value="MIS"
                                checked={orderType === "MIS"}
                                onChange={() => setOrderType("MIS")}
                            />
                            <span>Intraday <strong>MIS</strong></span>
                        </label>
                        <label className={`radio-pill ${orderType === "CNC" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="orderType"
                                value="CNC"
                                checked={orderType === "CNC"}
                                onChange={() => setOrderType("CNC")}
                            />
                            <span>Longterm <strong>CNC</strong></span>
                        </label>
                    </div>

                    <div className="order-inputs-grid">
                        <fieldset className="kite-fieldset">
                            <legend>Qty.</legend>
                            <input
                                type="number"
                                min="1"
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className={`kite-fieldset ${priceType === "MARKET" ? "disabled" : ""}`}>
                            <legend>Price</legend>
                            <input
                                type="number"
                                step="0.05"
                                value={stockPrice}
                                disabled={priceType === "MARKET"}
                                onChange={(e) => setStockPrice(e.target.value)}
                            />
                        </fieldset>

                        <fieldset className="kite-fieldset disabled">
                            <legend>Trigger</legend>
                            <input type="number" disabled placeholder="0.0" />
                        </fieldset>
                    </div>

                    <div className="price-type-row">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="priceType"
                                value="MARKET"
                                checked={priceType === "MARKET"}
                                onChange={() => setPriceType("MARKET")}
                            />
                            <span>Market</span>
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="priceType"
                                value="LIMIT"
                                checked={priceType === "LIMIT"}
                                onChange={() => setPriceType("LIMIT")}
                            />
                            <span>Limit</span>
                        </label>
                    </div>
                </div>

                <div className="buy-window-footer">
                    <div className="margin-indicator">
                        <span>Margin required: <strong>₹{marginRequired}</strong></span>
                    </div>
                    <div className="footer-action-buttons">
                        <button
                            className={`kite-submit-btn ${isSell ? "sell" : "buy"}`}
                            onClick={handleOrderSubmit}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : isSell ? "Sell" : "Buy"}
                        </button>
                        <button className="kite-cancel-btn" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;