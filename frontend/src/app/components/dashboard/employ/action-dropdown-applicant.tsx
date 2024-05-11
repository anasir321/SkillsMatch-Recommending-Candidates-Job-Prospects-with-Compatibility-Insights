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

  const searchParams = useSearchParams();

  const getRequiredParamaters = async () => {
    
  }
  

  // console.log("action-dropdown-applicant.tsx :: candidate_id: ", candidate_id);
  // console.log("action-dropdown-applicant.tsx :: company_hr_id: ", company_hr_id);
  // console.log("action-dropdown-applicant.tsx :: job_id: ", job_id);
  // console.log(typeof candidate_id);
  // console.log(typeof company_hr_id);
  // console.log(typeof parseInt(job_id));

  const saveCandidate = async () => {
    const token = localStorage.getItem("token") as string;
    const decodedToken = jwtDecode(token);
    const company_hr_id = decodedToken.id;
    var job_id = searchParams.get("job_id");
    try{
      const data = {
        company_hr_id,
        candidate_id,
        job_id: parseInt(job_id),
      };
      console.log("action-dropdown-applicant.tsx :: saveCandidate :: data: ", data);


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
        setIsCandidateSaved(true);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const unsaveCandidate = async () => {
    const token = await localStorage.getItem("token") as string;
    const decodedToken = await jwtDecode(token);
    const company_hr_id = await decodedToken.id;
    var job_id = await searchParams.get("job_id");

    if(company_hr_id && job_id && candidate_id){
      try{
        const data = {
          company_hr_id,
          candidate_id,
          job_id: parseInt(job_id),
        };
        console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: data: ", data);
  
        const response = await axios.post(
          `http://localhost:5000/api/auth/unsaveCandidate`,
          data,
          {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
  
        if(response.status === 200){
          console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: response.data: ", response.data);
          setIsCandidateSaved(false);
        }
  
      } catch (error) {
        console.error(error);
      }
    }
  }

   // State to track whether the candidate is saved
   const [isCandidateSaved, setIsCandidateSaved] = useState(false);

    // Function to check if the candidate is saved
    const checkIfCandidateSaved = async () => {
      const token = localStorage.getItem("token") as string;
      const decodedToken = jwtDecode(token);
      const company_hr_id = await decodedToken.id;
      var job_id = await searchParams.get("job_id");

      const data = {
        company_hr_id,
        job_id: parseInt(job_id),
        candidate_id
      };
      try {
        console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: company_hr_id: ", company_hr_id);
        console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: job_id: ", job_id);
        console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: candidate_id: ", candidate_id);

        const response = await axios.post(
          `http://localhost:5000/api/auth/isCandidateSaved`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: response.data: ", response.data.isSaved)  
        console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: response.data: ", response.status)
  
          // Update the state based on the API response
          setIsCandidateSaved(response.data.isSaved);
      } catch (error) {
          console.error("Error checking if candidate is saved:", error);
      }
  };



  useEffect(() => {
    checkIfCandidateSaved();
}, [isCandidateSaved]);

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link href={`/candidate-profile-v1?id=${candidate_id}`}>
          <div className="dropdown-item">
            <Image src={view} alt="icon" className="lazy-img" /> View Details
          </div>
        </Link>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#" onClick={() => checkIfCandidateSaved()}>
          <Image src={edit} alt="icon" className="lazy-img" /> Unsave Candidate
        </a>
      </li> */}

                {isCandidateSaved ? (
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
            )}
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