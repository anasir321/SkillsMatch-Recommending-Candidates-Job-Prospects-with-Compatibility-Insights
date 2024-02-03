"use client"
import React, { useState } from "react";
import candidate_data from "@/data/candidate-data";
import CandidateGridItem from "./candidate-grid-item";
import CandidateListItem from "./candidate-list-item";
import CandidateV1FilterArea from "./filter/candidate-v1-filter-area";
import ShortSelect from "../common/short-select";

const CandidateV1Area = ({style_2=false}:{style_2?:boolean}) => {
  const [jobType, setJobType] = useState<string>(style_2 ? "list" : "grid");
  return (
    <>
      <section className="candidates-profile pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <button
                type="button"
                className="filter-btn w-100 pt-2 pb-2 h-auto fw-500 tran3s d-lg-none mb-40"
                data-bs-toggle="offcanvas"
                data-bs-target="#filteroffcanvas"
              >
                <i className="bi bi-funnel"></i>
                Filter
              </button>
              {/* filter area start */}
              <CandidateV1FilterArea />
              {/* filter area end */}
            </div>

            <div className="col-xl-9 col-lg-8">
              <div className="ms-xxl-5 ms-xl-3">
                <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                  <div className="total-job-found">
                    All <span className="text-dark fw-500">1,270</span>{" "}
                    candidates found
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="short-filter d-flex align-items-center">
                      <div className="text-dark fw-500 me-2">Short:</div>
                      <ShortSelect />
                    </div>
                    <button
                      onClick={() => setJobType("list")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn ${jobType === "grid" ? "active" : ""}`}
                      title="Active List"
                    >
                      <i className="bi bi-list"></i>
                    </button>
                    <button
                      onClick={() => setJobType("grid")}
                      className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn ${jobType === "list" ? "active" : ""}`}
                      title="Active Grid"
                    >
                      <i className="bi bi-grid"></i>
                    </button>
                  </div>
                </div>

                <div
                  className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
                >
                  <div className="row">
                    {candidate_data.map((item) => (
                      <div key={item.id} className="col-xxl-4 col-sm-6 d-flex">
                        <CandidateGridItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
                >
                  {candidate_data.map((item) => (
                    <CandidateListItem key={item.id} item={item} />
                  ))}
                </div>

                <div className="pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing <span className="text-dark fw-500">1 to 20</span> of{" "}
                    <span className="text-dark fw-500">1,270</span>
                  </p>
                  <div className="d-flex justify-content-center">
                    <ul className="pagination-two d-flex align-items-center style-none">
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bi bi-chevron-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandidateV1Area;
