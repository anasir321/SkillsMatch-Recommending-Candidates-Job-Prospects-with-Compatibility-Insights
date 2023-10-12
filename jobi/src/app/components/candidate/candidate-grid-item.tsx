import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICandidate } from "@/data/candidate-data";

const CandidateGridItem = ({ item,style_2=false }: { item: ICandidate;style_2?:boolean }) => {
  return (
      <div
        className={`candidate-profile-card ${item.favorite ? "favourite" : ""} text-center ${style_2?'border-0':''} grid-layout mb-25`}
      >
        <Link href="/candidate-profile-v1" className="save-btn tran3s">
          <i className="bi bi-heart"></i>
        </Link>
        <div className="cadidate-avatar online position-relative d-block m-auto">
          <Link href="/candidate-profile-v1" className="rounded-circle">
            <Image
              src={item.img}
              alt="image"
              className="lazy-img rounded-circle"
            />
          </Link>
        </div>
        <h4 className="candidate-name mt-15 mb-0">
          <Link href="/candidate-profile-v1" className="tran3s">
            {item.name}
          </Link>
        </h4>
        <div className="candidate-post">{item.post}</div>
        <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pt-30 sm-pt-20 pb-10">
          {item.skills.slice(0, 3).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
          {item.skills.length > 3 && (
            <li className="more">
              {item.skills.length - item.skills.slice(0, 3).length}+
            </li>
          )}
        </ul>
        <div className="row gx-1">
          <div className="col-md-6">
            <div className="candidate-info mt-10">
              <span>Salary</span>
              <div>
                {item.salary}/{item.salary_duration}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="candidate-info mt-10">
              <span>Location</span>
              <div>{item.location}</div>
            </div>
          </div>
        </div>
        <div className="row gx-2 pt-25 sm-pt-10">
          <div className="col-md-6">
            <Link href="/candidate-profile-v1"
              className="profile-btn tran3s w-100 mt-5"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-6">
            <Link href="/candidate-profile-v1"
              className="msg-btn tran3s w-100 mt-5"
            >
              Message
            </Link>
          </div>
        </div>
      </div>
  );
};

export default CandidateGridItem;
