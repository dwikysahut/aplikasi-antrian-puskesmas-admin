import React from 'react';
import CardItem from './CardItem';

// const items = {
//   jumlah_dokter: 2,
//   jumlah_pendaftaran_antrian: 1,
//   jumlah_informasi: 11,
//   jumlah_kartu_keluarga: 2,
//   jumlah_pasien: 1,
//   jumlah_poli: 1,
//   jumlah_rekam_medis: 4,
//   jumlah_users: 3,
// };

const backgroundColor = ['#8b0000', '#008080', 'darkgreen', '#2f4f4f', '#191970', '#483d8b', '#c71585', '#b8860b'];
function CardItems({ items }) {
  return (
    <div
      className="p-2"
      style={{
        display: 'flex', flexWrap: 'wrap', gap: '25px', margin: '15px', justifyContent: 'center',
      }}
    >
      {Object.keys(items).map((keys, i) => (
        <CardItem
          key={keys}
          name={keys.split('_').splice(1).map((item) => item.charAt(0).toUpperCase() + item.substring(1).toLocaleLowerCase())
            .join(' ')
            .toString()}
          value={items[keys]}
          color={backgroundColor[i]}
        />
      ))}

    </div>
  );
}

export default CardItems;
