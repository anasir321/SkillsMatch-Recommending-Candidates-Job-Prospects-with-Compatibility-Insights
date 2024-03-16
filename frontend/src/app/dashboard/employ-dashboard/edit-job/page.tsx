'use client'
import React, { useState } from "react";
import Wrapper from "@/layouts/wrapper";
import EmployAside from "@/app/components/dashboard/employ/aside";
import SubmitJobArea from "@/app/components/dashboard/employ/submit-job-area";
import EditJobArea from "@/app/components/dashboard/employ/edit-job-area";

const EmployDashboardEditJobPage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* submit job area start */}
        <EditJobArea setIsOpenSidebar={setIsOpenSidebar} />
        {/* submit job area end */}
      </div>
    </Wrapper>
  );
};

export default EmployDashboardEditJobPage;
