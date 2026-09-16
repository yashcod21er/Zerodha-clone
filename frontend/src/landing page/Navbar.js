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

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (typeof document !== "undefined") {
      const collapseElem = document.getElementById("zerodhaNavigation");
      if (collapseElem && collapseElem.classList.contains("show")) {
        collapseElem.classList.remove("show");
      }
    }
  };

  const handleOpenKite = (e) => {
    e.preventDefault();
    closeMenu();
    const targetUrl = getKiteUrl();
    window.location.href = targetUrl;
  };

  // Close menu when clicking or tapping outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg zerodha-navbar sticky-top" ref={menuRef}>
      <div className="container" style={{ position: "relative" }}>
        <Link className="navbar-brand" to="/" aria-label="Zerodha home" onClick={closeMenu}>
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
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
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
                <Link className="nav-link" to="/signup" onClick={closeMenu}>
                  Sign up
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing" onClick={closeMenu}>
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support" onClick={closeMenu}>
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
            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                border: "none",
                background: "none",
                fontSize: "1.3rem",
                color: "#888",
                cursor: "pointer",
                padding: "4px 8px",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

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
                <Link
                  to="/products"
                  onClick={closeMenu}
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
                </Link>
              </div>

              {/* Kite Connect */}
              <div className="col-6 col-sm-3">
                <Link
                  to="/products"
                  onClick={closeMenu}
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
                </Link>
              </div>

              {/* Coin */}
              <div className="col-6 col-sm-3">
                <Link
                  to="/products"
                  onClick={closeMenu}
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
                </Link>
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
                  <Link to="/pricing" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>Brokerage calculator</Link>
                  <Link to="/pricing" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>Margin calculator</Link>
                  <Link to="/pricing" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>SIP calculator</Link>
                </div>
              </div>

              {/* Updates */}
              <div className="col-sm-4">
                <div style={{ fontWeight: "600", color: "#424242", marginBottom: "8px" }}>
                  Updates
                </div>
                <div className="d-flex flex-column gap-1">
                  <Link to="/about" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>Z-Connect blog</Link>
                  <Link to="/support" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>Circulars / Bulletin</Link>
                  <Link to="/products" onClick={closeMenu} style={{ color: "#666", textDecoration: "none" }}>IPOs &amp; Markets</Link>
                </div>
              </div>

              {/* Education */}
              <div className="col-sm-4">
                <div style={{ fontWeight: "600", color: "#424242", marginBottom: "8px" }}>
                  Education
                </div>
                <div className="d-flex flex-column gap-2 mt-1">
                  <Link
                    to="/support"
                    onClick={closeMenu}
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
                  </Link>
                  <Link
                    to="/support"
                    onClick={closeMenu}
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
                  </Link>
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
