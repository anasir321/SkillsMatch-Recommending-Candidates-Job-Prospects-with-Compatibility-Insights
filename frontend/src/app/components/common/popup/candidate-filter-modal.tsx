"use client";
import React, { useState } from "react";
import JobPrices from "../../jobs/filter/job-prices";
import FilterSkills from "../../candidate/filter/filter-skills";
import FilterCandidateLocation from "../../candidate/filter/filter-location";
import FilterEnglishFluency from "../../candidate/filter/filter-english-fluency";
import SelectCandidateExperience from "../../candidate/filter/select-candidate-experience";
import SelectCandidateQualification from "../../candidate/filter/select-qualification";
import SelectCandidateType from "../../candidate/filter/select-gender";

const CandidateFilterModal = () => {
  const [priceValue, setPriceValue] = useState<number[]>([0, 50000]);
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
                  <div className="col-lg-3">
                    <div className="filter-block pb-50 md-pb-20">
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
                  <div className="col-lg-3">
                    <div className="filter-block pb-50 md-pb-20">
                      <div className="filter-title fw-500 text-dark">
                        Skills
                      </div>
                      <FilterSkills />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filter-block pb-50 md-pb-20">
                      <div className="filter-title fw-500 text-dark">
                        Location
                      </div>
                      <FilterCandidateLocation />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filter-block pb-50 md-pb-20">
                      <div className="filter-title fw-500 text-dark">
                        English Fluency
                      </div>
                      <FilterEnglishFluency />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-3">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark">
                        Expert Level
                      </div>
                      <div className="main-body">
                        <SelectCandidateExperience />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark">
                        Qualification
                      </div>
                      <div className="main-body">
                        <SelectCandidateQualification />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark">
                        Candidate Type
                      </div>
                      <div className="main-body">
                        <SelectCandidateType />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filter-block pb-25">
                      <div className="filter-title fw-500 text-dark">
                        Salary Range
                      </div>
                      <JobPrices
                        priceValue={priceValue}
                        setPriceValue={setPriceValue}
                        maxPrice={50000}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-2 m-auto">
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

export default CandidateFilterModal;
