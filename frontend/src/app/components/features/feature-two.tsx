import React from "react";
import Image, { StaticImageData } from "next/image";
// internal
import logo from "@/assets/images/logo/logo_02.png";
import media_1 from "@/assets/images/logo/media_09.png";
import media_2 from "@/assets/images/logo/media_10.png";
import media_3 from "@/assets/images/logo/media_11.png";
import media_4 from "@/assets/images/logo/media_12.png";
import media_5 from "@/assets/images/logo/media_13.png";
import shape from "@/assets/images/shape/shape_10.svg";
import Link from "next/link";

// brand icon
function BrandIcon({ img, id }: { img: StaticImageData; id: string }) {
  return (
    <div
      className={`brand-icon icon_${id} rounded-circle d-flex align-items-center justify-content-center`}
    >
      <Image src={img} alt="" className="lazy-img" />
    </div>
  );
}

const FeatureTwo = () => {
  return (
    <section className="text-feature-two position-relative pt-180 xl-pt-150 lg-pt-100 pb-180 xl-pb-150 lg-pb-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-last">
            <div className="wow fadeInRight">
              <div className="title-one">
                <div className="sub-title">TOP BRAND</div>
                <h2>Collaboration with Top Brands.</h2>
              </div>
              <p className="text-lg mt-40 lg-mt-20 mb-40 lg-mb-30">
                We collaborate with a number of top tier companies on imagining
                the future of work, have a look.
              </p>
              <Link href="/about-us"
                className="btn-nine tran3s d-flex align-items-center"
              >
                <span className="fw-500 me-2">Learn More</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-7 order-lg-first">
            <div className="big-circle rounded-circle position-relative d-flex align-items-center justify-content-center ms-lg-5 wow fadeInLeft">
              <div className="inner-circle rounded-circle d-flex align-items-center justify-content-center">
                <Image src={logo} alt="logo" className="lazy-img" />
              </div>
              {/*  /.inner-circle  */}
              <BrandIcon id="01" img={media_1} />
              <BrandIcon id="02" img={media_2} />
              <BrandIcon id="03" img={media_3} />
              <BrandIcon id="04" img={media_4} />
              <BrandIcon id="05" img={media_5} />

              <Image
                src={shape}
                alt="shape"
                className="lazy-img shapes shape_01"
              />
            </div>
            {/*  /.big-circle  */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTwo;
