import React from "react";
import { JobTypeItems } from "../job-type";

const FilterJobType = () => {
  return (
    <div className="filter-block d-xl-flex pb-25">
      <div className="filter-title fw-500 text-dark mt-1">Job Type : </div>
      <div className="main-body ps-xl-4 flex-fill">
        <ul className="style-none filter-input">
          <JobTypeItems showLength={false} />
        </ul>
      </div>
    </div>
  );
};

export default FilterJobType;
