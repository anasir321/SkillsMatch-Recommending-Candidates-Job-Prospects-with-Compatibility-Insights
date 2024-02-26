"use client";
import React from "react";
import Image from "next/image";
import DashboardHeader from "../candidate/dashboard-header";
import StateSelect from "../candidate/state-select";
import CitySelect from "../candidate/city-select";
import CountrySelect from "../candidate/country-select";
import EmployExperience from "./employ-experience";
import icon from "@/assets/dashboard/images/icon/icon_16.svg";
import NiceSelect from "@/ui/nice-select";
import { useState } from "react";
import axios from "axios";
import { set } from "react-hook-form";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const SubmitJobArea = ({setIsOpenSidebar}:IProps) => {
  const handleCategory = (item: { value: string; label: string }) => {};
  const handleJobType = (item: { value: string; label: string }) => {};
  const handleSalary = (item: { value: string; label: string }) => {};

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<any>({});

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  }

  const handleCancelClick = () => {
    setIsEditing(false);
    setJobDetails({
      job_title: "",
      job_description: "",
      work_type: "select work type",
      job_type: "",
      salary: "",
      date_posted: "",
      job_status: "",
      skills_required: "",
      soft_skills_required: "",
      work_experience_required: "",
      education_required: "",
      job_location: ""
    });
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

  const handleSaveClick = async () => {
    try {

      console.log("handleSaveClick :: jobDetails: ", jobDetails)
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/auth/submitJob",
        jobDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("handleSaveClick :: response: ", response.data.data);

      if(response.status === 200) {
        setIsEditing(false);
        setJobDetails({
          job_title: "",
          job_description: "",
          work_type: "select work type",
          job_type: "",
          salary: "",
          date_posted: "",
          job_status: "",
          skills_required: "",
          soft_skills_required: "",
          work_experience_required: "",
          education_required: "",
          job_location: ""
        });
      } else {
        console.log("handleSaveClick :: error while saving job", response.data.message);
      }

    } catch (error) {
      console.log("handleSaveClick :: error while saving job: ", error);
    }
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar}/>
        {/* header end */}

        <h2 className="main-title">Post a New Job</h2>

        <div className="bg-white card-box border-20">
          <h4 className="dash-title-three">Job Details</h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Title*</label>
            <input 
            type="text" 
            placeholder={!isEditing ? "Ex: Software Engineer" : ""}
            readOnly={!isEditing}
            onChange={(e) => {
              setJobDetails({...jobDetails, job_title: e.target.value});
            }}
            value={jobDetails.job_title}
            />
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Job Description*</label>
            <textarea
              className="size-lg"
              placeholder="Write about the job in details..."
              readOnly={!isEditing}
              onChange={(e) => {
                setJobDetails({...jobDetails, job_description: e.target.value});
              }}
              value={jobDetails.job_description}
            ></textarea>
          </div>
          <div className="row align-items-end">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Work type</label>
                <NiceSelect
                  options={[
                    { value: "Remote", label: "Remote" },
                    { value: "Onsite", label: "Onsite" },
                  ]}
                  defaultCurrent={0}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, work_type: e.value});
                  }}
                  name="Job Category"
                />
              </div>
              
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Type</label>
                <NiceSelect
                  options={[
                    { value: "Full-time", label: "Full-time" },
                    { value: "Part-time", label: "Part-time" },
                    { value: "Contract", label: "Contract" },
                    { value: "Internship", label: "Internship" },
                  ]}
                  defaultCurrent={0}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, job_type: e.value});
                  }}
                  name="Job Type"
                />
              </div>
              
            </div>
            <div className="col-md-6">
              <div className="row">
              <div className="col-md-6">
                <div className="dash-input-wrapper mb-30">
                  <label htmlFor="">Salary</label>
                  <input 
                    type="salary" 
                    placeholder="80000"
                    readOnly={!isEditing}
                    onChange={(e) => {
                      setJobDetails({...jobDetails, salary: e.target.value});
                    }}
                    value={jobDetails.salary}
                    />
                  
                </div>
                
                <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Date Posted</label>
                  <input 
                    type="date_posted" 
                    placeholder="23 Feb 2024"
                    readOnly={!isEditing}
                    onChange={(e) => {
                      setJobDetails({...jobDetails, date_posted: e.target.value});
                    }}
                    value={jobDetails.date_posted}
                    />
                </div>
                

                <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Job Status</label>
                <NiceSelect
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Inactive", label: "Inactive" },
                  ]}
                  defaultCurrent={0}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, job_status: e.value});
                  }}
                  name="Job Category"
                />
              </div>
              </div>
          </div>
              {/* <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Salary*</label>
                <NiceSelect
                  options={[
                    { value: "Monthly", label: "Monthly" },
                    { value: "Weekly", label: "Weekly" },
                  ]}
                  defaultCurrent={0}
                  onChange={(item) => handleSalary(item)}
                  name="Salary"
                />
              </div> */}
            </div>
            {/* <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Min" />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dash-input-wrapper mb-30">
                <input type="text" placeholder="Max" />
              </div>
            </div> */}
          </div>

          <h4 className="dash-title-three pt-50 lg-pt-30">
            Skills, Experience & Education
          </h4>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Skills*</label>
            <input 
            type="text" 
            placeholder="Add Skills" 
            readOnly={!isEditing}
            onChange={(e) => {
              setJobDetails({...jobDetails, skills_required: e.target.value});
            }}
            value={jobDetails.skills_required}
            />
            <div className="skill-input-data d-flex align-items-center flex-wrap">
              {/* <button>Design</button>
              <button>UI</button>
              <button>Account</button> */}
            </div>
          </div>

          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Soft skills required*</label>
            <input 
            type="text" 
            placeholder="Add soft Skills" 
            readOnly={!isEditing}
            onChange={(e) => {
              setJobDetails({...jobDetails, soft_skills_required: e.target.value});
            }}
            value={jobDetails.soft_skills_required}
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Work experience required*</label>
                <input 
                  type="experience" 
                  placeholder="4"
                  readOnly={!isEditing}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, work_experience_required: e.target.value});
                  }}
                  value={jobDetails.work_experience_required}
                  />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Education required*</label>
                <input 
                  type="education" 
                  placeholder="Intermediate"
                  readOnly={!isEditing}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, education_required: e.target.value});
                  }}
                  value={jobDetails.education_required}
                  />
              </div>
            </div>
          </div>

          {/* employ experience start */}
          {/* <EmployExperience /> */}
          {/* employ experience end */}
          {/* <h4 className="dash-title-three pt-50 lg-pt-30">File Attachment</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">File Attachment*</label>
            <div className="attached-file d-flex align-items-center justify-content-between mb-15">
              <span>guidline&requirments.doc</span>
              <a href="#" className="remove-btn">
                <i className="bi bi-x"></i>
              </a>
            </div>
          </div>
          <div className="dash-btn-one d-inline-block position-relative me-3">
            <i className="bi bi-plus"></i>
            Upload File
            <input type="file" id="uploadCV" name="uploadCV" placeholder="" />
          </div>
          <small>Upload file .pdf, .doc, .docx</small> */}
          <h4 className="dash-title-three pt-50 lg-pt-30">
            Location
          </h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Location*</label>
                <input
                  type="text"
                  placeholder="Cowrasta, Chandana, Gazipur Sadar"
                  readOnly={!isEditing}
                  onChange={(e) => {
                    setJobDetails({...jobDetails, job_location: e.target.value});
                  }}
                  value={jobDetails.job_location}
                />
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect />
              </div>
            </div> */}
            {/* <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <CitySelect />
              </div>
            </div> */}
            {/* <div className="col-lg-4">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">State*</label>
                <StateSelect />
              </div>
            </div> */}
            {/* <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Map Location*</label>
                <div className="position-relative">
                  <input type="text" placeholder="XC23+6XC, Moiran, N105" />
                  <button className="location-pin tran3s">
                    <Image src={icon} alt="icon" className="lazy-img m-auto" />
                  </button>
                </div>
                <div className="map-frame mt-30">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe
                      className="gmap_iframe h-100 w-100"
                      src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          {renderSaveButton()}
          <a 
          href="#" 
          className="dash-btn-two tran3s me-3"
          onClick={handleEditClick}
          >
            Edit
          </a>
          <a 
          href="#" 
          className="dash-cancel-btn tran3s"
          onClick={handleCancelClick}
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubmitJobArea;
