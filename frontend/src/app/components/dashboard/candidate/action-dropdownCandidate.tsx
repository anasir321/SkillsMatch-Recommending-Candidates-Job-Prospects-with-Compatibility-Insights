import React, { useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";
import { Icons } from "react-toastify";
import {jwtDecode} from "jwt-decode";

const ActionDropdown = ({ job_id, companyHR_id }) => {

  const [isJobSaved, setIsJobSaved] = useState(false);

  const saveJob = async() => {
    try{
      const token = localStorage.getItem("token") as string;
      const decoded = jwtDecode(token);
      const id = decoded.id;

      const data = {
        job_id: job_id,
        candidate_id: id,
        companyHR_id: companyHR_id
      }
      const response = await axios.post(`http://localhost:5000/api/auth/saveJob`,data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response from api: ",response);

      if(response.status === 200){
        console.log("Job saved successfully")
      }
    } catch(error){
      console.log(error)
    }

  }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link href={`/job-details-v1?job_id=${job_id}`}>
          <div className="dropdown-item">
            <Image src={view} alt="icon" className="lazy-img" /> View Job
          </div>
        </Link>
      </li>
      {/* <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Share
        </a>
      </li> */}
      <li>
        <a
            className="dropdown-item"
            href="#"
            onClick={() => saveJob()}
        >
            <Image src={edit} alt="icon" className="lazy-img" /> Save Job
        </a>
      </li>
    </ul>
  );
};

export default ActionDropdown;