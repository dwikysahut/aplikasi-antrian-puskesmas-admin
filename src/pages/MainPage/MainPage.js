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

import Sidebar from './components/Sidebar';

import './styles/MainPage.css';
import AdminHeader from './components/Header';
import DropdownMenu from './components/DropdownMenu';
import Dokter from './Dokter/Dokter';
import Poliklinik from './Poliklinik/Poliklinik';
import Dashboard from './Dashboard/Dashboard';
import NotFound from '../NotFound/NotFound';
import { errorType } from '../../utils/CONSTANT';
import { logoutUserActionCreator } from '../../redux/actions/userAction';
import { swalConfirmation } from '../../utils/functionHelper';

// import LoginForm from './components/LoginForm';

// import { loginUserActionCreator } from '../../redux/actions/userAction';

function MainPage(props) {
  const [routeName, setRouteName] = useState(null);

  const [isShowDropDown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

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
          <Sidebar selected={routeName} />
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
