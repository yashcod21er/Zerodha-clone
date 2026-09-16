// Centralized API configuration supporting environment variable override for Render deployment
const rawApiUrl = (process.env.REACT_APP_API_URL || "http://localhost:3002").trim();
const formattedApiUrl = rawApiUrl.startsWith("http://") || rawApiUrl.startsWith("https://")
    ? rawApiUrl
    : `https://${rawApiUrl}`;
export const API_BASE_URL = formattedApiUrl.replace(/\/+$/, "");

const rawZerodhaUrl = (process.env.REACT_APP_ZERODHA_URL || "http://localhost:3000").trim();
const formattedZerodha = rawZerodhaUrl.startsWith("http://") || rawZerodhaUrl.startsWith("https://")
    ? rawZerodhaUrl
    : `https://${rawZerodhaUrl}`;
export const ZERODHA_URL = formattedZerodha.replace(/\/+$/, "");
