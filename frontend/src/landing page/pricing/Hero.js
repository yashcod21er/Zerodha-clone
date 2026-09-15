import React from 'react';

const pricingBenefits = [
  {
    image: '/images/pricingEquity.svg',
    title: 'Free equity delivery',
    description: 'All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.',
  },
  {
    image: '/images/intradayTrades.svg',
    title: 'Intraday and F&O trades',
    description: 'Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.',
  },
  {
    image: '/images/pricingMF.svg',
    title: 'Free direct MF',
    description: 'All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.',
  },
];

function Hero() {
  return (
    <>
      <section className="pricing-hero-header">
        <div className="container text-center">
          <h1>Charges</h1>
          <p>List of all charges and taxes</p>
        </div>
      </section>

      <section className="pricing-hero-benefits container">
        <div className="row text-center gy-5">
          {pricingBenefits.map((benefit) => (
            <article className="col-md-4" key={benefit.title}>
              <img src={benefit.image} alt="" className="pricing-benefit-image" />
              <h2>{benefit.title}</h2>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;
