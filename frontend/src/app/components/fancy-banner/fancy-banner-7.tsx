import React from "react";
import Image from "next/image";
import icon from "@/assets/images/icon/icon_46.svg";
import img from "@/assets/images/assets/img_41.png";
import shape_1 from "@/assets/images/shape/shape_12.svg";
import shape_2 from "@/assets/images/shape/shape_13.svg";
import shape_3 from "@/assets/images/shape/shape_14.svg";

const FancyBannerSeven = () => {
  return (
    <section className="fancy-banner-six mt-150 xl-mt-120 lg-mt-100">
      <div className="container">
        <div className="bg-wrapper position-relative ps-4 pe-4 pt-70 lg-pt-50 wow fadeInUp">
          <div className="row">
            <div className="col-xxl-11 m-auto">
              <div className="row">
                <div className="col-lg-6 order-lg-last">
                  <div className="text-wrapper ps-xl-5">
                    <div className="title-two">
                      <h2 className="main-font">
                        Get your Matched Jobs in a few minutes.
                      </h2>
                    </div>
                    <p className="text-md text-dark opacity-70 mt-25 lg-mt-20 mb-45 lg-mb-30">
                      Find your dream job & earn from world leading brands.
                      Upload your CV now.
                    </p>
                    <form
                      action="#"
                      className="upload-btn position-relative d-flex align-items-center justify-content-center"
                    >
                      <Image src={icon} alt="" className="lazy-img" />{" "}
                      <span className="fw-500 ms-2 text-white">
                        Upload your CV
                      </span>
                      <input type="file" id="uploadCV" name="uploadCV" />
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 order-lg-first">
                  <div className="img-meta position-relative md-mt-20">
                    <Image
                      src={img}
                      alt="img"
                      className="lazy-img m-auto"
                      style={{ height: "auto" }}
                    />
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
              </div>
            </div>
          </div>
          <Image
            src={shape_3}
            alt="shape"
            className="lazy-img shapes shape_03"
          />
        </div>
      </div>
    </section>
  );
};

export default FancyBannerSeven;
