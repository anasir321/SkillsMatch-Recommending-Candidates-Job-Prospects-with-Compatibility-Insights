'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import CandidateAside from '@/app/components/dashboard/candidate/aside';
import DashboardMessage from '@/app/components/dashboard/candidate/dashboard-message';

const CandidateDashboardMessagesPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* messages area start */}
      <DashboardMessage setIsOpenSidebar={setIsOpenSidebar}/>
      {/* messages area end */}
    </div>
    </Wrapper>
  );
};

export default CandidateDashboardMessagesPage;