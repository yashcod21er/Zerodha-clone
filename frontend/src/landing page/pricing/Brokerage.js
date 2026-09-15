import React, { useState } from "react";

const equityCharges = [
  [
    "Brokerage",
    [
      "Zero Brokerage",
      "0.03% or ₹20/executed order whichever is lower",
      "0.03% or ₹20/executed order whichever is lower",
      "Flat ₹20 per executed order",
    ],
  ],
  [
    "STT/CTT",
    [
      "0.1% on buy & sell",
      "0.025% on the sell side",
      "0.05% on the sell side",
      {
        items: [
          "0.15% of the intrinsic value on options that are bought and exercised",
          "0.15% on sell side (on premium)",
        ],
      },
    ],
  ],
  [
    "Transaction charges",
    [
      ["NSE: 0.00307%", "BSE: 0.00375%"],
      ["NSE: 0.00307%", "BSE: 0.00375%"],
      ["NSE: 0.00183%", "BSE: 0"],
      ["NSE: 0.03553% (on premium)", "BSE: 0.0325% (on premium)"],
    ],
  ],
  [
    "GST",
    [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
    ],
  ],
  [
    "SEBI charges",
    ["₹10 / crore", "₹10 / crore", "₹10 / crore", "₹10 / crore"],
  ],
  [
    "Stamp charges",
    [
      "0.015% or ₹1500 / crore on buy side",
      "0.003% or ₹300 / crore on buy side",
      "0.002% or ₹200 / crore on buy side",
      "0.003% or ₹300 / crore on buy side",
    ],
  ],
];

const currencyCharges = [
  [
    "Brokerage",
    ["0.03% or ₹20/executed order whichever is lower", "₹20/executed order"],
  ],
  ["STT/CTT", ["No STT", "No STT"]],
  [
    "Transaction charges",
    [
      ["NSE: 0.00035%", "BSE: 0.00045%"],
      ["NSE: 0.0311%", "BSE: 0.001%"],
    ],
  ],
  [
    "GST",
    [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
    ],
  ],
  ["SEBI charges", ["₹10 / crore", "₹10 / crore"]],
  [
    "Stamp charges",
    [
      "0.0001% or ₹10 / crore on buy side",
      "0.0001% or ₹10 / crore on buy side",
    ],
  ],
];

const commodityCharges = [
  [
    "Brokerage",
    ["0.03% or ₹20/executed order whichever is lower", "₹20/executed order"],
  ],
  ["STT/CTT", ["0.01% on sell side (Non-Agri)", "0.05% on sell side"]],
  [
    "Transaction charges",
    [
      ["MCX: 0.0021%", "NSE: 0.0001%"],
      ["MCX: 0.0418%", "NSE: 0.001%"],
    ],
  ],
  [
    "GST",
    [
      "18% on (brokerage + SEBI charges + transaction charges)",
      "18% on (brokerage + SEBI charges + transaction charges)",
    ],
  ],
  [
    "SEBI charges",
    [
      {
        lines: ["Agri:", "₹1 / crore", "Non-agri:", "₹10 / crore"],
        strong: [0, 2],
      },
      "₹10 / crore",
    ],
  ],
  [
    "Stamp charges",
    [
      "0.002% or ₹200 / crore on buy side",
      "0.003% or ₹300 / crore on buy side",
    ],
  ],
];

