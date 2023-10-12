"use client"
import React from 'react';
import Image from 'next/image';
import screen_1 from '@/assets/images/assets/screen_10.png';
import screen_2 from '@/assets/images/assets/screen_11.png';
import screen_3 from '@/assets/images/assets/screen_12.png';
import screen_4 from '@/assets/images/assets/screen_13.png';
import JobLocationSelect from '../select/job-location';
import JobCategorySelect from '../select/job-category';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';


const HeroBannerFour = () => {
  const { handleSubmit, setLocationVal, setCategoryVal,setSearchText } = useSearchFormSubmit();
   // handleSearchInput
   const handleSearchInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <>
      <div className="hero-banner-four position-relative pt-170 lg-pt-150 pb-300 lg-pb-150 md-pb-100">
        <div className="container">
          <div className="position-relative pb-70 sm-pb-20">
            <div className="row">
              <div className="col-xxl-7 col-lg-8 m-auto text-center">
                <h1 className="wow fadeInUp" data-wow-delay="0.3s">Find your job without any hassle.</h1>
                <p className="text-md mt-25 mb-45 md-mb-30 wow fadeInUp" data-wow-delay="0.4s">Jobs & Job search. Find jobs in global. Executive jobs & work.</p>
              </div>
            </div>
            <div className="position-relative">
              <div className="row">
                <div className="col-xxl-8 col-xl-9 col-lg-10 m-auto">
                  <div className="job-search-one style-two position-relative wow fadeInUp" data-wow-delay="0.5s">
                    <form onSubmit={handleSubmit}>
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <div className="input-box">
                            <div className="label">Job Categories</div>
                            <JobCategorySelect setCategoryVal={setCategoryVal} />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-box">
                            <div className="label">Location</div>
                            <JobLocationSelect setLocationVal={setLocationVal} />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="input-box border-left">
                            <div className="label">Keywords or Title</div>
                            <input onChange={handleSearchInput} type="text" placeholder="Design, branding" className="keyword" />
                          </div>
                        </div>
                        <div className="col-md-3 sm-mb-10 sm-mt-10">
                          <button type='submit' className="text-uppercase btn-five border6 tran3s m-auto">Search</button>
                        </div>
                      </div>
                    </form>
                    <div className="upload-btn position-relative d-flex align-items-center justify-content-between">
                      <span className="fw-500 text-dark me-1">Upload your CV</span> <i
                        className="bi bi-file-earmark-arrow-up"></i>
                      <input type="file" id="uploadCV" name="uploadCV"
                        accept=".doc,.docx,.pdf,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image src={screen_1} alt="screen" className="lazy-img shapes shape_01" />
        <Image src={screen_2} alt="screen" className="lazy-img shapes shape_02" />
        <Image src={screen_3} alt="screen" className="lazy-img shapes shape_03" />
        <Image src={screen_4} alt="screen" className="lazy-img shapes shape_04" />
      </div>
    </>
  );
};

export default HeroBannerFour;