import React from 'react';

function LeftSection({ imageUrl, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
  return (
    <section className="product-showcase">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-7 text-center">
            <img src={imageUrl} alt={`${productName} platform`} className="product-image img-fluid" />
          </div>
          <div className="col-lg-5">
            <div className="product-content">
              <h2>{productName}</h2>
              <p>{productDescription}</p>
              <div className="product-links">
                {tryDemo && <a href={tryDemo}>Try demo</a>}
                <a href={learnMore}>Learn more</a>
              </div>
              {(googlePlay || appStore) && (
                <div className="store-badges">
                  {googlePlay && <a href={googlePlay} aria-label="Get it on Google Play"><img src="/images/googlePlayBadge.svg" alt="Get it on Google Play" /></a>}
                  {appStore && <a href={appStore} aria-label="Download on the App Store"><img src="/images/appstoreBadge.svg" alt="Download on the App Store" /></a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftSection;
