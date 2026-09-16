import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("zerodha_user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("zerodha_token") || null;
    });

    const [loading, setLoading] = useState(true);

    // Synchronize axios defaults whenever token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
        setLoading(false);
    }, [token]);

    // Sign up new user
    const signup = async ({ fullName, phone, email, password }) => {
        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/signup`,
                { fullName, phone, email, password },
                { withCredentials: true }
            );

            if (res.data.success && res.data.token) {
                localStorage.setItem("zerodha_token", res.data.token);
                localStorage.setItem("zerodha_user", JSON.stringify(res.data.user));
                setToken(res.data.token);
                setUser(res.data.user);
                return { success: true, data: res.data };
            }
            return { success: false, message: res.data.message || "Signup failed." };
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Failed to connect to Zerodha authentication server. Please verify backend is running.";
            return { success: false, message: msg };
        }
    };

    // Log in user with phone number and password
    const login = async ({ phone, identifier, password }) => {
        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/login`,
                { phone, identifier, password },
                { withCredentials: true }
            );

            if (res.data.success && res.data.token) {
                localStorage.setItem("zerodha_token", res.data.token);
                localStorage.setItem("zerodha_user", JSON.stringify(res.data.user));
                setToken(res.data.token);
                setUser(res.data.user);
                return { success: true, data: res.data };
            }
            return { success: false, message: res.data.message || "Login failed." };
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                "Invalid mobile number or password. Please try again.";
            return { success: false, message: msg };
        }
    };

    // Log out user
    const logout = async () => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
        } catch {
            // Ignore logout network errors
        } finally {
            localStorage.removeItem("zerodha_token");
            localStorage.removeItem("zerodha_user");
            setToken(null);
            setUser(null);
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: Boolean(token && user),
                loading,
                signup,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
