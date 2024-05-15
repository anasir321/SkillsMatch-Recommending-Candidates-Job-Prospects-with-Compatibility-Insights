'use client'
import React,{useState} from 'react';
import Wrapper from '@/layouts/wrapper';
import EmployAside from '@/app/components/dashboard/employ/aside';
import InterviewTable from '@/app/components/dashboard/employ/scheduled-interviews';

const EmployJobInterviewsPage = () => {
const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);
return (
    <Wrapper>

    <div className='main-page-wrapper'>
        {/* aside start */}
        <EmployAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        {/* aside end  */}

        {/* job area start */}
        <InterviewTable isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        {/* job area end */}
    </div>
    </Wrapper>
);
};

export default EmployJobInterviewsPage;