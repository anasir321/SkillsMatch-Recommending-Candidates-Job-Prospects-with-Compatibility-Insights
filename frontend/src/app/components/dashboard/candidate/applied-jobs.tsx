import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
// import job_data from "@/data/job-data";
import ActionDropdown from "./action-dropdownCandidate";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AppliedJobsArea = ({setIsOpenSidebar}:IProps) => {

  const [appliedJobs, setAppliedJobs] = useState([]);

  // extract id from jwt token
  const token = localStorage.getItem("token") as string;
  const decoded = jwtDecode(token);
  const id = decoded.id;
  console.log("user id: ", id);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/auth/getJobDetailsUsingCandidateId/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from api: ",response.data.data.jobs);
      setAppliedJobs(response.data.data.jobs);

    } catch (error){
      console.log(error)
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Applied Jobs</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="wrapper">
          {
            appliedJobs.map((j:any) => (
              <div
                key={j.job_id}
                className="job-list-one style-two position-relative mb-20"
              >
                <div className="row justify-content-between align-items-center">
                  <div className="col-xxl-3 col-lg-4">
                    <div className="job-title d-flex align-items-center">
                      {/* <a href="#" className="logo">
                        <Image
                          src={j.logo}
                          alt="img"
                          className="lazy-img m-auto"
                        />
                      </a> */}
                      <a href="#" className="title fw-500 tran3s">
                        {j.job_title}
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                    <Link href={`/job-details-v1/${j.id}`}
                      className={`job-duration fw-500 ${
                        j.job_type === "Part time" ? "part-time" : ""
                      }`}
                    >
                      {j.job_type}
                    </Link>
                    {/* <div className="job-salary">
                      <span className="fw-500 text-dark">${j.salary}</span> /{" "}
                      {j.salary_duration} . {j.experience}
                    </div> */}
                    <div className="education-level">
                      <i className="fas fa-user-tie me-2">Education Required:</i>
                      {j.education_required}
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                    <div className="job-location">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      {j.job_location}
                    </div>
                    <div className="job-type">
                      <i className="fas fa-user-tie me-2"></i>
                      {j.job_type}
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
                      <ActionDropdown job_id={j.job_id} companyHR_id={j.companyHR_id}/>
                      {/* action dropdown end */}
                    </div>
                  </div>
                </div>
              </div>
            ))
            
          }
        </div>
      </div>
    </div>

  );
};

export default AppliedJobsArea;