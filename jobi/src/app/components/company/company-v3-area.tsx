"use client";
import React, { useState } from "react";
import CompanyPagination from "./company-pagination";
import company_data from "@/data/company-data";
import CompanyGridItem from "./company-grid-item";
import CompanyListItem from "./company-list-item";
import ShortSelect from "../common/short-select";
import CompanyFilterModal from "../common/popup/company-filter-modal";

const CompanyV3Area = ({ style_2 = false }: { style_2?: boolean }) => {
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
  return (
    <>
      <section className="company-profiles bg-color pt-90 lg-pt-70 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="wrapper">
                <div className="upper-filter d-flex justify-content-between align-items-start align-items-md-center mb-25">
                  <div className="d-md-flex align-items-center">
                    <button
                      type="button"
                      className="filter-btn fw-500 tran3s me-3"
                      data-bs-toggle="modal"
                      data-bs-target="#filterPopUp"
                    >
                      <i className="bi bi-funnel"></i>
                      Filter
                    </button>
                    <div className="total-job-found md-mt-10">
                      All <span className="text-dark fw-500">320</span> company
                      found
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Short:</div>
                      <ShortSelect />
                    </div>
                    <button
                      onClick={() => setJobType("list")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${
                        jobType === "grid" ? "active" : ""
                      }`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => setJobType("grid")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${
                        jobType === "list" ? "active" : ""
                      }`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div>
                </div>

                <div
                  className={`accordion-box grid-style ${
                    jobType === "grid" ? "show" : ""
                  }`}
                >
                  <div className="row">
                    {company_data.map((item) => (
                      <div
                        key={item.id}
                        className="col-xl-3 col-lg-4 col-sm-6 d-flex"
                      >
                        <CompanyGridItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${
                    jobType === "list" ? "show" : ""
                  }`}
                >
                  {company_data.map((item) => (
                    <CompanyListItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="pt-50 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                    <span className="text-dark fw-500">320</span>
                  </p>
                  <CompanyPagination />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* filter modal start */}
      <CompanyFilterModal />
      {/* filter modal end */}
    </>
  );
};

export default CompanyV3Area;
