import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import ActionDropdown from "./savedJob-dropdown";
import axios from "axios";

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SavedJobArea = ({ setIsOpenSidebar }: IProps) => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/auth/getAllSavedJobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedJobs(response.data.data.savedJobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedJobs();
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const promises = savedJobs.map(async (savedJob) => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/auth/getJobDetailsUsingSavedJobs/${savedJob.job_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data.data.jobs[0];
        } catch (error) {
          console.log(error);
          return null;
        }
      });
      const jobDetailsData = await Promise.all(promises);
      setJobDetails(jobDetailsData.filter(Boolean)); // Filter out null values
    };

    if (savedJobs.length > 0) {
      fetchJobDetails();
    }
  }, [savedJobs]);

  const handleUnsaveJob = (jobId) => {
    // Filter out the deleted job from savedJobs
    const updatedSavedJobs = savedJobs.filter((job) => job.job_id !== jobId);
    setSavedJobs(updatedSavedJobs);
  
    // Filter out the corresponding job detail from jobDetails
    const updatedJobDetails = jobDetails.filter((jobDetail) => jobDetail.job_id !== jobId);
    setJobDetails(updatedJobDetails);
  };
  

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Jobs</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect />
          </div>
        </div>
        <div className="wrapper">
          {jobDetails.map((jobDetail, index) => (
            <div
              key={index}
              className="job-list-one style-two position-relative mb-20"
            >
              <div className="row justify-content-between align-items-center">
                <div className="col-xxl-3 col-lg-4">
                  <div className="job-title d-flex align-items-center">
                    <a href="#" className="title fw-500 tran3s">
                      {jobDetail?.job_title}
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-sm-6 ms-auto">
                  <Link
                    href={`/job-details-v1/${jobDetail?.job_id}`}
                    className={`job-duration fw-500`}
                  >
                    {jobDetail?.job_type}
                  </Link>
                </div>
                <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 ms-auto xs-mt-10">
                  <div className="job-location">
                    <a href="#">{jobDetail?.job_location}</a>
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
                    <ActionDropdown
                      job_id={jobDetail?.job_id}
                      onUnsaveJob={handleUnsaveJob}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobArea;
