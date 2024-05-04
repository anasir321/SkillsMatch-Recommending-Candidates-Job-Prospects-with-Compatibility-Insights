import React from "react";
import ActionDropdown from "../candidate/action-dropdown";
import axios from "axios";

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

  const [applicantCount, setApplicantCount] = React.useState(0);

   // Function to fetch the number of applicants for the given job_id
   const fetchApplicantCount = async () => {
    try {
        // Call the countApplicants API
        const response = await axios.post('http://localhost:5000/api/auth/countApplicants', {
            job_id: job_id,
        });

        // Update the applicantCount state with the response data
        if (response.status === 200) {
            setApplicantCount(response.data.count);
        }
    } catch (error) {
        console.error("Error fetching applicant count:", error);
    }
  };

  // Use useEffect to fetch the applicant count when the component mounts
  React.useEffect(() => {
    fetchApplicantCount();
  }, [job_id]);



  return (
    <tr className={status}>
      <td>
        <div className="job-name fw-500">{job_title}</div>
        <div className="info1">{job_type}, {job_location}</div>
      </td>
      <td>{date_posted}</td>
      <td>{applicantCount} Applications</td>
      <td>
        {work_type}
        {/* <div className="job-status text-capitalize">{work_type}</div> */}
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
          <ActionDropdown job_id={job_id}/>
          {/* action dropdown end */}
        </div>
      </td>
    </tr>
  );
};

export default EmployJobItem;
