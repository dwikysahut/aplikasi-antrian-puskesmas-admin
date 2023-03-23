/* eslint-disable react/prop-types */
import React from 'react';
import Card from './Card';

function BoxCard({ namaPoli, total, dataAntrian }) {
  const renderAntrianPoli = (length) => {
    const elements = [];
    // for (let i = 0; i < length; i++) {
    //   elements.push(<Card dataAntrian={dataAntrian} />);
    //   console.log('ada');
    // }
    // console.log(elements);
    dataAntrian.filter((item) => item.status_antrian == 5).map((item) => (
      <Card dataAntrian={dataAntrian} />
    ));
  };
  return (
    <div className="wrapper-box">
      <h2 className="nama-poli">{namaPoli}</h2>
      <div className="wrapper-number">

        {renderAntrianPoli(total)}

      </div>
    </div>

  );
}
export default BoxCard;
