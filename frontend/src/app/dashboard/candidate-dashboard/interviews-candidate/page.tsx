'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
import CandidateInterviewArea from '@/app/components/dashboard/candidate/candidate-interviews';

const CandidateInterviewPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* job area start */}
      <CandidateInterviewArea isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* job area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateInterviewPage;