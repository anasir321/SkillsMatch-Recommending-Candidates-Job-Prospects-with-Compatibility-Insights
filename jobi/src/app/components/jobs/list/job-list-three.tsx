"use client";
import React, { useState, useEffect } from "react";
import slugify from "slugify";
import FilterArea from "../filter/filter-area";
import job_data from "@/data/job-data";
import ListItemTwo from "./list-item-2";
import { IJobType } from "@/types/job-data-type";
import Pagination from "@/ui/pagination";
import JobGridItem from "../grid/job-grid-item";
import { useAppSelector } from "@/redux/hook";
import NiceSelect from "@/ui/nice-select";


const JobListThree = ({ itemsPerPage,grid_style=false }: { itemsPerPage: number;grid_style?:boolean }) => {
  let all_jobs = job_data;
  const maxPrice = job_data.reduce((max, job) => {
    return job.salary > max ? job.salary : max;
  }, 0);
  const { category, experience, job_type, location, tags } = useAppSelector(
    (state) => state.filter
  );
  const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
  const [filterItems, setFilterItems] = useState<IJobType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [jobType, setJobType] = useState(grid_style ?"grid" : "list");
  const [priceValue, setPriceValue] = useState([0, maxPrice]);
  const [shortValue, setShortValue] = useState('');

  useEffect(() => {
    // Filter the job_data array based on the selected filters
    let filteredData = all_jobs
      .filter((item) => category.length !== 0 ? category.some((c) => item.category.includes(c)) : true)
      .filter((item) =>
        experience.length !== 0
          ? experience.some((e) => item.experience.trim().toLowerCase() === e.trim().toLowerCase()) : true
      )
      .filter((item) => (job_type ? item.duration === job_type : true))
      .filter((l) => location ? slugify(l.location.split(',').join('-').toLowerCase(),'-') === location : true)
      .filter((item) => tags.length !== 0 ? tags.some((t) => item?.tags?.includes(t)) : true)
      .filter((j) => j.salary >= priceValue[0] && j.salary <= priceValue[1]);

      if (shortValue === 'price-low-to-high') {
        filteredData = filteredData.slice()
          .sort((a, b) => Number(a.salary) - Number(b.salary))
      }
    
      if (shortValue === 'price-high-to-low') {
        filteredData = filteredData.slice()
          .sort((a, b) => Number(b.salary) - Number(a.salary));
      }
    const endOffset = itemOffset + itemsPerPage;
    setFilterItems(filteredData)
    setCurrentItems(filteredData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredData.length / itemsPerPage));
  }, [
    itemOffset,
    itemsPerPage,
    category,
    experience,
    job_type,
    location,
    tags,
    all_jobs,
    priceValue,
    shortValue
  ]);


  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
    setItemOffset(newOffset);
  };
// handleShort
const handleShort = (item: { value: string; label: string }) => {
  setShortValue(item.value)
}
  return (
    <section className="job-listing-three pt-110 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
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
            <FilterArea priceValue={priceValue} setPriceValue={setPriceValue} maxPrice={maxPrice} />
            {/* filter area end */}
          </div>

          <div className="col-xl-9 col-lg-8">
            <div className="job-post-item-wrapper ms-xxl-5 ms-xl-3">
              <div className="upper-filter d-flex justify-content-between align-items-center mb-20">
                <div className="total-job-found">
                  All <span className="text-dark">{filterItems.length}</span> jobs
                  found
                </div>
                <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <NiceSelect
                      options={[
                        {value:'',label:'Price Short'},
                        {value:'price-low-to-high',label:'low to high'},
                        {value:'price-high-to-low',label:'High to low'},
                      ]}
                      defaultCurrent={0}
                      onChange={(item) => handleShort(item)}
                      name="Price Short"
                    />
                  </div>
                  <button
                    onClick={() => setJobType("list")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 list-btn 
                    ${jobType === "grid" ? "active" : ""}`}
                    title="Active List"
                  >
                    <i className="bi bi-list"></i>
                  </button>
                  <button
                    onClick={() => setJobType("grid")}
                    className={`style-changer-btn text-center rounded-circle tran3s ms-2 grid-btn 
                    ${jobType === "list" ? "active" : ""}`}
                    title="Active Grid"
                  >
                    <i className="bi bi-grid"></i>
                  </button>
                </div>
              </div>
              <div
                className={`accordion-box list-style ${jobType === "list" ? "show" : ""}`}
              >
                {currentItems &&
                  currentItems.map((job) => (
                    <ListItemTwo key={job.id} item={job} />
                  ))}
              </div>

              <div
                className={`accordion-box grid-style ${jobType === "grid" ? "show" : ""}`}
              >
                <div className="row">
                  {currentItems &&
                    currentItems.map((job) => (
                      <div key={job.id} className="col-sm-6 mb-30">
                        <JobGridItem item={job} />
                      </div>
                    ))}
                </div>
              </div>

              {currentItems && (
                <div className="pt-30 lg-pt-20 d-sm-flex align-items-center justify-content-between">
                  <p className="m0 order-sm-last text-center text-sm-start xs-pb-20">
                    Showing{" "}
                    <span className="text-dark fw-500">{itemOffset + 1}</span>{" "}
                    to{" "}
                    <span className="text-dark fw-500">
                      {Math.min(itemOffset + itemsPerPage, currentItems.length)}
                    </span>{" "}
                    of{" "}
                    <span className="text-dark fw-500">{filterItems.length}</span>
                  </p>
                  {filterItems.length > itemsPerPage && (
                    <Pagination
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListThree;
