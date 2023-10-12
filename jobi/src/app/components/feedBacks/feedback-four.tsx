"use client";
import React, { use, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import icon from "@/assets/images/icon/icon_30.svg";
import user_1 from "@/assets/images/assets/img_34.jpg";
import user_2 from "@/assets/images/assets/img_35.jpg";

// slider a
const slider_a = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  fade: true,
  autoplaySpeed: 300000,
};
// slider b
const slider_b = {
  dots: true,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 300000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// slider a data
const slider_a_data = [
  {
    desc: "“The best service I've ever received is from Jobi, and highly recommended.”",
    name: "James Stephens",
    location: "Sydney",
  },
  {
    desc: "“The best service I've ever received is from Jobi, and highly recommended.”",
    name: "Angelina Jolie",
    location: "Sydney",
  },
  {
    desc: "“The best service I've ever received is from Jobi, and highly recommended.”",
    name: "James Brower",
    location: "Sydney",
  },
  {
    desc: "“The best service I've ever received is from Jobi, and highly recommended.”",
    name: "Maria Gomez",
    location: "Sydney",
  },
];
// slider b data
const slider_b_data = [user_1, user_2, user_1, user_2];
const FeedbackFour = () => {
  const [slider1, setSlider1] = useState<Slider | null>(null);
  const [slider2, setSlider2] = useState<Slider | null>(null);
  const sliderRef = useRef<Slider | null>(null);

  const sliderPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const sliderNext = () => {
    sliderRef.current?.slickNext();
  };

  // handle slider 
  // const handleSlider = (slider:Slider) => {
  //   setSlider1(slider)
  // }
  return (
    <section className="feedback-section-four position-relative mt-180 xl-mt-150 lg-mt-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 col-lg-6 ms-auto order-lg-last">
            <div className="title-one ps-xxl-5">
              <h2 className="main-font wow fadeInUp" data-wow-delay="0.3s">Our Customer Feedback</h2>
            </div>
          </div>
          <div className="col-xxl-7 col-lg-6 order-lg-first">
            <div className="bg-wrapper position-relative me-xxl-4 md-mt-40 md-mb-40">
              <div className="icon d-flex align-items-center justify-content-center rounded-circle">
                <Image src={icon} alt="icon" className="lazy-img" />
              </div>

              <Slider
                {...slider_a}
                asNavFor={slider2 as Slider}
                ref={(slider) => {
                  setSlider1(slider);
                  sliderRef.current = slider;
                }}
                className="feedback-slider-three-a"
              >
                {slider_a_data.map((item, i) => (
                  <div key={i} className="item">
                    <p>{item.desc}</p>
                    <div className="name text-md text-white">
                      {item.name},{" "}
                      <span className="opacity-50">{item.location}</span>
                    </div>
                  </div>
                ))}
              </Slider>
              <ul className="slider-arrows d-flex justify-content-between justify-content-lg-center style-none">
                <li onClick={sliderPrev} className="prev_d slick-arrow">
                  <i className="bi bi-arrow-left"></i>
                </li>
                <li onClick={sliderNext} className="next_d slick-arrow">
                  <i className="bi bi-arrow-right"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="slider-wrapper">
          <Slider
            {...slider_b}
            asNavFor={slider1 as Slider}
            ref={(slider) => setSlider2(slider)}
            className="feedback-slider-three-b"
          >
            {slider_b_data.map((img, i) => (
              <div key={i} className="item">
                <Image
                  src={img}
                  alt="img"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FeedbackFour;
