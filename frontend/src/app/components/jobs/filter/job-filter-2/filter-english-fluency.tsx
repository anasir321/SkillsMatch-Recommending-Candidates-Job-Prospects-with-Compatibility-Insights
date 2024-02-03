import React from "react";
import job_data from "@/data/job-data";
import { useAppDispatch } from "@/redux/hook";
import NiceSelect from "@/ui/nice-select";
import { setEnglishFluency } from "@/redux/features/filterSlice";


const FilterEnglishFluency = () => {
  const uniqueEnglishFluency = [
    ...new Set(job_data.map((job) => job.english_fluency)),
  ];
  const dispatch = useAppDispatch();
  const handleEnglishFluency = (item: { value: string; label: string }) => {
    dispatch(setEnglishFluency(item.value))
  };
  const options = uniqueEnglishFluency.map((e) => {
    return { value: e, label: e };
  });

  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">English Fluency</div>
      <NiceSelect
        options={options}
        defaultCurrent={0}
        onChange={(item) => handleEnglishFluency(item)}
        name="English Fluency"
        placeholder="English Fluency"
        cls="bg-white"
      />
    </div>
  );
};

export default FilterEnglishFluency;
