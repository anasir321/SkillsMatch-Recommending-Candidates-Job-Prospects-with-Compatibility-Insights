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

  // return (
  //   <div className="dashboard-body">
  //     <div className="position-relative">
  //       {/* header start */}
  //       <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
  //       {/* header end */}

  //       <h2 className="main-title">Personal Information</h2>

  //       <div className="bg-white card-box border-20">
  //         <div className="user-avatar-setting d-flex align-items-center mb-30">
  //           <Image src={avatar} alt="avatar" className="lazy-img user-img" />
  //           <div className="upload-btn position-relative tran3s ms-4 me-3">
  //             Upload new photo
  //             <input
  //               type="file"
  //               id="uploadImg"
  //               name="uploadImg"
  //               placeholder=""
  //             />
  //           </div>
  //           <button className="delete-btn tran3s">Delete</button>
  //         </div>
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">First Name*</label>
  //           <input
  //             type="text"
  //             placeholder="James"
  //             value={userDetails.firstname}
  //           />
  //         </div>
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">Last Name*</label>
  //           <input
  //             type="text"
  //             placeholder="Brower"
  //             value={userDetails.lastname}
  //           />
  //         </div>
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">Date of Birth*</label>
  //           <input
  //             type="text"
  //             placeholder="DD/MM/YYYY"
  //             value={userDetails.dateOfBirth}
  //           />
  //         </div>
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">Gender*</label>
  //           <input
  //             type="text"
  //             placeholder="Male/Female"
  //             value={userDetails.gender}
  //           />
  //         </div>
  //         {/* <div className="dash-input-wrapper">
  //           <label htmlFor="">Bio*</label>
  //           <textarea className="size-lg" placeholder="Write something interesting about you...."></textarea>
  //           <div className="alert-text">Brief description for your profile. URLs are hyperlinked.</div>
  //         </div> */}
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">Email*</label>
  //           <input
  //             type="text"
  //             placeholder="arham@gmail.com"
  //             value={userDetails.email}
  //           />
  //         </div>
  //         <div className="dash-input-wrapper mb-30">
  //           <label htmlFor="">Phone*</label>
  //           <input type="text" placeholder="+92 123 456 78" />
  //         </div>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Education</h4>

  //         <div className="dash-input-wrapper mb-20">
  //           <input
  //             type="text"
  //             placeholder="Degree"
  //             value={userDetails.education}
  //           />
  //         </div>
  //         <a href="#" className="dash-btn-one">
  //           <i className="bi bi-plus"></i>Add
  //         </a>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Skills</h4>

  //         <div className="dash-input-wrapper mb-20">
  //           <input
  //             type="text"
  //             placeholder="Javascript"
  //             value={userDetails.skills}
  //           />
  //         </div>
  //         <a href="#" className="dash-btn-one">
  //           <i className="bi bi-plus"></i>Add
  //         </a>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Soft Skills</h4>

  //         <div className="dash-input-wrapper mb-20">
  //           <input
  //             type="text"
  //             placeholder="Teamwork"
  //             value={userDetails.softSkills}
  //           />
  //         </div>
  //         <a href="#" className="dash-btn-one">
  //           <i className="bi bi-plus"></i>Add
  //         </a>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Professional Links</h4>

  //         <div className="dash-input-wrapper mb-20">
  //           <label htmlFor="">Linkedin</label>
  //           <input
  //             type="text"
  //             placeholder="#"
  //             value={userDetails.linkedinURL}
  //           />
  //         </div>
  //         <div className="dash-input-wrapper mb-20">
  //           <label htmlFor="">Github</label>
  //           <input type="text" placeholder="#" value={userDetails.githubURL} />
  //         </div>
  //         <a href="#" className="dash-btn-one">
  //           <i className="bi bi-plus"></i>Add
  //         </a>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Preferred Job Type</h4>

  //         <div className="dash-input-wrapper mb-20">
  //           <JobTypeSelect />
  //         </div>
  //       </div>

  //       <div className="bg-white card-box border-20 mt-40">
  //         <h4 className="dash-title-three">Address & Location</h4>
  //         <div className="row">
  //           <div className="col-12">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">Address*</label>
  //               <input
  //                 type="text"
  //                 placeholder="Cowrasta, Chandana, Gazipur Sadar"
  //                 value={userDetails.location}
  //               />
  //             </div>
  //           </div>
  //           <div className="col-lg-3">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">Country*</label>
  //               <CountrySelect />
  //             </div>
  //           </div>
  //           <div className="col-lg-3">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">City*</label>
  //               <CitySelect />
  //             </div>
  //           </div>
  //           {/* <div className="col-lg-3">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">Zip Code*</label>
  //               <input type="number" placeholder="1708" />
  //             </div>
  //           </div>
  //           <div className="col-lg-3">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">State*</label>
  //               <StateSelect/>
  //             </div>
  //           </div>
  //           <div className="col-12">
  //             <div className="dash-input-wrapper mb-25">
  //               <label htmlFor="">Map Location*</label>
  //               <div className="position-relative">
  //                 <input type="text" placeholder="XC23+6XC, Moiran, N105" />
  //                 <button className="location-pin tran3s"><Image src={search} alt="icon" className="lazy-img m-auto" /></button>
  //               </div>
  //               <div className="map-frame mt-30">
  //                 <div className="gmap_canvas h-100 w-100">
  //                   <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
  //                 </div>
  //               </div>
  //             </div>
  //           </div> */}
  //         </div>
  //       </div>

  //       <div className="button-group d-inline-flex align-items-center mt-30">
  //         <a href="#" className="dash-btn-two tran3s me-3">
  //           Save
  //         </a>
  //         <a href="#" className="dash-cancel-btn tran3s">
  //           Cancel
  //         </a>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* Header */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title">Personal Information</h2>

        <div className="bg-white card-box border-20">
          {/* User Avatar and Photo Upload */}
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            <Image src={avatar} alt="avatar" className="lazy-img user-img" />
            <div className="upload-btn position-relative tran3s ms-4 me-3">
              Upload new photo
              <input
                type="file"
                id="uploadImg"
                name="uploadImg"
                placeholder=""
              />
            </div>
            <button className="delete-btn tran3s">Delete</button>
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

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Phone*</label>
            <input
              type="text"
              placeholder="+92 123 456 78"
              readOnly={!isEditing}
            />
          </div>
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
