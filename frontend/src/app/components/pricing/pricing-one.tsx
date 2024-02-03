import React from "react";

const PricingOne = ({ style_2 = false }: { style_2?: boolean }) => {
  return (
    <section
      className={`pricing-section pt-100 ${
        style_2
          ? "bg-color lg-pt-70 pb-90 lg-pb-60"
          : "lg-pt-80 pb-120 lg-pb-80"
      }`}
    >
      <div className="container">
        <div className="title-one text-center mb-55 lg-mb-20">
          <h2 className="text-dark fw-normal">Simple Plan for All</h2>
        </div>

        <div className="row">
          <div className="col-xxl-10 m-auto">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card-one mt-25">
                  <div className="pack-name">Standard</div>
                  <div className="price fw-500">0</div>
                  <ul className="style-none">
                    <li>15 job posting </li>
                    <li>7 featured job </li>
                    <li>Job post live for 30 days </li>
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    Choose Plan
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card-one popular mt-25">
                  <div className="popular-badge">popular</div>
                  <div className="pack-name">Gold</div>
                  <div className="price fw-500">
                    <sub>$</sub> 27.<sup>99</sup>
                  </div>
                  <ul className="style-none">
                    <li>30 job posting </li>
                    <li>15 featured job </li>
                    <li>Job post live for 60 days </li>
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    Choose Plan
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card-one mt-25">
                  <div className="pack-name">Diamond</div>
                  <div className="price fw-500">
                    <sub>$</sub> 39.<sup>99</sup>
                  </div>
                  <ul className="style-none">
                    <li>60 job posting </li>
                    <li>30 featured job </li>
                    <li>Job post live for 130 days </li>
                  </ul>
                  <a href="#" className="get-plan-btn tran3s w-100 mt-30">
                    Choose Plan
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-5 col-lg-8 m-auto">
                <p className="text-center mt-60 lg-mt-30">
                  We have done it carefully and simply. Combined with the
                  ingredients makes for beautiful landings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingOne;
