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
  onClickImage,
}) {
  const renderText = (key, value) => (

    <div className="inner-wrapper" key={key}>

      <p className="inner-wrapper__key-text">
        {key.split('_').map((item) => item.toUpperCase()).join(' ')}

      </p>

      <p className="inner-wrapper__colon">:</p>
      {key === 'url_foto_kartu_identitas'
        ? <img className="inner-wrapper__value" style={{ width: '100%', maxHeight: '150px' }} onClick={() => onClickImage(data)} alt="kartu-identitas" src={value} />
        : (
          <p className="inner-wrapper__value">{value}</p>
        )}
    </div>
  );
  const renderData = useMemo(() => {
    const componentArr = [];
    for (const keys in data) {
      if (keys == 'bpjs') {
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
