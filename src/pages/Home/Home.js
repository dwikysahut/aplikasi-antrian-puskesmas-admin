/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import MainPicture from '../../assets/undraw_medical_care_movn.svg';
import { connect } from 'react-redux';
import Background from '../../assets/green-background.jpg';
import LogoPuskesmas from '../../assets/logo-puskesmas-gribig.png';
import { getAllDataAntrianByMonth } from '../../utils/http';

import './styles/Home.css';
// import LoginForm from './components/LoginForm';

function Home(props) {
  console.log('ini home');
  const navigate = useNavigate();
  const onClickMainMenuHandler = async () => {
    const { dataUser } = props;
    try {
      const response = await getAllDataAntrianByMonth(dataUser.token);
      if (response) {
        navigate('/main');
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status === 401) {
        navigate('/login');
      }
    }
    // login
  };
  const onClickAntrianMenuHandler = () => {
    // login
    navigate('/antrian');
  };
  return (
    <div
      className="container-page"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="container-menu bg-white">

        <div className="logo-wrapper">
          <img src={LogoPuskesmas} alt="logo puskesmas" className="logo-item" />
        </div>
        <div className="container-menu__wrapper">
          <div className="card-menu">
            <div className="card-menu__item" tabIndex="0" role="button" onKeyDown={onClickMainMenuHandler} onClick={onClickMainMenuHandler}>
              <h3>Menu Admin / Petugas</h3>

            </div>

          </div>
          <div className="card-menu">
            <div className="card-menu__item" tabIndex="0" role="button" onKeyDown={onClickAntrianMenuHandler} onClick={onClickAntrianMenuHandler}>
              <h3>Antrian</h3>
            </div>
          </div>
        </div>
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
  // loginUserAction: (body) => dispatch(loginUserActionCreator(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
