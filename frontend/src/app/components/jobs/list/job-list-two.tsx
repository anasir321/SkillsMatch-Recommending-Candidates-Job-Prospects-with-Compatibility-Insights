"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import job_data from "@/data/job-data";
import shape from "@/assets/images/shape/shape_22.svg";
import icon from "@/assets/images/icon/icon_19.svg";

// categories
const categories: string[] = [
  "All Categories",
  "Design",
  "Developer",
  "Marketing",
  "Business",
];
// job items
const jobs = job_data.slice(0, 5);
const JobListTwo = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [jobItems, setJobItems] = useState(jobs);
  // handle job item
  const handleJob = (value: string) => {
    setActiveCategory(value);
    if (value === "All Categories") {
      setJobItems(jobs);
    } else {
      const remaining_jobs = job_data.filter((j) => j.category.includes(value));
      setJobItems(remaining_jobs);
    }
  };
  return (
    <>
      <section className="job-listing-two pt-120 xl-pt-100 md-pt-80 pb-130 xl-pb-100 lg-pb-80 mt-110 xl-mt-90 md-mt-50">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-5">
              <div className="title-one text-center text-lg-start md-mb-20">
                <h2 className="main-font wow fadeInUp" data-wow-delay="0.3s">New job listing</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <ul className="style-none d-flex justify-content-center justify-content-lg-end flex-wrap isotop-menu-wrapper g-control-nav">
                {categories.map((cate, i) => (
                  <li
                    key={i}
                    onClick={() => handleJob(cate)}
                    className={`${cate === activeCategory ? "is-checked" : ""}`}
                  >
                    {cate}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            id="isotop-gallery-wrapper"
            className="grid-3column pt-55 lg-pt-20"
          >
            <div className="row">
              {jobItems.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-4 col-md-6 isotop-item overflow-hidden"
                >
                  <div className="job-list-two mt-40 lg-mt-20 position-relative">
                    <Link href={`/job-details-v1/${item.id}`} className="logo">
                      <Image
                        src={item.logo}
                        alt="logo"
                        width={45}
                        height={45}
                        style={{ objectFit: "contain" }}
                        className="lazy-img m-auto"
                      />
                    </Link>
                    <Link href={`/job-details-v1/${item.id}`}
                      className="save-btn text-center rounded-circle tran3s"
                      title="Save Job"
                    >
                      <i className="bi bi-bookmark-dash"></i>
                    </Link>
                    <div>
                      <Link href={`/job-details-v1/${item.id}`}
                        className="job-duration fw-500"
                      >
                        {item.duration}
                      </Link>
                    </div>
                    <div>
                      <Link href={`/job-details-v1/${item.id}`}
                        className="title fw-500 tran3s"
                      >
                        {item.title}
                      </Link>
                    </div>
                    <div className="job-date">{item.date}</div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="job-location">
                        <Link href={`/job-details-v1/${item.id}`}>{item.location}</Link>
                      </div>
                      <Link href={`/job-details-v1/${item.id}`}
                        className="apply-btn text-center tran3s"
                      >
                        APPLY
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {activeCategory === "All Categories" && (
                <div className="col-lg-4 col-md-6 isotop-item overflow-hidden">
                  <div className="card-style-four bg-color tran3s w-100 mt-40 lg-mt-20">
                    <a href="#" className="d-block">
                      <div className="title text-white">13k+</div>
                      <div className="text-lg text-white">
                        Job already posted
                      </div>
                      <div className="d-flex align-items-center justify-content-end mt-140 lg-mt-120 xs-mt-60 mb-30">
                        <Image src={shape} alt="shape" className="lazy-img" />
                        <div className="icon tran3s d-flex align-items-center justify-content-center ms-5">
                          <Image src={icon} alt="icon" className="lazy-img" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobListTwo;
