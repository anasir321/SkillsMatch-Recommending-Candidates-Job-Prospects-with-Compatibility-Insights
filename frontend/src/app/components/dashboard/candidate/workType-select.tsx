import React from "react";
import Select from "react-select";

interface IProps {
  isEditing: boolean;
  selectedWorkType: string;
  onChange: (jobType: string) => void;
}

const WorkTypeSelect: React.FC<IProps> = ({ isEditing, selectedWorkType, onChange }) => {
  const options = [
    { value: "Remote", label: "Remote" },
    { value: "Onsite", label: "Onsite" },
  ];

  const handleChange = (selectedOption: any) => {
    if (isEditing) {
      onChange(selectedOption.value);
    }
  };

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === selectedWorkType)}
      onChange={handleChange}
      isDisabled={!isEditing}
    />
  );
};

export default WorkTypeSelect;