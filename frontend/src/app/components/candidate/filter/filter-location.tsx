import candidate_data from '@/data/candidate-data';
import NiceSelect from '@/ui/nice-select';
import React from 'react';

const FilterCandidateLocation = () => {
  const uniqueLocations = [...new Set(candidate_data.map(c => c.location))];
  const handleLocation = (item: { value: string; label: string }) => {};
  const options = uniqueLocations.map((l) => {
    return {value:l,label:l}
  })
  return (
    <NiceSelect
      options={options}
      defaultCurrent={0}
      onChange={(item) => handleLocation(item)}
      name="Location"
    />
  );
};

export default FilterCandidateLocation;