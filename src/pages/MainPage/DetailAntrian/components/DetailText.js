/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import '../../styles/General.css';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

function DetailText({
  isShow, onToggleHandler, onClickEditHandler, data,
}) {
  const renderText = (key, value) => (

    <div className="inner-wrapper" key={key}>

      <p className="inner-wrapper__key-text">
        {key.split('_').map((item) => item.toUpperCase()).join(' ')}

      </p>

      <p className="inner-wrapper__colon">:</p>

      <p className="inner-wrapper__value">
        {key === 'status_operasional' ? (value == 1 ? 'Buka' : 'Tutup') : value}
        {' '}
        {key.includes('waktu_pelayanan') && 'Menit'}
      </p>

    </div>
  );
  const renderData = useMemo(() => {
    const componentArr = [];
    for (const keys in data) {
      if (keys == 'id_poli') {
        continue;
      }
      componentArr.push(renderText(keys, data[keys]));
      // componentArr.push(renderText(keys, data[keys]));
    }

    return componentArr;
  }, [data]);
  //   const renderData = () => (<p>halo</p>);

  return (
    <div className="container">
      {renderData}

    </div>

  );
}

export default DetailText;
