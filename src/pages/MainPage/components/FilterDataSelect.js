import React from 'react';

import SelectComponent from './SelectComponent';
// import PuskesmasLogo from '../../../assets/puskesmas-logo.png';

function FilterDataSelect({
  options, onChangeHandler, value, title,
}) {
  return (
    <div style={{
      background: 'darkgreen', borderRadius: '8px', padding: '8px', margin: '16px 0',
    }}
    >
      <h4 style={{ color: 'white', fontSize: '15px' }}>{title}</h4>
      <SelectComponent
        data={options}
        onChange={(e) => {
          onChangeHandler(e.value);
        }}
        name="no_kk"
        value={value}
      />
    </div>
  );
}

export default FilterDataSelect;
