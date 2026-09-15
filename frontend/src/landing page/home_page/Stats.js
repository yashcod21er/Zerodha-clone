import React from 'react';

function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 order-2 order-lg-1">
            <h2 className="section-title">Trust with confidence</h2>
            <div className="awards-copy">
              <div>
                <h3>Customer-first always</h3>
                <p>That’s why 1.6+ crore customers trust Zerodha with over Rs. 6 lakh crores of equity investments, making us India’s largest broker.</p>
              </div>
              <div>
                <h3>No spam or gimmicks</h3>
                <p>No gimmicks, spam, gamification, or annoying push notifications. Use high-quality apps at your own pace.</p>
              </div>
              <div>
                <h3>The Zerodha universe</h3>
                <p>Not just an app, but a whole ecosystem with tailored services specific to your needs.</p>
              </div>
              <div>
                <h3>Do better with money</h3>
                <p>With initiatives like Nudge and Kill Switch, we actively help you make better financial decisions.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 text-center">
            <img src="/images/largestBroker2.png" alt="Zerodha customer-first investing" className="stats-image img-fluid" />
            <div className="stats-links">
              <a href="/products" className="stats-link">Explore our products<i class="fa-solid fa-arrow-right"></i></a>
              <a href="/products/kite" className="stats-link">Try Kite demo<i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
