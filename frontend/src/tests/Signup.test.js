import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../landing page/signup/SignUp';
import * as AuthContext from '../context/AuthContext';

// Mock react-router-dom Link cleanly for Jest
jest.mock('react-router-dom', () => ({
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    useNavigate: () => jest.fn(),
}));

// Mock useAuth
jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('SignUp Component Tests', () => {
    const mockSignup = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        AuthContext.useAuth.mockReturnValue({
            signup: mockSignup,
            user: null,
            isAuthenticated: false,
        });
    });

    test('1. Renders signup form with name, phone, email, and password inputs', () => {
        render(<SignUp />);

        expect(screen.getByPlaceholderText(/enter your name as per pan/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/10-digit mobile number/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/create a strong password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^continue$/i })).toBeInTheDocument();
    });

    test('2. Validates empty full name on submission', async () => {
        render(<SignUp />);

        const submitBtn = screen.getByRole('button', { name: /^continue$/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter your full name/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    test('3. Validates 10-digit phone number requirement', async () => {
        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText(/enter your name as per pan/i);
        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
        const submitBtn = screen.getByRole('button', { name: /^continue$/i });

        fireEvent.change(nameInput, { target: { value: 'Yash Hogade' } });
        fireEvent.change(phoneInput, { target: { value: '98765' } }); // only 5 digits
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter a valid 10-digit indian mobile number/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    test('4. Validates valid email requirement', async () => {
        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText(/enter your name as per pan/i);
        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
        const emailInput = screen.getByPlaceholderText(/name@example.com/i);
        const submitBtn = screen.getByRole('button', { name: /^continue$/i });

        fireEvent.change(nameInput, { target: { value: 'Yash Hogade' } });
        fireEvent.change(phoneInput, { target: { value: '9876543210' } });
        fireEvent.change(emailInput, { target: { value: 'invalid-email-no-at' } });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    test('5. Validates password minimum length requirement', async () => {
        render(<SignUp />);

        const nameInput = screen.getByPlaceholderText(/enter your name as per pan/i);
        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number/i);
        const emailInput = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/create a strong password/i);
        const submitBtn = screen.getByRole('button', { name: /^continue$/i });

        fireEvent.change(nameInput, { target: { value: 'Yash Hogade' } });
        fireEvent.change(phoneInput, { target: { value: '9876543210' } });
        fireEvent.change(emailInput, { target: { value: 'yash@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    test('6. Updates real-time password strength meter indicator', () => {
        render(<SignUp />);

        const passwordInput = screen.getByPlaceholderText(/create a strong password/i);

        // Weak password
        fireEvent.change(passwordInput, { target: { value: 'weakpass' } });
        expect(screen.getByText(/weak/i)).toBeInTheDocument();

        // Strong password (uppercase, lowercase, number, symbol)
        fireEvent.change(passwordInput, { target: { value: 'SuperSecret!99' } });
        expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });

    test('7. Submits valid registration details successfully', async () => {
        mockSignup.mockResolvedValueOnce({ success: true });

        render(<SignUp />);

        fireEvent.change(screen.getByPlaceholderText(/enter your name as per pan/i), { target: { value: 'Yash Hogade' } });
        fireEvent.change(screen.getByPlaceholderText(/10-digit mobile number/i), { target: { value: '9876543210' } });
        fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'yash@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/create a strong password/i), { target: { value: 'StrongPass@123' } });

        fireEvent.click(screen.getByRole('button', { name: /^continue$/i }));

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                fullName: 'Yash Hogade',
                phone: '9876543210',
                email: 'yash@example.com',
                password: 'StrongPass@123',
            });
        });
    });

    test('8. Displays server error when signup fails (e.g. user already exists)', async () => {
        mockSignup.mockResolvedValueOnce({
            success: false,
            message: 'A user with this mobile number already exists.',
        });

        render(<SignUp />);

        fireEvent.change(screen.getByPlaceholderText(/enter your name as per pan/i), { target: { value: 'Yash Hogade' } });
        fireEvent.change(screen.getByPlaceholderText(/10-digit mobile number/i), { target: { value: '9876543210' } });
        fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'yash@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/create a strong password/i), { target: { value: 'StrongPass@123' } });

        fireEvent.click(screen.getByRole('button', { name: /^continue$/i }));

        expect(await screen.findByText(/a user with this mobile number already exists/i)).toBeInTheDocument();
    });
});
