import React from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "./dashboard-header";
import ShortSelect from "../../common/short-select";
import job_data from "@/data/job-data";
import ActionDropdown from "./action-dropdown";

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const AppliedJobsArea = ({setIsOpenSidebar}:IProps) => {

}

export default AppliedJobsArea;