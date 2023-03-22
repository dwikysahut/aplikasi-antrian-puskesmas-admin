import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { MdClear } from 'react-icons/md';
import { Input } from 'reactstrap';
// import PuskesmasLogo from '../../../assets/puskesmas-logo.png';

function SearchBar({ filterValue, onChangeHandler, onResetHandler }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center',
    }}
    >
      <Input
        type="text"
        value={filterValue}
        placeholder="Cari disini . . ."
        aria-label="Search Input"
        onChange={onChangeHandler}
      />
      <MdClear size={20} onClick={onResetHandler} />
    </div>
  );
}

export default SearchBar;
