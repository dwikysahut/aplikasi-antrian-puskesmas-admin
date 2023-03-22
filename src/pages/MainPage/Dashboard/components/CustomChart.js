/* eslint-disable react/prop-types */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {

    title: {
      display: true,
      text: 'Grafik Pendaftaran Antrian',
    },

  },
  scales: {
    y:
      {

        min: 0,
        max: 1000,
        ticks: {
          stepSize: 100,
        },
      },
    x:
      {

      },
  },

};

// const data = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'First dataset',
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: 'rgba(75,192,192,0.2)',
//       borderColor: 'rgba(75,192,192,1)',
//     },
//     {
//       label: 'Second dataset',
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: '#742774',
//     },
//   ],
// };

function CustomChart({ data }) {
  console.log(data);
  const dataFormat = {
    labels: data && data.map((item) => item.month),
    datasets: [
      {
        label: 'jumlah pendaftaran antrian',
        data: data && data.map((item) => item.jumlah_antrian),
        fill: true,
        backgroundColor: '#008080',
        borderColor: 'rgba(75,192,192,1)',
      },

    ],
  };

  return (
    <div style={{
      position: 'relative', margin: 'auto', width: '80vw', height: '60vh', display: 'flex', justifyContent: 'center',
    }}
    >
      <Line data={dataFormat} options={options} />
    </div>
  );
}
export default CustomChart;
