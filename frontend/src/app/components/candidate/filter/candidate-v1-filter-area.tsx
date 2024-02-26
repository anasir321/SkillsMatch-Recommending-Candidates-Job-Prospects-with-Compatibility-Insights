"use client";
import React, { useState } from "react";
import FilterSkills from "./filter-skills";
import FilterCandidateLocation from "./filter-location";
import FilterCandidateExperience from "./filter-experince";
import JobPrices from "../../jobs/filter/job-prices";
import FilterEnglishFluency from "./filter-english-fluency";

const CandidateV1FilterArea = () => {
  const [priceValue, setPriceValue] = useState<number[]>([0, 50000]);
  return (
    <div
      className="filter-area-tab offcanvas offcanvas-start"
      id="filteroffcanvas"
    >
      <button
        type="button"
        className="btn-close text-reset d-lg-none"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
      <div className="main-title fw-500 text-dark">Filter By</div>
      <div className="light-bg border-20 ps-4 pe-4 pt-25 pb-30 mt-20">
        <div className="filter-block bottom-line pb-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseSemploye"
            role="button"
            aria-expanded="false"
          >
            Name or Keyword
          </a>
          <div className="collapse show" id="collapseSemploye">
            <div className="main-body">
              <form action="#" className="input-box position-relative">
                <input type="text" placeholder="Name or keyword" />
                <button>
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseCategory"
            role="button"
            aria-expanded="false"
          >
            Skill
          </a>
          <div className="collapse show" id="collapseCategory">
            <div className="main-body">
              <FilterSkills />
            </div>
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark"
            data-bs-toggle="collapse"
            href="#collapseLocation"
            role="button"
            aria-expanded="false"
          >
            Location
          </a>
          <div className="collapse show" id="collapseLocation">
            <div className="main-body">
              <FilterCandidateLocation />
            </div>
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseExp"
            role="button"
            aria-expanded="false"
          >
            Expert Level
          </a>
          <div className="collapse" id="collapseExp">
            <div className="main-body">
              <FilterCandidateExperience />
            </div>
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseQualification"
            role="button"
            aria-expanded="false"
          >
            Qualification
          </a>
          <div className="collapse" id="collapseQualification">
            <div className="main-body">
              <ul className="style-none filter-input">
                <li>
                  <input type="checkbox" name="Qualification" />
                  <label>Master’s Degree</label>
                </li>
                <li>
                  <input type="checkbox" name="Qualification" />
                  <label>Bachelor Degree</label>
                </li>
                <li>
                  <input type="checkbox" name="Qualification" />
                  <label>None</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseCType"
            role="button"
            aria-expanded="false"
          >
            Candidate Type
          </a>
          <div className="collapse" id="collapseCType">
            <div className="main-body">
              <ul className="style-none filter-input">
                <li>
                  <input type="checkbox" name="Gender" />
                  <label>Male</label>
                </li>
                <li>
                  <input type="checkbox" name="Gender" />
                  <label>Female</label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseSalary"
            role="button"
            aria-expanded="false"
          >
            Salary Range
          </a>
          <div className="collapse" id="collapseSalary">
            <JobPrices
              priceValue={priceValue}
              setPriceValue={setPriceValue}
              maxPrice={50000}
            />
          </div>
        </div>

        <div className="filter-block bottom-line pb-25 mt-25">
          <a
            className="filter-title fw-500 text-dark collapsed"
            data-bs-toggle="collapse"
            href="#collapseFluency"
            role="button"
            aria-expanded="false"
          >
            English Fluency
          </a>
          <div className="collapse" id="collapseFluency">
            <div className="main-body">
              <FilterEnglishFluency />
            </div>
          </div>
        </div>

        <a
          href="#"
          className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30"
        >
          Apply Filter
        </a>
      </div>
    </div>
  );
};

export default CandidateV1FilterArea;
