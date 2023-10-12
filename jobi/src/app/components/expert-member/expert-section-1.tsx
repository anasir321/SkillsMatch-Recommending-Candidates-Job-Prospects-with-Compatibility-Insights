"use client"
import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';
import expert_data from '@/data/expert-data';
import Link from 'next/link';

// slider setting
const slider_setting = {
  dots: true,
  arrows: false,
  centerPadding: '0px',
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: false,
  autoplaySpeed: 3000,
  responsive: [
  {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
}
const ExpertSectionOne = () => {
  return (
    <>
    <section className="expert-section-one position-relative mt-180 xl-mt-150 md-mt-100">
			<div className="container position-relative">
				<div className="row justify-content-between align-items-center">
					<div className="col-lg-6">
						<div className="title-one">
							<h2 className="main-font wow fadeInUp" data-wow-delay="0.3s">Top Experts</h2>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="d-flex justify-content-lg-end">
							<Link href="/candidates-v2" className="btn-six d-none d-lg-inline-block">Explore all</Link>
						</div>
					</div>
				</div>

				<Slider {...slider_setting} className="expert-slider-two pt-70 lg-pt-40">
          {expert_data.map(item => (
					<div key={item.id} className="item">
						<div className="card-style-eight">
							<div className="img-meta mb-20">
								<Image src={item.img} alt="team img" className="m-auto"/>
							</div>
							<Link href="/candidate-profile-v2" className="name fw-500 tran3s">{item.name}</Link>
							<div className="post">{item.designation}</div>
						</div>
					</div>
          ))}
				</Slider>
				<div className="text-center mt-40 d-lg-none">
					<Link href="/candidates-v2" className="btn-six">Explore all</Link>
				</div>
			</div>
		</section>  
    </>
  );
};

export default ExpertSectionOne;