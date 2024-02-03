import React from 'react';
import { Metadata } from 'next';
import Header from '@/layouts/headers/header';
import Wrapper from '@/layouts/wrapper';
import JobBreadcrumb from '../components/jobs/breadcrumb/job-breadcrumb';
import CandidateV3Area from '../components/candidate/candidate-v3-area';
import JobPortalIntro from '../components/job-portal-intro/job-portal-intro';
import FooterOne from '@/layouts/footers/footer-one';

export const metadata: Metadata = {
  title: "Candidate v3",
};


const CandidateV3Page = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <JobBreadcrumb title='Candidates' subtitle='Find you desire talents & make your work done' />
        {/* search breadcrumb end */}

        {/* candidate area start */}
        <CandidateV3Area />
        {/* candidate area end */}

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

export default CandidateV3Page;