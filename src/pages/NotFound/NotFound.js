import React from 'react';

import './styles/NotFound.css';
import NotFoundImage from '../../assets/not_found.png';

function NotFound() {
  return (
    <div className="wrapper-not-found">
      <img className="image-not-found" alt="Gambar Not Found" src={NotFoundImage} />
    </div>
  );
}
export default NotFound;
