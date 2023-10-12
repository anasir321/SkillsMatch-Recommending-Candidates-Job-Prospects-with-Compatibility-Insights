import React from "react";
import Image from "next/image";
import shape_1 from "@/assets/images/shape/shape_07.svg";
import shape_2 from "@/assets/images/shape/shape_07.svg";
import shape_3 from "@/assets/images/shape/shape_07.svg";
import { how_works_data } from "@/data/how-works-data";



const HowItWorks = () => {
  return (
    <section className="how-it-works position-relative bg-color pt-110 lg-pt-80 pb-110 lg-pb-70">
      <div className="container">
        <div className="title-one text-center mb-65 lg-mb-40 wow fadeInUp" data-wow-delay="0.3s">
          <h2 className="text-white">
            How it’s{" "}
            <span className="position-relative">
              work?{" "}
              <Image
                src={shape_1}
                alt="shape"
                className="lazy-img shapes shape"
              />
            </span>
          </h2>
        </div>

        <div className="row justify-content-center">
          {how_works_data.map((item) => (
            <div
              key={item.id}
              className={`col-xxl-3 col-lg-4 col-md-6 ${item.id === 2 ? "m-auto" : ""}`}
            >
              <div className="card-style-two text-center mt-25 wow fadeInUp">
                <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                  <Image src={item.icon} alt="icon" className="lazy-img" />
                </div>
                <div className="title fw-500 text-white">{item.title}</div>
                <p>{item.sub_title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
      <Image src={shape_3} alt="shape" className="lazy-img shapes shape_02" />
    </section>
  );
};

export default HowItWorks;
