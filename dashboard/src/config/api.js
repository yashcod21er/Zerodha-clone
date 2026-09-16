// Centralized API configuration supporting environment variable override for Render deployment
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";
export const ZERODHA_URL = process.env.REACT_APP_ZERODHA_URL || "http://localhost:3000";
