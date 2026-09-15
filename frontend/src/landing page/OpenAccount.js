import React from 'react';

function OpenAccount() {
  return (
    <section className="open-account-section text-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h2>Open a Zerodha account</h2>
            <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&amp;O trades.</p>
            <a href="/signup" className="btn open-account-button">Sign up for free</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;
