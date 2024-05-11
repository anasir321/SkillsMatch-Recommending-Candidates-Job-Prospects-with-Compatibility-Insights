import React from "react";
import Image from "next/image";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import axios from "axios";

const ActionDropdown = ({ job_id, onUnsaveJob }) => {
  const unsaveJob = async () => {
    try {
      const token = localStorage.getItem("token") as string;

      const response = await axios.delete(
        `http://localhost:5000/api/auth/unsaveJob`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { job_id: job_id }, // Send job_ids as data in the request body
        }
      );

      if (response.status === 200) {
        console.log("Job unsaved successfully");
        onUnsaveJob(job_id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a className="dropdown-item" href="#" onClick={unsaveJob}>
          <Image src={edit} alt="icon" className="lazy-img" /> Unsave Job
        </a>
      </li>
    </ul>
  );
};

export default ActionDropdown;
