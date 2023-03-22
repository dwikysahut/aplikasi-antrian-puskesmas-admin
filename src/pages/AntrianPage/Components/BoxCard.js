/* eslint-disable react/prop-types */
import React from 'react';
import Card from './Card';

function BoxCard({ namaPoli, total, dataAntrian }) {
  const renderPoli = (length) => {
    const elements = [];
    for (let i = 0; i < length; i++) {
      elements.push(<Card dataAntrian={dataAntrian} />);
      console.log('ada');
    }
    console.log(elements);
    return elements;
  };
  return (
    <div className="wrapper-box">
      <h2 className="nama-poli">{namaPoli}</h2>
      <div className="wrapper-number">

        {renderPoli(total)}

      </div>
    </div>

  );
}
export default BoxCard;
