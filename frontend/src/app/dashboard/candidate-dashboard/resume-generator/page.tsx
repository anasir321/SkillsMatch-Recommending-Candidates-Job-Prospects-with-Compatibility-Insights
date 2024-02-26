'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
import ResumeGeneratorArea from '@/app/components/dashboard/candidate/resume-generator';

const CandidateDashboardResumeGeneratorPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* Resume area start */}
      <ResumeGeneratorArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* Resume area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateDashboardResumeGeneratorPage;