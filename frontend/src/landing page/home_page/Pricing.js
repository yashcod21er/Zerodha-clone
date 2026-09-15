import React from 'react';

function Pricing() {
  return (
    <section className="pricing-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <div className="pricing-intro">
              <h2>Unbeatable pricing</h2>
              <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
              <a href="/pricing" className="section-link">See pricing<i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="row g-3">
              <div className="col-sm-6">
                <div className="pricing-card">
                  <p className="price"><span aria-hidden="true">₹</span>0</p>
                  <p className="price-detail">Free equity delivery and direct mutual funds</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="pricing-card">
                  <p className="price"><span aria-hidden="true">₹</span>20</p>
                  <p className="price-detail">Intraday and F&amp;O trades</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
