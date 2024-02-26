import NiceSelect from "@/ui/nice-select";
import React from "react";

const FilterEnglishFluency = () => {
  const handleEnglishFluency = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "Basic", label: "Basic" },
        { value: "Conversational", label: "Conversational" },
        { value: "Fluent", label: "Fluent" },
        { value: "Native/Bilingual", label: "Native/Bilingual" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleEnglishFluency(item)}
      name="English Fluency"
      placeholder="English Fluency"
      cls="bg-white"
    />
  );
};

export default FilterEnglishFluency;
