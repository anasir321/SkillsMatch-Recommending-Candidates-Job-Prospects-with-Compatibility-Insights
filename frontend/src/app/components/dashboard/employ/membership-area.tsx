import React from "react";
import DashboardHeader from "../candidate/dashboard-header";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const EmployMembershipArea = ({setIsOpenSidebar}:IProps) => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Membership</h2>

        <div className="membership-plan-wrapper mb-20">
          <div className="row gx-0">
            <div className="col-xxl-7 col-lg-6 d-flex flex-column">
              <div className="column w-100 h-100">
                <h4>Current Plan (Gold)</h4>
                <p>
                  Unlimited access to our legal document library and online
                  rental application tool, billed monthly.
                </p>
              </div>
            </div>
            <div className="col-xxl-5 col-lg-6 d-flex flex-column">
              <div className="column border-left w-100 h-100">
                <div className="d-flex">
                  <h3 className="price m0">$29</h3>
                  <div className="ps-4 flex-fill">
                    <h6>Monthly Plan</h6>
                    <span className="text1 d-block">
                      Your subscription renews{" "}
                      <span className="fw-500">July 12th, 2023</span>
                    </span>
                    <a href="#" className="cancel-plan tran3s">
                      Cancel Current Plan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="pricing-section">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card-one border-0 mt-25">
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
              <div className="pricing-card-one popular-two mt-25">
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
              <div className="pricing-card-one border-0 mt-25">
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
        </section>
      </div>
    </div>
  );
};

export default EmployMembershipArea;
