import React from 'react';

function Hero() {
  return (
    <section className="support-hero">
      <div className="container support-hero-content">
        <div className="support-hero-header">
          <h1>Support Portal</h1>
          <a className="support-ticket-button" href="#raise-ticket">
            My tickets
          </a>
        </div>
        <form className="support-search" role="search">
          <span className="support-search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
            aria-label="Search support articles"
          />
        </form>
      </div>
    </section>
  );
}
export default Hero;
