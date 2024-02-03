import React from "react";
import JobLocations from "../job-locations";

const FilterLocation = () => {
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Location</div>
      <JobLocations/>
    </div>
  );
};

export default FilterLocation;
