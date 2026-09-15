import React from "react";

function AboutPage() {
  return (
    <main className="container py-5 about-page">
      <div className="row">
        <h1>
          We pioneered the discount broking model in India.
          <br />
          Now, we are breaking ground with our technology.
        </h1>
      </div>
      <div className="row mt-4 border-top pt-4">
        <div className="col-md-6">
          <p>
            We kick-started operations on the 15th of August, 2010 with the goal
            of breaking all barriers that traders and investors face in India in
            terms of cost, support, and technology. We named the company
            Zerodha, a combination of Zero and "Rodha", the Sanskrit word for
            barrier.
          </p>
          <p>
            Today, our disruptive pricing models and in-house technology have
            made us the biggest stock broker in India.
          </p>
          <p>
            Over 1.6+ crore clients place billions of orders every year through
            our powerful ecosystem of investment platforms, contributing over
            15% of all Indian retail trading volumes.
          </p>
        </div>
        <div className="col-md-6">
          <p>
            In addition, we run a number of popular open online educational and
            community initiatives to empower retail traders and investors.
          </p>
          <p>
            <a
              href="https://www.rainmatter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rainmatter
            </a>
            , our fintech fund and incubator, has invested in several fintech
            startups with the goal of growing the Indian capital markets.
          </p>
          <p>
            And yet, we are always up to something new every day. Catch up on
            the latest updates on our blog or see what the media is saying about
            us or learn more about our business and product philosophies.
          </p>
        </div>
      </div>
      <div className="row">
        <h1>People</h1>
      </div>
      <div className="row mt-4 pt-4">
        <div className="col-md-6">
          <img
            src="/images/nithinKamath.jpg"
            alt="Nikhil Kamath"
            className="img-fluid rounded-circle mb-3"
          />
        </div>
        <div className="col-md-6">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <a href="/homepage" target="_blank" rel="noopener noreferrer">
              Homepage
            </a>
            /
            <a
              href="https://twitter.com/nithin0dha"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            /
            <a
              href="https://tradingqna.com/u/nithin/summary"
              target="_blank"
              rel="noopener noreferrer"
            >
              TradingQNA
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
