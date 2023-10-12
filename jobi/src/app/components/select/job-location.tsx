import React from "react";
import slugify from "slugify";
import job_data from "@/data/job-data";
import NiceSelect from "@/ui/nice-select";

const JobLocationSelect = ({
  setLocationVal,
}: {
  setLocationVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const uniqueLocations = [...new Set(job_data.map((job) => job.location))];
  // location_option
  const location_option = uniqueLocations.map((l) => {
    return {
      value: slugify(l.split(",").join("-").toLowerCase(), "-"),
      label: l,
    };
  });
  const handleLocation = (item: { value: string; label: string }) => {
    setLocationVal(item.value);
  };
  return (
    <NiceSelect
      options={location_option}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="looking for"
      cls="location"
    />
  );
};

export default JobLocationSelect;
