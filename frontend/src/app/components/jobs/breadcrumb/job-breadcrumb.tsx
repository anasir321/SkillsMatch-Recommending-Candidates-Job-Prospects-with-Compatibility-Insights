"use client";
import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import SearchForm from "../../forms/search-form";

const JobBreadcrumb = ({
  title = "Job Listing",
  subtitle = "We delivered blazing fast & striking work solution",
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-6 m-auto text-center">
              <div className="title-two">
                <h2 className="text-white">{title}</h2>
              </div>
              <p className="text-lg text-white mt-30 lg-mt-20 mb-35 lg-mb-20">
                {subtitle}
              </p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-xl-9 col-lg-8 m-auto">
                <div className="job-search-one position-relative">
                  <SearchForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default JobBreadcrumb;
