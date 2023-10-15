"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import port_1 from "@/assets/images/candidates/CP_01.jpg";
import port_2 from "@/assets/images/candidates/CP_02.jpg";
import port_3 from "@/assets/images/candidates/CP_03.jpg";
import port_4 from "@/assets/images/candidates/CP_02.jpg";

const CandidateProfileSlider = () => {
  // slider setting
  const slider_setting = {
    dots: true,
    arrows: false,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // portfolio data
  const portfolio_data = [port_1, port_2, port_3, port_4];
  return (
    <Slider {...slider_setting} className="candidate-portfolio-slider">
      {portfolio_data.map((img, i) => (
        <div className="item" key={i}>
          <a href="#" className="w-100 d-blok">
            <Image
              src={img}
              alt=""
              className="w-100"
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        </div>
      ))}
    </Slider>
  );
};

export default CandidateProfileSlider;
