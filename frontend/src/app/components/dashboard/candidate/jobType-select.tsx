// import NiceSelect from "@/ui/nice-select";
// import React from "react";

// const JobTypeSelect = () => {
//   const handleJobType = (item: { value: string; label: string }) => {};
//   return (
//     <NiceSelect
//       options={[
//         { value: "Full Time", label: "Full Time" },
//         { value: "Part Time", label: "Part Time" },
//         { value: "Contract", label: "Contract" },
//         { value: "Internship", label: "Internship" },
//         { value: "Remote", label: "Remote" },
//       ]}
//       defaultCurrent={0}
//       onChange={(item) => handleJobType(item)}
//       name="Job Type"
//     />
//   );
// };

// export default JobTypeSelect;
// JobTypeSelect.tsx
// JobTypeSelect.tsx

// JobTypeSelect.tsx

import React from "react";
import Select from "react-select";

interface IProps {
  isEditing: boolean;
  selectedJobType: string;
  onChange: (jobType: string) => void;
}

const JobTypeSelect: React.FC<IProps> = ({ isEditing, selectedJobType, onChange }) => {
  const options = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internship", label: "Internship" },
    { value: "Remote", label: "Remote" },
  ];

  const handleChange = (selectedOption: any) => {
    if (isEditing) {
      onChange(selectedOption.value);
    }
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedJobType)}
      onChange={handleChange}
      isDisabled={!isEditing}
    />
  );
};

export default JobTypeSelect;
