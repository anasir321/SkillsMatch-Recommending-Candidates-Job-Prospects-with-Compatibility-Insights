"use client"
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import candidate_data from "@/data/candidate-data";
import CandidateItem from "./candidate-item";
import EmployShortSelect from "./short-select";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedCandidateArea = ({setIsOpenSidebar}:IProps) => {
  const candidate_items = candidate_data.slice(0, 4);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Candidate</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <EmployShortSelect/>
          </div>
        </div>

        <div className="wrapper">
          {candidate_items.map((item) => (
            <CandidateItem key={item.id} item={item} />
          ))}
        </div>

        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>..</li>
            <li>
              <a href="#">7</a>
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
  );
};

export default SavedCandidateArea;
