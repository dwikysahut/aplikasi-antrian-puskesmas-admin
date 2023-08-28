/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import '../../styles/General.css';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { statusAnggotaKel, statusAntrian, statusKehadiran } from '../../../../utils/DATA';

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
        {key === 'status_operasional' ? (value == 1 ? 'Buka' : 'Tutup')
          : key.includes('prioritas') ? (value == 1 ? 'Prioritas' : 'Biasa')

            : key.includes('status_hadir') ? statusKehadiran[value]
              : key.includes('status_antrian') ? statusAntrian[value - 1]

                : key.includes('daftar_dengan_bpjs') ? (value == 1 ? 'Ya' : 'Tidak') : value}

        {' '}
        {key.includes('waktu_pelayanan') && 'Menit'}
      </p>

    </div>
  );
  const renderData = useMemo(() => {
    const componentArr = [];
    for (const keys in data) {
      if (keys.includes('id') && keys !== 'id_antrian') {
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
