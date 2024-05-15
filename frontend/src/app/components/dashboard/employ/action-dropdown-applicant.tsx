import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import CreateInterviewModal from "@/app/components/common/popup/create-interview-modal"; // Import the modal component

const ActionDropdownApplicant = ({ candidate_id }) => {
  const searchParams = useSearchParams();
  const [isCandidateSaved, setIsCandidateSaved] = useState(false);
  const [companyHRId, setCompanyHRId] = useState(null);

  const job_id = searchParams.get("job_id");


  const getDecodedToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }, []);

  const checkIfCandidateSaved = useCallback(async () => {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    const company_hr_id = decodedToken.id;
    setCompanyHRId(company_hr_id);
    const job_id = searchParams.get("job_id");

    if (company_hr_id && job_id && candidate_id) {
      const data = {
        company_hr_id,
        job_id: parseInt(job_id),
        candidate_id,
      };

      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/isCandidateSaved`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setIsCandidateSaved(response.data.isSaved);
      } catch (error) {
        console.error("Error checking if candidate is saved:", error);
      }
    }
  }, [candidate_id, getDecodedToken, searchParams]);

  useEffect(() => {
    checkIfCandidateSaved();
  }, [checkIfCandidateSaved]);

  const handleSaveCandidate = async () => {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    const company_hr_id = decodedToken.id;
    const job_id = searchParams.get("job_id");

    if (company_hr_id && job_id && candidate_id) {
      const data = {
        company_hr_id,
        candidate_id,
        job_id: parseInt(job_id),
      };

      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/saveCandidate`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 201) {
          setIsCandidateSaved(true);
        }
      } catch (error) {
        console.error("Error saving candidate:", error);
      }
    }
  };

  const handleUnsaveCandidate = async () => {
    const decodedToken = getDecodedToken();
    if (!decodedToken) return;

    const company_hr_id = decodedToken.id;
    const job_id = searchParams.get("job_id");

    if (company_hr_id && job_id && candidate_id) {
      const data = {
        company_hr_id,
        candidate_id,
        job_id: parseInt(job_id),
      };

      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/unsaveCandidate`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setIsCandidateSaved(false);
        }
      } catch (error) {
        console.error("Error unsaving candidate:", error);
      }
    }
  };

  return (
    <>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link href={`/candidate-profile-v1?id=${candidate_id}`}>
            <div className="dropdown-item">
              <Image src={view} alt="icon" className="lazy-img" /> View Details
            </div>
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="dropdown-item"
            data-bs-toggle="modal"
            data-bs-target="#createInterviewModal"
          >
            <Image src={share} alt="icon" className="lazy-img" />
            Invite for Interview
          </a>
        </li>
        {isCandidateSaved ? (
          <li>
            <a className="dropdown-item" href="#" onClick={handleUnsaveCandidate}>
              <Image src={edit} alt="icon" className="lazy-img" /> Unsave
              Candidate
            </a>
          </li>
        ) : (
          <li>
            <a className="dropdown-item" href="#" onClick={handleSaveCandidate}>
              <Image src={edit} alt="icon" className="lazy-img" /> Save
              Candidate
            </a>
          </li>
        )}
      </ul>
      <CreateInterviewModal candidate_id={candidate_id} companyHR_id={companyHRId} job_id={job_id}/>
    </>
  );
};

export default ActionDropdownApplicant;


// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";
// import jwtDecode from "jwt-decode";
// import CreateInterviewModal from "@/app/components/common/popup/create-interview-modal"; // Import the modal component

// const ActionDropdownApplicant = ({ candidate_id }) => {
//   const searchParams = useSearchParams();
//   const [job_id, setJobId] = useState("");

//   const saveCandidate = async () => {
//     const token = localStorage.getItem("token");
//     const decodedToken = jwtDecode(token);
//     const company_hr_id = decodedToken.id;
//     var job_id = searchParams.get("job_id");
//     try {
//       const data = {
//         company_hr_id,
//         candidate_id,
//         job_id: parseInt(job_id),
//       };
//       console.log("action-dropdown-applicant.tsx :: saveCandidate :: data: ", data);

//       const response = await axios.post(
//         `http://localhost:5000/api/auth/saveCandidate`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (response.status === 201) {
//         console.log("action-dropdown-applicant.tsx :: saveCandidate :: response.data: ", response.data);
//         setIsCandidateSaved(true);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const unsaveCandidate = async () => {
//     const token = localStorage.getItem("token");
//     const decodedToken = jwtDecode(token);
//     const company_hr_id = decodedToken.id;
//     var job_id = searchParams.get("job_id");

//     if (company_hr_id && job_id && candidate_id) {
//       try {
//         const data = {
//           company_hr_id,
//           candidate_id,
//           job_id: parseInt(job_id),
//         };
//         console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: data: ", data);

//         const response = await axios.post(
//           `http://localhost:5000/api/auth/unsaveCandidate`,
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (response.status === 200) {
//           console.log("action-dropdown-applicant.tsx :: unsaveCandidate :: response.data: ", response.data);
//           setIsCandidateSaved(false);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   // State to track whether the candidate is saved
//   const [isCandidateSaved, setIsCandidateSaved] = useState(false);

//   // Function to check if the candidate is saved
//   const checkIfCandidateSaved = async () => {
//     const token = localStorage.getItem("token");
//     const decodedToken = jwtDecode(token);
//     const company_hr_id = decodedToken.id;
//     var job_id = searchParams.get("job_id");

//     const data = {
//       company_hr_id,
//       job_id: parseInt(job_id),
//       candidate_id,
//     };
//     try {
//       console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: company_hr_id: ", company_hr_id);
//       console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: job_id: ", job_id);
//       console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: candidate_id: ", candidate_id);

//       const response = await axios.post(
//         `http://localhost:5000/api/auth/isCandidateSaved`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: response.data: ", response.data.isSaved);
//       console.log("action-dropdown-applicant.tsx :: checkIfCandidateSaved :: response.data: ", response.status);

//       // Update the state based on the API response
//       setIsCandidateSaved(response.data.isSaved);
//     } catch (error) {
//       console.error("Error checking if candidate is saved:", error);
//     }
//   };

//   useEffect(() => {
//     checkIfCandidateSaved();
//     setJobId(searchParams.get("job_id")); // Set job_id from search params
//   }, [isCandidateSaved]);

//   return (
//     <>
//       <ul className="dropdown-menu dropdown-menu-end">
//         <li>
//           <Link href={`/candidate-profile-v1?id=${candidate_id}`}>
//             <div className="dropdown-item">
//               <Image src={view} alt="icon" className="lazy-img" /> View Details
//             </div>
//           </Link>
//         </li>

//         <li>
//           <a
//             href="#"
//             className="dropdown-item"
//             data-bs-toggle="modal"
//             data-bs-target="#createInterviewModal"
//           >
//             <Image src={share} alt="icon" className="lazy-img" />
//             Invite for Interview
//           </a>
//         </li>

//         {isCandidateSaved ? (
//           // Show the unsave option if the candidate is saved
//           <li>
//             <a
//               className="dropdown-item"
//               href="#"
//               onClick={() => unsaveCandidate()}
//             >
//               <Image src={edit} alt="icon" className="lazy-img" /> Unsave
//               Candidate
//             </a>
//           </li>
//         ) : (
//           // Show the save option if the candidate is not saved
//           <li>
//             <a
//               className="dropdown-item"
//               href="#"
//               onClick={() => saveCandidate()}
//             >
//               <Image src={edit} alt="icon" className="lazy-img" /> Save
//               Candidate
//             </a>
//           </li>
//         )}
//       </ul>
//       <CreateInterviewModal candidate_id={candidate_id} companyHR_id={companyHRId} job_id={job_id} />
//     </>
//   );
// };

// export default ActionDropdownApplicant;

