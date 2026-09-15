import React from "react";

const footerGroups = [
  {
    title: "Account",
    links: [
      "Open demat account",
      "Minor demat account",
      "NRI demat account",
      "HUF demat account",
      "Commodity",
      "Dematerialisation",
      "Fund transfer",
      "MTF",
    ],
  },
  {
    title: "Support",
    links: [
      "Contact us",
      "Support portal",
      "How to file a complaint?",
      "Status of your complaints",
      "Bulletin",
      "Circulars",
      "Z-Connect blog",
      "Downloads",
    ],
  },
  {
    title: "Company",
    links: [
      "About",
      "Philosophy",
      "Press and media",
      "Careers",
      "Zerodha Cares",
      "Zerodha.tech",
      "Open source",
      "Referral programme",
    ],
  },
  {
    title: "Quick links",
    links: [
      "Upcoming IPOs",
      "Brokerage charges",
      "Market holidays",
      "Economic calendar",
      "Calculators",
      "Markets",
      "Sectors",
      "Gift Nifty",
    ],
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row gy-5 footer-main">
          <div className="col-lg-3 col-md-6">
            <img src="/images/logo.svg" alt="Zerodha" className="footer-logo" />
            <p className="footer-copyright">
              © 2010 - 2026 Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>
            <div className="footer-social" aria-label="Social media links">
              <a href="/" aria-label="X">
                𝕏
              </a>
              <a href="/" aria-label="Facebook">
                f
              </a>
              <a href="/" aria-label="LinkedIn">
                in
              </a>
              <a href="/" aria-label="YouTube">
                ▶
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div className="col-lg col-md-3 col-6" key={group.title}>
              <h3>{group.title}</h3>
              <ul className="footer-links">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="/">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-disclaimer">
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI
            Registration no.: INZ000031633 CDSL/NSDL: Depository services
            through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
            Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
            Bengaluru - 560078, Karnataka, India. For any complaints pertaining
            to securities broking please write to complaints@zerodha.com, for DP
            related to dp@zerodha.com. Please ensure you carefully read the Risk
            Disclosure Document as prescribed by SEBI | ICF
          </p>
          <p>
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross,
            Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase,
            Bengaluru - 560078, Karnataka, India. For complaints pertaining to
            securities broking, write to complaints@zerodha.com, and for
            DP-related issues write to dp@zerodha.com. Please read the Risk
            Disclosure Document as prescribed by SEBI carefully.
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on the SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, and E-mail ID. Benefits: Effective
            communication and speedy redressal of grievances.
          </p>
          <p>
            Smart Online Dispute Resolution | Grievances Redressal Mechanism
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            Attention investors: 1) Stock brokers can accept securities as
            margins from clients only by way of pledge in the depository system
            w.e.f. September 01, 2020. 2) Update your e-mail and phone number
            with your stock broker / depository participant and receive OTP
            directly from the depository on your e-mail and/or mobile number to
            create a pledge. 3) Check your securities / MF / bonds in the
            consolidated account statement issued by NSDL/CDSL every month.
          </p>
          <p>
            Prevent unauthorised transactions in your account. Update your
            mobile numbers/e-mail IDs with your stock brokers. Receive
            information of your transactions directly from the Exchange on your
            mobile/e-mail at the end of the day. Issued in the interest of
            investors. KYC is a one-time exercise while dealing in securities
            markets. Once KYC is done through a SEBI registered intermediary,
            you need not undergo the same process again when you approach
            another intermediary.
          </p>
          <p>
            Dear Investor, if you are subscribing to an IPO, there is no need to
            issue a cheque. Please write the bank account number and sign the
            IPO application form to authorise your bank to make payment in case
            of allotment. In case of non-allotment, the funds will remain in
            your bank account. As a business, we don't give stock tips and have
            not authorised anyone to trade on behalf of others. If you find
            anyone claiming to be part of Zerodha and offering such services,
            please create a ticket here.
          </p>
          <p className="footer-policy-links">
            <a href="/">NSE</a>
            <a href="/">BSE</a>
            <a href="/">MCX</a>
            <a href="/">Terms &amp; conditions</a>
            <a href="/">Privacy policy</a>
            <a href="/">Investor charter</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
