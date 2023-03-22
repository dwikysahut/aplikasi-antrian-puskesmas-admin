/* eslint-disable react/prop-types */
import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { MdClear } from 'react-icons/md';
import { Input } from 'reactstrap';
// import PuskesmasLogo from '../../../assets/puskesmas-logo.png';

function FilterData({
  data, filterValue, onChangeHandler, onResetHandler, title, dataKey, value,
}) {
  console.log(data);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      //   alignItems: 'center',
      margin: '20px 0',
      padding: '16px',
      background: 'darkgreen',
      borderRadius: '8px',

    }}
    >
      <h4 style={{ color: 'white', fontSize: '14px' }}>
        {title}
      </h4>
      <Input
        type="select"
        value={filterValue}
        placeholder="Cari disini . . ."
        aria-label="Search Input"
        onChange={(onChangeHandler)}
      >
        <option value="">
          -
        </option>
        {data.map((item) => (
          <option key={item[dataKey]} value={item[dataKey]}>
            {item[dataKey]}
            {' '}
            -
            {' '}
            {item[value]}
          </option>
        ))}
      </Input>

    </div>
  );
}

export default FilterData;
