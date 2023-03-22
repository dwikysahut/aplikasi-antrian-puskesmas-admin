// import logo from './logo.svg';
import '../App.css';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,

} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import MainPage from '../pages/MainPage/MainPage';
import AntrianPage from '../pages/AntrianPage/AntrianPage';

import NotFound from '../pages/NotFound/NotFound';
import Dokter from '../pages/MainPage/Dokter/Dokter';
import Poliklinik from '../pages/MainPage/Poliklinik/Poliklinik';
import Dashboard from '../pages/MainPage/Dashboard/Dashboard';
import Unauthorize from '../pages/Unauthorize/Unauthorize';
import KartuKeluarga from '../pages/MainPage/KartuKeluarga/KartuKeluarga';
import TahapPelayanan from '../pages/MainPage/TahapPelayanan/TahapPelayanan';
import Rak from '../pages/MainPage/Rak/Rak';
import RekamMedis from '../pages/MainPage/RekamMedis/RekamMedis';
import Informasi from '../pages/MainPage/Informasi/Informasi';
import Users from '../pages/MainPage/Users/Users';
import Pasien from '../pages/MainPage/Pasien/Pasien';
import Praktek from '../pages/MainPage/Praktek/Praktek';
import DetailPraktek from '../pages/MainPage/DetailPraktek/DetailPraktek';
import Antrian from '../pages/MainPage/Antrian/Antrian';
import DetailAntrian from '../pages/MainPage/DetailAntrian/DetailAntrian';
import DetailRekamMedis from '../pages/MainPage/DetailRekamMedis/DetailRekamMedis';

const adminPath = [
  { id: 1, name: 'dashboard', element: <Dashboard /> },
  { id: 2, name: '', element: <Dashboard /> },
  { id: 3, name: 'dokter', element: <Dokter /> },
  { id: 4, name: 'kartu-keluarga', element: <KartuKeluarga /> },
  { id: 5, name: 'tahap-pelayanan', element: <TahapPelayanan /> },
  { id: 6, name: 'rak', element: <Rak /> },
  { id: 7, name: 'rekam-medis', element: <RekamMedis /> },
  { id: 8, name: 'poliklinik', element: <Poliklinik /> },
  { id: 9, name: 'informasi', element: <Informasi /> },
  { id: 10, name: 'users', element: <Users /> },
  { id: 11, name: 'pasien', element: <Pasien /> },
  { id: 12, name: 'praktek', element: <Praktek /> },
  { id: 13, name: 'detail-praktek', element: <DetailPraktek /> },
  { id: 14, name: 'antrian', element: <Antrian /> },
  { id: 15, name: 'detail-antrian', element: <DetailAntrian /> },
  { id: 16, name: 'detail-rekam-medis', element: <DetailRekamMedis /> },
];
const petugasPath = [
  { id: 1, name: 'dashboard', element: <Dashboard /> },
  { id: 2, name: 'antrian', element: '' },

];
function AppRoutes() {
  const dataUser = useSelector(({ reducerUser }) => reducerUser.data);
  return (

    <Routes>
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="/unauthorize" element={<Unauthorize />} />
      <Route path="/not-found" element={<NotFound />} />

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<MainPage />}>
        {
          dataUser.role === 1
            ? adminPath.map((item) => (
              <Route path={item.name} key={item.id} element={item.element} />
            ))

            : petugasPath.map((item) => (
              <Route path={item.name} key={item.id} element={item.element} />

            ))

          }
        <Route path="*" element={<Navigate to="/not-found" />} />

      </Route>

      <Route path="/antrian/*" element={<AntrianPage />} />

    </Routes>
  );
}

export default AppRoutes;
