'use client'
import React,{useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import DashboardSettingArea from "@/app/components/dashboard/candidate/dashboard-setting";

const CandidateDashboardSettingPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* setting area start */}
        <DashboardSettingArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* setting area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardSettingPage;
