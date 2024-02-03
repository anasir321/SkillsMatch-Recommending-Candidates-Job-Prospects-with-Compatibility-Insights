"use client"
import React from "react";
import NiceSelect from "@/ui/nice-select";

const ShortSelect = () => {
  // handleShort
  const handleShort = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        { value: "New", label: "New" },
        { value: "Category", label: "Category" },
        { value: "Job Type", label: "Job Type" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleShort(item)}
      name="Short by"
    />
  );
};

export default ShortSelect;
