import React from "react";
import SearchFilter from "./search-filter";
import FilterCategory from "./filter-category";
import FilterLocation from "./filter-location";
import FilterJobType from "./filter-job-type";
import FilterExperience from "./filter-experience";
import { SalaryRangeSlider } from "../job-prices";
import FilterEnglishFluency from "./filter-english-fluency";
import { resetFilter } from "@/redux/features/filterSlice";
import { useAppDispatch } from "@/redux/hook";

// prop type
type IProps = {
  priceValue: number[];
  setPriceValue: React.Dispatch<React.SetStateAction<number[]>>;
  maxPrice: number;
};

const FilterAreaTwo = ({ priceValue, setPriceValue, maxPrice }: IProps) => {
  const dispatch = useAppDispatch();
  // handleReset
  const handleReset = () => {
    dispatch(resetFilter());
    setPriceValue([0,maxPrice])
  }
  return (
    <div className="filter-area-tab">
      <div className="light-bg border-20 ps-4 pe-4">
        <a
          className="filter-header border-20 d-block collapsed"
          data-bs-toggle="collapse"
          href="#collapseFilterHeader"
          role="button"
          aria-expanded="false"
        >
          <span className="main-title fw-500 text-dark">Filter By</span>
        </a>
        <div className="collapse border-top" id="collapseFilterHeader">
          <div className="pt-25 pb-30">
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <SearchFilter />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterCategory />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterLocation />
              </div>
              <div className="col-lg-3 col-sm-6">
                <FilterEnglishFluency/>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <FilterJobType />
              </div>
              <div className="col-lg-4 col-sm-6">
                <FilterExperience />
              </div>
              <div className="col-lg-4">
                <div className="filter-block d-xl-flex pb-25">
                  <div className="filter-title fw-500 text-dark mt-1">
                    Salary Range :
                  </div>
                  <div className="main-body ps-xl-4 flex-fill">
                    <SalaryRangeSlider
                      maxPrice={maxPrice}
                      priceValue={priceValue}
                      setPriceValue={setPriceValue}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-2 m-auto">
                <button onClick={handleReset}
                  className="btn-ten fw-500 text-white w-100 text-center tran3s mt-30 md-mt-10"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterAreaTwo;
