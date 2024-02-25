import React from "react";
import ActionDropdown from "../candidate/action-dropdown";

const EmployJobItem = ({
  job_id,
  job_title,
  companyHR_id,
  job_description,
  job_location,
  soft_skills_required,
  work_experience_required,
  education_required,
  job_type,
  skills_required,
  work_type,
  salary,
  job_status,
  date_posted,

  status,
  title,
  info,
  application,
  date,
}: {
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

  status: string;
  title: string;
  info: string;
  application: string;
  date: string;
}) => {
  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{job_title}</div>
        <div className="info1">{job_type}, {job_location}</div>
      </td>
      <td>{date_posted}</td>
      <td>{application} Applications</td>
      <td>
        <div className="job-status text-capitalize">{job_status}</div>
      </td>
      <td>
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
          <ActionDropdown />
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
