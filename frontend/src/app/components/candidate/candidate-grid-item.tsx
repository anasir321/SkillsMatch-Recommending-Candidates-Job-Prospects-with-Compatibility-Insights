import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

interface CandidateModel {
  candidate_id: number;
  firstname: string;
  lastname: string;
  dateOfBirth: Date | null;
  email: string;
  education: string | null;
  skills: string | null;
  experience: string | null;
  gender: string | null;
  location: string | null;
  password: string;
  resume: string | null;
  linkedinURL: string | null;
  githubURL: string | null;
  preferredJobType: string | null;
  softSkills: string | null;
  preferredJobTitle: string | null;
  profilePicture: string | null;
}

const CandidateGridItem = ({ item, style_2 = false }: { item: CandidateModel; style_2?: boolean }) => {

  console.log("Candidate id: ", item.candidate_id);
  const [profilePicture, setProfilePicture] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getProfilePictureUsingId/${item.candidate_id}`);
        console.log("Response: ", response.data.data.filePath);
        if (response.status === 200) {
          // Construct the full URL based on the relative path
          const fullUrl = `http://localhost:5000${response.data.data.filePath}`;

          // Update the profile picture state with the full URL
          setProfilePicture(fullUrl);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, [item.candidate_id]);

  return (
    <div
      // className={`candidate-profile-card ${item.favorite ? "favourite" : ""} text-center ${style_2 ? 'border-0' : ''} grid-layout mb-25`}
      className={`candidate-profile-card text-center ${style_2 ? 'border-0' : ''} grid-layout mb-25`}
    >
      <Link href="/candidate-profile-v1" className="save-btn tran3s">
        <i className="bi bi-heart"></i>
      </Link>
      <div className="cadidate-avatar online position-relative d-block m-auto">
        <Link href={`/candidate-profile-v1?id=${item.candidate_id}`} className="rounded-circle">
          {profilePicture && (
            <img src={profilePicture} alt="Profile Picture" className="lazy-img rounded-circle" />
          )}
        </Link>
      </div>
      <h4 className="candidate-name mt-15 mb-0">
        <Link href={`/candidate-profile-v1?id=${item.candidate_id}`} className="tran3s">
          {`${item.firstname} ${item.lastname}`}
        </Link>
      </h4>
      <div className="candidate-post">{item.preferredJobTitle}</div>
      <div className="row gx-1">
        {/* <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Skills</span>
            <div>{item.skills}</div>
          </div>
        </div> */}
        <div className="col-md-6">
          <div className="candidate-info mt-10">
            <span>Location</span>
            <div>{item.location}</div>
          </div>
        </div>
      </div>
      <div className="row gx-2 pt-25 sm-pt-10">
        <div className="col-md-6">
          <Link href={`/candidate-profile-v1?id=${item.candidate_id}`}
            className="profile-btn tran3s w-100 mt-5"
          >
            View Profile
          </Link>
        </div>
        <div className="col-md-6">
          <Link href="/candidate-profile-v1"
            className="msg-btn tran3s w-100 mt-5"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CandidateGridItem;

