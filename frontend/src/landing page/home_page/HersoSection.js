import React from 'react';

function Herosection() {
    return ( 
        <section className="hero-section text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <img src="/images/homeHero.png" alt="Zerodha trading platform preview" className="hero-image img-fluid" />
                    </div>
                    <div className="col-lg-10">
                        <h1 className="hero-title">Invest in everything</h1>
                        <p className="hero-subtitle">Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                        <a href="/signup" className="btn hero-cta">Sign up for free</a>
                    </div>
                </div>
            </div>
        </section>
     );
}

export default Herosection;
