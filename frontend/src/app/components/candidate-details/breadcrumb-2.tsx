import React from 'react';
import Image from "next/image";
import Link from "next/link";
import candidate_img from '@/assets/images/candidates/img_01.jpg';
import shape_1 from '@/assets/images/shape/shape_02.svg';
import shape_2 from '@/assets/images/shape/shape_03.svg';

const CandidateProfileBreadcrumbTwo = () => {
  return (
    <div className="inner-banner-one position-relative">
      <div className="container">
        <div className="candidate-profile-card list-layout">
          <div className="d-flex align-items-start align-items-xl-center">
            <div className="cadidate-avatar position-relative d-block me-auto ms-auto">
              <a href="#" className="rounded-circle">
                <Image src={candidate_img} alt="" className="lazy-img rounded-circle" />
              </a>
            </div>
            <div className="right-side">
              <div className="row gx-1 align-items-center">
                <div className="col-xl-2 order-xl-0">
                  <div className="position-relative">
                    <h4 className="candidate-name text-white mb-0">James Brower</h4>
                    <div className="candidate-post">UI Designer</div>
                  </div>
                </div>
                <div className="col-xl-3 order-xl-3">
                  <ul className="cadidate-skills style-none d-flex flex-wrap align-items-center">
                    <li>Design</li>
                    <li>UI</li>
                    <li>Digital</li>
                    <li className="more">2+</li>
                  </ul>
                </div>
                <div className="col-xl-2 col-md-4 order-xl-1">
                  <div className="candidate-info">
                    <span>Location</span>
                    <div>New York, US</div>
                  </div>
                </div>
                <div className="col-xl-2 col-md-4 order-xl-2">
                  <div className="candidate-info">
                    <span>Salary</span>
                    <div>$30k-$50k/yr</div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-4 order-xl-4">
                  <div className="d-flex justify-content-md-end">
                    <a href="#" className="save-btn text-center rounded-circle tran3s"><i className="bi bi-heart"></i></a>
                    <a href="#" className="cv-download-btn fw-500 tran3s ms-md-3 sm-mt-20">Download CV</a>
                  </div>
                </div>
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
  );
};

export default CandidateProfileBreadcrumbTwo;