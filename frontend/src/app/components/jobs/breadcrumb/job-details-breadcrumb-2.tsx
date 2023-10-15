import React from "react";
import shape_1 from "@/assets/images/shape/shape_02.svg";
import shape_2 from "@/assets/images/shape/shape_03.svg";
import Image from "next/image";

const JobDetailsBreadcrumbTwo = () => {
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-8 m-auto text-center">
              <div className="post-date">
                18 Jul 2023 by{" "}
                <a href="#" className="fw-500 text-white">
                  Adobe
                </a>
              </div>
              <div className="title-two">
                <h2 className="text-white">Senior Product & Brand Design</h2>
              </div>
              <ul className="share-buttons d-flex flex-wrap justify-content-center style-none mt-10">
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-facebook"></i>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-twitter"></i>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-link-45deg"></i>
                    <span>Copy</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
    </div>
  );
};

export default JobDetailsBreadcrumbTwo;
