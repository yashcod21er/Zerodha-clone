import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../landing page/Navbar';
import * as AuthContext from '../context/AuthContext';

// Mock react-router-dom Link cleanly for Jest
jest.mock('react-router-dom', () => ({
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    useNavigate: () => jest.fn(),
}));

jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('Navbar Component Tests', () => {
    const mockLogout = jest.fn();

    const renderNavbar = (isAuthenticated = false) => {
        AuthContext.useAuth.mockReturnValue({
            isAuthenticated,
            logout: mockLogout,
            user: isAuthenticated ? { fullName: 'Yash Hogade', phone: '9876543210' } : null,
        });

        return render(<Navbar />);
    };

    test('1. Renders Zerodha brand logo and core navigation links', () => {
        renderNavbar(false);

        expect(screen.getByRole('link', { name: /zerodha home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /^about$/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /^products$/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /^pricing$/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /^support$/i })).toBeInTheDocument();
    });

    test('2. Displays "Sign up" link when user is logged out', () => {
        renderNavbar(false);

        expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /log out/i })).not.toBeInTheDocument();
    });

    test('3. Displays "Log out" button when user is authenticated', () => {
        renderNavbar(true);

        const logoutBtn = screen.getByRole('button', { name: /log out/i });
        expect(logoutBtn).toBeInTheDocument();
        expect(screen.queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument();

        fireEvent.click(logoutBtn);
        expect(mockLogout).toHaveBeenCalledTimes(1);
    });

    test('4. Toggles ecosystem menu when clicking 3-bar hamburger icon', () => {
        renderNavbar(false);

        const menuToggleBtn = screen.getByLabelText(/open zerodha ecosystem menu/i);
        expect(menuToggleBtn).toBeInTheDocument();

        // Click to open
        fireEvent.click(menuToggleBtn);
        expect(screen.getByText(/^Console$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Coin$/i)).toBeInTheDocument();
        expect(screen.getByText(/^Varsity$/i)).toBeInTheDocument();

        // Click again to close
        fireEvent.click(menuToggleBtn);
        expect(screen.queryByText(/^Console$/i)).not.toBeInTheDocument();
    });
});
