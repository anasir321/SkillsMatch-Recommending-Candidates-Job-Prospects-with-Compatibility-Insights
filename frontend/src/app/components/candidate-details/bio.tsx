// CandidateBio component
import React from "react";

const CandidateBio = ({ userDetails, workExperience, institute }: { userDetails: any, workExperience: any, institute: any }) => {
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>{userDetails.location}</div>
      </li>
      <li>
        <span>Age: </span>
        <div>{userDetails.age}</div>
      </li>
      <li>
        <span>Email: </span>
        <div>
          <a href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
        </div>
      </li>
      <li>
        <span>Qualification: </span>
        <div>
          {/* Assuming you want to display all qualifications */}
          {institute.map((item: any, index: number) => (
            <div key={index}>{item.degree_program}</div>
          ))}
        </div>
      </li>
      <li>
        <span>Gender: </span>
        <div>{userDetails.gender}</div>
      </li>
      <li>
        <span>Expected Salary: </span>
        <div>{userDetails.expectedSalary}</div>
      </li>
      <li>
        <span>Social:</span>
        <div>
          {/* Render social links */}
        </div>
      </li>
    </ul>
  );
};

export default CandidateBio;
