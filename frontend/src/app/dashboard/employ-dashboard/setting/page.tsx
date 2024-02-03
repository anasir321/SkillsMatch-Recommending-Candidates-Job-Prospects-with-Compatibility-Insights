'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import DashboardSettingArea from '@/app/components/dashboard/candidate/dashboard-setting';

const EmployDashboardSettingPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>

    <div className='main-page-wrapper'>
      {/* aside start */}
      <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar}/>
      {/* dashboard area end */}
    </div>
    </Wrapper>
  );
};

export default EmployDashboardSettingPage;