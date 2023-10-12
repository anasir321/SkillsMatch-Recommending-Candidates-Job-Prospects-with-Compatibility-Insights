import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import port_1 from "@/assets/dashboard/images/portfolio_img_01.jpg";
import port_2 from "@/assets/dashboard/images/portfolio_img_02.jpg";
import port_3 from "@/assets/dashboard/images/portfolio_img_03.jpg";
import port_4 from "@/assets/dashboard/images/portfolio_img_04.jpg";

// portfolio item
function PortfolioItem({ img }: { img: StaticImageData }) {
  return (
    <div className="col-lg-3 col-6">
      <div className="candidate-portfolio-block position-relative mb-25">
        <a href="#" className="d-block">
          <Image src={img} alt="image" className="lazy-img w-100" style={{width:'100%',height:'auto'}} />
        </a>
        <a
          href="#"
          className="remove-portfolio-item rounded-circle d-flex align-items-center justify-content-center tran3s"
        >
          <i className="bi bi-x"></i>
        </a>
      </div>
    </div>
  );
}

const DashboardPortfolio = () => {
  return (
    <div className="bg-white card-box border-20 mt-40">
      <h4 className="dash-title-three">Portfolio</h4>
      <div className="row">
        <PortfolioItem img={port_1} />
        <PortfolioItem img={port_2} />
        <PortfolioItem img={port_3} />
        <PortfolioItem img={port_4} />
      </div>
      <a href="#" className="dash-btn-one">
        <i className="bi bi-plus"></i> Add more
      </a>
    </div>
  );
};

export default DashboardPortfolio;
