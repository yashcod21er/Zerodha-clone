import React from 'react';

const universeProducts = [
  { logo: '/images/zerodhaFundhouse.png', alt: 'Zerodha Fund House', description: 'Our asset management venture that is creating simple and transparent index funds to help you save for your goals.' },
  { logo: '/images/sensibullLogo.svg', alt: 'Sensibull', description: 'Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.' },
  { logo: '/images/goldenpiLogo.png', alt: 'Tijori', description: 'Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.' },
  { logo: '/images/streakLogo.png', alt: 'Streak', description: 'Systematic trading platform that allows you to create and backtest strategies without coding.' },
  { logo: '/images/smallcaseLogo.png', alt: 'smallcase', description: 'Thematic investing platform that helps you invest in diversified baskets of stocks or ETFs.' },
  { logo: '/images/dittoLogo.png', alt: 'Ditto', description: 'Personalized advice on life and health insurance. No spam and no mis-selling.' },
];

function Universe() {
  return (
    <section className="universe-section">
      <div className="container">
        <div className="universe-heading text-center">
          <h2>The Zerodha Universe</h2>
          <p>Extend your trading and investment experience even further with our partner platforms.</p>
        </div>

        <div className="row justify-content-center g-5 universe-grid">
          {universeProducts.map((product) => (
            <div className="col-md-6 col-lg-4" key={product.alt}>
              <article className="universe-card text-center">
                <div className="universe-logo-wrap">
                  <img src={product.logo} alt={product.alt} className="universe-logo img-fluid" />
                </div>
                <p>{product.description}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="text-center universe-cta-wrap">
          <a href="/signup" className="btn universe-cta">Sign up for free</a>
        </div>
      </div>
    </section>
  );
}

export default Universe;
