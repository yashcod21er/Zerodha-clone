import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../landing page/login/Login';
import * as AuthContext from '../context/AuthContext';

// Mock react-router-dom Link cleanly for Jest
jest.mock('react-router-dom', () => ({
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    useNavigate: () => jest.fn(),
}));

// Mock useAuth hook
jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('Login Component Tests', () => {
    const mockLogin = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        AuthContext.useAuth.mockReturnValue({
            login: mockLogin,
            user: null,
            isAuthenticated: false,
        });
    });

    test('1. Renders login form with header, inputs, submit button, and signup link', () => {
        render(<Login />);

        expect(screen.getByRole('heading', { name: /login to zerodha/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/10-digit mobile number or email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login to account/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /sign up now/i })).toBeInTheDocument();
    });

    test('2. Displays error when submitting empty phone/email', async () => {
        render(<Login />);

        const submitBtn = screen.getByRole('button', { name: /login to account/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter your registered mobile number or email/i)).toBeInTheDocument();
        expect(mockLogin).not.toHaveBeenCalled();
    });

    test('3. Displays error when submitting empty password', async () => {
        render(<Login />);

        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number or email/i);
        fireEvent.change(phoneInput, { target: { value: '9876543210' } });

        const submitBtn = screen.getByRole('button', { name: /login to account/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter your password/i)).toBeInTheDocument();
        expect(mockLogin).not.toHaveBeenCalled();
    });

    test('4. Toggles password visibility when clicking Show/Hide button', () => {
        render(<Login />);

        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const toggleBtn = screen.getByRole('button', { name: /show/i });

        expect(passwordInput).toHaveAttribute('type', 'password');

        fireEvent.click(toggleBtn);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.getByRole('button', { name: /hide/i })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /hide/i }));
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.getByRole('button', { name: /show/i })).toBeInTheDocument();
    });

    test('5. Submits valid credentials and shows success message on successful login', async () => {
        mockLogin.mockResolvedValueOnce({ success: true });

        render(<Login />);

        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number or email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const submitBtn = screen.getByRole('button', { name: /login to account/i });

        fireEvent.change(phoneInput, { target: { value: '9876543210' } });
        fireEvent.change(passwordInput, { target: { value: 'ValidPassword@123' } });
        fireEvent.click(submitBtn);

        expect(mockLogin).toHaveBeenCalledWith({
            phone: '9876543210',
            password: 'ValidPassword@123',
        });

        expect(await screen.findByText(/login successful! welcome back to zerodha/i)).toBeInTheDocument();
    });

    test('6. Displays error message from server when login fails', async () => {
        mockLogin.mockResolvedValueOnce({
            success: false,
            message: 'Invalid phone or password. Please check your credentials.',
        });

        render(<Login />);

        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number or email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const submitBtn = screen.getByRole('button', { name: /login to account/i });

        fireEvent.change(phoneInput, { target: { value: '9876543210' } });
        fireEvent.change(passwordInput, { target: { value: 'WrongPassword' } });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/invalid phone or password/i)).toBeInTheDocument();
    });

    test('7. Clears existing error message when user begins typing again', async () => {
        render(<Login />);

        const submitBtn = screen.getByRole('button', { name: /login to account/i });
        fireEvent.click(submitBtn);

        expect(await screen.findByText(/please enter your registered mobile number or email/i)).toBeInTheDocument();

        const phoneInput = screen.getByPlaceholderText(/10-digit mobile number or email/i);
        fireEvent.change(phoneInput, { target: { value: '9' } });

        expect(screen.queryByText(/please enter your registered mobile number or email/i)).not.toBeInTheDocument();
    });
});
