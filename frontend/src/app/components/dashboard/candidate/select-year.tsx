import NiceSelect from "@/ui/nice-select";
import React from "react";

const SelectYear = () => {
  const handleYear = (item: { value: string; label: string }) => {};
  return (
    <div className="dash-input-wrapper mb-30">
      <NiceSelect
        options={[
          { value: "2023", label: "2023" },
          { value: "2023", label: "2023" },
          { value: "2025", label: "2025" },
          { value: "2024", label: "2024" },
          { value: "2019", label: "2019" },
          { value: "2018", label: "2018" },
        ]}
        defaultCurrent={0}
        onChange={(item) => handleYear(item)}
        name="Year"
      />
    </div>
  );
};

export default SelectYear;
