import React from "react";
import FilterCompanyLocation from "../../company/filter/filter-company-location";

const CompanyFilterModal = () => {
  return (
    <div
      className="modal popUpModal fade"
      id="filterPopUp"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="filter-area-tab modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="position-relative">
              <div className="main-title fw-500 text-dark ps-4 pe-4 pt-15 pb-15 border-bottom">
                Filter By
              </div>
              <div className="pt-25 pb-30 ps-4 pe-4">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="filter-block pb-50 lg-pb-20">
                      <div className="filter-title fw-500 text-dark">
                        Keyword or Title
                      </div>
                      <form action="#" className="input-box position-relative">
                        <input type="text" placeholder="Search by Keywords" />
                        <button>
                          <i className="bi bi-search"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="filter-block pb-50 lg-pb-20">
                      <div className="filter-title fw-500 text-dark">
                        Location
                      </div>
                      <FilterCompanyLocation />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark mt-1">
                        Company Status
                      </div>
                      <div className="main-body">
                        <ul className="style-none filter-input d-flex">
                          <li className="me-3">
                            <input type="checkbox" name="CompanyStatus" />
                            <label>New</label>
                          </li>
                          <li className="me-3">
                            <input type="checkbox" name="CompanyStatus" />
                            <label>Top Rated</label>
                          </li>
                          <li>
                            <input type="checkbox" name="CompanyStatus" />
                            <label>Older</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-7">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark mt-1">
                        Team Size
                      </div>
                      <div className="main-body">
                        <ul className="style-none filter-input d-flex">
                          <li className="me-3">
                            <input type="checkbox" name="Team" />
                            <label>12+ Team Size</label>
                          </li>
                          <li className="me-3">
                            <input type="checkbox" name="Team" />
                            <label>7+ Team Size</label>
                          </li>
                          <li className="me-3">
                            <input type="checkbox" name="Team" />
                            <label>10+ Team Size</label>
                          </li>
                          <li className="me-3">
                            <input type="checkbox" name="Team" />
                            <label>15+ Team Size</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <a
                      href="#"
                      className="btn-ten fw-500 text-white w-100 text-center tran3s"
                    >
                      Apply Filter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyFilterModal;
