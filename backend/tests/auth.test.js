const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create test app with auth routes and middleware
const authRoutes = require('../routes/authRoutes');
const { verifyToken } = require('../middleware/authMiddleware');
const { UserModel } = require('../model/UserModel');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);

// Protected route for testing verifyToken middleware
app.get('/protected-profile', verifyToken, (req, res) => {
    res.json({ success: true, user: req.user });
});

describe('Backend Auth & Security Tests', () => {
    const JWT_SECRET = process.env.JWT_SECRET || 'zerodha_super_secure_jwt_secret_key_2026_98374218974';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1. Password Hashing: bcrypt properly hashes passwords and verifies them', async () => {
        const rawPassword = 'SecurePassword@123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        expect(hashedPassword).not.toEqual(rawPassword);
        expect(hashedPassword.startsWith('$2')).toBe(true);

        const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
        expect(isMatch).toBe(true);

        const isWrongMatch = await bcrypt.compare('WrongPassword', hashedPassword);
        expect(isWrongMatch).toBe(false);
    });

    test('2. JWT Signing & Verification: correctly signs and decodes tokens', () => {
        const payload = { id: 'user_12345', phone: '9876543210' };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        expect(token).toBeDefined();
        expect(typeof token).toBe('string');

        const decoded = jwt.verify(token, JWT_SECRET);
        expect(decoded.id).toBe('user_12345');
        expect(decoded.phone).toBe('9876543210');
    });

    test('3. Signup Validation: rejects signup with missing required fields', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                fullName: 'Yash Hogade',
                // phone is missing
                email: 'yash@example.com',
                password: 'Password@123',
            });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/required fields/i);
    });

    test('4. Signup Validation: rejects invalid mobile number (< 10 digits)', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                fullName: 'Yash Hogade',
                phone: '98765',
                email: 'yash@example.com',
                password: 'Password@123',
            });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/valid 10-digit/i);
    });

    test('5. Signup Validation: rejects weak password (< 8 characters)', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                fullName: 'Yash Hogade',
                phone: '9876543210',
                email: 'yash@example.com',
                password: 'short',
            });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/at least 8 characters/i);
    });

    test('6. Login Validation: rejects login with missing credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/mobile number.*password/i);
    });

    test('7. Protected Route: rejects requests without JWT token with 401', async () => {
        const res = await request(app).get('/protected-profile');

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toMatch(/authentication required|no token/i);
    });

    test('8. Protected Route: allows requests with valid Bearer token and existing user', async () => {
        const token = jwt.sign({ id: 'user_test_99', phone: '9876543210' }, JWT_SECRET, { expiresIn: '1h' });

        jest.spyOn(UserModel, 'findById').mockResolvedValueOnce({
            _id: 'user_test_99',
            fullName: 'Yash Hogade',
            phone: '9876543210',
            email: 'yash@example.com',
            clientId: 'ZH9999',
            role: 'trader',
        });

        const res = await request(app)
            .get('/protected-profile')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user.id).toBe('user_test_99');
        expect(res.body.user.fullName).toBe('Yash Hogade');
    });

    test('9. Logout Endpoint: clears authentication cookies', async () => {
        const res = await request(app).post('/auth/logout');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toMatch(/logged out/i);
    });
});
