/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useEffect, useMemo, useState } from 'react';
import BoxCard from './Components/BoxCard';
import './styles/style.css';
import Background from '../../assets/green-background.jpg';
import { getAllAntrian, getAllAntrianByFilter, getAllPraktek } from '../../utils/http';
import { dateConvert, dateOnlyConvert } from '../../utils/functionHelper';
import queryString from 'query-string';
import { speechText } from '../../utils/DATA';
import { useSpeechSynthesis } from 'react-speech-kit';
import { io } from 'socket.io-client';
import { URL_BASE } from '../../utils/CONSTANT';
import socketInstance from '../../utils/SocketIoConfig';

function AntrianPage() {
  const [dataAntrian, setDataAntrian] = useState([]);
  const [dataPraktek, setDataPraktek] = useState([]);
  const { speak, voices, rate } = useSpeechSynthesis();
  const [date, setDate] = useState(new Date());

  const panggilHandler = (type, data) => {
    let sentences = `${speechText.opening} ${data.nomor_antrian.split('-')[0]}, ${data.nomor_antrian.split('-')[1]}. ${speechText.verb}`;
    if (type == 'poli') {
      sentences += speechText.poli;
    } else {
      sentences += speechText.loket;
    }
    speak({
      text: sentences,
      voice: voices[56],
      rate: 0.8,
      pitch: 1.1,
    });
  };
  const fetchDataAntrian = async () => {
    try {
      console.log(dateOnlyConvert(null).split('/').reverse().join('-'));
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
        setDataPraktek(response.data.data.filter((item) => item.status_operasional == 1));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // const socket = io(URL_BASE);
    // socket.emit('user-connected', stateUser.data.user_id);

    socketInstance().on('server-addAntrian', (result) => {
      console.log('fetch baru');
      fetchDataAntrian();
      fetchDataPraktek();
    });
    socketInstance().on('server-editAntrian', ({ result }) => {
      console.log('edit nih');
      fetchDataAntrian();
      // setDataAntrian(dataAntrian.map(item=>item.id_antrian==result.id_antrian?{...result}:{...item}))
      fetchDataPraktek();
    });

    fetchDataAntrian();
    fetchDataPraktek();

    // const interval = setInterval(() => {
    //   setDate(new Date());
    // }, 1000);
    // return () => {
    //   clearInterval(interval); // Return a funtion to clear the timer so that it will stop being called on unmount
    // };
    return () => {
      socketInstance().off('server-addAntrian');
      socketInstance().off('server-editAntrian');
    };
  }, []);
  const renderData = useMemo(() => (
    dataPraktek.map((itemPraktek) => (
      <BoxCard namaPoli={itemPraktek.nama_poli} total={itemPraktek.jumlah_pelayanan} dataAntrian={dataAntrian.filter((itemAntrian) => itemPraktek.id_praktek == itemAntrian.id_praktek && itemAntrian.status_antrian < 6)} />

    ), [dataPraktek, dataAntrian])
  ));
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
          {/* <h4 style={{ color: 'white' }}>{dateConvert(date)}</h4> */}
        </div>
        <div className="box-flex">
          {renderData}

        </div>
      </div>

    </div>

  );
}

export default AntrianPage;
