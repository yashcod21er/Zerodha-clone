import React, { useState } from 'react';

const supportCategories = [
  {
    title: 'Account Opening',
    icon: '+',
    topics: ['Resident individual', 'Minor', 'Non Resident Indian (NRI)', 'Company, Partnership, HUF and LLP', 'Glossary'],
  },
  { title: 'Your Zerodha Account', icon: '◎', topics: ['Your Profile', 'Account modification', 'Client Master Report (CMR) and Depository Participant (DP)', 'Nomination', 'Transfer and conversion of securities'] },
  { title: 'Kite', icon: 'Z', topics: ['IPO', 'Trading FAQs', 'Margins', 'Charts and orders', 'Alerts and nudges', 'General'] },
  { title: 'Funds', icon: '₹', topics: ['Adding funds', 'Fund withdrawal', 'Adding bank accounts', 'Mandate'] },
  { title: 'Console', icon: '◉', topics: ['Portfolio', 'Corporate actions', 'Ledger', 'Reports', 'Profile', 'Segments'] },
  { title: 'Coin', icon: '◔', topics: ['Understanding mutual funds', 'NPS', 'Fixed deposits', 'Features on Coin', 'Payments and orders', 'Coin general'] },
];

const quickLinks = [
  'Track account opening',
  'Track segment activation',
  'Intraday margins',
  'Kite user manual',
  'Learn how to create a ticket',
];

function RaiseTicket() {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (title) => {
    setOpenCategory((current) => (current === title ? null : title));
  };

  return (
    <main id="raise-ticket" className="container support-topics">
      <div className="row g-4">
        <section className="col-lg-8" aria-label="Support topics">
          <div className="support-accordion-list">
            {supportCategories.map((category) => {
              const isOpen = openCategory === category.title;

              return (
                <article className="support-accordion" key={category.title}>
                  <button
                    className="support-accordion-trigger"
                    type="button"
                    onClick={() => toggleCategory(category.title)}
                    aria-expanded={isOpen}
                    aria-controls={`${category.title.toLowerCase().replaceAll(' ', '-')}-topics`}
                  >
                    <span className="support-accordion-icon" aria-hidden="true">{isOpen ? '−' : category.icon}</span>
                    <span>{category.title}</span>
                    <span className={`support-accordion-chevron${isOpen ? ' is-open' : ''}`} aria-hidden="true">⌄</span>
                  </button>

                  {isOpen && (
                    <div id={`${category.title.toLowerCase().replaceAll(' ', '-')}-topics`} className="support-accordion-panel">
                      <ul>
                        {category.topics.map((topic) => (
                          <li key={topic}><a href="#raise-ticket">{topic}</a></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <aside className="col-lg-4 support-sidebar">
          <section className="support-notice" aria-label="Important updates">
            <ul>
              <li><a href="https://zerodha.com/marketintel/bulletin/457567/trading-holiday-on-account-of-ganesh-chaturthi-on-september-14-2026">Trading holiday on account of Ganesh Chaturthi on September 14, 2026</a></li>
              <li><a href="https://zerodha.com/marketintel/bulletin/249809/latest-intraday-leverages-mis-bo-co">Latest Intraday leverages and Square-off timings</a></li>
            </ul>
          </section>
          <section className="support-quick-links">
            <h2>Quick links</h2>
            <ol>
              {quickLinks.map((link) => <li key={link}><a href="#raise-ticket">{link}</a></li>)}
            </ol>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default RaiseTicket;
