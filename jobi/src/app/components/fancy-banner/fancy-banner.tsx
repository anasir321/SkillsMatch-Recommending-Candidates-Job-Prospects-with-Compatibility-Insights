import React from 'react';
import Image from 'next/image';
// internal
import icon from '@/assets/images/icon/icon_11.svg';
import shape_1 from '@/assets/images/shape/shape_12.svg';
import shape_2 from '@/assets/images/shape/shape_13.svg';
import shape_3 from '@/assets/images/shape/shape_14.svg';
import banner_img from '@/assets/images/assets/img_09.png';

const FancyBanner = () => {
  return (
    <section className="fancy-banner-one mt-150 xl-mt-120 lg-mt-100">
      <div className="container">
        <div className="bg-wrapper position-relative ps-4 pe-4 pt-55 wow fadeInUp">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-xl-5 col-lg-6 order-lg-last">
                  <div className="text-wrapper">
                    <div className="title-two">
                      <h2 className="text-white">Get your <br /> <span>Matched Jobs</span> in a few minutes.</h2>
                    </div>
                    <p className="text-md mt-25 lg-mt-20 mb-45 lg-mb-30">Find your dream job & earn from world leading brands. Upload your CV now.</p>
                    <form action="#" className="upload-btn position-relative d-flex align-items-center justify-content-center">
                      <Image src={icon} alt="icon" className="lazy-img" /> <span className="fw-500 ms-2 text-dark">Upload your CV</span>
                      <input type="file" id="uploadCV" name="uploadCV" />
                    </form>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6 order-lg-first">
                  <div className="img-meta md-mt-20 position-relative">
                    <Image src={banner_img} alt="banner_img" className="lazy-img m-auto" />
                    <Image src={shape_1} alt="shape" className="lazy-img shapes shape_01" />
                    <Image src={shape_2} alt="shape" className="lazy-img shapes shape_02" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image src={shape_3} alt="shape" className="lazy-img shapes shape_03" />
        </div>
      </div>
    </section>
  );
};

export default FancyBanner;