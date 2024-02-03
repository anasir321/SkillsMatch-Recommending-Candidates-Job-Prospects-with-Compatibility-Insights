'use client'
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import SubmitJobArea from "@/app/components/dashboard/employ/submit-job-area";

const EmployDashboardSubmitJobPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* submit job area start */}
        <SubmitJobArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* submit job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardSubmitJobPage;
