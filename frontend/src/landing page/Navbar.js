import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg zerodha-navbar sticky-top">
      <div className="container">
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
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign up
              </Link>
            </li>
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
            <li className="nav-item">
              <button
                className="nav-link menu-button"
                type="button"
                aria-label="Open menu"
              >
                <span />
                <span />
                <span />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
