import React from "react";
import Image from "next/image";
import Link from "next/link";
import category_dropdown from "@/data/category-dropdown";

const CategoryDropdown = () => {
  return (
    <ul className="dropdown-menu category-dropdown">
      <li className="row gx-0">
        {category_dropdown.map((item) => (
        <div key={item.id} className="col-lg-6">
          {item.category_items.map(c => (
          <Link key={c.id} href="/job-list-v1" className="item d-flex align-items-center">
            <div className="icon d-flex align-items-center justify-content-center rounded-circle tran3s">
              <Image
                src={c.icon}
                alt="icon"
                className="lazy-img"
              />
            </div>
            <div className="ps-3 flex-fill">
              <div className="fw-500 text-dark">{c.title}</div>
              <div className="job-count">{c.count} Jobs</div>
            </div>
          </Link>
          ))}
        </div>
        ))}
      </li>
      <li>
        <Link
          href="/job-list-v1"
          className="explore-all-btn d-flex align-items-center justify-content-between tran3s"
        >
          <span className="fw-500">Explore all fields</span>
          <span className="icon">
            <i className="bi bi-chevron-right"></i>
          </span>
        </Link>
      </li>
    </ul>
  );
};

export default CategoryDropdown;
