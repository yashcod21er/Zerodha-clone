import React from "react";
import { positions } from "../data/data";

const Positions = () => {
    return (
        <div className="positions-page">
            <div className="page-header">
                <h2 className="page-title">Positions ({positions.length})</h2>
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
                        {positions.map((stock, index) => {
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
                                    <td className="text-right">{stock.avg.toFixed(2)}</td>
                                    <td className="text-right">{stock.price.toFixed(2)}</td>
                                    <td className={`text-right ${profClass}`}>
                                        {isProfit ? "+" : ""}{(curValue - stock.avg * stock.qty).toFixed(2)}
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