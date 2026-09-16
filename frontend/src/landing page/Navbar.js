import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Dynamically determine the URL of Kite
  // In production (Render), reads REACT_APP_KITE_URL. Locally falls back to 3000/3001.
  const getKiteUrl = () => {
    if (process.env.REACT_APP_KITE_URL) {
      return process.env.REACT_APP_KITE_URL;
    }
    if (typeof window !== "undefined") {
      const port = window.location.port;
      const kitePort = port === "3001" ? "3000" : "3001";
      return `http://${window.location.hostname}:${kitePort}`;
    }
    return "http://localhost:3000";
  };

  const handleOpenKite = (e) => {
    e.preventDefault();
    const targetUrl = getKiteUrl();
    window.location.href = targetUrl;
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg zerodha-navbar sticky-top" ref={menuRef}>
      <div className="container" style={{ position: "relative" }}>
        <Link className="navbar-brand" to="/" aria-label="Zerodha home">
          <img src="/images/logo.svg" alt="Zerodha" className="navbar-logo" />
        </Link>

        <button
          className="navbar-toggler zerodha-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#zerodhaNavigation"
          aria-controls="zerodhaNavigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="zerodhaNavigation">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {/* Dynamic Auth: If logged in, show Log out. If logged out, show Sign up. */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button
                  onClick={logout}
                  className="nav-link btn btn-link"
                  style={{
                    border: "none",
                    background: "none",
                    padding: ".65rem 0",
                    color: "#666",
                    fontSize: "1rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#387ed1")}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                >
                  Log out
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign up
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            {/* Authentic Zerodha 3-Bar Menu Button */}
            <li className="nav-item">
              <button
                className="nav-link menu-button"
                type="button"
                aria-label="Open Zerodha Ecosystem Menu"
                title="Zerodha Ecosystem"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  cursor: "pointer",
                  padding: "8px 10px",
                  borderRadius: "4px",
                  backgroundColor: isMenuOpen ? "#f2f2f2" : "transparent",
                  display: "inline-flex",
                  flexDirection: "column",
                  gap: "4px",
                  border: "none",
                }}
              >
                <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#424242" }} />
                <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#424242" }} />
                <span style={{ display: "block", width: "18px", height: "2px", backgroundColor: "#424242" }} />
              </button>
            </li>
          </ul>
        </div>

        {/* Authentic Zerodha Floating Ecosystem Dropdown Menu */}
        {isMenuOpen && (
          <div
            className="zerodha-ecosystem-dropdown"
            style={{
              position: "absolute",
              top: "70px",
              right: "15px",
              width: "min(640px, calc(100vw - 30px))",
              backgroundColor: "#ffffff",
              borderRadius: "6px",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              border: "1px solid #e8e8e8",
              zIndex: 1100,
              padding: "24px 28px",
              animation: "fadeIn 0.2s ease",
            }}
          >
            {/* Row 1: Primary Ecosystem Products (Official Zerodha Logos + Name ONLY) */}
            <div className="row text-center g-3 mb-4">
              {/* Kite Platform */}
              <div className="col-6 col-sm-3">
                <a
                  href={getKiteUrl()}
                  onClick={handleOpenKite}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    padding: "16px 8px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src="/images/products/kite-logo.svg"
                    alt="Kite"
                    style={{ width: "38px", height: "38px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <div style={{ fontWeight: "600", color: "#424242", fontSize: "0.95rem" }}>
                    Kite
                  </div>
                </a>
              </div>

              {/* Console */}
              <div className="col-6 col-sm-3">
                <a
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    padding: "16px 8px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src="/images/products/console.svg"
                    alt="Console"
                    style={{ width: "38px", height: "38px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <div style={{ fontWeight: "600", color: "#424242", fontSize: "0.95rem" }}>
                    Console
                  </div>
                </a>
              </div>

              {/* Kite Connect */}
              <div className="col-6 col-sm-3">
                <a
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    padding: "16px 8px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src="/images/products/kite-connect.svg"
                    alt="Kite Connect"
                    style={{ width: "38px", height: "38px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <div style={{ fontWeight: "600", color: "#424242", fontSize: "0.95rem" }}>
                    Kite Connect
                  </div>
                </a>
              </div>

              {/* Coin */}
              <div className="col-6 col-sm-3">
                <a
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    padding: "16px 8px",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <img
                    src="/images/products/coin.svg"
                    alt="Coin"
                    style={{ width: "38px", height: "38px", objectFit: "contain", marginBottom: "10px" }}
                  />
                  <div style={{ fontWeight: "600", color: "#424242", fontSize: "0.95rem" }}>
                    Coin
                  </div>
                </a>
              </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #f0f0f0", margin: "14px 0" }} />

            {/* Row 2: Utilities, Updates & Education */}
            <div className="row g-3 text-start" style={{ fontSize: "0.85rem" }}>
              {/* Utilities */}
              <div className="col-sm-4">
                <div style={{ fontWeight: "600", color: "#424242", marginBottom: "8px" }}>
                  Utilities
                </div>
                <div className="d-flex flex-column gap-1">
                  <a href="/pricing" style={{ color: "#666", textDecoration: "none" }}>Brokerage calculator</a>
                  <a href="/pricing" style={{ color: "#666", textDecoration: "none" }}>Margin calculator</a>
                  <a href="/pricing" style={{ color: "#666", textDecoration: "none" }}>SIP calculator</a>
                </div>
              </div>

              {/* Updates */}
              <div className="col-sm-4">
                <div style={{ fontWeight: "600", color: "#424242", marginBottom: "8px" }}>
                  Updates
                </div>
                <div className="d-flex flex-column gap-1">
                  <a href="/about" style={{ color: "#666", textDecoration: "none" }}>Z-Connect blog</a>
                  <a href="/support" style={{ color: "#666", textDecoration: "none" }}>Circulars / Bulletin</a>
                  <a href="/products" style={{ color: "#666", textDecoration: "none" }}>IPOs &amp; Markets</a>
                </div>
              </div>

              {/* Education */}
              <div className="col-sm-4">
                <div style={{ fontWeight: "600", color: "#424242", marginBottom: "8px" }}>
                  Education
                </div>
                <div className="d-flex flex-column gap-2 mt-1">
                  <a
                    href="/support"
                    style={{
                      color: "#424242",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img src="/images/products/varsity.png" alt="Varsity" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
                    <span>Varsity</span>
                  </a>
                  <a
                    href="/support"
                    style={{
                      color: "#424242",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img src="/images/products/tqna.png" alt="Trading Q&A" style={{ width: "26px", height: "26px", objectFit: "contain" }} />
                    <span>Trading Q&amp;A</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
