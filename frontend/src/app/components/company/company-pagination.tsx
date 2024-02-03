import React from "react";
import last_icon from "@/assets/images/icon/icon_50.svg";
import Image from "next/image";

const CompanyPagination = () => {
  return (
    <ul className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none">
      <li className="active">
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">4</a>
      </li>
      <li>....</li>
      <li className="ms-2">
        <a href="#" className="d-flex align-items-center">
          Last
          <Image src={last_icon} alt="last_icon" className="ms-2" />
        </a>
      </li>
    </ul>
  );
};

export default CompanyPagination;
