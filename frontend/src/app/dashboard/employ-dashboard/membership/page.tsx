'use client'
import React,{useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import EmployMembershipArea from "@/app/components/dashboard/employ/membership-area";

const EmployDashboardMembershipPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* membership area start */}
       <EmployMembershipArea setIsOpenSidebar={setIsOpenSidebar}/>
        {/* membership area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardMembershipPage;
