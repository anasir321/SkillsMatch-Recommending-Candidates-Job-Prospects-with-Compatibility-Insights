import React from "react";
import Link from "next/link";
import Image from "next/image";
import img from "@/assets/images/assets/img_36.png";
import shape_1 from "@/assets/images/shape/shape_30.svg";
import shape_2 from "@/assets/images/shape/shape_31.svg";

const FancyBannerFive = () => {
  return (
    <section className="fancy-banner-five mt-160 xl-mt-130 lg-mt-100 md-mt-80">
      <div className="container">
        <div className="bg-wrapper position-relative">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="row">
                <div className="col-md-7">
                  <div className="title-one mb-35 md-mb-20">
                    <h2 className="main-font text-white">
                      Complete{" "}
                      <span className="fw-light fst-italic">job portal</span>{" "}
                      for everyone.
                    </h2>
                  </div>
                  <ul className="btn-group style-none d-flex">
                    <li className="me-2">
                      <Link href="/job-list-v1" className="btn-seven border6">
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
                <div className="col-md-5">
                  <div className="img-meta sm-mt-30 position-relative">
                    <Image src={img} alt="img" className="lazy-img m-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={shape_1}
            alt="shape"
            className="lazy-img shapes shape_01"
          />
          <Image
            src={shape_2}
            alt="shape"
            className="lazy-img shapes shape_02"
          />
        </div>
      </div>
    </section>
  );
};

export default FancyBannerFive;
