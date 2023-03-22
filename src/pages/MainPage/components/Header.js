import React from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
// import PuskesmasLogo from '../../../assets/puskesmas-logo.png';

function AdminHeader({ dropDownShowHandler }) {
  return (
    <header className="header-wrapper">
      <div className="image-wrapper" onClick={dropDownShowHandler}>
        <RiAccountCircleFill className="header-profile" />
      </div>
    </header>
  );
}

export default AdminHeader;
