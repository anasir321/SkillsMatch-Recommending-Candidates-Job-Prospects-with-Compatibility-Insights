'use client'
import React,{useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import AppliedJobsArea from "@/app/components/dashboard/candidate/applied-jobs";

const CandidateDashboardAppliedJobsPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* saved job area start */}
        <AppliedJobsArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* saved job area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardAppliedJobsPage;