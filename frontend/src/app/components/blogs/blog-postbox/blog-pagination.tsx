import React from "react";
import Image from "next/image";
import icon from "@/assets/images/icon/icon_50.svg";

const BlogPagination = ({center}:{center?:boolean}) => {
  return (
    <ul className={`pagination-one d-flex align-items-center ${center?'justify-content-center':''} style-none pt-10`}>
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
          Last <Image src={icon} alt="icon" className="ms-2" />
        </a>
      </li>
    </ul>
  );
};

export default BlogPagination;
