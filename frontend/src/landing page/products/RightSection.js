import React from 'react';

function RightSection({ imageUrl, productName, productDescription, learnMore }) {
  return (
    <section className="product-showcase">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 order-2 order-lg-1">
            <div className="product-content product-content-left">
              <h2>{productName}</h2>
              <p>{productDescription}</p>
              <div className="product-links">
                <a href={learnMore}>Learn more</a>
              </div>
            </div>
          </div>
          <div className="col-lg-7 order-1 order-lg-2 text-center">
            <img src={imageUrl} alt={`${productName} platform`} className="product-image img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RightSection;
