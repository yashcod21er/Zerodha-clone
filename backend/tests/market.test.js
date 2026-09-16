const request = require('supertest');
const express = require('express');
const marketRoutes = require('../routes/marketRoutes');
const marketService = require('../services/marketService');

const app = express();
app.use(express.json());
app.use('/market', marketRoutes);

describe('Backend Twelve Data Market Service & Routes Tests', () => {
    test('1. Market Status: returns active status with Twelve Data provider and masked API key', async () => {
        const res = await request(app).get('/market/status');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.status.provider).toBe('Twelve Data');
        expect(res.body.status.apiKeyConfigured).toBe(true);
        expect(res.body.status.maskedKey).toMatch(/e6b4/);
    });

    test('2. Indices Endpoint: returns formatted NIFTY 50 and SENSEX with points and change', async () => {
        const res = await request(app).get('/market/indices');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.indices.nifty50).toBeDefined();
        expect(res.body.indices.nifty50.name).toBe('NIFTY 50');
        expect(typeof res.body.indices.nifty50.points).toBe('number');
        expect(res.body.indices.nifty50.formattedPoints).toBeDefined();

        expect(res.body.indices.sensex).toBeDefined();
        expect(res.body.indices.sensex.name).toBe('SENSEX');
        expect(typeof res.body.indices.sensex.points).toBe('number');
        expect(res.body.indices.sensex.formattedPoints).toBeDefined();
    });

    test('3. Watchlist Endpoint: returns list of stocks with prices, percentages, and direction', async () => {
        const res = await request(app).get('/market/watchlist');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.watchlist)).toBe(true);
        expect(res.body.watchlist.length).toBeGreaterThanOrEqual(9);

        // Check first item (INFY)
        const infy = res.body.watchlist.find((s) => s.name === 'INFY');
        expect(infy).toBeDefined();
        expect(infy.name).toBe('INFY');
        expect(typeof infy.price).toBe('number');
        expect(infy.percent).toBeDefined();
        expect(typeof infy.isDown).toBe('boolean');
    });

    test('4. Direct Quote Endpoint: handles unavailable symbol cleanly with 404', async () => {
        const res = await request(app).get('/market/quote/NON_EXISTENT_SYMBOL_XYZ_123');

        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/could not retrieve live quote/i);
    });

    test('5. Rate Limiting Protection: respects maximum calls per minute limit', () => {
        const status = marketService.getStatus();
        expect(status.maxCallsPerMinute).toBe(7);
        expect(status.callsInLastMinute).toBeLessThanOrEqual(status.maxCallsPerMinute);
    });
});
