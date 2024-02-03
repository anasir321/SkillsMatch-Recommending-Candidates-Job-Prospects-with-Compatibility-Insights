"use client"
import React from "react";
import Image from "next/image";
import shape from "@/assets/images/shape/shape_29.svg";
import screen from "@/assets/images/assets/screen_15.png";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";

const HeroBannerFive = () => {
  const { handleSubmit,setSearchText } = useSearchFormSubmit();
  // handleSearchInput
  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <div className="hero-banner-five position-relative pt-200 lg-pt-150">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-lg-6 col-md-8">
              <h1 className="wow fadeInUp" data-wow-delay="0.3s">
                Find your <br /> Job without any hassle.
              </h1>
              <p className="text-md mt-40 lg-mt-20 mb-65 lg-mb-30 pe-xxl-5 wow fadeInUp" data-wow-delay="0.4s">
                With the largest professional creative community online, simply
                search through from our website
              </p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="job-search-two position-relative me-xxl-5 wow fadeInUp" data-wow-delay="0.5s">
                  <form onSubmit={handleSubmit}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <input
                      onChange={handleSearchInput}
                      type="text"
                      placeholder="Search job, title etc...."
                      className="bg-grey"
                    />
                    <button className="btn-five h-100">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="d-sm-flex align-items-center mt-85 lg-mt-50 wow fadeInUp" data-wow-delay="0.6s">
            <Image src={screen} alt="screen img" className="lazy-img" />
            <div className="ps-3">
              <div className="fw-500 text-dark text-md">18k+</div>
              <div>Individual Freelancer</div>
            </div>
          </div>
        </div>
      </div>
      <div className="img-meta">
        <Image
          src={shape}
          alt="shape img"
          className="lazy-img shapes shape_01"
        />
      </div>
      <a href="#" className="chat-btn tran3s">
        <i className="bi bi-chat-dots"></i>
      </a>
    </div>
  );
};

export default HeroBannerFive;