function ChargeCell({ value }) {
  if (typeof value === "object" && !Array.isArray(value)) {
    if (value.items) {
      return (
        <ul className="pricing-cell-list">
          {value.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    return value.lines.map((line, index) => (
      <React.Fragment key={`${line}-${index}`}>
        {value.strong?.includes(index) ? <strong>{line}</strong> : line}
        {index < value.lines.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  if (Array.isArray(value)) {
    return value.map((line, index) => (
      <React.Fragment key={`${line}-${index}`}>
        {line}
        {index < value.length - 1 && <br />}
      </React.Fragment>
    ));
  }

  return value;
}

function ChargeTable({ id, title, headers, rows }) {
  return (
    <section
      id={id}
      className="pricing-charge-section"
      aria-labelledby={`${id}-tab`}
    >
      <h2 className="visually-hidden">{title}</h2>
      <div className="pricing-table-wrap">
        <table className="pricing-table">
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              {headers.map((header) => (
                <th scope="col" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, charges]) => (
              <tr key={label}>
                <th scope="row">{label}</th>
                {charges.map((charge, index) => (
                  <td key={`${label}-${index}`}>
                    <ChargeCell value={charge} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FreeBadge() {
  return <span className="pricing-free-badge">Free</span>;
}

function DetailsTable({ caption, headers, rows, className = "" }) {
  return (
    <div className={`pricing-details-table-wrap ${className}`.trim()}>
      <table className="pricing-details-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${caption}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const accountOpeningRows = [
  ["Individual account", <FreeBadge />],
  ["Minor account", <FreeBadge />],
  ["NRI account", "₹ 500"],
  [
    "HUF account",
    <>
      <FreeBadge /> <span className="pricing-muted-copy">(online)</span> / ₹ 500
      <span className="pricing-muted-copy"> (offline)</span>
    </>,
  ],
  ["Partnership, LLP, and Corporate accounts (offline only)", "₹ 500"],
];

const amcRows = [
  ["Up to ₹4 lakh", <FreeBadge />],
  ["₹4 lakh – ₹10 lakh", "₹100 per year + 18% GST, charged quarterly"],
  ["Above ₹10 lakh", "₹300 per year + 18% GST, charged quarterly"],
];

const optionalServiceRows = [
  ["Tickertape", "Monthly / Quarterly / Annual", "Free: 0 | Pro: 249/699/2399"],
  ["Smallcase", "Per transaction", "Buy & Invest More: 100 | SIP: 10"],
  ["Kite Connect", "Monthly", "Connect: 500 | Personal: Free"],
];

const chargeExplanationColumns = [
  [
    {
      title: "Securities/Commodities transaction tax",
      copy: [
        "Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.",
        "When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.",
      ],
    },
    {
      title: "Transaction/Turnover Charges",
      copy: [
        "Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.",
        "BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)",
        "BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.",
        "BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.",
        "BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.",
      ],
    },
    {
      title: "Call & trade",
      copy: [
        "Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.",
      ],
    },
    {
      title: "Stamp charges",
      copy: [
        "Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.",
      ],
    },
    {
      title: "NRI brokerage charges",
      list: [
        "For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).",
        "For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).",
        "₹500 + GST as yearly account maintenance charges (AMC) charges.",
      ],
    },
    {
      title: "Account with debit balance",
      copy: [
        "Accounts with a debit balance will be charged an additional ₹20 per executed order.",
      ],
    },
    {
      title: "Charges for Investor's Protection Fund Trust (IPFT) by NSE",
      list: [
        "Equity and Futures - ₹0.01 per crore + GST of the traded value.",
        "Options - ₹0.01 per crore + GST traded value (premium value).",
        "Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.",
      ],
    },
    {
      title: "Margin Trading Facility (MTF)",
      list: [
        "MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.",
        "MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.",
        "MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.",
      ],
    },
  ],
  [
    {
      title: "GST",
      copy: [
        "Tax levied by the government on the services rendered. 18% of (brokerage + SEBI charges + transaction charges)",
      ],
    },
    {
      title: "SEBI Charges",
      copy: [
        "Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.",
      ],
    },
    {
      title: "DP (Depository participant) charges",
      copy: [
        "₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.",
        "Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.",
        "Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.",
      ],
    },
    {
      title: "Pledging charges",
      copy: ["₹30 + GST per pledge request per ISIN."],
    },
    {
      title: "AMC (Account maintenance charges)",
      copy: [
        "Free for the first year on all new resident individual accounts.",
        <>
          For BSDA demat account: Zero charges if the holding value is less than
          ₹4,00,000. To learn more about BSDA,{" "}
          <a href="https://support.zerodha.com/category/account-opening/offline-account-opening/bsda/articles/how-to-open-a-basic-service-demat-account-at-zerodha">
            Click here
          </a>
        </>,
        <>
          For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90
          days). To learn more about AMC,{" "}
          <a href="https://support.zerodha.com/category/account-opening/charges-at-zerodha/statutory-and-exchange/articles/what-is-the-annual-maintenance-charge">
            Click here
          </a>
        </>,
      ],
    },
    {
      title: "Corporate action order charges",
      copy: [
        "₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.",
      ],
    },
    { title: "Off-market transfer charges", copy: ["₹25 per transaction."] },
    {
      title: "Physical CMR request",
      copy: [
        "First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.",
      ],
    },
    {
      title: "Payment gateway charges",
      copy: ["₹9 + GST (Not levied on transfers done via UPI)"],
    },
    {
      title: "Delayed Payment Charges",
      copy: [
        <>
          Interest is levied at 18% a year or 0.05% per day on the debit balance
          in your trading account.{" "}
          <a href="https://support.zerodha.com/category/console/ledger/articles/interest-charges">
            Learn more
          </a>
          .
        </>,
      ],
    },
    {
      title: "Trading using 3-in-1 account with block functionality",
      list: [
        <>
          <strong>Delivery & MTF Brokerage:</strong> 0.5% per executed order.
        </>,
        <>
          <strong>Intraday Brokerage:</strong> 0.05% per executed order.
        </>,
      ],
    },
  ],
];

function ChargeExplanationColumn({ sections }) {
  return (
    <div className="pricing-explanation-column">
      {sections.map((section) => (
        <div className="pricing-explanation-item" key={section.title}>
          <p className="pricing-explanation-label">{section.title}</p>
          {section.copy?.map((paragraph, index) => (
            <p className="pricing-explanation-copy" key={index}>
              {paragraph}
            </p>
          ))}
          {section.list && (
            <ul className="pricing-explanation-list">
              {section.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function ChargeExplanations() {
  return (
    <section
      className="pricing-explanations"
      aria-labelledby="charges-explained-heading"
    >
      <h2 id="charges-explained-heading">Charges explained</h2>
      <div className="pricing-explanation-grid">
        {chargeExplanationColumns.map((sections, index) => (
          <ChargeExplanationColumn sections={sections} key={index} />
        ))}
      </div>
      <div className="pricing-disclaimer">
        <p className="pricing-explanation-label">Disclaimer</p>
        <p className="pricing-explanation-copy">
          For delivery-based trades, a minimum of ₹0.01 will be charged per
          contract note. Clients who opt to receive physical contract notes will
          be charged ₹20 per contract note plus courier charges. Brokerage will
          not exceed the rates specified by SEBI and the exchanges. All
          statutory and regulatory charges will be levied at actuals. Brokerage
          is also charged on expired, exercised, and assigned options contracts.
          Free investments are available only for our retail individual clients.
          Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20
          (whichever is less) as delivery brokerage. A brokerage of 0.25% of the
          contract value will be charged for contracts where physical delivery
          happens. For netted off positions in physically settled contracts, a
          brokerage of 0.1% will be charged.
        </p>
      </div>
    </section>
  );
}

function Brokerage() {
  const [activeMarket, setActiveMarket] = useState("equity");
  const marketTables = [
    {
      id: "equity",
      label: "Equity",
      headers: [
        "Equity delivery",
        "Equity intraday",
        "F&O - Futures",
        "F&O - Options",
      ],
      rows: equityCharges,
    },
    {
      id: "currency",
      label: "Currency",
      headers: ["Currency futures", "Currency options"],
      rows: currencyCharges,
    },
    {
      id: "commodity",
      label: "Commodity",
      headers: ["Commodity futures", "Commodity options"],
      rows: commodityCharges,
    },
  ];
  const activeTable = marketTables.find((table) => table.id === activeMarket);

  return (
    <section className="pricing-brokerage">
      <div className="container">
        <nav
          className="pricing-market-tabs"
          aria-label="Brokerage charge categories"
        >
          {marketTables.map((table) => (
            <a
              id={`${table.id}-tab`}
              key={table.id}
              href={`#${table.id}`}
              className={activeMarket === table.id ? "is-active" : ""}
              aria-current={activeMarket === table.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                setActiveMarket(table.id);
              }}
            >
              {table.label}
            </a>
          ))}
        </nav>

        <ChargeTable {...activeTable} />
        <p className="pricing-calculator-copy">
          <a
            href="https://zerodha.com/brokerage-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Calculate your costs upfront
          </a>{" "}
          using our brokerage calculator
        </p>

        <div className="pricing-details">
          <section
            className="pricing-detail-section"
            aria-labelledby="account-opening-heading"
          >
            <h2 id="account-opening-heading">Charges for account opening</h2>
            <DetailsTable
              caption="Charges for account opening"
              headers={["Type of account", "Charges"]}
              rows={accountOpeningRows}
            />
          </section>

          <section
            className="pricing-detail-section"
            aria-labelledby="amc-heading"
          >
            <h2 id="amc-heading">Demat AMC (Annual Maintenance Charge)</h2>
            <p className="pricing-detail-lead">Free for the first year*</p>
            <p className="pricing-detail-intro">
              From the second year onwards, for BSDA accounts:
            </p>
            <DetailsTable
              caption="Demat annual maintenance charges for BSDA accounts"
              headers={["Value of holdings", "AMC"]}
              rows={amcRows}
            />
            <p className="pricing-detail-copy">
              For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless
              of holdings value, charged quarterly.
            </p>
            <p className="pricing-detail-copy">
              To learn more about BSDA,{" "}
              <a href="https://support.zerodha.com/category/account-opening/online-account-opening/bsda/articles/what-is-bsda">
                click here
              </a>
              . To learn more about AMC,{" "}
              <a href="https://support.zerodha.com/category/account-opening/online-account-opening/charges/articles/what-are-the-charges-for-opening-an-account">
                click here
              </a>
              .
            </p>
            <p className="pricing-detail-note">
              *Resident individual accounts only.
            </p>
          </section>

          <section
            className="pricing-detail-section"
            aria-labelledby="optional-services-heading"
          >
            <h2 id="optional-services-heading">
              Charges for optional value added services
            </h2>
            <DetailsTable
              caption="Charges for optional value added services"
              headers={["Service", "Billing Frequency", "Charges"]}
              rows={optionalServiceRows}
            />
          </section>
        </div>
        <div className="visually-hidden" aria-hidden="true">
          <div className="col-6">
            <h4>Securities/Commodities transaction tax</h4>
            <p>
              Tax by the government when transacting on the exchanges. Charged
              as above on both buy and sell sides when trading equity delivery.
              Charged only on selling side when trading intraday or on F&O.
            </p>
            <br />
            <p>
              When trading at Zerodha, STT/CTT can be a lot more than the
              brokerage we charge. Important to keep a tab.
            </p>
            <br />
            <p>Transaction/Turnover Charges</p>
            <p>
              Charged by exchanges (NSE, BSE, MCX) on the value of your
              transactions.
            </p>
            <br />
            <p>
              BSE has revised transaction charges in XC, XD, XT, Z and ZP groups
              to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been
              merged into a new group X w.e.f 01.12.2017)
            </p>
            <br />
            <p>
              BSE has revised transaction charges in SS and ST groups to
              ₹1,00,000 per crore of gross turnover.
            </p>
            <br />
            <p>
              BSE has revised transaction charges for group A, B and other non
              exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC,
              W, T) at ₹375 per crore of turnover on flat rate basis w.e.f.
              December 1, 2022.
            </p>
            <br />
            <p>
              BSE has revised transaction charges in M, MT, TS and MS groups to
              ₹275 per crore of gross turnover.
            </p>
            <br />
            <p>Call & trade</p>
            <br />
            <p>
              Additional charges of ₹50 per order for orders placed through a
              dealer at Zerodha including auto square off orders.
            </p>
            <br />
            <p>Stamp charges</p>
            <br />
            <p>
              Stamp charges by the Government of India as per the Indian Stamp
              Act of 1899 for transacting in instruments on the stock exchanges
              and depositories.
            </p>
            <br />
            <p>NRI brokerage charges</p>
            <br />
            <ul>
              <li>
                For a non-PIS account, 0.5% or ₹50 per executed order for equity
                and F&O (whichever is lower).
              </li>
              <li>
                For a PIS account, 0.5% or ₹200 per executed order for equity
                (whichever is lower).
              </li>
              <li>
                ₹500 + GST as yearly account maintenance charges (AMC) charges.
              </li>
            </ul>
            <br />
            <p>Account with debit balance</p>
            <br />
            <p>
              Accounts with a debit balance will be charged an additional ₹20
              per executed order.
            </p>
            <br />
            <p>Charges for Investor's Protection Fund Trust (IPFT) by NSE</p>
            <br />
            <ul>
              <li>
                Equity and Futures - ₹0.01 per crore + GST of the traded value.
              </li>
              <li>
                Equity and Futures - ₹0.01 per crore + GST of the traded value.
              </li>
              <li>
                Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2
                per lakh + GST of premium for Options.
              </li>
            </ul>
            <br />
            <p>Margin Trading Facility (MTF)</p>
            <ul>
              <li>
                MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount.
                The interest is applied from T+1 day until the day MTF stocks
                are sold.
              </li>
              <li>
                MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is
                lower.
              </li>
              <li>
                MTF pledge charge: ₹15 + GST per pledge and unpledge request per
                ISIN.
              </li>
            </ul>
          </div>
          <div className="col-6">
            GST Tax levied by the government on the services rendered. 18% of (
            brokerage + SEBI charges + transaction charges) SEBI Charges Charged
            at ₹10 per crore + GST by Securities and Exchange Board of India for
            regulating the markets. DP (Depository participant) charges ₹15.34
            per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged
            on the trading account ledger when stocks are sold, irrespective of
            quantity. Female demat account holders (as first holder) will enjoy
            a discount of ₹0.25 per transaction on the CDSL fee. Debit
            transactions of mutual funds & bonds get an additional discount of
            ₹0.25 on the CDSL fee. Pledging charges ₹30 + GST per pledge request
            per ISIN. AMC (Account maintenance charges) Free for the first year
            on all new resident individual accounts. For BSDA demat account:
            Zero charges if the holding value is less than ₹4,00,000. To learn
            more about BSDA, Click here For non-BSDA demat accounts: ₹300/year +
            18% GST charged quarterly (90 days). To learn more about AMC, Click
            here Corporate action order charges ₹20 plus GST will be charged for
            OFS / buyback / takeover / delisting orders placed through Console.
            Off-market transfer charges ₹25 per transaction. Physical CMR
            request First CMR request is free. ₹20 + ₹100 (courier charge) + 18%
            GST for subsequent requests. Payment gateway charges ₹9 + GST (Not
            levied on transfers done via UPI) Delayed Payment Charges Interest
            is levied at 18% a year or 0.05% per day on the debit balance in
            your trading account. Learn more. Trading using 3-in-1 account with
            block functionality Delivery & MTF Brokerage: 0.5% per executed
            order. Intraday Brokerage: 0.05% per executed order.
          </div>
          <div>
            <p>
              Disclaimer For Delivery based trades, a minimum of ₹0.01 will be
              charged per contract note. Clients who opt to receive physical
              contract notes will be charged ₹20 per contract note plus courier
              charges. Brokerage will not exceed the rates specified by SEBI and
              the exchanges. All statutory and regulatory charges will be levied
              at actuals. Brokerage is also charged on expired, exercised, and
              assigned options contracts. Free investments are available only
              for our retail individual clients. Companies, Partnerships,
              Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as
              delivery brokerage. A brokerage of 0.25% of the contract value
              will be charged for contracts where physical delivery happens. For
              netted off positions in physically settled contracts, a brokerage
              of 0.1% will be charged.
            </p>
          </div>
        </div>
        <ChargeExplanations />
      </div>
    </section>
  );
}

export default Brokerage;
