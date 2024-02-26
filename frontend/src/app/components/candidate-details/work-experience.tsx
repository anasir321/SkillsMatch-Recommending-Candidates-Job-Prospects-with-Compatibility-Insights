// import React from "react";

// interface WorkExperienceProps {
//   userDetails: any;
// }

// const WorkExperience = ({userDetails}) => {

//   const workExperiences = userDetails.workExperience;

//   return (
//     <div className="time-line-data position-relative pt-15">
//       {workExperiences.map((workExperience: any, index: number) => ()}
//       <div className="info position-relative">
//         <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
//           1
//         </div>
//         <div className="text_1 fw-500">02/03/18 - 13/05/20</div>
//         <h4>Product Designer (Google)</h4>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
//           tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
//         </p>
//       </div>
//       <div className="info position-relative">
//         <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
//           2
//         </div>
//         <div className="text_1 fw-500">02/07/20 - 13/09/22</div>
//         <h4>UI/UX Engineer (Adobe)</h4>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum
//           tellus. Interdum primis
//         </p>
//       </div>
//     </div>
//   );
// };

// export default WorkExperience;

import React from "react";

interface WorkExperienceProps {
    workExperienceProp: {
      work_experience_id: number;
      company_name: string;
      position: string;
      duration: string;
      createdAt: string;
      updatedAt: string;
      candidate_id: number;
    }[];
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ workExperienceProp }) => {
  const workExperiences = workExperienceProp;

  return (
    <div className="time-line-data position-relative pt-15">
      {workExperiences.map((workExperience: any, index: number) => (
        <div key={index} className="info position-relative">
          <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">
            {index + 1}
          </div>
          <div className="text_1 fw-500">{workExperience.duration}</div>
          <h4>{workExperience.company_name}</h4>
          <p>
            {workExperience.position}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperience;
