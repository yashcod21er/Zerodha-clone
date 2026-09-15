import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: "Holdings Valuation (₹)",
            color: "#666",
            font: {
                size: 13,
                family: "Inter",
                weight: 500,
            },
            padding: {
                bottom: 16,
            },
        },
        tooltip: {
            backgroundColor: "#222",
            titleFont: { family: "Inter", size: 12 },
            bodyFont: { family: "Inter", size: 12 },
            padding: 10,
            cornerRadius: 4,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                color: "#888",
                font: { family: "Inter", size: 11 },
            },
        },
        y: {
            grid: {
                color: "#f5f5f5",
            },
            ticks: {
                color: "#888",
                font: { family: "Inter", size: 11 },
            },
        },
    },
};

export function VerticalGraph({ data }) {
    return (
        <div style={{ height: "300px", width: "100%" }}>
            <Bar options={options} data={data} />
        </div>
    );
}