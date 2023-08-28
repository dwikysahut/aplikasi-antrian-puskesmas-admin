import React from 'react';
import { poliColor } from '../../../../utils/CONSTANT';

function BoxItem({ dataPraktek, dataAntrian }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '16px',
      justifyContent: 'flex-start',
    }}
    >
      {[...dataPraktek].sort((a, b) => {
        if (a.nama_poli.toUpperCase() < b.nama_poli.toUpperCase()) {
          return -1;
        }
        if (a.nama_poli.toUpperCase() > b.nama_poli.toUpperCase()) {
          return 1;
        }
        return 0;
      }).map((item, i) => (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexDirection: 'column',
          background: poliColor[item.id_praktek],
          color: 'white',
          padding: '16px',
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',

        }}
        >
          <h5 style={{ background: poliColor[item.id_praktek] }}>{item.nama_poli}</h5>
          <div style={{
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '4px',
            borderRadius: '5px',
          }}
          >
            {item.jumlah_pelayanan > 0 ? <p style={{ color: 'darkgreen', margin: 0, fontWeight: 'bold' }}>Tersedia</p> : <p style={{ fontWeight: 'bold', color: 'darkred', margin: 0 }}>Tidak Tersedia</p>}
          </div>
          <div style={{
            background: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            padding: '4px',
            borderRadius: '5px',
          }}
          >
            <p style={{ color: 'black', margin: 0, fontSize: '14px' }}>  Menunggu Pelayanan Poli : </p>

            {' '}
            <p style={{ color: 'black', margin: 0, fontWeight: 'bold' }}>
              {' '}
              {dataAntrian?.filter((itemAntrian) => item.id_praktek == itemAntrian.id_praktek && itemAntrian.status_antrian == 4).length}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}
export default BoxItem;
