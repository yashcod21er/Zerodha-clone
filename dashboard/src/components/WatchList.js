import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config/api";
import { Tooltip, Grow } from "@mui/material";
import {
    Search as SearchIcon,
    BarChartOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
    MoreHoriz,
    SettingsOutlined,
    ShowChartOutlined,
    Add as AddIcon,
    FlashOn,
} from "@mui/icons-material";
import { watchlist as initialWatchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
    const [stockList, setStockList] = useState(initialWatchlist);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState(1);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [isLiveFeed, setIsLiveFeed] = useState(false);
    const [searchingLive, setSearchingLive] = useState(false);
    const [liveSearchResult, setLiveSearchResult] = useState(null);
    const [searchError, setSearchError] = useState("");

    // Fetch real-time market quotes from backend (powered by Twelve Data)
    useEffect(() => {
        let isMounted = true;
        const fetchLiveWatchlist = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/market/watchlist`);
                if (isMounted && res.data?.success && res.data?.watchlist?.length) {
                    setStockList(res.data.watchlist);
                    setIsLiveFeed(true);
                }
            } catch (e) {
                // Silently fallback to current list
            }
        };

        fetchLiveWatchlist();
        const interval = setInterval(fetchLiveWatchlist, 20000); // 20s interval
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    // Filter local list
    const filteredWatchlist = stockList.filter((stock) =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Dynamic Doughnut chart data
    const chartData = {
        labels: stockList.slice(0, 9).map((s) => s.name),
        datasets: [
            {
                label: "Price",
                data: stockList.slice(0, 9).map((s) => s.price),
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

    // Live search on Twelve Data for any symbol
    const handleSearchTwelveData = async () => {
        if (!searchTerm.trim()) return;
        setSearchingLive(true);
        setSearchError("");
        setLiveSearchResult(null);
        try {
            const sym = searchTerm.trim().toUpperCase();
            const res = await axios.get(`${API_BASE_URL}/market/quote/${encodeURIComponent(sym)}`);
            if (res.data?.success && res.data?.quote) {
                setLiveSearchResult(res.data.quote);
            } else {
                setSearchError(`Symbol "${sym}" not found.`);
            }
        } catch (err) {
            setSearchError(`Symbol "${searchTerm.toUpperCase()}" requires a higher Twelve Data plan or is unavailable.`);
        } finally {
            setSearchingLive(false);
        }
    };

    const handleAddToWatchlist = (quote) => {
        const newStock = {
            name: quote.symbol,
            price: quote.price,
            percent: quote.percent,
            isDown: quote.isDown,
            high: quote.high,
            low: quote.low,
            live: true,
            source: "Twelve Data",
            isGlobal: quote.currency !== "INR",
        };
        setStockList((prev) => [newStock, ...prev.filter((s) => s.name !== quote.symbol)]);
        setLiveSearchResult(null);
        setSearchTerm("");
    };

    return (
        <aside className="watchlist-container">
            <div className="search-wrapper">
                <SearchIcon className="search-icon" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg: infy, aapl, msft, bse"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setLiveSearchResult(null);
                        setSearchError("");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearchTwelveData();
                    }}
                />
                <span className="stock-count">{filteredWatchlist.length} / 50</span>
            </div>

            {/* Twelve Data live search prompt or result */}
            {searchTerm && filteredWatchlist.length === 0 && !liveSearchResult && (
                <div className="td-search-box">
                    <button
                        className="td-search-action-btn"
                        onClick={handleSearchTwelveData}
                        disabled={searchingLive}
                    >
                        <FlashOn fontSize="small" style={{ color: "#f39c12" }} />
                        {searchingLive ? "Searching Twelve Data..." : `Search Twelve Data for "${searchTerm.toUpperCase()}"`}
                    </button>
                    {searchError && <div className="td-search-error">{searchError}</div>}
                </div>
            )}

            {liveSearchResult && (
                <div className="td-result-card">
                    <div className="td-result-header">
                        <div>
                            <span className="td-symbol-name">{liveSearchResult.symbol}</span>
                            <span className="td-exchange-badge">{liveSearchResult.exchange}</span>
                        </div>
                        <div className="td-price-tag">
                            <span className={`stock-price ${liveSearchResult.isDown ? "down" : "up"}`}>
                                {liveSearchResult.currency === "INR" ? "₹" : "$"}
                                {liveSearchResult.price}
                            </span>
                            <span className="stock-percent">{liveSearchResult.percent}</span>
                        </div>
                    </div>
                    <div className="td-result-footer">
                        <span className="td-source-tag">Live Feed: Twelve Data</span>
                        <button
                            className="td-add-btn"
                            onClick={() => handleAddToWatchlist(liveSearchResult)}
                        >
                            <AddIcon fontSize="small" /> Add to Watchlist
                        </button>
                    </div>
                </div>
            )}

            <div className="watchlist-scrollable">
                <ul className="watchlist-list">
                    {filteredWatchlist.map((stock, index) => (
                        <WatchListItem
                            stock={stock}
                            key={stock.name || index}
                            onToggleChart={() => setShowAnalytics(!showAnalytics)}
                        />
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
                    <Tooltip
                        title={isLiveFeed ? "Twelve Data Live Market Feed: Connected" : "Connecting to Market Feed"}
                        placement="top"
                        arrow
                        TransitionComponent={Grow}
                    >
                        <div className="feed-status-indicator">
                            <span className={`status-dot ${isLiveFeed ? "connected" : ""}`}></span>
                            <span className="status-label">TD LIVE</span>
                        </div>
                    </Tooltip>
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

    const isGlobal = stock.isGlobal || stock.currency === "USD";
    const currencyPrefix = isGlobal ? "$" : "";

    return (
        <li
            className={`watchlist-item-row ${stock.isDown ? "item-down" : "item-up"}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
        >
            <div className="item-details">
                <div className="symbol-meta-wrapper">
                    <span className="stock-symbol">{stock.name}</span>
                    {stock.source === "Twelve Data" && (
                        <span className="twelve-data-pill" title="Live quote from Twelve Data">TD</span>
                    )}
                </div>
                <div className="price-container">
                    <span className="stock-percent">{stock.percent}</span>
                    {stock.isDown ? (
                        <KeyboardArrowDown className="direction-icon down" />
                    ) : (
                        <KeyboardArrowUp className="direction-icon up" />
                    )}
                    <span className={`stock-price ${stock.isDown ? "down" : "up"}`}>
                        {currencyPrefix}
                        {Number(stock.price).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </span>
                </div>
            </div>

            {isHovered && (
                <WatchListActions
                    uid={stock.name}
                    price={stock.price}
                    onToggleChart={onToggleChart}
                />
            )}
        </li>
    );
};

const WatchListActions = ({ uid, price, onToggleChart }) => {
    const generalContext = useContext(GeneralContext);

    const handleBuyClick = (e) => {
        e.stopPropagation();
        generalContext.openBuyWindow(uid, "BUY", price);
    };

    const handleSellClick = (e) => {
        e.stopPropagation();
        generalContext.openBuyWindow(uid, "SELL", price);
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