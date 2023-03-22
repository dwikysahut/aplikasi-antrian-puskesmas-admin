/* eslint-disable react/prop-types */
import React from 'react';
import Select from 'react-select';

function SelectComponent({
  data, name, value, onChange, customStyles,
}) {
  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={value}
      placeholder={value === '' ? 'Type here...' : value}
      isLoading={!data && data.length < 1}
      isSearchable
      name={name}
      id={name}
      options={data}
      onChange={onChange}

    />
  );
}

export default SelectComponent;
