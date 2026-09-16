import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { AuthProvider, useAuth } from '../context/AuthContext';

jest.mock('axios');

// Test consumer component
const TestConsumer = () => {
    const { user, token, isAuthenticated, login, logout, signup } = useAuth();
    return (
        <div>
            <div data-testid="auth-status">{isAuthenticated ? 'LOGGED_IN' : 'LOGGED_OUT'}</div>
            <div data-testid="user-name">{user ? user.fullName : 'No User'}</div>
            <div data-testid="token-val">{token || 'No Token'}</div>
            <button
                onClick={() =>
                    login({ phone: '9876543210', password: 'Password@123' })
                }
            >
                Login Action
            </button>
            <button
                onClick={() =>
                    signup({
                        fullName: 'Test User',
                        phone: '9876543210',
                        email: 'test@example.com',
                        password: 'Password@123',
                    })
                }
            >
                Signup Action
            </button>
            <button onClick={() => logout()}>Logout Action</button>
        </div>
    );
};

describe('AuthContext Tests', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        delete axios.defaults.headers?.common?.['Authorization'];
    });

    test('1. Initializes in logged-out state when localStorage is empty', () => {
        render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );

        expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGGED_OUT');
        expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
        expect(screen.getByTestId('token-val')).toHaveTextContent('No Token');
    });

    test('2. Successfully logs in user, saves token to localStorage and sets auth header', async () => {
        const mockUser = { id: 'u123', fullName: 'Yash Hogade', phone: '9876543210' };
        const mockToken = 'mock_jwt_token_12345';

        axios.post.mockResolvedValueOnce({
            data: {
                success: true,
                token: mockToken,
                user: mockUser,
            },
        });

        render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );

        act(() => {
            screen.getByRole('button', { name: /login action/i }).click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGGED_IN');
            expect(screen.getByTestId('user-name')).toHaveTextContent('Yash Hogade');
            expect(screen.getByTestId('token-val')).toHaveTextContent(mockToken);
        });

        expect(localStorage.getItem('zerodha_token')).toBe(mockToken);
        expect(JSON.parse(localStorage.getItem('zerodha_user'))).toEqual(mockUser);
        expect(axios.defaults.headers.common['Authorization']).toBe(`Bearer ${mockToken}`);
    });

    test('3. Successfully logs out user, clears localStorage and deletes auth header', async () => {
        const mockUser = { id: 'u123', fullName: 'Yash Hogade', phone: '9876543210' };
        const mockToken = 'mock_jwt_token_12345';
        localStorage.setItem('zerodha_token', mockToken);
        localStorage.setItem('zerodha_user', JSON.stringify(mockUser));

        axios.post.mockResolvedValueOnce({ data: { success: true } });

        render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );

        expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGGED_IN');

        await act(async () => {
            screen.getByRole('button', { name: /logout action/i }).click();
        });

        await waitFor(() => {
            expect(screen.getByTestId('auth-status')).toHaveTextContent('LOGGED_OUT');
            expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
            expect(screen.getByTestId('token-val')).toHaveTextContent('No Token');
        });

        expect(localStorage.getItem('zerodha_token')).toBeNull();
        expect(localStorage.getItem('zerodha_user')).toBeNull();
        expect(axios.defaults.headers.common['Authorization']).toBeUndefined();
    });
});
