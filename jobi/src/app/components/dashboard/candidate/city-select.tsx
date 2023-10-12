import NiceSelect from "@/ui/nice-select";
import React from "react";

const CitySelect = () => {
  const handleCity = (item: { value: string; label: string }) => {};
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
      onChange={(item) => handleCity(item)}
      name="City"
    />
  );
};

export default CitySelect;
