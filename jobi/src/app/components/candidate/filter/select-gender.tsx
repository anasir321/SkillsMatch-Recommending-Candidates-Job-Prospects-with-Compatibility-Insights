import React from 'react';
import NiceSelect from '@/ui/nice-select';

const SelectCandidateType = () => {
  const handleCandidateType = (item: { value: string; label: string }) => {};
  return (
    <NiceSelect
      options={[
        {value:'Male',label:'Male'},
        {value:'Female',label:'Female'},
      ]}
      defaultCurrent={0}
      onChange={(item) => handleCandidateType(item)}
      name="Qualification"
    />
  );
};

export default SelectCandidateType;