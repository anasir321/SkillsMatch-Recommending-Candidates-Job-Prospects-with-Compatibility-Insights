// "use client"
// import React from "react";
// import DashboardHeader from "../candidate/dashboard-header";
// import candidate_data from "@/data/candidate-data";
// import CandidateItem from "./candidate-item";
// import EmployShortSelect from "./short-select";

// // props type 
// type IProps = {
//   setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
// }

// const SavedCandidateArea = ({setIsOpenSidebar}:IProps) => {
//   const candidate_items = candidate_data.slice(0, 4);
//   return (
//     <div className="dashboard-body">
//       <div className="position-relative">
//         {/* header start */}
//         <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
//         {/* header end */}

//         <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
//           <h2 className="main-title m0">Saved Candidate</h2>
//           <div className="short-filter d-flex align-items-center">
//             <div className="text-dark fw-500 me-2">Short by:</div>
//             <EmployShortSelect/>
//           </div>
//         </div>

//         <div className="wrapper">
//           {candidate_items.map((item) => (
//             <CandidateItem key={item.id} item={item} />
//           ))}
//         </div>

//         <div className="dash-pagination d-flex justify-content-end mt-30">
//           <ul className="style-none d-flex align-items-center">
//             <li>
//               <a href="#" className="active">
//                 1
//               </a>
//             </li>
//             <li>
//               <a href="#">2</a>
//             </li>
//             <li>
//               <a href="#">3</a>
//             </li>
//             <li>..</li>
//             <li>
//               <a href="#">7</a>
//             </li>
//             <li>
//               <a href="#">
//                 <i className="bi bi-chevron-right"></i>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SavedCandidateArea;

"use client"
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import candidate_data from "@/data/candidate-data";
import CandidateItem from "./candidate-item";
import EmployShortSelect from "./short-select";

import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
import CandidateSingleApplicant from "./candidate-single-applicant";
import SavedCandidateItem from "./saved-candidates-item";

interface candidateDetails {
  candidate_id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  email: string;
  skills: string;
  gender: string;
  location: string;
  password: string;
  resume: Blob;
  linkedinURL: string;
  githubURL: string;
  preferredJobType: string;
  softSkills: string;
  preferredJobTitle: string;
  profilePicture: Blob;
  education_level: string;
  experience: string;
  work_preference: string;
  overview: Text;
}

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SavedCandidateArea = ({setIsOpenSidebar}:IProps) => {
  const candidate_items = candidate_data.slice(0, 4);

  const token = localStorage.getItem("token") as string;
  const decodedToken = jwtDecode(token);
  const company_hr_id = decodedToken.id;

  const [savedCandidates, setSavedCandidates] = useState<candidateDetails[]>([]);

    useEffect(() => {
        // Function to fetch saved candidates
        const getSavedCandidates = async () => {
            try {
                // Make the HTTP GET request to the API endpoint
                const response = await axios.get(
                    `http://localhost:5000/api/auth/getSavedCandidatesUsingcompanyhrId/${company_hr_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                // Check the response status
                if (response.status === 200) {
                    console.log("Retrieved saved candidates successfully.");
                    console.log("Saved candidates: ", response.data.data.candidates);
                    // Update the state with the retrieved data
                    setSavedCandidates(response.data.data.candidates);
                }
            } catch (error) {
                console.log("Error fetching saved candidates: ", error);
            }
        };

        // Call the function to fetch saved candidates
        getSavedCandidates();
    }, [company_hr_id]);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Saved Candidates</h2>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <EmployShortSelect/>
          </div> */}
        </div>

        {/* <div className="wrapper">
          {candidate_items.map((item) => (
            <CandidateItem key={item.id} item={item} />
          ))}
        </div> */}

        <div className="wrapper">
          {savedCandidates.map((candidate) => (
            <SavedCandidateItem key={candidate.candidate_id} item={candidate} />
          ))}
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

export default SavedCandidateArea;
