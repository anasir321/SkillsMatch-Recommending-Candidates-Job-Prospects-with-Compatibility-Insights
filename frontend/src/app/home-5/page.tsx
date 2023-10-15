import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import HeaderFive from "@/layouts/headers/header-5";
import HeroBannerFive from "../components/hero-banners/hero-banner-five";
import CategorySectionSix from "../components/category/category-section-6";
import HowItWorksTwo from "../components/how-it-works/how-it-works-2";
import JobListTwo from "../components/jobs/list/job-list-two";
import FeatureEight from "../components/features/feature-eight";
import ExpertSectionOne from "../components/expert-member/expert-section-1";
import FeedbackFour from "../components/feedBacks/feedback-four";
import PartnersSlider from "../components/partners/partners-slider";
import BlogThree from "../components/blogs/blog-three";
import FancyBannerFive from "../components/fancy-banner/fancy-banner-5";
import FooterTwo from "@/layouts/footers/footer-2";

export const metadata: Metadata = {
  title: "Home five",
};

const HomeFive = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderFive />
        {/* header end */}

        {/* hero banner start */}
        <HeroBannerFive />
        {/* hero banner end */}

        {/* category section start */}
        <CategorySectionSix />
        {/* category section end */}

        {/* how works start */}
        <HowItWorksTwo style_2={true} />
        {/* how works end */}

        {/* job item start */}
        <JobListTwo />
        {/* job item end */}

        {/* text feature start */}
        <FeatureEight />
        {/* text feature end */}

        {/* expert section start */}
        <ExpertSectionOne />
        {/* expert section end */}

        {/* feedback section start */}
        <FeedbackFour />
        {/* feedback section end */}

        {/* partner slider start */}
        <div className="container">
          <div className="partner-logos pt-120 lg-pt-80 pb-80 lg-pb-40">
            <div className="title fw-500 text-dark text-uppercase text-center mb-65 lg-mb-30"> Trusted by <span>500+</span> companies</div>
            <PartnersSlider />
          </div>
        </div>
        {/* perter slider end */}

        {/* blog start */}
        <BlogThree/>
        {/* blog end */}

        {/* fancy banner start */}
        <FancyBannerFive/>
        {/* fancy banner end */}

        {/* footer start */}
        <FooterTwo />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default HomeFive;
