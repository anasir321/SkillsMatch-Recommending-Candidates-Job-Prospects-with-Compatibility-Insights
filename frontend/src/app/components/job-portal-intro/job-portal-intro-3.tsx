import React from "react";
import Link from "next/link";

const JobPortalIntroThree = () => {
  return (
    <section className="job-portal-intro">
      <div className="container">
        <div className="wrapper bottom-border pt-70 lg-pt-40 pb-65 lg-pb-40">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="text-center text-lg-start wow fadeInUp" data-wow-delay="0.3s">
                <h2>Most complete job portal.</h2>
                <p className="text-md m0 md-pb-20">
                  Signup and start find your job or talents.
                </p>
              </div>
            </div>
            <div className="col-lg-5">
              <ul className="btn-group style-none d-flex justify-content-center justify-content-lg-end">
                <li className="me-2">
                  <Link href="/job-list-v2" className="btn-seven border6">
                    Looking for job?
                  </Link>
                </li>
                <li className="ms-2">
                  <Link href='/register' className="btn-five border6">
                    Post a job
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPortalIntroThree;
