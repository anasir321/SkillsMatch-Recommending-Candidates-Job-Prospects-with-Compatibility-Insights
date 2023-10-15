"use client"
import React from 'react';
import NiceSelect from '@/ui/nice-select';
import job_data from '@/data/job-data';

const CategorySelect = () => {
  const uniqueCategories = [
    ...new Set(job_data.flatMap((job) => job.category)),
  ];
  const handleCategory = (item: { value: string; label: string }) => { }
  return (
    <NiceSelect
      options={[
        { value: "web-design", label: "Web Design" },
        { value: "design-&-creative", label: "Design & Creative" },
        { value: "it-&-Development", label: "It & Development" },
        { value: "web-&-mobile-dev", label: "Web & Mobile Dev" },
        { value: "writing", label: "Writing" },
        { value: "sales-&-marketing", label: "Sales & Marketing" },
        { value: "music-&-audio", label: "Music & Audio" },
      ]}
      defaultCurrent={0}
      onChange={(item) => handleCategory(item)}
      name="Category"
    />
  );
};

export default CategorySelect;