import React, { useState, useEffect } from "react";
import axios from "axios";
import { positions as defaultPositions } from "../data/data";
import { API_BASE_URL } from "../config/api";

const Positions = () => {
    const [allPositions, setAllPositions] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/allPositions`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAllPositions(res.data);
                } else {
                    setAllPositions(defaultPositions);
                }
            })
            .catch((err) => {
                // Fallback to local data if backend is unreachable
                setAllPositions(defaultPositions);
            });
    }, []);

    return (
        <div className="positions-page">
            <div className="page-header">
                <h2 className="page-title">Positions ({allPositions.length})</h2>
            </div>

            <div className="kite-table-card">
                <table className="kite-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Instrument</th>
                            <th className="text-right">Qty.</th>
                            <th className="text-right">Avg.</th>
                            <th className="text-right">LTP</th>
                            <th className="text-right">P&L</th>
                            <th className="text-right">Chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPositions.map((stock, index) => {
                            const curValue = stock.price * stock.qty;
                            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                            const profClass = isProfit ? "profit" : "loss";
                            const dayClass = stock.isLoss ? "loss" : "profit";

                            return (
                                <tr key={index} className="kite-table-row">
                                    <td>
                                        <span className="product-badge">{stock.product}</span>
                                    </td>
                                    <td>
                                        <span className="instrument-name">{stock.name}</span>
                                    </td>
                                    <td className="text-right">{stock.qty}</td>
                                    <td className="text-right">{Number(stock.avg || 0).toFixed(2)}</td>
                                    <td className="text-right">{Number(stock.price || 0).toFixed(2)}</td>
                                    <td className={`text-right ${profClass}`}>
                                        {isProfit ? "+" : ""}{(curValue - (stock.avg || 0) * (stock.qty || 0)).toFixed(2)}
                                    </td>
                                    <td className={`text-right ${dayClass}`}>{stock.day}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Positions;