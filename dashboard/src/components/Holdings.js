import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { holdings as defaultHoldings } from "../data/data";

const Holdings = () => {
    const [allHoldings, setAllHoldings] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3002/allHoldings")
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setAllHoldings(res.data);
                } else {
                    setAllHoldings(defaultHoldings);
                }
            })
            .catch((err) => {
                // Fallback to local data so dashboard renders flawlessly
                setAllHoldings(defaultHoldings);
            });
    }, []);

    const labels = allHoldings.map((stock) => stock.name);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Stock Price (₹)",
                data: allHoldings.map((stock) => stock.price),
                backgroundColor: "rgba(65, 132, 243, 0.6)",
                borderColor: "#4184f3",
                borderWidth: 1,
                borderRadius: 4,
            },
        ],
    };

    const totalInvestment = allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);
    const currentValue = allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0);
    const totalPnl = currentValue - totalInvestment;
    const pnlPercentage = totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;
    const isTotalProfit = totalPnl >= 0;

    return (
        <div className="holdings-page">
            <div className="page-header">
                <h2 className="page-title">Holdings ({allHoldings.length})</h2>
            </div>

            <div className="kite-table-card">
                <table className="kite-table">
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th className="text-right">Qty.</th>
                            <th className="text-right">Avg. cost</th>
                            <th className="text-right">LTP</th>
                            <th className="text-right">Cur. val</th>
                            <th className="text-right">P&L</th>
                            <th className="text-right">Net chg.</th>
                            <th className="text-right">Day chg.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allHoldings.map((stock, index) => {
                            const curVal = stock.price * stock.qty;
                            const investment = stock.avg * stock.qty;
                            const pnl = curVal - investment;
                            const isProfit = pnl >= 0;
                            const profClass = isProfit ? "profit" : "loss";
                            const dayClass = stock.isLoss ? "loss" : "profit";

                            return (
                                <tr key={index} className="kite-table-row">
                                    <td className="stock-cell">
                                        <span className="instrument-name">{stock.name}</span>
                                    </td>
                                    <td className="text-right">{stock.qty}</td>
                                    <td className="text-right">{Number(stock.avg).toFixed(2)}</td>
                                    <td className="text-right">{Number(stock.price).toFixed(2)}</td>
                                    <td className="text-right">{curVal.toFixed(2)}</td>
                                    <td className={`text-right ${profClass}`}>
                                        {isProfit ? "+" : ""}{pnl.toFixed(2)}
                                    </td>
                                    <td className={`text-right ${profClass}`}>{stock.net}</td>
                                    <td className={`text-right ${dayClass}`}>{stock.day}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="holdings-metrics-bar">
                <div className="metric-box">
                    <span className="metric-val">
                        ₹{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="metric-title">Total investment</span>
                </div>
                <div className="metric-box">
                    <span className="metric-val">
                        ₹{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="metric-title">Current value</span>
                </div>
                <div className="metric-box">
                    <span className={`metric-val ${isTotalProfit ? "profit" : "loss"}`}>
                        {isTotalProfit ? "+" : ""}₹{totalPnl.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({pnlPercentage.toFixed(2)}%)
                    </span>
                    <span className="metric-title">Total P&L</span>
                </div>
            </div>

            <div className="graph-container">
                <VerticalGraph data={chartData} />
            </div>
        </div>
    );
};

export default Holdings;