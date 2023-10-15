'use client'
import React,{useState} from 'react';
import Wrapper from "@/layouts/wrapper";
import CandidateAside from "@/app/components/dashboard/candidate/aside";
import ChangePasswordArea from "@/app/components/dashboard/candidate/change-password";

const CandidateDashboardPasswordChangePage = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* aside start */}
        <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
        {/* aside end  */}

        {/* password change area start */}
        <ChangePasswordArea />
        {/* password change area end */}
      </div>
    </Wrapper>
  );
};

export default CandidateDashboardPasswordChangePage;
