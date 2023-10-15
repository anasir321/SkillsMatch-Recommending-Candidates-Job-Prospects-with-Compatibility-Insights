"use client"
import React from 'react';
import Image from 'next/image';
// internal
import shape_1 from '@/assets/images/shape/shape_15.svg';
import shape_2 from '@/assets/images/shape/shape_16.svg';
import shape_3 from '@/assets/images/shape/shape_17.svg';
import shape_4 from '@/assets/images/shape/shape_18.svg';
import shape_5 from '@/assets/images/shape/shape_19.svg';
import shape_6 from '@/assets/images/shape/shape_20.svg';
import screen_1 from '@/assets/images/assets/screen_04.png';
import screen_2 from '@/assets/images/assets/screen_05.png';
import screen_3 from '@/assets/images/assets/screen_06.png';
import main_img from '@/assets/images/assets/img_10.png';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';

const HeroBannerTwo = () => {
  const {handleSubmit,setSearchText} = useSearchFormSubmit();
  // handleSearchInput
  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <div className="hero-banner-two position-relative">
      <div className="container">
        <div className="position-relative pt-225 xl-pt-200 lg-pt-150 pb-80 lg-pb-60">
          <div className="row">
            <div className="col-lg-6 col-md-8">
              <h1 className="wow fadeInUp" data-wow-delay="0.3s">Find & Hire <br /> Top 3% of expert on jobi.</h1>
              <p className="text-md mt-35 mb-50 lg-mb-30 pe-xxl-5 wow fadeInUp" data-wow-delay="0.4s">With the largest professional creative community online, simply search through from our website</p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-lg-6 col-md-8">
                <div className="job-search-two position-relative me-xxl-5 wow fadeInUp" data-wow-delay="0.5s">
                  <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-between">
                    <input onChange={handleSearchInput} type="text" placeholder="Search job, title etc...." />
                    <button type='submit' className="btn-five h-100">Search</button>
                  </form>
                  <ul className="filter-tags d-flex flex-wrap style-none mt-25">
                    <li className="fw-500 text-dark me-2">Populer:</li>
                    <li><a href="#">Design</a></li>
                    <li><a href="#">Art</a></li>
                    <li><a href="#">Business</a></li>
                    <li><a href="#">Video Editing</a></li>
                  </ul>
                </div>
                {/* /.job-search-two */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="img-box">
        <Image src={main_img} alt="main-img" className="lazy-img main-img" style={{height:'auto'}} />
        <Image src={screen_1} alt="screen" className="lazy-img shapes screen_01" />
        <Image src={screen_2} alt="screen" className="lazy-img shapes screen_02 wow fadeInLeft" />
      </div>
      {/* /.img-box */}
      <div className="rating-box position-relative">
        <div className="d-sm-flex justify-content-end">
          <div className="me-sm-5 pe-xxl-4">
            <div className="d-flex align-items-center">
              <Image src={screen_3} alt="screen" className="lazy-img me-2 me-lg-4" />
              <div>
                <div className="text-lg fw-500 text-dark">18k+</div>
                <span>Individual Freelancer</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-lg fw-500 text-dark mb-10">A+ Rating</div>
            <ul className="d-flex align-items-center style-none rating">
              <li><i className="bi bi-star-fill"></i></li>
              <li><i className="bi bi-star-fill"></i></li>
              <li><i className="bi bi-star-fill"></i></li>
              <li><i className="bi bi-star-fill"></i></li>
              <li><i className="bi bi-star-fill"></i></li>
              <li>4.78 (300k+) </li>
            </ul>
          </div>
        </div>
      </div>
      <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_03" />
      <Image src={shape_4} alt="shape" className="lazy-img shapes shape_04" />
      <Image src={shape_5} alt="shape" className="lazy-img shapes shape_05" />
      <Image src={shape_6} alt="shape" className="lazy-img shapes shape_06" />
    </div>
  );
};

export default HeroBannerTwo;