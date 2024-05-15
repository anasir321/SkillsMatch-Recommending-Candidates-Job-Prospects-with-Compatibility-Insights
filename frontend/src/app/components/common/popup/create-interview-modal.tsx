import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateInterviewModal = ({ candidate_id, companyHR_id, job_id }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    alternate_date: "",
    alternate_time: "",
    comments: "",
    status: "scheduled",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      candidate_id,
      companyHR_id,
      job_id
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/createInterview",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Interview created successfully", response.data);
        toast.success("Interview created successfully!");

        // Automatically close the modal
        const closeButton = document.querySelector("#createInterviewModal .btn-close");
        if (closeButton) closeButton.click();
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      toast.error("Error creating interview. Please try again.");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="createInterviewModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered">
          <div className="container">
            <div className="user-data-form modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="text-center">
                <h2>Create Interview</h2>
              </div>
              <div className="form-wrapper m-auto">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="alternate_date" className="form-label">Alternate Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="alternate_date"
                      name="alternate_date"
                      value={formData.alternate_date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="alternate_time" className="form-label">Alternate Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="alternate_time"
                      name="alternate_time"
                      value={formData.alternate_time}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comments" className="form-label">Comments</label>
                    <textarea
                      className="form-control"
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Create Interview</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateInterviewModal;
