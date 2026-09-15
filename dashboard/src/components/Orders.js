import React from "react";
import { Link } from "react-router-dom";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

const Orders = () => {
    return (
        <div className="orders-page">
            <div className="sub-navbar">
                <span className="sub-nav-item active">Orders</span>
                <span className="sub-nav-item">GTT</span>
                <span className="sub-nav-item">Baskets</span>
                <span className="sub-nav-item">SIP</span>
                <span className="sub-nav-item">Alerts</span>
                <span className="sub-nav-item">IPO</span>
            </div>

            <div className="orders-empty-state">
                <div className="empty-icon-circle">
                    <ReceiptLongOutlinedIcon className="empty-icon" />
                </div>
                <h3 className="empty-title">You haven't placed any orders today</h3>
                <p className="empty-desc">Check out the marketwatch to explore instruments and place orders.</p>
                <Link to="/" className="kite-btn-primary">
                    Get started
                </Link>
            </div>
        </div>
    );
};

export default Orders;