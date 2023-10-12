"use client"
import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { StaticImageData } from "next/image";
import shape from "@/assets/images/shape/shape_04.svg";
import user_1 from "@/assets/images/assets/img_05.jpg";
import user_2 from "@/assets/images/assets/img_06.jpg";
import user_3 from "@/assets/images/assets/img_07.jpg";
import user_4 from "@/assets/images/assets/img_08.jpg";
import user_5 from "@/assets/images/assets/team_06.jpg";

// expert_data
const expert_data: {
  id: number;
  user: StaticImageData;
  name: string;
  title: string;
}[] = [
  {
    id: 1,
    user: user_1,
    name: "Julie Ake",
    title: "Product Designer",
  },
  {
    id: 2,
    user: user_2,
    name: "Juan Marko",
    title: "Java Developer",
  },
  {
    id: 3,
    user: user_3,
    name: "Elizabeth Foster",
    title: "UI/UX Designer",
  },
  {
    id: 4,
    user: user_4,
    name: "John Doe",
    title: "Marketing Expert",
  },
  {
    id: 5,
    user: user_5,
    name: "Elizabeth Foster",
    title: "UI/UX Designer",
  },
];

// slick slider setting
const slider_setting = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  centerMode:false,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const ExpertsOne = () => {
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };
  return (
    <section className="expert-section-one position-relative mt-180 xl-mt-150 lg-mt-100">
      <div className="container position-relative">
        <div className="row">
          <div className="col-md-7">
            <div className="title-one text-center text-md-start mb-65 md-mb-50 wow fadeInUp" data-wow-delay="0.3s">
              <h2>
                Find the best{" "}
                <span className="position-relative">
                  talented{" "}
                  <Image
                    src={shape}
                    alt="shape"
                    className="lazy-img shapes shapes"
                  />
                </span>{" "}
                expert in jobi.
              </h2>
            </div>
          </div>
        </div>

        <Slider
          {...slider_setting}
          className="expert-slider-one"
          ref={sliderRef}
        >
          {expert_data.map((item) => (
            <div key={item.id} className="item">
              <div className="card-style-three text-center">
                <div className="img-meta mb-40 lg-mb-20">
                  <Image src={item.user} alt="user-img" className="m-auto" style={{height:'auto'}} />
                </div>
                <a href="#" className="name text-md fw-500 text-dark">
                  {item.name}
                </a>
                <div className="post">{item.title}</div>
              </div>
            </div>
          ))}
        </Slider>

        <ul className="slider-arrows slick-arrow-one d-flex justify-content-center style-none sm-mt-30">
          <li className="prev_a slick-arrow" onClick={sliderPrev}>
            <i className="bi bi-arrow-left"></i>
          </li>
          <li className="next_a slick-arrow" onClick={sliderNext}>
            <i className="bi bi-arrow-right"></i>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ExpertsOne;
