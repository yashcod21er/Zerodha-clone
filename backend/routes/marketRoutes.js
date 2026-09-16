const express = require("express");
const router = express.Router();
const marketService = require("../services/marketService");

// GET /market/indices
router.get("/indices", async (req, res) => {
    try {
        const indices = await marketService.getIndices();
        res.json({
            success: true,
            indices,
        });
    } catch (err) {
        console.error("Error fetching market indices:", err);
        res.status(500).json({ success: false, message: "Failed to fetch indices" });
    }
});

// GET /market/watchlist
router.get("/watchlist", async (req, res) => {
    try {
        const watchlist = await marketService.getWatchlistWithQuotes();
        res.json({
            success: true,
            watchlist,
        });
    } catch (err) {
        console.error("Error fetching watchlist quotes:", err);
        res.status(500).json({ success: false, message: "Failed to fetch watchlist quotes" });
    }
});

// GET /market/quote/:symbol
router.get("/quote/:symbol", async (req, res) => {
    try {
        const symbol = req.params.symbol;
        const quote = await marketService.getDirectQuote(symbol);
        if (!quote) {
            return res.status(404).json({
                success: false,
                message: `Could not retrieve live quote for symbol "${symbol}" from Twelve Data.`,
            });
        }
        res.json({
            success: true,
            quote,
        });
    } catch (err) {
        console.error("Error fetching direct quote:", err);
        res.status(500).json({ success: false, message: "Failed to fetch quote" });
    }
});

// GET /market/status
router.get("/status", (req, res) => {
    try {
        const status = marketService.getStatus();
        res.json({
            success: true,
            status,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch status" });
    }
});

module.exports = router;
