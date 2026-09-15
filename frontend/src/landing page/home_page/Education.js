import React from 'react';

function Education() {
  return (
    <section className="education-section">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center">
            <img src="/images/education.svg" alt="Varsity market education" className="education-image img-fluid" />
          </div>
          <div className="col-lg-6">
            <div className="education-content">
              <h2>Free and open market education</h2>
              <div className="education-item">
                <p>Varsity, the largest online stock market education book in the world, covers everything from the basics to advanced trading.</p>
                <a href="/varsity" className="section-link">Explore Varsity<i class="fa-solid fa-arrow-right"></i></a>
              </div>
              <div className="education-item">
                <p>TradingQ&amp;A is India’s active trading and investment community for all your market-related queries.</p>
                <a href="/tradingqna" className="section-link">Visit TradingQ&amp;A<i class="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
