import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getAllDataAntrianByMonth, getAllDataCount } from '../../../utils/http';
import CardItems from './components/CardItems';
import CustomChart from './components/CustomChart';
import CustomAlert from '../../../components/Alert';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../redux/actions/userAction';
import { errorFetch } from '../../../utils/functionHelper';
import { errorType, URL_BASE } from '../../../utils/CONSTANT';
import socketInstance from '../../../utils/SocketIoConfig';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateUser = useSelector(({ reducerUser }) => reducerUser);

  const [alertValue, setAlertValue] = useState({ color: '', text: '', isOpen: false });
  const [dataCount, setDataCount] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [dataAntrian, setDataAntrian] = useState([]);

  const logout = async (refreshToken = stateUser.data.refreshToken) => {
    await dispatch(logoutUserActionCreator(refreshToken));
    navigate('/login', { replace: true });
  };
  const authRefreshToken = async () => {
    // console.log('auth');
    await dispatch(refreshTokenActionCreator(stateUser.data.refreshToken));
    if (stateUser.data.error.message === errorType.TOKEN_EXPIRED) {
      await dispatch(logoutUserActionCreator());
      navigate('/login', { replace: true });
    }
  };

  const fetchAllDataCount = useCallback(async () => {
    try {
      const response = await getAllDataCount(stateUser.data.token);

      if (response) {
        setDataCount(response.data.data);
      }
    } catch (error) {
      // if (error.response.status === 401) {
      //   if (error.response.data.message === 'JsonWebTokenError' || error.response.data.message === 'TokenExpiredError') {
      //     setAlertValue({ isOpen: true, color: 'danger', text: 'Silahkan Login kembali' });
      //     // logout dispatch

      //     setTimeout(async () => {
      //       await dispatch(logoutUserActionCreator(stateUser.data.refreshToken));
      //       navigate('/login', { replace: true });
      //     }, 2000);
      //   }
      // }
      console.log(error);

      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    } finally {

    }
  }, [dataCount]);
  const fetchAntrianByMonth = useCallback(async () => {
    try {
      const response = await getAllDataAntrianByMonth(stateUser.data.token);
      console.log(response.data.data);
      if (response) {
        setDataAntrian(response.data.data);
      }
    } catch (error) {
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    } finally {

    }
  }, [dataAntrian]);

  // useEffect(() => {
  //   if (stateUser.isRejectedRefreshToken) {
  //     console.log('reject');
  //     logout();
  //   }
  // }, [stateUser.isRejectedRefreshToken]);

  useEffect(() => {
    if (stateUser.isRejectedRefreshToken) {
      logout();
    }
  }, [stateUser.isRejectedRefreshToken]);

  useEffect(() => {
    // const socket = io(URL_BASE);

    fetchAllDataCount();
    fetchAntrianByMonth();

    socketInstance().on('connect', () => {
      console.log(socketInstance().id);
      setIsConnected(true);
    });

    socketInstance().on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance().on('server-addAntrian', () => {
      fetchAllDataCount();
      fetchAntrianByMonth();
    });

    return () => {
      socketInstance().off('server-addAntrian');
    };
  }, []);

  useEffect(() => {
    if (stateUser.isRejected && stateUser.error !== null) {
      logout();
    }
  }, [stateUser.error]);
  const renderCustomChart = useMemo(() => <CustomChart data={dataAntrian} />, [dataAntrian]);
  return (
    <div className="py-5" style={{ flex: 'auto' }}>
      <CustomAlert
        isOpen={alertValue.isOpen}
        color={alertValue.color}
        text={alertValue.text}
        onDismiss={() => setAlertValue({ isOpen: false, color: 'danger', text: 'Oops.. Something Wrong' })}
      />
      <div className="d-flex justify-content-center">
        <CardItems items={dataCount} />
      </div>
      {renderCustomChart}
    </div>
  );
}

export default Dashboard;
