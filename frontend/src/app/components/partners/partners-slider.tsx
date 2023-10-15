"use client"
import React from "react";
import Slider from "react-slick";
import Image, { StaticImageData } from "next/image";
import logo_1 from "@/assets/images/logo/media_03.png";
import logo_2 from "@/assets/images/logo/media_04.png";
import logo_3 from "@/assets/images/logo/media_05.png";
import logo_4 from "@/assets/images/logo/media_06.png";
import logo_5 from "@/assets/images/logo/media_07.png";
import logo_6 from "@/assets/images/logo/media_08.png";
import logo_7 from "@/assets/images/logo/media_05.png";

// slider setting
const slider_setting = {
  dots: false,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

// logo data
const logos: StaticImageData[] = [
  logo_1,
  logo_2,
  logo_3,
  logo_4,
  logo_5,
  logo_6,
  logo_7,
];

const PartnersSlider = () => {
  return (
    <>
      <Slider {...slider_setting} className="partner-slider">
        {logos.map((logo, i) => (
          <div key={i} className="item">
            <div className="logo d-flex align-items-center">
              <Image src={logo} alt="logo" style={{height:'auto'}} />
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default PartnersSlider;
