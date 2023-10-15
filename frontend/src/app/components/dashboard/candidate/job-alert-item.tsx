import React from "react";
import Image from "next/image";
import view from "@/assets/dashboard/images/icon/icon_18.svg";
import share from "@/assets/dashboard/images/icon/icon_19.svg";
import edit from "@/assets/dashboard/images/icon/icon_20.svg";
import delete_icon from "@/assets/dashboard/images/icon/icon_21.svg";

const JobAlertItem = ({
  title,
  duration,
  location,
  category,
  found,
  time,
}: {
  title: string;
  duration: string;
  location: string;
  category: string;
  found: string;
  time: string;
}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <div className={`job-type fw-500 ${duration === "Part-Time" ? "part-time" : ""}`}>{duration}</div>
        <div>{location}</div>
        <div>{category}</div>
      </td>
      <td>Jobs found {found}</td>
      <td>{time}</td>
      <td>
        <div className="action-dots float-end">
          <button
            className="action-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span></span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                <Image src={view} alt="icon" className="lazy-img" /> View
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image src={share} alt="icon" className="lazy-img" /> Share
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image src={edit} alt="icon" className="lazy-img" /> Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Image src={delete_icon} alt="icon" className="lazy-img" />{" "}
                Delete
              </a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
};

export default JobAlertItem;
