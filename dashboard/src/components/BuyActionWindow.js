import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(100.0);
    const [orderType, setOrderType] = useState("MIS"); // MIS or CNC
    const [priceType, setPriceType] = useState("MARKET"); // MARKET or LIMIT
    const [tab, setTab] = useState("REGULAR"); // REGULAR, COVER, AMO

    const { closeBuyWindow } = useContext(GeneralContext);

    const marginRequired = (Number(stockQuantity) * Number(stockPrice) * (orderType === "MIS" ? 0.2 : 1.0)).toFixed(2);

    const handleBuyClick = () => {
        axios.post("http://localhost:3002/newOrder", {
            name: uid,
            qty: Number(stockQuantity),
            price: Number(stockPrice),
            mode: "BUY",
        }).catch((err) => {
            console.log("Order simulated:", err);
        });

        closeBuyWindow();
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
                <div className="buy-window-header">
                    <div className="header-top">
                        <div className="stock-info">
                            <span className="action-tag">Buy</span>
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
                    <div className="product-type-row">
                        <label className={`radio-pill ${orderType === "MIS" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="productType"
                                value="MIS"
                                checked={orderType === "MIS"}
                                onChange={() => setOrderType("MIS")}
                            />
                            <span>Intraday <strong>MIS</strong></span>
                        </label>
                        <label className={`radio-pill ${orderType === "CNC" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="productType"
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
                                name="qty"
                                id="qty"
                                min="1"
                                onChange={(e) => setStockQuantity(Math.max(1, Number(e.target.value)))}
                                value={stockQuantity}
                            />
                        </fieldset>

                        <fieldset className={`kite-fieldset ${priceType === "MARKET" ? "disabled" : ""}`}>
                            <legend>Price</legend>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                step="0.05"
                                disabled={priceType === "MARKET"}
                                onChange={(e) => setStockPrice(e.target.value)}
                                value={stockPrice}
                            />
                        </fieldset>

                        <fieldset className="kite-fieldset disabled">
                            <legend>Trigger price</legend>
                            <input type="number" disabled value="0" />
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
                        <button className="kite-submit-btn buy" onClick={handleBuyClick}>
                            Buy
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