import React from "react";
import ActionDropdown from "../candidate/action-dropdown";
import { ICandidate } from "@/data/candidate-data";
import Image from "next/image";

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

const CandidateSingleApplicant = ({ item }: { item: candidateDetails }) => {
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar online position-relative d-block me-auto ms-auto">
          {/* <a href="#" className="rounded-circle">
            <Image
              src={item.profilePicture || "/uploads/profile-pictures/1707126742998.jpg"}
              alt="image"
              className="lazy-img rounded-circle"
              style={{height:'auto', width:'auto'}}
              width={100}
              height={100}
            />
          </a> */}
        </div>
        <div className="right-side">
          <div className="row gx-1 align-items-center">
            <div className="col-xl-3">
              <div className="position-relative">
                <h4 className="candidate-name mb-0">
                  <a href="#" className="tran3s">
                    {item.firstname}
                  </a>
                </h4>
                {/* <div className="candidate-post">{item.post}</div> */}
                {/* <ul className="cadidate-skills style-none d-flex align-items-center">
                  <li>{item.skills[0]}</li>
                  <li>{item.skills[1]}</li>
                  <li>{item.skills[2]}</li>
                  <li className="more">2+</li>
                </ul> */}
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Salary</span>
                {/* <div>{item.salary}/{item.salary_duration}</div> */}
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Location</span>
                <div>{item.location}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                <a
                  href="#"
                  className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                >
                  <i className="bi bi-eye"></i>
                </a>
                <div className="action-dots float-end mt-10 ms-2">
                  <button
                    className="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span></span>
                  </button>
                  {/* <ActionDropdown /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateSingleApplicant;
