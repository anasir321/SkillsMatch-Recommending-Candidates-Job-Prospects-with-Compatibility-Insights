import React, { useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { Icons } from "react-toastify";

import { useSearchParams } from "next/navigation";

import { jwtDecode } from "jwt-decode";

const ActionDropdownApplicant = ({ candidate_id }) => {

  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode(token);
  const company_hr_id = decodedToken.id;

  // job id from params
  const searchParams = useSearchParams();
  const job_id = searchParams.get("job_id");
  

  console.log("action-dropdown-applicant.tsx :: candidate_id: ", candidate_id);
  console.log("action-dropdown-applicant.tsx :: company_hr_id: ", company_hr_id);
  console.log("action-dropdown-applicant.tsx :: job_id: ", job_id);

  const saveCandidate = async () => {
    try{
      const data = {
        company_hr_id,
        candidate_id,
        job_id,
      };

      const response = await axios.post(
        `http://localhost:5000/api/auth/saveCandidate`,
        data,
        {
          headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if(response.status === 201){
        console.log("action-dropdown-applicant.tsx :: saveCandidate :: response.data: ", response.data);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link href={`/candidate-profile-v1?id=${candidate_id}`}>
          <div className="dropdown-item">
            <Image src={view} alt="icon" className="lazy-img" /> View Details
          </div>
        </Link>
      </li>
      <li>
        <a className="dropdown-item" href="#" onClick={() => saveCandidate()}>
          <Image src={edit} alt="icon" className="lazy-img" /> Save Candidate
        </a>
      </li>
      {/* <li>
        <a className="dropdown-item" href={`/dashboard/employ-dashboard/edit-job?job_id=${candidate_id}`}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit Job
        </a>
      </li> */}
      {/* <li>
        <a className="dropdown-item" href="#" onClick={() => deleteJob()}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete Job
        </a>
      </li> */}
      {/* <li>
        <a className="dropdown-item" href={`/dashboard/employ-dashboard/candidatesapplied?job_id=${candidate_id}`}>
          <Image src={view} alt="icon" className="lazy-img" /> View Applicants
        </a>
      </li> */}
    </ul>
  );
};

export default ActionDropdownApplicant;