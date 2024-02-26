import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
// internal
import shape from "@/assets/images/shape/bg_shape_02.png";
import logo from "@/assets/images/logo/logo_05.png";
import media_1 from "@/assets/images/logo/media_17.png";
import media_2 from "@/assets/images/logo/media_18.png";
import media_3 from "@/assets/images/logo/media_19.png";
import media_4 from "@/assets/images/logo/media_20.png";
import media_5 from "@/assets/images/logo/media_21.png";

// brand icon
function MediaImg({ img, num }: { img: StaticImageData; num: string }) {
  return (
    <div
      className={`brand-icon icon_${num} rounded-circle d-flex align-items-center justify-content-center`}
    >
      <Image src={img} alt="media" className="lazy-img" />
    </div>
  );
}

const FeatureSix = () => {
  return (
    <section className="text-feature-four position-relative mt-180 xl-mt-150 lg-mt-100">
      <div className="container">
        <div className="bg-wrapper">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="wow fadeInLeft">
                <div className="title-one">
                  <h2 className="text-white">
                    Collaboration with leading Brands.
                  </h2>
                </div>
                <p className="text-white mt-20 mb-45 lg-mb-30">
                  We collaborate with a number of top tier companies on
                  imagining the future of work, have a look.
                </p>
                <Link href="/company-v1" className="btn-five">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-end md-mt-40">
              <div className="big-circle d-inline-block position-relative wow fadeInRight">
                <Image src={shape} alt="shape" className="lazy-img" />
                <div className="logo rounded-circle d-flex align-items-center justify-content-center">
                  <Image src={logo} alt="logo" className="lazy-img" style={{height:'auto'}} />
                </div>
                <MediaImg img={media_1} num="01" />
                <MediaImg img={media_2} num="02" />
                <MediaImg img={media_3} num="03" />
                <MediaImg img={media_4} num="04" />
                <MediaImg img={media_5} num="05" />
                <div className="brand text-white text-start text-md">
                  <span>100+</span>Leading Brands
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSix;
