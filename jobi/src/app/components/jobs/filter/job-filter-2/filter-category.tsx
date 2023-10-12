import React from "react";
import slugify from "slugify";
import job_data from "@/data/job-data";
import NiceSelect from "@/ui/nice-select";
import { useAppDispatch } from "@/redux/hook";
import { setCategory } from "@/redux/features/filterSlice";

const FilterCategory = () => {
  const dispatch = useAppDispatch()
  const uniqueCategories = [
    ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const options = uniqueCategories.map((c) => {
    return { value: slugify(c, "-"), label: c };
  });
  const handleCategory = (item: { value: string; label: string }) => {
    dispatch(setCategory(item.value))
  };
  return (
    <div className="filter-block pb-50 lg-pb-20">
      <div className="filter-title fw-500 text-dark">Category</div>
      <NiceSelect
        options={options}
        defaultCurrent={0}
        onChange={(item) => handleCategory(item)}
        cls="bg-white"
        name="Category"
      />
    </div>
  );
};

export default FilterCategory;
