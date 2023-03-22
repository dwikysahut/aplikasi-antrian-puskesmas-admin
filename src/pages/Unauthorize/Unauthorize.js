import React from 'react';

import './styles/Unauthorize.css';
import UnauthorizeImage from '../../assets/undraw_Cancel_re_pkdm.png';

function Unauthorize() {
  return (
    <div className="wrapper-unauthorize">
      <div style={{ width: '500px' }}>
        <img className="image-not-found" alt="Gambar Unauthorize" src={UnauthorizeImage} />
      </div>
      <h3 style={{ fontWeight: 'bold' }}>Oops... No Access</h3>
    </div>
  );
}
export default Unauthorize;
