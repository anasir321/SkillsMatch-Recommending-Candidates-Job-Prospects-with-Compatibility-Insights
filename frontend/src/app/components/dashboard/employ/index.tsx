'use client'
import React, { useState } from 'react';
import EmployAside from './aside';
import EmployDashboardArea from './dashboard-area';

const EmployDashboardMain = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      {/* aside end  */}

      {/* dashboard area start */}
      <EmployDashboardArea setIsOpenSidebar={setIsOpenSidebar} />
      {/* dashboard area end */}
    </div>
  );
};

export default EmployDashboardMain;