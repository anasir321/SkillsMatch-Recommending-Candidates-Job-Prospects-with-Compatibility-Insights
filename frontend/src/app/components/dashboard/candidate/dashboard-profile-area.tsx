"use client";
import React from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_02.jpg";
import search from "@/assets/dashboard/images/icon/icon_16.svg";
import DashboardHeader from "./dashboard-header";
import CountrySelect from "./country-select";
import CitySelect from "./city-select";
import StateSelect from "./state-select";
import JobTypeSelect from "./jobType-select";
import axios from "axios";
import { useEffect, useState } from "react";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/candidateDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserDetails(response.data.data.candidate);
        }
      } catch (error) {
        // Handle errors
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/auth/getProfilePicture',
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

          // Update the profile picture state with the full URL
          setProfilePicture(fullUrl);
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePicture();
  }, []);
  

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/auth/updateCandidateDetails",
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUserDetails(response.data.data.candidate);
        setIsEditing(false);
      } else {
        console.error("Failed to update user details:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const renderSaveButton = () => {
    if (isEditing) {
      return (
        <a
          href="#"
          className="dash-btn-two tran3s me-3"
          onClick={handleSaveClick}
        >
          Save
        </a>
      );
    }
    return null;
  };

  const renderCancelButton = () => {
    if (isEditing) {
      return (
        <a
          href="#"
          className="dash-cancel-btn tran3s"
          onClick={handleCancelClick}
        >
          Cancel
        </a>
      );
    }
    return null;
  };

  const handleJobTypeChange = (jobType: string) => {
    setUserDetails({ ...userDetails, preferredJobType: jobType });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const token = localStorage.getItem('token');

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('profilePicture', file);

        // Send the file to the upload endpoint
        const uploadResponse = await axios.post(
          'http://localhost:5000/api/auth/uploadProfilePicture',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (uploadResponse.status === 200) {
          // Update the profile picture state with the new URL
          setProfilePicture(uploadResponse.data.profilePicture);
        } else {
          console.error('Failed to upload profile picture:', uploadResponse.data.message);
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };  

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* Header */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title">Personal Information</h2>

        <div className="bg-white card-box border-20">
          {/* User Avatar and Photo Upload */}
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
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input
                type="file"
                id="uploadImg"
                name="uploadImg"
                placeholder=""
                onChange={handleFileChange}
              />
            </div>            
            {/* <button className="delete-btn tran3s">Delete</button> */}
          </div>

          {/* Input Fields */}
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">First Name*</label>
            <input
              type="text"
              placeholder="James"
              value={userDetails.firstname}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstname: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Last Name*</label>
            <input
              type="text"
              placeholder="Brower"
              value={userDetails.lastname}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastname: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Date of Birth*</label>
            <input
              type="text"
              placeholder="DD/MM/YYYY"
              value={userDetails.dateOfBirth}
              onChange={(e) =>
                setUserDetails({ ...userDetails, dateOfBirth: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Gender*</label>
            <input
              type="text"
              placeholder="Male/Female"
              value={userDetails.gender}
              onChange={(e) =>
                setUserDetails({ ...userDetails, gender: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Email*</label>
            <input
              type="text"
              placeholder="arham@gmail.com"
              value={userDetails.email}
              readOnly={!isEditing}
            />
          </div>

          {/* <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Phone*</label>
            <input
              type="text"
              placeholder="+92 123 456 78"
              readOnly={!isEditing}
            />
          </div> */}
        </div>

        {/* Additional Card Boxes */}
        {/* ... (similar updates for other sections) */}

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Preferred Job Type</h4>
          <div className="dash-input-wrapper mb-20">
            <JobTypeSelect
              isEditing={isEditing}
              selectedJobType={userDetails.preferredJobType}
              onChange={handleJobTypeChange}
            />
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Preferred Job Title</h4>
          <div className="dash-input-wrapper mb-20">
            <input
              type="text"
              placeholder="Software Engineer"
              value={userDetails.preferredJobTitle}
              onChange={(e) =>
                setUserDetails({ ...userDetails, preferredJobTitle: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Education</h4>
          <div className="dash-input-wrapper mb-20">
            <input
              type="text"
              placeholder="Degree"
              value={userDetails.education}
              onChange={(e) =>
                setUserDetails({ ...userDetails, education: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i>Add
          </a>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Skills</h4>

          <div className="dash-input-wrapper mb-20">
            <input
              type="text"
              placeholder="Javascript"
              value={userDetails.skills}
              onChange={(e) =>
                setUserDetails({ ...userDetails, skills: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i>Add
          </a>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Soft Skills</h4>

          <div className="dash-input-wrapper mb-20">
            <input
              type="text"
              placeholder="Teamwork"
              value={userDetails.softSkills}
              onChange={(e) =>
                setUserDetails({ ...userDetails, softSkills: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i>Add
          </a>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Professional Links</h4>

          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Linkedin</label>
            <input
              type="text"
              placeholder="#"
              value={userDetails.linkedinURL}
              onChange={(e) =>
                setUserDetails({ ...userDetails, linkedinURL: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Github</label>
            <input 
              type="text" 
              placeholder="#" 
              value={userDetails.githubURL} 
              onChange={(e) =>
                setUserDetails({ ...userDetails, githubURL: e.target.value })
              }
            />
          </div>
          <a href="#" className="dash-btn-one">
            <i className="bi bi-plus"></i>Add
          </a>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Address & Location</h4>
             <div className="dash-input-wrapper mb-25">
               <label htmlFor="">Address*</label>
               <input
                  type="text"
                  placeholder="Karachi"
                  value={userDetails.location}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, location: e.target.value })
                  }
                  readOnly={!isEditing}
                />
              </div>
        </div>

        {/* Save and Cancel Buttons */}
        <div className="button-group d-inline-flex align-items-center mt-30">
          {renderSaveButton()}
          <a
            href="#"
            className="dash-btn-two tran3s me-3"
            onClick={handleEditClick}
          >
            Edit
          </a>
          {renderCancelButton()}
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileArea;
