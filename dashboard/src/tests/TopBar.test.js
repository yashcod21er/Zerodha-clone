import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import TopBar from '../components/TopBar';

jest.mock('axios');

// Mock Menu subcomponent cleanly
jest.mock('../components/Menu', () => {
    const React = require('react');
    return function MockMenu({ onLogout }) {
        return React.createElement(
            'div',
            { 'data-testid': 'mock-menu' },
            React.createElement('button', { onClick: onLogout }, 'Mock Logout')
        );
    };
});

describe('Dashboard TopBar Component Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('1. Renders default NIFTY 50 and SENSEX indices along with LIVE feed badge', () => {
        axios.get.mockImplementation(() => new Promise(() => {})); // pending

        render(<TopBar onLogout={jest.fn()} />);

        expect(screen.getByText(/NIFTY 50/i)).toBeInTheDocument();
        expect(screen.getByText(/SENSEX/i)).toBeInTheDocument();
        expect(screen.getByText(/LIVE/i)).toBeInTheDocument();
    });

    test('2. Updates NIFTY 50 and SENSEX with live Twelve Data API points and percentage', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                success: true,
                indices: {
                    nifty50: {
                        points: 24650.80,
                        formattedPoints: '24,650.80',
                        formattedChange: '+230.10 (+0.94%)',
                        isDown: false,
                    },
                    sensex: {
                        points: 80890.15,
                        formattedPoints: '80,890.15',
                        formattedChange: '+755.00 (+0.94%)',
                        isDown: false,
                    },
                },
            },
        });

        render(<TopBar onLogout={jest.fn()} />);

        await waitFor(() => {
            expect(screen.getByText('24,650.80')).toBeInTheDocument();
            expect(screen.getByText('+230.10 (+0.94%)')).toBeInTheDocument();
            expect(screen.getByText('80,890.15')).toBeInTheDocument();
            expect(screen.getByText('+755.00 (+0.94%)')).toBeInTheDocument();
        });
    });

    test('3. Successfully invokes onLogout callback when logout is triggered', () => {
        const mockLogout = jest.fn();
        render(<TopBar onLogout={mockLogout} />);

        screen.getByText('Mock Logout').click();
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});
