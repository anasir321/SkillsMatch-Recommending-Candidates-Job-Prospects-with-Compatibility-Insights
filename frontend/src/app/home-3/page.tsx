import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/layouts/wrapper';
import HeaderThree from '@/layouts/headers/header-3';
import NavCategoryMenu from '@/layouts/headers/component/nav-category-menu';
import HeroBannerThree from '../components/hero-banners/hero-banner-three';
import CategorySectionThree from '../components/category/category-section-3';
import CategorySectionFour from '../components/category/category-section-4';
import FeatureFive from '../components/features/feature-five';
import FancyBannerTwo from '../components/fancy-banner/fancy-banner-2';
import FancyBannerThree from '../components/fancy-banner/fancy-banner-3';
import FeedbackThree from '../components/feedBacks/feedback-three';
import FeatureSix from '../components/features/feature-six';
import CategorySectionFive from '../components/category/category-section-5';
import JobPortalIntroTwo from '../components/job-portal-intro/job-portal-intro-2';
import FooterOne from '@/layouts/footers/footer-one';

export const metadata: Metadata = {
  title: "Home three",
};

const HomeThree = () => {
  return (
    <Wrapper>
      <div className='main-page-wrapper'>

        {/* header start */}
        <HeaderThree />
        {/* header end */}

        {/* Nav Category Menu start */}
        <NavCategoryMenu />
        {/* Nav Category Menu end */}

        {/* hero banner three start */}
        <HeroBannerThree />
        {/* hero banner three end */}

        {/* category section three start */}
        <CategorySectionThree />
        {/* category section three end */}

        {/* category section Four start */}
        <CategorySectionFour />
        {/* category section Four end */}

        {/* feature five start */}
        <FeatureFive />
        {/* feature five end */}

        {/* fancy banner 2 start */}
        <FancyBannerTwo />
        {/* fancy banner 2 end */}

        {/* fancy banner 3 start */}
        <FancyBannerThree />
        {/* fancy banner 3 end */}

        {/* feedback three start */}
        <FeedbackThree />
        {/* feedback three end */}

        {/* feature six start */}
        <FeatureSix />
        {/* feature six end */}

        {/* category section Five start */}
        <CategorySectionFive />
        {/* category section Five end */}

        <div className='footer-with-bg'>

          {/* job portal intro start */}
          <JobPortalIntroTwo />
          {/* job portal intro end */}

          {/* footer start */}
          <FooterOne bottom_bg="bg-white" />
          {/* footer end */}
        </div>

      </div>
    </Wrapper>
  );
};

export default HomeThree;