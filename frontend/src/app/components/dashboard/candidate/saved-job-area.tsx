import React from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import job_data from "@/data/job-data";
import ActionDropdown from "./action-dropdown";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedJobArea = ({setIsOpenSidebar}:IProps) => {
  const job_items = job_data.slice(0, 4);
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Job</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="wrapper">
          {job_items.map((j) => (
            <div
              key={j.id}
              className="job-list-one style-two position-relative mb-20"
            >
              <div className="row justify-content-between align-items-center">
                <div className="col-xxl-3 col-lg-4">
                  <div className="job-title d-flex align-items-center">
                    <a href="#" className="logo">
                      <Image
                        src={j.logo}
                        alt="img"
                        className="lazy-img m-auto"
                      />
                    </a>
                    <a href="#" className="title fw-500 tran3s">
                      {j.title}
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                  <Link href={`/job-details-v1/${j.id}`}
                    className={`job-duration fw-500 ${
                      j.duration === "Part time" ? "part-time" : ""
                    }`}
                  >
                    {j.duration}
                  </Link>
                  <div className="job-salary">
                    <span className="fw-500 text-dark">${j.salary}</span> /{" "}
                    {j.salary_duration} . {j.experience}
                  </div>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                  <div className="job-location">
                    <a href="#">{j.location}</a>
                  </div>
                  <div className="job-category">
                    {j.category.map((c, i) => (
                      <a key={i} href="#">
                        {c}
                        {i < j.category.length - 1 && ", "}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="col-lg-2 col-md-4">
                  <div className="action-dots float-end">
                    <button
                      className="action-btn dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span></span>
                    </button>
                    {/* action dropdown start */}
                    <ActionDropdown/>
                    {/* action dropdown end */}
                  </div>
                </div>
              </div>
            </div>
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

export default SavedJobArea;
