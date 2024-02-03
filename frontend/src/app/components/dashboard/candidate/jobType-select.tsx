import NiceSelect from "@/ui/nice-select";
import React from "react";

const JobTypeSelect = () => {
  const handleJobType = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Contract", label: "Contract" },
        { value: "Internship", label: "Internship" },
        { value: "Remote", label: "Remote" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleJobType(item)}
      name="Job Type"
    />
  );
};

export default JobTypeSelect;