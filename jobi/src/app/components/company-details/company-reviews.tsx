import React from "react";
import Slider from "react-slick";
import Image, { StaticImageData } from "next/image";
import user_1 from '@/assets/images/assets/img_14.jpg';
import user_2 from '@/assets/images/assets/img_15.jpg';
import user_3 from '@/assets/images/assets/img_22.jpg';

// slider setting
const slider_setting = {
  dots: true,
  arrows: false,
  centerPadding: "0px",
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// review data 
const review_data: {
  id: number;
  rating: number;
  desc: string;
  user: StaticImageData;
  name: string;
  location: string;
}[] = [
  {
    id:1,
    rating:4.7,
    desc:'It is a well created theme without much overhead. The created was very responsive and helpful.',
    user:user_1,
    name:'James Stephens',
    location:'China'
  },
  {
    id:2,
    rating:4.5,
    desc:'Very impressed with the jobi template. The designs/layouts are modern and professional with quaintly..',
    user:user_2,
    name:'John Doe',
    location:'Italy'
  },
  {
    id:3,
    rating:4.8,
    desc:'Very impressed with the jobi template. The designs/layouts are modern and professional with quaintly..',
    user:user_3,
    name:'Martin Jonas',
    location:'USA'
  },
]

const CompanyReviews = () => {
  return (
    <Slider {...slider_setting} className="company-review-slider">
      {review_data.map((item) => (
      <div key={item.id} className="item">
        <div className="feedback-block-four">
          <div className="d-flex align-items-center">
            <ul className="style-none d-flex rating">
              <li>
                <a href="#" tabIndex={0}>
                  <i className="bi bi-star-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" tabIndex={0}>
                  <i className="bi bi-star-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" tabIndex={0}>
                  <i className="bi bi-star-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" tabIndex={0}>
                  <i className="bi bi-star-fill"></i>
                </a>
              </li>
              <li>
                <a href="#" tabIndex={0}>
                  <i className="bi bi-star-fill"></i>
                </a>
              </li>
            </ul>
            <div className="review-score">
              <span className="fw-500 text-dark">{item.rating}</span> out of 5
            </div>
          </div>
          <blockquote>
            {item.desc}
          </blockquote>
          <div className="d-flex align-items-center">
            <Image
              src={item.user}
              alt="user"
              className="author-img rounded-circle"
            />
            <div className="ms-3">
              <div className="name fw-500 text-dark">{item.name}</div>
              <span className="opacity-50">{item.location}</span>
            </div>
          </div>
        </div>
      </div>
      ))}
    </Slider>
  );
};

export default CompanyReviews;
