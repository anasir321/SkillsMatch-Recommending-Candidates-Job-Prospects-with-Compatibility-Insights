import React from "react";
import job_data from "@/data/job-data";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setJobType } from "@/redux/features/filterSlice";

// job type items

export function JobTypeItems({ showLength = true }: { showLength?: boolean }) {
  const jobDuration = [...new Set(job_data.map((job) => job.duration))];
  const { job_type } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <>
      {jobDuration.map((duration, index) => (
        <li key={index}>
          <input
            onChange={() => dispatch(setJobType(duration))}
            type="checkbox"
            name="JobType"
            defaultValue={duration}
            checked={job_type.includes(duration)}
          />
          <label>
            {duration}{" "}
            {showLength && (
              <span>
                {job_data.filter((job) => job.duration === duration).length}
              </span>
            )}
          </label>
        </li>
      ))}
    </>
  );
}

const JobType = () => {
  return (
    <div className="main-body">
      <ul className="style-none filter-input">
        <JobTypeItems />
      </ul>
    </div>
  );
};

export default JobType;
