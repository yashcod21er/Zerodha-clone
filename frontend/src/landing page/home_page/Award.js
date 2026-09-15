import React from 'react';

function Awards() {
  return (
    <section className="brokerage-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center">
            <img
              src="/images/largestBroker.svg"
              alt="Zerodha largest stock broker award"
              className="brokerage-image img-fluid"
            />
          </div>
          <div className="col-lg-6">
            <div className="brokerage-content">
              <h2>Largest stock broker in India</h2>
              <p className="brokerage-intro">
                Over 2 million Zerodha clients contribute to more than 15% of all retail order volumes in India daily by trading and investing in:
              </p>
              <div className="row g-2 brokerage-list">
                <div className="col-sm-6">
                  <ul>
                    <li>Futures and Options</li>
                    <li>Commodity derivatives</li>
                    <li>Currency derivatives</li>
                  </ul>
                </div>
                <div className="col-sm-6">
                  <ul>
                    <li>Stocks and IPOs</li>
                    <li>Direct mutual funds</li>
                    <li>Bonds and government securities</li>
                  </ul>
                </div>
              </div>
              <img src="/images/pressLogos.png" alt="Featured in leading publications" className="press-logos img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
