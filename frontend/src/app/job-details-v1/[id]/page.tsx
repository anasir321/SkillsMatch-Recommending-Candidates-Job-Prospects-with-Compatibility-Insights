import React from "react";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import JobDetailsV1Area from "@/app/components/job-details/job-details-v1-area";
import JobPortalIntro from "@/app/components/job-portal-intro/job-portal-intro";
import JobDetailsBreadcrumb from "@/app/components/jobs/breadcrumb/job-details-breadcrumb";
import RelatedJobs from "@/app/components/jobs/related-jobs";
import FooterOne from "@/layouts/footers/footer-one";
import job_data from "@/data/job-data";

const JobDetailsDynamicPage = ({ params }: { params: { id: string } }) => {
  const job = job_data.find((j) => Number(j.id) === Number(params.id));
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* job details breadcrumb start */}
        <JobDetailsBreadcrumb />
        {/* job details breadcrumb end */}

        {/* job details area start */}
        {job && <JobDetailsV1Area job={job} />}
        {/* job details area end */}

        {/* related job start */}
        {job && <RelatedJobs category={job.category} />}
        {/* related job end */}

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

export default JobDetailsDynamicPage;
