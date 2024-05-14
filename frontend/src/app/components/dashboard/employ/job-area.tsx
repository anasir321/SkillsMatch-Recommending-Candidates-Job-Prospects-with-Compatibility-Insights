import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import EmployJobItem from "./job-item";
import EmployShortSelect from "./short-select";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface jobDetails {
  job_id: number;
  job_title: string;
  companyHR_id: number;
  job_description: string;
  job_location: string;
  soft_skills_required: string;
  work_experience_required: string;
  education_required: string;
  job_type: string;
  skills_required: string;
  work_type: string;
  salary: number;
  job_status: string;
  date_posted: string;
}

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const EmployJobArea = ({setIsOpenSidebar}:IProps) => {

  const [jobData, setJobData] = useState<jobDetails[]>([]);

  useEffect(() => {
    // get all jobs posted by this particular companyHR_id
    const getJobsbyCompanyHR = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/auth/getJobsbyCompanyHR',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        if(response.status === 200){
          setJobData(response.data.data.jobs);
          console.log("getJobsbyCompanyHR :: all jobs ", response.data.data.jobs)
        }
      } catch(error) {
        console.log("getJobsbyCompanyHR :: error fetching all jobs ", error)
      }
    };
    getJobsbyCompanyHR();
  }, [])

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Jobs Posted</h2>
          <div className="d-flex ms-auto xs-mt-30">
            <div
              className="nav nav-tabs tab-filter-btn me-4"
              id="nav-tab"
              role="tablist"
            >
              {/* <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#a1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                All
              </button> */}
              {/* <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#a2"
                type="button"
                role="tab"
                aria-selected="false"
              >
                New
              </button> */}
            </div>
            <div className="short-filter d-flex align-items-center ms-auto">
              {/* <div className="text-dark fw-500 me-2">Short by:</div> */}
              {/* <EmployShortSelect /> */}
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="a1" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Job Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {/* <EmployJobItem
                      title="Brand & Producr Designer"
                      info="Fulltime . Spain"
                      application="130"
                      date="05 Jun, 2023"
                      status="active"
                    /> */}

                    {/* <EmployJobItem
                      title="Marketing Specialist"
                      info="Part-time . Uk"
                      application="20"
                      date="13 Aug, 2023"
                      status="pending"
                    /> */}

                    {jobData.map(jobData => (
                      <EmployJobItem
                      key={jobData.job_id}
                      job_id={jobData.job_id}
                      job_title={jobData.job_title}
                      job_description={jobData.job_description}
                      job_location={jobData.job_location}
                      soft_skills_required={jobData.soft_skills_required}
                      work_experience_required={jobData.work_experience_required}
                      education_required={jobData.education_required}
                      job_type={jobData.job_type}
                      skills_required={jobData.skills_required}
                      work_type={jobData.work_type}
                      salary={jobData.salary}
                      job_status={jobData.job_status}
                      date_posted={jobData.date_posted}
                      companyHR_id={jobData.companyHR_id}

                      title="Marketing Specialist"
                      info="Part-time . Uk"
                      application="20"
                      date="13 Aug, 2023"
                      status="pending"
                    />
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
            <div className="tab-pane fade" id="a2" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {/* <EmployJobItem
                      title="Marketing Specialist"
                      info="Part-time . Uk"
                      application="20"
                      date="13 Aug, 2023"
                      status="pending"
                    />

                    <EmployJobItem
                      title="Brand & Producr Designer"
                      info="Fulltime . Spain"
                      application="130"
                      date="05 Jun, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Developer for IT company"
                      info="Fulltime . Germany"
                      application="70"
                      date="14 Feb, 2023"
                      status="active"
                    />

                    <EmployJobItem
                      title="Accounting Manager"
                      info="Fulltime . USA"
                      application="278"
                      date="27 Sep, 2023"
                      status="expired"
                    /> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="dash-pagination d-flex justify-content-end mt-30">
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
        </div> */}
      </div>
    </div>
  );
};

export default EmployJobArea;
