'use client'
import React from 'react';
import Image from 'next/image';
import screen_1 from '@/assets/images/assets/screen_17.png';
import screen_2 from '@/assets/images/assets/screen_18.png';
import JobCategorySelect from '../select/job-category';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';

const HeroBannerSeven = () => {
  const { handleSubmit, setCategoryVal,setSearchText } = useSearchFormSubmit();
  // handleSearchInput
  const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <div className="hero-banner-seven position-relative pt-200 lg-pt-150 pb-110 md-pb-40">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-7 col-lg-8 m-auto text-center">
              <h1 className="wow fadeInUp" data-wow-delay="0.3s">Find & Hire Experts for any Job</h1>
              <p className="text-md mt-25 mb-40 wow fadeInUp" data-wow-delay="0.4s">Jobs & Job search. Find jobs in global. Executive jobs & work.</p>
            </div>
          </div>
          <div className="position-relative">
            <div className="row">
              <div className="col-xxl-7 col-lg-8 col-md-11 m-auto">
                <div className="job-search-one style-two border-style position-relative wow fadeInUp" data-wow-delay="0.5s">
                  <form onSubmit={handleSubmit}>
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <div className="input-box">
                          <div className="label">Job Categories</div>
                          <JobCategorySelect setCategoryVal={setCategoryVal} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-box border-left">
                          <div className="label">Keywords or Title</div>
                          <input onChange={handleSearchInput} type="text" placeholder="Design, branding" className="keyword" />
                        </div>
                      </div>
                      <div className="col-md-3 sm-mb-10 sm-mt-10">
                        <button className="text-uppercase btn-five border6 tran3s m-auto">Search</button>
                      </div>
                    </div>
                  </form>
                  <ul className="filter-tags d-flex justify-content-center style-none mt-25 lg-mt-20">
                    <li className="fw-500 text-dark me-2">Populer:</li>
                    <li><a href="#">Design</a></li>
                    <li><a href="#">Art</a></li>
                    <li><a href="#">Business</a></li>
                    <li><a href="#">Video Editing</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image src={screen_1} alt="screen-img" className="lazy-img shapes screen01" />
      <Image src={screen_2} alt="screen-img" className="lazy-img shapes screen02" />
    </div>
  );
};

export default HeroBannerSeven;