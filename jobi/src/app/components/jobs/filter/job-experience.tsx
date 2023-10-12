import React from "react";
import job_data from "@/data/job-data";
import { setExperience } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export function JobExperienceItems({showLength = true}: {showLength?: boolean}) {
  const uniqueExperiences = [...new Set(job_data.map((job) => job.experience))];
  const { experience } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {uniqueExperiences.map((e, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setExperience(e))}
            type="checkbox"
            name={e}
            defaultValue={e}
            checked={experience.includes(e)}
          />
          <label>
            {e}
            {showLength && (
              <span>
                {job_data.filter((job) => job.experience === e).length}
              </span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobExperience = () => {
  return (
    <>
      <div className="main-body">
        <ul className="style-none filter-input">
          <JobExperienceItems />
        </ul>
      </div>
    </>
  );
};

export default JobExperience;
