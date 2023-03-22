/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import BoxCard from './Components/BoxCard';
import './styles/style.css';
import Background from '../../assets/green-background.jpg';
import { getAllAntrian, getAllAntrianByFilter, getAllPraktek } from '../../utils/http';
import { dateConvert, dateOnlyConvert } from '../../utils/functionHelper';
import queryString from 'query-string';

function AntrianPage() {
  const [dataAntrian, setDataAntrian] = useState([]);
  const [dataPraktek, setDataPraktek] = useState([]);

  const fetchDataAntrian = async () => {
    try {
      const response = await getAllAntrianByFilter(
        queryString.stringify({ tanggal_periksa: dateOnlyConvert(null).split('/').reverse().join('-') }),
      );
      if (response.status == 200) {
        console.log(response.data.data);
        console.log(dateOnlyConvert(null));
        setDataAntrian(response.data.data);
      }
    } catch (error) {

    }
  };
  const fetchDataPraktek = async () => {
    try {
      const response = await getAllPraktek();
      if (response.status == 200) {
        console.log(response.data.data);
        setDataPraktek(response.data.data);
      }
    } catch (error) {

    }
  };
  useEffect(() => {
    fetchDataAntrian();
    fetchDataPraktek();
  }, []);
  return (
    <div
      className="container-antrian"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="wrapper">
        <div className="title-wrapper">
          <h1 style={{ color: 'white' }}>Puskesmas Gribig</h1>
        </div>
        <div className="box-flex">
          {dataPraktek.map((itemPraktek) => (
            <BoxCard namaPoli={itemPraktek.nama_poli} total={itemPraktek.jumlah_pelayanan} dataAntrian={dataAntrian.filter((itemAntrian) => itemPraktek.id_praktek == itemAntrian.id_praktek && itemAntrian.status_antrian < 6)} />

          ))}

        </div>
      </div>

    </div>

  );
}

export default AntrianPage;
