import React from "react";

const CandidateBio = () => {
  return (
    <ul className="style-none">
      <li>
        <span>Location: </span>
        <div>Spain, Barcelona </div>
      </li>
      <li>
        <span>Age: </span>
        <div>28</div>
      </li>
      <li>
        <span>Email: </span>
        <div>
          <a href="mailto:me@support.com">me@support.com</a>
        </div>
      </li>
      <li>
        <span>Qualification: </span>
        <div>Master Degree</div>
      </li>
      <li>
        <span>Gender: </span>
        <div>Male</div>
      </li>
      <li>
        <span>Expected Salary: </span>
        <div>$3k-$4k/month</div>
      </li>
      <li>
        <span>Social:</span>
        <div>
          <a href="#" className="me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </li>
    </ul>
  );
};

export default CandidateBio;
