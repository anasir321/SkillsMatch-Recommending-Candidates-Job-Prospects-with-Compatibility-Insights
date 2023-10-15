import React from 'react';
import candidate_data from '@/data/candidate-data';
import NiceSelect from '@/ui/nice-select';

const SelectCandidateQualification = () => {
  const uniqueQualification = [...new Set(candidate_data.map(c => c.qualification))];
  const handleQualification = (item: { value: string; label: string }) => {};
  const options = uniqueQualification.map((l) => {
    return {value:l,label:l}
  })
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleQualification(item)}
      name="Qualification"
    />
  );
};

export default SelectCandidateQualification;