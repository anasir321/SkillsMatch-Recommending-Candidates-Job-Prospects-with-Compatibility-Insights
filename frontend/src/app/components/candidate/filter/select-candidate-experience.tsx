import React from 'react';
import NiceSelect from '@/ui/nice-select';
import candidate_data from '@/data/candidate-data';

const SelectCandidateExperience = () => {
  const uniqueExperiences = [
    ...new Set(candidate_data.map((c) => c.experience)),
  ];
  const handleExperience = (item: { value: string; label: string }) => {};
  const options = uniqueExperiences.map((e) => {
    return {value:e,label:e}
  })
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleExperience(item)}
      name="Experience"
    />
  );
};

export default SelectCandidateExperience;