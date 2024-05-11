"use client";
import React from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_02.jpg";
import search from "@/assets/dashboard/images/icon/icon_16.svg";
import DashboardHeader from "./dashboard-header";
import JobTypeSelect from "./jobType-select";
import WorkTypeSelect from "./workType-select";
import axios from "axios";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type EducationDetail = {
  institute_name: string;
  degree_program: string;
  duration: string;
};

type workExperience = {
  company_name: string;
  position: string;
  duration: string;
};

const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [educationDetails, setEducationDetails] = useState<EducationDetail[]>([]);
  const [workExperience, setWorkExperience] = useState<workExperience[]>([]);


  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const responseCandidate = await axios.get(
          "http://localhost:5000/api/auth/candidateDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseInstitute = await axios.get(
          "http://localhost:5000/api/auth/getInstituteDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const responseWorkExperience = await axios.get(
          "http://localhost:5000/api/auth/getWorkExperienceDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (responseCandidate.status === 200 && responseInstitute.status === 200 && responseWorkExperience.status === 200) {
          console.log(responseInstitute.data.data.institute);
          setEducationDetails(responseInstitute.data.data.institute || []);
          setUserDetails(responseCandidate.data.data.candidate);
          setWorkExperience(responseWorkExperience.data.data.workExperience);
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

      const response = await axios.put("http://localhost:5000/api/auth/updateCandidateDetails", userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserDetails(response.data.data.candidate);
        setIsEditing(false);
      } else {
        console.error("Failed to update user details:", response.data.message);
      }

      setEducationDetails([]);

      const createEducationResponse = await axios.post("http://localhost:5000/api/auth/createCandidateEducationDetails", educationDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (createEducationResponse.status === 200) {
        console.log("Education details saved successfully");
        setEducationDetails(createEducationResponse.data.data.educationDetails);
      } else {
        console.error("Failed to save education details:", createEducationResponse.data.message);
      }

      setWorkExperience([]);

      const createWorkExperienceResponse = await axios.post("http://localhost:5000/api/auth/createCandidateWorkExperience", workExperience, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (createWorkExperienceResponse.status === 200) {
        console.log("Work Experience details saved successfully");
        setWorkExperience(createWorkExperienceResponse.data.data.workExperience);
      } else {
        console.error("Failed to save work experience details:", createWorkExperienceResponse.data.message);
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

  const handleWorkTypeChange = (workType: string) => {
    setUserDetails({ ...userDetails, work_preference: workType });
  }

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

  const handleAddEducation = () => {
    const newEducation = {
      institute_name: "",
      degree_program: "",
      duration: "",
    };
    setEducationDetails([...educationDetails, newEducation]);
  };

  const handleAddWorkExperience = () => {
    const newWorkExperience = {
      company_name: "",
      position: "",
      duration: "",
    };
    setWorkExperience([...workExperience, newWorkExperience]);
  }
  
  const handleWorkExperienceChange = (index: number, key: keyof workExperience, value: string) => {
    const updatedDetails = [...workExperience];
    updatedDetails[index][key] = value;
    setWorkExperience(updatedDetails);
  }

  const handleEducationChange = (index: number, key: keyof EducationDetail, value: string) => {
    const updatedDetails = [...educationDetails];
    updatedDetails[index][key] = value;
    setEducationDetails(updatedDetails);
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const token = localStorage.getItem('token');

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('resume', file);

        console.log('Uploading resume:', file);

        // Send the file to the upload endpoint
        const uploadResponse = await axios.post(
          'http://localhost:5000/api/auth/uploadResume',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (uploadResponse.status === 200) {
          // Update the resume state with the new URL
          setUserDetails({ ...userDetails, resume: uploadResponse.data.resume });
        } else {
          console.error('Failed to upload resume:', uploadResponse.data.message);
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  }

  const dob = userDetails.dateOfBirth ? userDetails.dateOfBirth.split('T')[0] : '';

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* Header */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        {/* <h2 className="main-title">Personal Information</h2> */}

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Personal Information</h4>
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
              type="date"
              placeholder="DD/MM/YYYY"
              value={dob}
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
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
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
          <h4 className="dash-title-three">Profile Overview</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Summary</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
              value={userDetails.overview}
              onChange={(e) =>
                setUserDetails({ ...userDetails, overview: e.target.value })
              }
              readOnly={!isEditing}
            ></textarea>
          </div>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Preferred Job Type</h4>
          <div className="dash-input-wrapper mb-20">
            <JobTypeSelect
              isEditing={isEditing}
              selectedJobType={userDetails.preferredJobType}
              onChange={handleJobTypeChange}
            />
          </div>

          <h4 className="dash-title-three">Preferred Work Type</h4>
          <div className="dash-input-wrapper mb-20">
            <WorkTypeSelect
                isEditing={isEditing}
                selectedWorkType={userDetails.work_preference}
                onChange={handleWorkTypeChange}
              />
          </div>
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
          <h4 className="dash-title-three">Resume Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">CV Attachment*</label>
              {userDetails.resume ? (
                <a
                  href={`http://localhost:5000${userDetails.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </a>
                ) : (
                  <p>No resume uploaded</p>
                )
              }
          </div>

          <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload Resume
            <input
              type="file"
              id="uploadCv"
              name="uploadCv"
              placeholder=""
              onChange={handleResumeUpload}
            />
          </div>
          <small>Upload file .pdf, .doc, .docx</small>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Education Level</h4>
          <div className="dash-input-wrapper mb-20">
            <input
              type="text"
              placeholder="Most Recent Degree (e.g. Bachelors)"
              value={userDetails.education_level}
              onChange={(e) =>
                setUserDetails({ ...userDetails, education_level: e.target.value })
              }
              readOnly={!isEditing}
            />
          </div>
          <h4 className="dash-title-three">Education Details</h4>
          {educationDetails.map((education: EducationDetail, index: number) => (
            <div key={`education-${index}`} className="dash-input-wrapper mb-20">
              <input
                type="text"
                placeholder="Institute Name"
                value={education.institute_name}
                onChange={(e) => handleEducationChange(index, 'institute_name', e.target.value)}
                readOnly={!isEditing}
              />
              <input
                type="text"
                placeholder="Degree Program"
                value={education.degree_program}
                onChange={(e) => handleEducationChange(index, 'degree_program', e.target.value)}
                readOnly={!isEditing}
              />
              <input
                type="text"
                placeholder="Duration"
                value={education.duration}
                onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          ))}
          <button className="dash-btn-one" onClick={handleAddEducation}>
            <i className="bi bi-plus"></i>Add
          </button>
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Work Experience</h4>
          {workExperience.map((experience: workExperience, index: number) => (
            <div key={`experience-${index}`} className="dash-input-wrapper mb-20">
              <input
                type="text"
                placeholder="Company Name"
                value={experience.company_name}
                onChange={(e) => handleWorkExperienceChange(index, 'company_name', e.target.value)}
                readOnly={!isEditing}
              />
              <input
                type="text"
                placeholder="Position"
                value={experience.position}
                onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                readOnly={!isEditing}
              />
              <input
                type="text"
                placeholder="Duration"
                value={experience.duration}
                onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                readOnly={!isEditing}
              />
            </div>
          ))}
          <button className="dash-btn-one" onClick={handleAddWorkExperience}>
            <i className="bi bi-plus"></i>Add
          </button>
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
