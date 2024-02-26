import React from "react";
import NiceSelect from "@/ui/nice-select";

const StateSelect = () => {
  const handleState = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "Sydney", label: "Sydney" },
        { value: "Tokyo", label: "Tokyo" },
        { value: "Delhi", label: "Delhi" },
        { value: "Shanghai", label: "Shanghai" },
        { value: "Mumbai", label: "Mumbai" },
        { value: "Bangalore", label: "Bangalore" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleState(item)}
      name="State"
    />
  );
};

export default StateSelect;
