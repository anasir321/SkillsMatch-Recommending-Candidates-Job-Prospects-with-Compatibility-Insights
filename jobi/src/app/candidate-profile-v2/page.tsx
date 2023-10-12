import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CandidateProfileBreadcrumbTwo from "../components/candidate-details/breadcrumb-2";
import CandidateDetailsV2Area from "../components/candidate-details/candidate-details-v2-area";
import FooterOne from "@/layouts/footers/footer-one";

export const metadata: Metadata = {
  title: "Candidate Details v2",
};

const CandidateProfileDetailsV2Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* breadcrumb start */}
        <CandidateProfileBreadcrumbTwo />
        {/* breadcrumb end */}

        {/* candidate details area start */}
        <CandidateDetailsV2Area />
        {/* candidate details area end */}

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

export default CandidateProfileDetailsV2Page;
