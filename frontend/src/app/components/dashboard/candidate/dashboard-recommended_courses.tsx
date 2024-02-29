import React, { useState, useEffect } from "react";
import DashboardHeader from "./dashboard-header";
import axios from 'axios';

// Define type for a course
type Course = {
  course_title: string;
  short_intro: string;
  course_url: string;
};

// Define type for recommended courses response
type RecommendedCoursesResponse = {
  recommended_courses: Course[];
};

type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardRecommendedCourses = ({ setIsOpenSidebar }: IProps) => {
  const [userDetails, setUserDetails] = useState<any>({});
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const getCandidateDetailsUsingEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getCandidateDetailsUsingEmail/${localStorage.getItem("email")}`);
        console.log("Candidate details: ", response.data.data);
        if(response.status === 200){
          setUserDetails(response.data.data.company);
          const id = response.data.data.company.candidate_id; // Accessing company object correctly
          console.log("Candidate ID is " + id);
          localStorage.setItem("candidate_id", id); 
        }

      } catch (error){
        console.error("Error fetching candidate details: ", error);
        console.log("Error fetching candidate details: ", error);
      }
    };

    const fetchRecommendedCourses = async () => {
      try {
        const url=`http://127.0.0.1:5000/recommend/${localStorage.getItem("candidate_id")}`;
        
        const email=localStorage.getItem("email");
        console.log("email of login user is"+localStorage.getItem("email")+"const"+email);
        console.log("url is " + url); // Check if the URL is formed correctly
        const response = await fetch(url);
        if (response.ok) {
          const data: RecommendedCoursesResponse = await response.json();
          console.log("data is",data)
          setRecommendedCourses(data.recommended_courses);
          console.log("recommended courses",recommendedCourses);
        } else {
          throw new Error("Failed to fetch recommended courses");
        }
      } catch (error) {
        console.error("Error fetching recommended courses:", error);
      }
    };

    getCandidateDetailsUsingEmail();
    fetchRecommendedCourses();
  }, []);

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Recommended Courses</h2>
        </div>

        <div className="bg-white card-box border-20">
          <div className="table-responsive">
            <table className="table job-alert-table">
              <thead>
                <tr>
                  <th scope="col">Course Title</th>
                  <th scope="col">Course Description</th>
                  <th scope="col">Course Link</th>
                </tr>
              </thead>
              <tbody className="border-0">
                {recommendedCourses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course_title}</td>
                    <td>{course.short_intro}</td>
                    <td><a href={course.course_url} target="_blank" rel="noopener noreferrer" style={{ color: '#4848b8' }}>Link</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRecommendedCourses;
