import React from "react";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import JobLocationSelect from "../select/job-location";
import JobCategorySelect from "../select/job-category";

const SearchForm = () => {
  const { handleSubmit, setLocationVal, setCategoryVal } =
    useSearchFormSubmit();

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-5">
          <div className="input-box">
            <div className="label">What are you looking for?</div>
            <JobLocationSelect setLocationVal={setLocationVal} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-box border-left">
            <div className="label">Category</div>
            <JobCategorySelect setCategoryVal={setCategoryVal} />
          </div>
        </div>
        <div className="col-md-3">
          <button className="fw-500 text-uppercase h-100 tran3s search-btn">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
