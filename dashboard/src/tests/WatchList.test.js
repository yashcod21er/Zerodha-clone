import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import WatchList from '../components/WatchList';
import GeneralContext from '../components/GeneralContext';

jest.mock('axios');

// Mock DoughnutChart to avoid canvas rendering issues in jsdom
jest.mock('../components/DoughnoutChart', () => {
    const React = require('react');
    return {
        DoughnutChart: () => React.createElement('div', { 'data-testid': 'mock-doughnut-chart' }, 'Doughnut Chart'),
    };
});

describe('Dashboard WatchList Component Tests', () => {
    const mockOpenBuyWindow = jest.fn();
    const mockCloseBuyWindow = jest.fn();

    const renderWatchList = (customContext = {}) => {
        return render(
            <GeneralContext.Provider
                value={{
                    openBuyWindow: mockOpenBuyWindow,
                    closeBuyWindow: mockCloseBuyWindow,
                    ...customContext,
                }}
            >
                <WatchList />
            </GeneralContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        axios.get.mockImplementation(() => new Promise(() => {})); // default unresolved
    });

    test('1. Renders default watchlist stocks with symbols and prices', () => {
        renderWatchList();

        expect(screen.getByText('INFY')).toBeInTheDocument();
        expect(screen.getByText('TCS')).toBeInTheDocument();
        expect(screen.getByText('RELIANCE')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/search eg: infy/i)).toBeInTheDocument();
    });

    test('2. Filters watchlist items when typing in the search box', () => {
        renderWatchList();

        const searchInput = screen.getByPlaceholderText(/search eg: infy/i);
        fireEvent.change(searchInput, { target: { value: 'infy' } });

        expect(screen.getByText('INFY')).toBeInTheDocument();
        expect(screen.queryByText('RELIANCE')).not.toBeInTheDocument();
        expect(screen.queryByText('TCS')).not.toBeInTheDocument();
    });

    test('3. Fetches and updates live stock quotes from Twelve Data backend', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                success: true,
                watchlist: [
                    {
                        name: 'INFY',
                        price: 1077.0,
                        percent: '+3.79%',
                        isDown: false,
                        live: true,
                        source: 'Twelve Data',
                    },
                    {
                        name: 'AAPL',
                        price: 331.34,
                        percent: '-0.52%',
                        isDown: true,
                        live: true,
                        source: 'Twelve Data',
                        isGlobal: true,
                    },
                ],
            },
        });

        renderWatchList();

        await waitFor(() => {
            expect(screen.getByText(/1,?077(\.00)?/)).toBeInTheDocument();
            expect(screen.getByText('+3.79%')).toBeInTheDocument();
            expect(screen.getByText('AAPL')).toBeInTheDocument();
        });
    });

    test('4. Opens Buy action window with live stock price when Buy button is clicked', async () => {
        renderWatchList();

        const infyRow = screen.getByText('INFY').closest('li');
        fireEvent.mouseEnter(infyRow);

        const buyBtn = await screen.findByRole('button', { name: /Buy \(B\)/i });
        expect(buyBtn).toBeInTheDocument();

        fireEvent.click(buyBtn);
        expect(mockOpenBuyWindow).toHaveBeenCalledWith('INFY', 'BUY', expect.any(Number));
    });

    test('5. Opens Sell action window when Sell button is clicked', async () => {
        renderWatchList();

        const infyRow = screen.getByText('INFY').closest('li');
        fireEvent.mouseEnter(infyRow);

        const sellBtn = await screen.findByRole('button', { name: /Sell \(S\)/i });
        expect(sellBtn).toBeInTheDocument();

        fireEvent.click(sellBtn);
        expect(mockOpenBuyWindow).toHaveBeenCalledWith('INFY', 'SELL', expect.any(Number));
    });
});
