import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import PricingOne from "../components/pricing/pricing-one";


export const metadata: Metadata = {
  title: "Pricing",
};

const PricingPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb title="Pricing" subtitle="Choose your membership" />
        {/*breadcrumb end */}

        {/* pricing one start */}
        <PricingOne/>
        {/* pricing one end */}

        {/* pricing two start */}
        <PricingOne style_2={true}/>
        {/* pricing two end */}

        {/* job portal intro start */}
        <JobPortalIntro />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default PricingPage;
