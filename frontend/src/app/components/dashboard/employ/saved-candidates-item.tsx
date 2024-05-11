import React, { useEffect } from "react";
import ActionDropdown from "../candidate/action-dropdown";
import ActionDropdownApplicant from "./action-dropdown-applicant";
import { ICandidate } from "@/data/candidate-data";
import Image from "next/image";
import SavedCandidateItemActionDropDown from "./saved-candidates-item-action-dropdown";
import axios from "axios";
import avatar from "@/assets/dashboard/images/avatar_02.jpg";

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

const SavedCandidateItem = ({ item }: { item: candidateDetails }) => {

  const skillsArray = item.skills ? item.skills.split(",") : [];

  // Define a new array to hold the skills to display
  const maxSkillsToShow = 4;
  const skillsToDisplay = skillsArray.slice(0, maxSkillsToShow);
  
  // Add an ellipsis if there are more than 4 skills
  const hasMoreSkills = skillsArray.length > maxSkillsToShow;
  if (hasMoreSkills) {
    skillsToDisplay.push("...");
  }

  // State variable to hold the URL for the profile picture
  const [profilePicURL, setProfilePicURL] = React.useState("");
  const [profilePicture, setProfilePicture] = React.useState("");

  useEffect(() => {
    const fetchCandidateProfilePicture = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = {
          candidate_id: item.candidate_id
        }
        const response = await axios.post(
          'http://localhost:5000/api/auth/getCandidateProfilePicture',
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Profile Picture Path:', response.data.filePath);

        if (response.status === 200) {
          // Construct the full URL based on the relative path
          const fullUrl = `http://localhost:5000${response.data.filePath}`;

          console.log('saved-candidate-item :: Full URL:', fullUrl);

          // Update the profile picture state with the full URL
          setProfilePicture(fullUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchCandidateProfilePicture();
  }, []);
  
  return (
    <div className="candidate-profile-card list-layout border-0 mb-25">
      <div className="d-flex">
        <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
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

          {/* <a href="#" className="rounded-circle">
            <Image
              // Use the profilePicURL as the source if available; otherwise, use a default image
              src={profilePicURL || "/uploads/profile-pictures/1707126742998.jpg"}
              alt="Profile picture"
              className="lazy-img rounded-circle"
              width={100}
              height={100}
            />
          </a> */}

          {/* <a href="#" className="rounded-circle">
            <Image
                src={profilePicture}
                alt="Profile picture"
                className="lazy-img rounded-circle"
                width={100}
                height={100}
            />
          </a> */}

          <a href="" className="rounded-circle">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
          {profilePicture ? (
              <img
                src={profilePicture}
                alt="profile-picture"
                className="lazy-img user-img"
                width={100} // Set the desired width
                height={100} // Set the desired height
              />
            ) : (
              <Image
                src={avatar}
                alt="avatar"
                className="lazy-img user-img"
                width={100} // Set the desired width
                height={100} // Set the desired height
              />
            )}
            </div>
          </a>

          
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
                <div className="candidate-post">{item.preferredJobTitle}</div>
                <ul className="cadidate-skills style-none d-flex align-items-center">
                  {/* Display each skill in a <li> tag */}
                  {skillsToDisplay.map((skill, index) => (
                    <li key={index}>{skill.trim()}</li>
                  ))}
                </ul>
                {/* <ul className="cadidate-skills style-none d-flex align-items-center">
                  <li>{item.skills[0]}</li>
                  <li>{item.skills[1]}</li>
                  <li>{item.skills[2]}</li>
                  <li className="more">2+</li>
                </ul> */}
              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Education / Experience</span>
                <div>{item.education_level} / {item.experience} years</div>
              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Location</span>
                <div>{item.location}</div>
              </div>
            </div>
            <div className="col-xl-2 col-md-4 col-sm-6">
              <div className="candidate-info">
                <span>Availability</span>
                <div>{item.work_preference} / {item.preferredJobType}</div>
              </div>
            </div>
            <div className="col-xl-3 col-md-4">
              <div className="d-flex justify-content-md-end align-items-center">
                {/* <a
                  href="#"
                  className="save-btn text-center rounded-circle tran3s mt-10 fw-normal"
                >
                  <i className="bi bi-eye"></i>
                </a> */}
                <div className="action-dots float-end mt-10 ms-2">
                  <button
                    className="action-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span></span>
                  </button>
                  <SavedCandidateItemActionDropDown candidate_id={item.candidate_id}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedCandidateItem;
