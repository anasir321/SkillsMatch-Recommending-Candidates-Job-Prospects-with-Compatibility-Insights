import React from "react";
import job_data from "@/data/job-data";
import ListItemTwo from "../jobs/list/list-item-2";

const OpenPosition = () => {
  const job_items = job_data.slice(0, 4);
  return (
    <section className="company-open-position pt-80 lg-pt-60 pb-100 lg-pb-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-two">
              <h2>Open Position</h2>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex justify-content-lg-end">
              <a href="#" className="btn-six">
                Explore More
              </a>
            </div>
          </div>
        </div>
        <div className="mt-50">
          {job_items.map((item) => (
            <ListItemTwo key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpenPosition;
