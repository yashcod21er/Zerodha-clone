import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
    Search as SearchIcon,
    BarChartOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
    MoreHoriz,
    SettingsOutlined,
    ShowChartOutlined,
} from "@mui/icons-material";
import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(1);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const filteredWatchlist = watchlist.filter((stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Price (₹)",
                data: watchlist.map((stock) => stock.price),
                backgroundColor: [
                    "rgba(233, 47, 87, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                    "rgba(255, 159, 64, 0.7)",
                    "rgba(46, 204, 113, 0.7)",
                    "rgba(231, 76, 60, 0.7)",
                    "rgba(155, 89, 182, 0.7)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <aside className="watchlist-container">
            <div className="search-wrapper">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg: infy, bse, nifty fut, nifty option"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="stock-count">{filteredWatchlist.length} / 50</span>
            </div>

            <div className="watchlist-scrollable">
                <ul className="watchlist-list">
                    {filteredWatchlist.map((stock, index) => (
                        <WatchListItem stock={stock} key={index} onToggleChart={() => setShowAnalytics(!showAnalytics)} />
                    ))}
                </ul>

                {showAnalytics && (
                    <div className="watchlist-analytics-box">
                        <div className="analytics-header">
                            <span>Watchlist Allocation</span>
                            <button className="close-analytics" onClick={() => setShowAnalytics(false)}>✕</button>
                        </div>
                        <DoughnutChart data={chartData} />
                    </div>
                )}
            </div>

            <div className="watchlist-footer">
                <div className="watchlist-tabs">
                    {[1, 2, 3, 4, 5, 6, 7].map((tab) => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="footer-actions">
                    <Tooltip title="Toggle Chart" placement="top" arrow TransitionComponent={Grow}>
                        <button
                            className={`footer-icon-btn ${showAnalytics ? "active" : ""}`}
                            onClick={() => setShowAnalytics(!showAnalytics)}
                        >
                            <ShowChartOutlined fontSize="small" />
                        </button>
                    </Tooltip>
                    <Tooltip title="Marketwatch settings" placement="top" arrow TransitionComponent={Grow}>
                        <button className="footer-icon-btn">
                            <SettingsOutlined fontSize="small" />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </aside>
    );
};

export default WatchList;

const WatchListItem = ({ stock, onToggleChart }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            className={`watchlist-item-row ${stock.isDown ? "item-down" : "item-up"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="item-details">
                <span className="stock-symbol">{stock.name}</span>
                <div className="price-container">
                    <span className="stock-percent">{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className="direction-icon down" />
                    ) : (
                        <KeyboardArrowUp className="direction-icon up" />
                    )}
                    <span className={`stock-price ${stock.isDown ? "down" : "up"}`}>
                        {Number(stock.price).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
            </div>

            {isHovered && <WatchListActions uid={stock.name} onToggleChart={onToggleChart} />}
        </li>
    );
};

const WatchListActions = ({ uid, onToggleChart }) => {
    const generalContext = useContext(GeneralContext);

    const handleBuyClick = (e) => {
        e.stopPropagation();
        generalContext.openBuyWindow(uid);
    };

    const handleSellClick = (e) => {
        e.stopPropagation();
        generalContext.openBuyWindow(uid);
    };

    return (
        <div className="actions-overlay">
            <div className="action-buttons-group">
                <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action-btn-buy" onClick={handleBuyClick}>
                        B
                    </button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action-btn-sell" onClick={handleSellClick}>
                        S
                    </button>
                </Tooltip>
                <Tooltip title="Chart (C)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action-btn-icon" onClick={onToggleChart}>
                        <BarChartOutlined fontSize="small" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action-btn-icon">
                        <MoreHoriz fontSize="small" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};