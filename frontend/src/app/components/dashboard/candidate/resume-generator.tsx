import React from "react";

// props type 
type IProps = {
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const ResumeGeneratorArea = ({setIsOpenSidebar}:IProps) => {
    return (
        // say hello world
        <div className="dashboard-body">
            <div>
                <h1>Resume Generator Area</h1>
            </div>
        </div>
    )
}

export default ResumeGeneratorArea;
