"use-client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface InterviewDetails {
  interview_id: number;
  job_id: number;
  candidate_id: number;
  companyHR_id: number;
  date: string;
  time: string;
  alternate_date: string;
  alternate_time: string;
  comments: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type IProps = {
  isOpenSidebar: boolean;
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const CandidateInterviewTable = ({
  isOpenSidebar,
  setIsOpenSidebar,
}: IProps) => {
  const [interviews, setInterviews] = useState<InterviewDetails[]>([]);

  useEffect(() => {
    // Fetch interview data for the candidate
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/getCandidateInterviews",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInterviews(response.data.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  // Function to handle action selection
  const handleActionChange = async (interview_id: number, action: string) => {
    try {
      // Make API call to update the interview status
      await axios.patch(
        "http://localhost:5000/api/auth/updateInterviewStatus",
        { interview_id, status: action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Update the status locally
      setInterviews((prevInterviews) =>
        prevInterviews.map((interview) =>
          interview.interview_id === interview_id
            ? { ...interview, status: action }
            : interview
        )
      );
    } catch (error) {
        console.log("Interview ID:", interview_id);
        console.log("Action:", action)
      console.error("Error updating interview status:", error);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        {/* DashboardHeader component */}
        {/* header end */}

        <div className="d-sm-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Your Scheduled Interviews</h2>
          <div className="d-flex ms-auto xs-mt-30">
            <div
              className="nav nav-tabs tab-filter-btn me-4"
              id="nav-tab"
              role="tablist"
            >
              {/* <button
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#a1"
                type="button"
                role="tab"
                aria-selected="true"
              >
                All
              </button> */}
              {/* <button
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#a2"
                type="button"
                role="tab"
                aria-selected="false"
              >
                New
              </button> */}
            </div>
            <div className="short-filter d-flex align-items-center ms-auto">
              {/* <div className="text-dark fw-500 me-2">Short by:</div> */}
              {/* <EmployShortSelect /> */}
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="a1" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      {/* <th scope="col">Interview ID</th> */}
                      <th scope="col">Job ID</th>
                      {/* <th scope="col">Candidate ID</th> */}
                      <th scope="col">Interview Date</th>
                      <th scope="col">Interview Time</th>
                      <th scope="col">Alternate Date</th>
                      <th scope="col">Alternate Time</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {interviews.map((interview) => (
                      <tr key={interview.interview_id}>
                        {/* <td>{interview.interview_id}</td> */}
                        <td>{interview.job_id}</td>
                        {/* <td>{interview.candidate_id}</td> */}
                        <td>{new Date(interview.date).toLocaleDateString()}</td>
                        <td>{interview.time}</td>
                        <td>
                          {new Date(
                            interview.alternate_date
                          ).toLocaleDateString()}
                        </td>
                        <td>{interview.alternate_time}</td>
                        <td>{interview.comments}</td>
                        <td>{interview.status}</td>
                        <td>
                          {/* Action dropdown */}
                          <select style={{ width: "150px" }}
                            onChange={(e) =>
                              handleActionChange(
                                interview.interview_id,
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Action</option>
                            <option value="accepted with original date & time">
                                accepted with original date & time
                            </option>
                            <option value="accepted with alternate date & time">
                                accepted with alternate date & time
                            </option>
                            <option value="ignored by candidate">
                                ignored by candidate
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tab-pane fade" id="a2" role="tabpanel">
              <div className="table-responsive">
                <table className="table job-alert-table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Job Created</th>
                      <th scope="col">Applicants</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {/* Placeholder content for tab 2 */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviewTable;
