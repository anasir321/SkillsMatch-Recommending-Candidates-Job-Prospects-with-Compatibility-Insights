import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CompanyBreadcrumb from "../components/common/common-breadcrumb";
import FooterOne from "@/layouts/footers/footer-one";
import CompanyDetailsArea from "../components/company-details/company-details-area";
import OpenPosition from "../components/company-details/open-position";

export const metadata: Metadata = {
  title: "Company Details",
};

const CompanyDetailsPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*breadcrumb start */}
        <CompanyBreadcrumb
          title="Company Details"
          subtitle="Find company details here"
        />
        {/*breadcrumb end */}

        {/* company details area start */}
        <CompanyDetailsArea />
        {/* company details area end */}

        {/*job Open Position */}
        <OpenPosition/>
        {/*job Open Position */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default CompanyDetailsPage;
