import React from 'react';

function Card({ dataAntrian }) {
  // const dataNow = dataAntrian[0];
  console.log(dataAntrian);

  return (
    <div className="wrapper-card">

      <h3>{dataAntrian?.nomor_antrian}</h3>
      {dataAntrian?.prioritas == 1 && <p><b>Prioritas</b></p>}

    </div>
  );
}
export default Card;
