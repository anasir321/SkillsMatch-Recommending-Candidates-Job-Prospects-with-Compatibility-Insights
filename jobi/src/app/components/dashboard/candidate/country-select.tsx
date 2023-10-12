import NiceSelect from "@/ui/nice-select";
import React from "react";

const CountrySelect = () => {
  const handleCountry = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "Afghanistan", label: "Afghanistan" },
        { value: "Albania", label: "Albania" },
        { value: "Belgium", label: "Belgium" },
        { value: "Barbados", label: "Barbados" },
        { value: "Australia", label: "Australia" },
        { value: "Angola", label: "Angola" },
        { value: "Austria", label: "Austria" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleCountry(item)}
      name="Country"
    />
  );
};

export default CountrySelect;
