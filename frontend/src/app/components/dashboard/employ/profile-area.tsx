"use client"
import React from 'react';
import Image from 'next/image';
import avatar from '@/assets/dashboard/images/avatar_04.jpg';
import icon from '@/assets/dashboard/images/icon/icon_16.svg';
import CountrySelect from '../candidate/country-select';
import CitySelect from '../candidate/city-select';
import StateSelect from '../candidate/state-select';
import DashboardHeader from '../candidate/dashboard-header';
import { useEffect, useState } from "react";
import axios from "axios";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const EmployProfileArea = ({setIsOpenSidebar}:IProps) => {

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:5000/api/auth/saveCompanyDetails",
        companyDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setCompanyDetails(response.data.data.company);
        setIsEditing(false);
      } else {
        console.error("Failed to save Company details:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving company details:", error);
    }
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

  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/companyDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.status === 200) {
          setCompanyDetails(response.data.data.company);
        }
      } catch (error) {
        // Handle errors
        console.log("Error fetching company details: ", error);
      }
    };

    getCompanyDetails();
    
  }, [])

  useEffect(()=> {
    const fetchCompanyProfilePicture = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:5000/api/auth/getCompanyProfilePicture',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        console.log("company profile picture path: ", response.data.filePath);

        if(response.status === 200){
          // construct the full url based on relative path
          const fullUrl = `http://localhost:5000/${response.data.filePath}`;

          console.log("fetchCompanyProfilePicture :: fullUrl: ", fullUrl)

          // update the company profile picture state with full url
          setProfilePicture(fullUrl)
        }

      } catch (error) {
        console.log("fetchCompanyProfilePicture :: error fetching profile picture", error)
      }
    };

    fetchCompanyProfilePicture();
  }, [])

  // handleFileChange for upload new photo button
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file){
      try{
        const token = localStorage.getItem('token');

        // create a formData object to send the file
        const formData = new FormData();
        formData.append('profilePicture', file)

        // send the file to the upload endpoint
        const uploadResponse = await axios.post(
          'http://localhost:5000/api/auth/uploadCompanyProfilePicture',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        if (uploadResponse.status === 200) {
          // update company profile picture state
          setProfilePicture(uploadResponse.data.profilePicture)
        } else{
          console.log("handleFileChange :: Error uploading profile picture ", uploadResponse.data.message)
        }

      } catch(error) {
        console.log("HandleFileChange :: error ", error)
      }
    }
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title">Company Profile</h2>

        <div className="bg-white card-box border-20">
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
            {/* <Image src={avatar} alt="avatar" className="lazy-img user-img" /> */}
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
            <button className="delete-btn tran3s">Delete</button>
          </div>
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Company Name*</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              value={companyDetails.company_name}
              onChange={(e) => {
                setCompanyDetails({...companyDetails, company_name: e.target.value})
              }}
              readOnly={!isEditing}/>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Email*</label>
                <input 
                  type="email" 
                  placeholder="companyinc@gmail.com"
                  value={companyDetails.company_email}
                  onChange={(e) => {
                    setCompanyDetails({...companyDetails, company_email: e.target.value})
                  }}
                  readOnly={!isEditing}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Website*</label>
                <input 
                type="text" 
                placeholder="http://somename.come"
                value={companyDetails.company_website}
                onChange={(e) => {
                  setCompanyDetails({...companyDetails, company_website: e.target.value})
                }}
                readOnly={!isEditing}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Founded Date*</label>
                <input 
                type="text"
                placeholder="10 Feb 2020"
                value={companyDetails.company_founded_date}
                onChange={(e) => {
                  setCompanyDetails({...companyDetails, company_founded_date: e.target.value})
                }}
                readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Size*</label>
                <input 
                type="text" 
                placeholder="35"
                value={companyDetails.company_size}
                onChange={(e) => {
                  setCompanyDetails({...companyDetails, company_size: e.target.value})
                }}
                readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Phone Number*</label>
                <input 
                type="tel" 
                placeholder="+92 333 1234567" 
                value={companyDetails.company_phone}
                onChange={(e) => {
                  setCompanyDetails({...companyDetails, company_phone: e.target.value})
                }}
                readOnly={!isEditing}
                />
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Category*</label>
                <input type="text" placeholder="Account, Finance, Marketing" />
              </div>
            </div> */}
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">About Company*</label>
            <textarea 
            className="size-lg" 
            placeholder="Write description of your company...."
            value={companyDetails.company_description}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_description: e.target.value})
            }}
            readOnly={!isEditing}></textarea>
            <div className="alert-text">Brief description for your company.</div>
          </div>
        </div>


        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Links & Social Media</h4>
          {/* <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Website</label>
            <input 
            type="text" 
            placeholder="https://www.facebook.com/"
            value={companyDetails.company_website}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_website: e.target.value}) 
            }} />
          </div> */}
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Linkedin</label>
            <input 
            type="text" 
            placeholder="https://linkedin.com/companyname"
            value={companyDetails.company_linkedin}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_linkedin: e.target.value}) 
            }}
            readOnly={!isEditing}/>
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Twitter</label>
            <input 
            type="text" 
            placeholder="https://twitter.com/companyname"
            value={companyDetails.company_twitter}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_twitter: e.target.value}) 
            }}
            readOnly={!isEditing}/>
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Instagram</label>
            <input 
            type="text" 
            placeholder="https://instagram.com/companyname"
            value={companyDetails.company_instagram}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_instagram: e.target.value}) 
            }}
            readOnly={!isEditing}/>
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Facebook</label>
            <input 
            type="text" 
            placeholder="https://facebook.com/companyname"
            value={companyDetails.company_facebook}
            onChange={(e) => {
              setCompanyDetails({...companyDetails, company_facebook: e.target.value}) 
            }}
            readOnly={!isEditing}/>
          </div>
          {/* <a href="#" className="dash-btn-one"><i className="bi bi-plus"></i> Add more link</a> */}
        </div>

        <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Location</h4>
          <div className="row">
            <div className="col-12">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Address*</label>
                <input 
                type="text" 
                placeholder="Cowrasta, Chandana, Gazipur Sadar"
                value={companyDetails.company_location} 
                onChange={(e) => {
                  setCompanyDetails({...companyDetails, company_location: e.target.value})
                }}
                readOnly={!isEditing}/>
              </div>
            </div>
            {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Country*</label>
                <CountrySelect />
              </div>
            </div> */}
            {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">City*</label>
                <CitySelect />
              </div>
            </div> */}
            {/* <div className="col-lg-3">
              <div className="dash-input-wrapper mb-25">
                <label htmlFor="">Zip Code*</label>
                <input type="number" placeholder="1708" />
              </div>
            </div> */}
            {/* <div className="col-lg-3">
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
                    <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="bg-white card-box border-20 mt-40">
          <h4 className="dash-title-three">Members</h4>
          <div className="dash-input-wrapper">
            <label htmlFor="">Add & Remove Member</label>
          </div>
          <div className="accordion dash-accordion-one" id="accordionOne">
            <div className="accordion-item">
              <div className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Add Member 1
                </button>
              </div>
              <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionOne">
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Name*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Product Designer (Google)" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Designation*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="text" placeholder="Account Manager" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="dash-input-wrapper mb-30 md-mb-10">
                        <label htmlFor="">Email*</label>
                      </div>
                    </div>
                    <div className="col-lg-10">
                      <div className="dash-input-wrapper mb-30">
                        <input type="email" placeholder="newmmwber@gmail.com" />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-20">
                    <a href="#" className="dash-btn-one">Remove</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="dash-btn-one"><i className="bi bi-plus"></i> Add Another Member</a>
        </div> */}


        {/* <div className="button-group d-inline-flex align-items-center mt-30">
          <a href="#" className="dash-btn-two tran3s me-3">Save</a>
          <a href="#" className="dash-cancel-btn tran3s">Cancel</a>
        </div> */}
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

export default EmployProfileArea;