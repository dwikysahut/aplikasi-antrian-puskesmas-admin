import React from 'react';

function Card({ dataAntrian }) {
  // const dataNow = dataAntrian[0];

  return (
    <div className="wrapper-card">
      <h3>{dataAntrian?.nomor_antrian}</h3>

    </div>
  );
}
export default Card;
