/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

function DropdownMenu({
  refDropdown, isShow, logoutHandler, name,
}) {
  return (
    <div ref={refDropdown} className={`dropdown-additional-menu ${isShow ? 'show' : ''}`}>
      <ul className="dropdown-additional-menu__list">
        <li className="dropdown-additional-menu__list__item"><p>{name}</p></li>
        <li className="dropdown-additional-menu__list__item" style={{ backgroundColor: 'currentcolor', cursor: 'pointer', borderRadius: '8px' }} onClick={logoutHandler}><p style={{ color: 'white' }}>Logout</p></li>
      </ul>
    </div>
  );
}
export default DropdownMenu;
