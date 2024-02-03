import React from "react";
import { how_works_data } from "@/data/how-works-data";

const HowItWorksTwo = ({style_2}:{style_2?:boolean}) => {
  return (
    <section className={`how-it-works-two position-relative ${style_2?'pt-160 xl-pt-130 lg-pt-100':'pt-130 xl-pt-110'}`}>
      <div className="container">
        <div className="title-one d-flex align-items-center justify-content-between text-center mb-45 lg-mb-20">
          <span className="line"></span>
          <h2 className="fw-600 ps-3 pe-3 wow fadeInUp" data-wow-delay="0.3s">How it’s Work?</h2>
          <span className="line"></span>
        </div>

        <div className="border-bottom border-md0">
          <div className="row justify-content-center">
            {how_works_data.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="card-style-five text-center position-relative mt-25 pb-35 lg-pb-20 wow fadeInUp">
                  <div className="numb fw-500 d-flex align-items-center justify-content-center m-auto">
                    <span>0{item.id}</span>
                  </div>
                  <div className="title fw-500 text-lg text-dark mt-25 mb-10">
                    {item.title}
                  </div>
                  <p>{item.sub_title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksTwo;
