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

const SavedCandidateItemActionDropDown = ({ candidate_id }) => {

  const searchParams = useSearchParams();

  const unsaveCandidateWithoutJobId = async () => {
    const token = await localStorage.getItem("token") as string;
    const decodedToken = await jwtDecode(token);
    const company_hr_id = await decodedToken.id;

    if(company_hr_id && candidate_id){
      try{
        const data = {
          company_hr_id,
          candidate_id,
        };
        console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: data: ", data);
  
        const response = await axios.post(
          `http://localhost:5000/api/auth/unsaveCandidateWithoutJobId`,
          data,
          {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
  
        if(response.status === 200){
          console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: response.data: ", response.data);
          window.location.reload();
        }
  
      } catch (error) {
        console.error(error);
      }
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
        <a className="dropdown-item" href="#" onClick={() => unsaveCandidateWithoutJobId()}>
          <Image src={edit} alt="icon" className="lazy-img" /> Unsave Candidate
        </a>
      </li>

                {/* {isCandidateSaved ? (
                // Show the unsave option if the candidate is saved
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => unsaveCandidate()}
                    >
                        <Image src={edit} alt="icon" className="lazy-img" /> Unsave Candidate
                    </a>
                </li>
            ) : (
                // Show the save option if the candidate is not saved
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => saveCandidate()}
                    >
                        <Image src={edit} alt="icon" className="lazy-img" /> Save Candidate
                    </a>
                </li>
            )} */}
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

export default SavedCandidateItemActionDropDown;