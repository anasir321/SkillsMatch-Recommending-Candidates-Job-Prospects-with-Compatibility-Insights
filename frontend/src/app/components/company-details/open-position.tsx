"use client";
import React from "react";
import job_data from "@/data/job-data";
import ListItemTwo from "../jobs/list/list-item-2";
import axios from "axios";
// import next/navigation
import { useSearchParams } from "next/navigation";

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

const OpenPosition = () => {
  const job_items = job_data.slice(0, 4);

  const searchparams = useSearchParams();
  const companyHR_id = searchparams.get("id");
  const [jobData, setJobData] = React.useState<jobDetails[]>([]);

  React.useEffect(() => {
    const getJobsByThisCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/auth/getJobsByCompanyHRId/${companyHR_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          // console.log("getJobsByThisCompany :: response", response.data);
          if(response.status === 200){
            setJobData(response.data.jobs)
          }
      } catch (error) {
        console.log("getJobsByThisCompany :: error", error);
      }
    }
    getJobsByThisCompany();
  }, [])

  

  return (
    <section className="company-open-position pt-80 lg-pt-60 pb-100 lg-pb-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-two">
              <h2>Open Position</h2>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <a href="#" className="btn-six">
                Explore More
              </a>
            </div>
          </div>
        </div>
        <div className="mt-50">
          {/* {job_items.map((item) => (
            <ListItemTwo key={item.id} item={item} />
          ))} */}
          {jobData &&
                  jobData.map((jobData) => (
                    <ListItemTwo key={jobData.job_id} item={jobData} />
                  ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPosition;
