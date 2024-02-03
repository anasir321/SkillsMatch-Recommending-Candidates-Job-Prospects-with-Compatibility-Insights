import React from "react";
import Image from "next/image";
import Link from "next/link";
import team_img_1 from "@/assets/images/assets/img_42.png";
import team_img_2 from "@/assets/images/assets/img_43.png";
import team_img_3 from "@/assets/images/assets/img_44.png";
import { ICompany } from "@/types/company-type";

const CompanyListItem = ({ item }: { item: ICompany }) => {
  return (
    <div
      className={`company-list-layout ${item.isFav ? "favourite" : ""} mb-20`}
    >
      <div className="row justify-content-between align-items-center">
        <div className="col-xl-5">
          <div className="d-flex align-items-xl-center">
            <Link href="/company-details"
              className="company-logo rounded-circle"
            >
              <Image
                src={item.img}
                alt="image"
                className="lazy-img rounded-circle"
              />
            </Link>
            <div className="company-data">
              <h5 className="m0">
                <Link href="/company-details" className="company-name tran3s">
                  {item.name}
                </Link>
              </h5>
              <p>{item.location}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-8">
          <div className="d-flex align-items-center ps-xxl-5 lg-mt-20">
            <div className="d-flex align-items-center">
              <Image
                src={team_img_1}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_2}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <Image
                src={team_img_3}
                alt="team_img"
                className="lazy-img rounded-circle team-img"
              />
              <div className="team-text">
                <span className="text-md fw-500 text-dark d-block">14+ </span>{" "}
                Team Size
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-4">
          <div className="btn-group d-flex align-items-center justify-content-md-end lg-mt-20">
            <Link href="/company-details"
              className="open-job-btn text-center fw-500 tran3s me-2"
            >
              {item.vacancy} open job
            </Link>
            <Link href="/company-details"
              className="save-btn text-center rounded-circle tran3s"
              title="Save Job"
            >
              <i className="bi bi-bookmark-dash"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyListItem;
