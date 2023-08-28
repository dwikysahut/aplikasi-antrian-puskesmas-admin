/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

import {
  useNavigate,
  Routes, Route, useLocation, Navigate, Outlet,
} from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

import { useSpeechSynthesis } from 'react-speech-kit';
import { io } from 'socket.io-client';
import socketInstance from '../../utils/SocketIoConfig';

import Sidebar from './components/Sidebar';

import './styles/MainPage.css';
import AdminHeader from './components/Header';
import DropdownMenu from './components/DropdownMenu';
import Dokter from './Dokter/Dokter';
import Poliklinik from './Poliklinik/Poliklinik';
import Dashboard from './Dashboard/Dashboard';
import NotFound from '../NotFound/NotFound';
import { URL_BASE, errorType } from '../../utils/CONSTANT';
import { logoutUserActionCreator } from '../../redux/actions/userAction';
import { swalConfirmation } from '../../utils/functionHelper';
import { publishNotifikasi } from '../../utils/http';
import { speechText } from '../../utils/DATA';

// import LoginForm from './components/LoginForm';

// import { loginUserActionCreator } from '../../redux/actions/userAction';

function MainPage(props) {
  const [routeName, setRouteName] = useState(null);

  const [isShowDropDown, setShowDropdown] = useState(false);
  const [isCalling, setIsCalling] = useState(null);
  const dropdownRef = useRef();
  const { speak, voices, rate } = useSpeechSynthesis();

  // const stateUser = useSelector(({ reducerUser }) => reducerUser);
  // const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  //   const onClickAdminMenuHandler = () => {
  //     // login
  //     navigate('/login');
  //   };
  //   const onClickAntrianMenuHandler = () => {
  //     // login
  //     navigate('/antrian');
  //   };
  // useEffect(() => {
  //   // console.log(props.dataUser.token);
  // }, []);
  useEffect(() => {
    const recentPath = location.pathname.split('/').filter((item) => item !== '');
    setRouteName(recentPath[1]);
  }, [location]);

  const panggilHandler = async (type, data, offline = false) => {
    try {
      const setDataPublish = {
        title: '',
        body: '',
        user_id: data.user_id,
      };

      let sentences = `${speechText.opening} ${data.nomor_antrian.split('-')[0]}, ${data.nomor_antrian.split('-')[1]}. ${speechText.verb}`;
      if (type == 'poli') {
        setDataPublish.title = 'Panggilan menuju Poli';
        setDataPublish.body = `Nomor Antrian ${data.nomor_antrian} milik anda telah dipanggil, silahkan menuju poli`;
        sentences += speechText.poli;
      } else {
        setDataPublish.title = 'Panggilan menuju Loket Pendaftaran';
        setDataPublish.body = `Nomor Antrian ${data.nomor_antrian} milik anda telah dipanggil, silahkan menuju loket pendaftaran`;

        sentences += speechText.loket;
      }
      if (!offline) {
        const response = await publishNotifikasi(setDataPublish, props.dataUser.token);
        if (response.status == 201) {
          console.log('berhasil');
        }
      }
      // memanggil
      speak({
        text: sentences,
        voice: voices[56],
        rate: 0.8,
        pitch: 1.1,
      });
      setIsCalling(null);
    } catch (error) {
      console.log(error);
      setIsCalling(null);
    }
  };
  useEffect(() => {
    // const socket = io(URL_BASE);
    socketInstance().emit('user-connected', props.dataUser.user_id, '', 'web');
    console.log('ada');
    socketInstance().on('server-publishNotification', async (type, data) => {
      // console.log(data);
      // await panggilHandler(type, data);
      setIsCalling({ data, type, offline: false });
    });
    socketInstance().on('server-publishNotificationOffline', async (type, data) => {
      // console.log('ini panggil');
      // console.log(data);
      // await panggilHandler(type, data, true);
      setIsCalling({ data, type, offline: true });
    });
  }, []);
  useEffect(() => {
    if (isCalling !== null) {
      panggilHandler(isCalling.type, isCalling.data, isCalling.offline);
    }
  }, [isCalling]);
  const dropDownShowHandler = () => {
    setShowDropdown(!isShowDropDown);
  };
  useEffect(() => {
    const windowClickEvent = (e) => {
      console.log('click');
      if (isShowDropDown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        // console.log(dropdownRef);
        setShowDropdown(false);
      }
    };
    if (isShowDropDown) {
      document.addEventListener('mousedown', windowClickEvent);
    }
    return () => {
      document.removeEventListener('mousedown', windowClickEvent);
    };
  }, [isShowDropDown]);

  const dropDownCloseHandler = () => {
    setShowDropdown(false);
  };
  const logout = async (refreshToken = props.dataUser.refreshToken) => {
    // console.log(refreshToken);
    const res = await props.logoutUserAction(refreshToken);
    console.log(res);
    navigate('/login', { replace: true });
  };

  const logoutHandler = () => {
    swalConfirmation('Yakin untuk logout ?', logout);
  };

  useEffect(() => {
    if (props.dataUser.error?.message !== undefined) {
      if (props.dataUser.error.message === errorType.TOKEN_EXPIRED) { logout(); }
    }
  }, [props.dataUser.error]);

  if (!props.dataUser.token) {
    return (
      <Navigate to="/login" />
    );
  }
  return (
    <div style={{ height: '100vh' }}>

      <div style={{ display: 'flex' }}>
        <Col xs="2" className="sidebar-menu">
          <Sidebar selected={routeName} role={props.dataUser.role} />
        </Col>
        <Col xs="10" className="content-wrapper">
          <AdminHeader dropDownShowHandler={dropDownShowHandler} />
          <DropdownMenu name={props.dataUser?.nama_user} refDropdown={dropdownRef} isShow={isShowDropDown} logoutHandler={logoutHandler} />
          <Outlet />
          {/* <Routes>
            {
          props.dataUser.role === 1
            ? adminPath.map((item) => (
              <Route path={item.name} key={item.id} element={item.element} />
            ))

            : petugasPath.map((item) => (
              <Route path={item.name} key={item.id} element={item.element} />

            ))

          }
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes> */}
        </Col>
      </div>

    </div>

  );
}
const mapStateToProps = ({ reducerUser }) => ({
  dataUser: reducerUser.data,
  message: reducerUser.message,
  error: reducerUser.error,

});

const mapDispatchToProps = (dispatch) => ({
  logoutUserAction: (body) => dispatch(logoutUserActionCreator(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
