"use client";
import React, { useState, useEffect } from "react";
import job_data from "@/data/job-data";
import { IJobType } from "@/types/job-data-type";
import Pagination from "@/ui/pagination";
import { useAppSelector } from "@/redux/hook";
import slugify from "slugify";
import NiceSelect from "@/ui/nice-select";
import ListItemThree from "./list-item-3";
import JobFilterModal from "../../common/popup/job-filter-modal";

const JobListV3Area = ({ itemsPerPage }: { itemsPerPage: number }) => {
  let all_jobs = job_data;
  const maxPrice = job_data.reduce((max, job) => {
    return job.salary > max ? job.salary : max;
  }, 0);
  const { category, experience, job_type, location, english_fluency, search_key } = useAppSelector(
    (state) => state.filter
  );
  const [currentItems, setCurrentItems] = useState<IJobType[] | null>(null);
  const [filterItems, setFilterItems] = useState<IJobType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [priceValue, setPriceValue] = useState([0, maxPrice]);
  const [shortValue, setShortValue] = useState("");

  useEffect(() => {
    // Filter the job_data array based on the selected filters
    let filteredData = all_jobs
      .filter((item) => category.length !== 0 ? category.some((c) => item.category.includes(c)) : true)
      .filter((item) =>
        experience.length !== 0
          ? experience.some((e) => item.experience.trim().toLowerCase() === e.trim().toLowerCase()) : true
      )
      .filter((e) => english_fluency ? e.english_fluency.toLowerCase() === english_fluency.toLowerCase() : true)
      .filter((item) => search_key ? item.title.toLowerCase().includes(search_key.toLowerCase()) : true)
      .filter((item) => (job_type ? item.duration === job_type : true))
      .filter((l) => location ? slugify(l.location.split(',').join('-').toLowerCase(), '-') === location : true)
      .filter((j) => j.salary >= priceValue[0] && j.salary <= priceValue[1]);

    if (shortValue === "price-low-to-high") {
      filteredData = filteredData
        .slice().sort((a, b) => Number(a.salary) - Number(b.salary));
    }

    if (shortValue === "price-high-to-low") {
      filteredData = filteredData
        .slice().sort((a, b) => Number(b.salary) - Number(a.salary));
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
    english_fluency,
    all_jobs,
    priceValue,
    shortValue,
    search_key
  ]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % all_jobs.length;
    setItemOffset(newOffset);
  };
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {
    setShortValue(item.value);
  };
  return (
    <>
    <section className="job-listing-three bg-color pt-90 lg-pt-80 pb-160 xl-pb-150 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="job-post-item-wrapper">
              <div className="upper-filter d-flex justify-content-between align-items-start align-items-sm-center mb-30">
                <div className="d-sm-flex align-items-center">
                  <button type="button" className="filter-btn fw-500 tran3s me-3" data-bs-toggle="modal" data-bs-target="#filterPopUp">
                    <i className="bi bi-funnel"></i>
                    Filter
                  </button>
                  <div className="total-job-found xs-mt-10">All <span className="text-dark fw-500">
                    {all_jobs.length}</span> jobs found
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="short-filter d-flex align-items-center">
                    <div className="text-dark fw-500 me-2">Short:</div>
                    <NiceSelect
                      options={[
                        { value: "", label: "Price Short" },
                        { value: "price-low-to-high", label: "low to high" },
                        { value: "price-high-to-low", label: "High to low" },
                      ]}
                      defaultCurrent={0}
                      onChange={(item) => handleShort(item)}
                      name="Price Short"
                    />
                  </div>
                </div>
              </div>
              <div className="wrapper">
                <div className="row">

                  {currentItems &&
                    currentItems.map((job) => (
                      <div key={job.id} className="col-lg-6 mb-30">
                        <ListItemThree item={job} />
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
                      {Math.min(
                        itemOffset + itemsPerPage,
                        currentItems.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-dark fw-500">
                      {filterItems.length}
                    </span>
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

    {/* filter modal start */}
    <JobFilterModal maxPrice={maxPrice} priceValue={priceValue} setPriceValue={setPriceValue} />
    {/* filter modal end */}
    </>
  );
};

export default JobListV3Area;