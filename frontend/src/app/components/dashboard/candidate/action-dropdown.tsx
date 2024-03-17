import React, { useState } from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";
import Link from "next/link";
import axios from "axios";
import { useEffect } from "react";

const ActionDropdown = ({ job_id }) => {

  // delete the job
  const deleteJob = async () => {
    try {

      // console.log("delete job called:: job_id: ", job_id)
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/api/auth/deleteJobUsingId/${job_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <Link href={`/job-details-v1?job_id=${job_id}`}>
          <div className="dropdown-item">
            <Image src={view} alt="icon" className="lazy-img" /> View
          </div>
        </Link>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <Image src={share} alt="icon" className="lazy-img" /> Share
        </a>
      </li>
      <li>
        <a className="dropdown-item" href={`/dashboard/employ-dashboard/edit-job?job_id=${job_id}`}>
          <Image src={edit} alt="icon" className="lazy-img" /> Edit
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#" onClick={() => deleteJob()}>
          <Image src={delete_icon} alt="icon" className="lazy-img" /> Delete
        </a>
      </li>
    </ul>
  );
};

export default ActionDropdown;