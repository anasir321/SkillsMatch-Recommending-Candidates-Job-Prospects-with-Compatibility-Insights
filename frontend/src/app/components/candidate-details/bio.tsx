// CandidateBio component
import React from "react";

const CandidateBio = ({ userDetails, workExperience, institute }: { userDetails: any, workExperience: any, institute: any }) => {

  // Assuming userDetails.dateOfBirth is a string in format "YYYY-MM-DD"
  const dobString = userDetails.dateOfBirth;
  const dobDate = new Date(dobString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the age
  var age = currentDate.getFullYear() - dobDate.getFullYear();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>{userDetails.location}</div>
      </li>
      <li>
        <span>Age: </span>
        <div>{age}</div>
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
