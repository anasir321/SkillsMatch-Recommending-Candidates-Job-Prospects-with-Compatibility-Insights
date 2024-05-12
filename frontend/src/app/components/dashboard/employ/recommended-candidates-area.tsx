"use client"
import React from "react";
import DashboardHeader from "../candidate/dashboard-header";
import candidate_data from "@/data/candidate-data";
import CandidateItem from "./candidate-item";
import EmployShortSelect from "./short-select";
import CandidateSingleApplicant from "./candidate-single-applicant";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

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

const RecommendedCandidatesArea = ({setIsOpenSidebar}:IProps) => {
  const candidate_items = candidate_data.slice(0, 4);

  const [candidates, setCandidates] = useState<candidateDetails[]>([]); // store candidates data
  const [recommendedCandidates, setRecommendedCandidates] = useState<any[]>([]);
  const searchParams = useSearchParams(); // get search params
  // fetch job_id from search params
  const job_id = searchParams.get("job_id");
  console.log("applied-andidates-area :: job_id: ", job_id);

    useEffect(() => {
      const getapplicants = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/auth/getApplicantsUsingJobId/${job_id}`,
            {
              headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
            );

            if (response.status === 200) {
              console.log("recommend-candidates-area :: getapplicants :: response.data.data.candidates: ", response.data.data.candidates);
              setCandidates(response.data.data.candidates);
              }
        } catch (error) {
          console.log("recommend-candidates-area :: fetchCompanyDetails :: error: ", error);
        }
        };
      getapplicants();
    }, [])
    
    useEffect(() => {
        const getRecommendedCandidates = async () => {
          try {
            const response = await axios.get(`http://localhost:2004/recommend_candidates/${job_id}`);
            if(response){
            //   console.log("recommended-candidates-area.tsx :: Recommended candidates: ", response.data);
              const candidateIds = response.data.recommended_candidates.map(recommended_candidate => recommended_candidate.candidate_id);
              console.log("recommended-candidates-area.tsx :: Recommended candidate ids: ", candidateIds);

              const candidateDetailsResponse = await axios.post('http://localhost:5000/api/auth/getCandidateDetailsUsingCandidateIdsArray', { candidateIds },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
              );
              console.log("recommended-candidates-area.tsx :: Candidate Details: ", candidateDetailsResponse.data.data.candidateDetails);
              setRecommendedCandidates(candidateDetailsResponse.data.data.candidateDetails);
            }
          } catch (error) {
            console.log("Error in recommend-candidates-area :: getRecommendedCandidates: ", error);
          }
        };
        getRecommendedCandidates();
      }, [])

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Recommended Candidates for this Job</h2>
          {/* <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <EmployShortSelect/>
          </div> */}
        </div>

        {/* <div className="wrapper">
          {candidate_items.map((item) => (
            <CandidateSingleApplicant key={item.candidate_id} item={item} />
          ))}
        </div> */}

      <div className="wrapper">
          {recommendedCandidates.map((candidate) => (
            <CandidateSingleApplicant key={candidate.candidate_id} item={candidate} />
          ))}
        </div>

        <div className="dash-pagination d-flex justify-content-end mt-30">
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
        </div>
      </div>
    </div>
  );
};

export default RecommendedCandidatesArea;
