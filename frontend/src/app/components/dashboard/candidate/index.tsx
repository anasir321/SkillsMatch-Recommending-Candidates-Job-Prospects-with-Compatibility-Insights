'use client'
import React, { useState } from 'react';
import CandidateAside from './aside';
import DashboardArea from './dashboard-area';

const CandidateDashboardMain = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardArea setIsOpenSidebar={setIsOpenSidebar} />
      {/* dashboard area end */}
    </div>
  );
};

export default CandidateDashboardMain;