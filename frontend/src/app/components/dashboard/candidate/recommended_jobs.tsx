import React, { useState, useEffect } from 'react';
import DashboardHeader from './dashboard-header';
import ShortSelect from '../../common/short-select';
import axios from 'axios';

type Job = {
  company_email: string;
  company_name: string;
  education_required: string;
  job_location: string;
  job_title: string;
  job_type: string;
  skills_required: string;
  soft_skills_required: string;
  work_experience_required: number;
  work_type: string;

};

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateRecommendedJobs = ({ setIsOpenSidebar }: IProps) => {
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:2003/recommend_jobs/${localStorage.getItem("candidate_id")}`);
        console.log("Candidate details: ", response.data.recommended_jobs);
        console.log("candidate id is"+localStorage.getItem("candidate_id"))
        if (response.status === 200) {
          setRecommendedJobs(response.data.recommended_jobs);
        }
      } catch (error) {
        console.error("Error fetching candidate details: ", error);
      }
    };
    getRecommendations();
  }, []);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Recommended Jobs</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Sort by:</div>
            <ShortSelect />
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="table-responsive">
            <table className="table job-alert-table">
              <thead>
                <tr>
                  <th scope="col">Job Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Job Type</th>
                  <th scope="col">Education Required</th>
                  <th scope="col">Skills Required</th>
                  <th scope="col">Soft Skills Required</th>
                  <th scope="col">Work Experience Required</th>
                  <th scope="col">Work Type</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Company Email</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {recommendedJobs.map((job, index) => (
                  <tr key={index}>
                    <td>{job.job_title}</td>
                    <td>{job.job_location}</td>
                    <td>{job.job_type}</td>
                    <td>{job.education_required}</td>
                    <td>{job.skills_required}</td>
                    <td>{job.soft_skills_required}</td>
                    <td>{job.work_experience_required}</td>
                    <td>{job.work_type}</td>
                    <td>{job.company_name}</td>
                    <td>{job.company_email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRecommendedJobs;
