/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import '../styles/MainPage.css';
import { Link } from 'react-router-dom';
import { AiFillDashboard, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IoPersonSharp } from 'react-icons/io5';
import PuskesmasLogo from '../../../assets/logo-puskesmas-gribig.png';

const sidebarItems = [

  { path: 'kartu-keluarga', icon: '', value: 'Kartu Keluarga' },

  { path: 'users', icon: '', value: 'Users' },
  { path: 'pasien', icon: '', value: 'Pasien' },
];

const dataMasters = [
  { path: 'tahap-pelayanan', icon: '', value: 'Tahap Pelayanan' },
  { path: 'rak', icon: '', value: 'Rak' },
  { path: 'informasi', icon: '', value: 'Informasi/Pengumuman' },
  { path: 'dokter', icon: '', value: 'Dokter' },
  { path: 'poliklinik', icon: '', value: 'Poliklinik' },
];
const dataTransaksi = [
  { path: 'antrian', icon: '', value: 'Antrian' },
  { path: 'detail-antrian', icon: '', value: 'Detail Antrian' },
  { path: 'praktek', icon: '', value: 'Praktek' },
  { path: 'detail-praktek', icon: '', value: 'Detail Praktek' },

];
const dataTransaksiPetugas = [
  { path: 'antrian', icon: '', value: 'Antrian' },
  { path: 'detail-antrian', icon: '', value: 'Detail Antrian' },

];

const dataRM = [
  { path: 'rekam-medis', icon: '', value: 'Dokumen RM' },
  { path: 'detail-rekam-medis', icon: '', value: 'Detail Dokumen RM' },
];
function Sidebar({ selected, role }) {
  const [isSubmenuClick, setIsSubmenuClick] = useState({ dataMaster: false, dataRM: false, dataTransaksi: false });
  return (
    <div className="sidebar-container">
      <div className="sidebar-image-wrapper">
        <img src={PuskesmasLogo} alt="" />
      </div>
      {role == 1
        ? (
          <div className="sidebar__menu-list">

            <ul className="dashboard-wrapper">
              <Link to="/main/dashboard">
                <li className={`list-bar ${selected == 'dashboard' ? 'active' : ''}`}>
                  <div className="inner-list">
                    <AiFillDashboard size={25} />
                    <p className="sidebar-title">Dashboard</p>
                  </div>
                </li>
              </Link>

            </ul>
            <ul>
              <div className="submenu-wrapper my-1">
                <li
                  className="list-bar active-submenu"
                  onClick={() => { setIsSubmenuClick({ ...isSubmenuClick, dataMaster: !isSubmenuClick.dataMaster }); }}
                >
                  <div className="submenu-inner-list">
                    <p className="sidebar-title">Data Master</p>
                    {isSubmenuClick.dataMaster ? <AiFillCaretUp size={10} />
                      : <AiFillCaretDown size={10} />}
                  </div>
                </li>
              </div>
              <ul>
                {isSubmenuClick.dataMaster && dataMasters.map((item) => (
                  <Link to={`/main/${item.path}`}>
                    <li className={`list-bar ${selected == item.path ? 'active' : ''}`}>
                      <div className="inner-list">
                        {/* <IoPersonSharp size={25} /> */}
                        <p className="sidebar-title">{item.value}</p>
                      </div>
                    </li>
                  </Link>
                ))}

              </ul>

              <div className="submenu-wrapper my-1">
                <li
                  className="list-bar active-submenu"
                  onClick={() => { setIsSubmenuClick({ ...isSubmenuClick, dataTransaksi: !isSubmenuClick.dataTransaksi }); }}
                >
                  <div className="submenu-inner-list">
                    <p className="sidebar-title">Data Transaksi</p>
                    {isSubmenuClick.dataTransaksi ? <AiFillCaretUp size={10} />
                      : <AiFillCaretDown size={10} />}
                  </div>
                </li>
              </div>
              <ul>
                {isSubmenuClick.dataTransaksi && dataTransaksi.map((item) => (
                  <Link to={`/main/${item.path}`}>
                    <li className={`list-bar ${selected == item.path ? 'active' : ''}`}>
                      <div className="inner-list">
                        {/* <IoPersonSharp size={25} /> */}
                        <p className="sidebar-title">{item.value}</p>
                      </div>
                    </li>
                  </Link>
                ))}

              </ul>
              <div className="submenu-wrapper my-1">
                <li
                  className="list-bar active-submenu"
                  onClick={() => { setIsSubmenuClick({ ...isSubmenuClick, dataRM: !isSubmenuClick.dataRM }); }}
                >
                  <div className="submenu-inner-list">
                    <p className="sidebar-title">Dokumen RM</p>
                    {isSubmenuClick.dataRM ? <AiFillCaretUp size={10} />
                      : <AiFillCaretDown size={10} />}
                  </div>
                </li>
              </div>
              <ul style={{ marginBottom: '8px' }}>
                {isSubmenuClick.dataRM && dataRM.map((item) => (
                  <Link to={`/main/${item.path}`}>
                    <li className={`list-bar ${selected == item.path ? 'active' : ''}`}>
                      <div className="inner-list">
                        {/* <IoPersonSharp size={25} /> */}
                        <p className="sidebar-title">{item.value}</p>
                      </div>
                    </li>
                  </Link>
                ))}

              </ul>
              {sidebarItems.map((item) => (
                <Link to={`/main/${item.path}`}>
                  <li className={`list-bar ${selected == item.path ? 'active' : ''}`}>
                    <div className="inner-list">
                      {/* <IoPersonSharp size={25} /> */}
                      <p className="sidebar-title">{item.value}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>

          </div>
        )
        : (
          <div className="sidebar__menu-list">
            <ul className="dashboard-wrapper">
              <Link to="/main/dashboard">
                <li className={`list-bar ${selected == 'dashboard' ? 'active' : ''}`}>
                  <div className="inner-list">
                    <AiFillDashboard size={25} />
                    <p className="sidebar-title">Dashboard</p>
                  </div>
                </li>
              </Link>

            </ul>

            {/* <p className="list-title mb-2">Data Master</p> */}

            <div className="submenu-wrapper my-1">
              <li
                className="list-bar active-submenu"
                onClick={() => { setIsSubmenuClick({ ...isSubmenuClick, dataTransaksi: !isSubmenuClick.dataTransaksi }); }}
              >
                <div className="submenu-inner-list">
                  <p className="sidebar-title">Data Transaksi</p>
                  {isSubmenuClick.dataTransaksi ? <AiFillCaretUp size={10} />
                    : <AiFillCaretDown size={10} />}
                </div>
              </li>
            </div>
            <ul style={{ padding: 0 }}>
              {isSubmenuClick.dataTransaksi && dataTransaksiPetugas.map((item) => (
                <Link to={`/main/${item.path}`}>
                  <li className={`list-bar ${selected == item.path ? 'active' : ''}`}>
                    <div className="inner-list">
                      {/* <IoPersonSharp size={25} /> */}
                      <p className="sidebar-title">{item.value}</p>
                    </div>
                  </li>
                </Link>
              ))}

            </ul>

          </div>
        )}
    </div>

  );
}

export default Sidebar;
