import Link from "next/link";
import React from "react";

const FancyBannerSix = () => {
  return (
    <section className="fancy-banner-five bg-image position-relative pt-100 lg-pt-60 pb-100 lg-pb-60">
      <div className="container">
        <div className="position-relative">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="title-one text-center text-lg-start">
                <h2 className="main-font text-white">
                  Complete job portal for everyone.
                </h2>
              </div>
            </div>
            <div className="col-lg-5 ms-auto">
              <p className="text-lg text-white mb-35 lg-mb-20 md-mt-20 text-center text-lg-start">
                Find your dream job & earn from all world the leading brands.{" "}
              </p>
              <ul className="btn-group style-none d-flex justify-content-center justify-content-lg-start">
                <li className="me-2 ms-2 ms-lg-0">
                  <Link href="/job-list-v1" className="btn-seven border6">
                    Looking for job?
                  </Link>
                </li>
                <li className="ms-2 ms-2 ms-lg-0">
                  <Link href="/candidates-v2" className="btn-five border6">
                    Start Hiring
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

export default FancyBannerSix;
