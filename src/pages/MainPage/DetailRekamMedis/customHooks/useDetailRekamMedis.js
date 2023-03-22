/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useEffect,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmationMessage, errorType, successfullyMessage } from '../../../../utils/CONSTANT';
import {
  dateConvert, errorFetch, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  getAllPasienNoRMNotInputed, getDetailRekamMedisByNoRM, putDetailRekamMedis, getAllRekamMedis, getAllRak, postDetailRekamMedis, getAllPasienNoRM, deleteDetailRekamMedis,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  id_detail_praktek: '',
  id_praktek: '',
  id_dokter: '',
  nama_dokter: '',
  id_poli: '',
  nama_poli: '',
  hari_praktek: '',
  jam_praktek: '',
  status_operasional: '',
  created_at: '',
  updated_at: '',

};

const useDetailRekamMedis = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataDetailRekamMedis, setDataDetailRekamMedis] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const params = useLocation();

  const [dataPasien, setDataPasien] = useState([]);
  const [dataRekamMedis, setDataRekamMedis] = useState([]);
  const [dataRak, setDataRak] = useState([]);

  const [filterDataRekamMedis, setFilterDataRekamMedis] = useState(params.state?.id ? params.state.id : '');

  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertValue, setAlertValue] = useState({ color: '', text: '', isOpen: false });

  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [formField, setFormField] = useState({
    ...initialState,
  });

  const stateUser = useSelector(({ reducerUser }) => reducerUser);
  const [filterText, setFilterText] = React.useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const formValidationSchema = yup.object().shape({
    nik: yup.string()
      .required('NIK harus diisi'),
    id_rak: yup.string()
      .required('NIK harus diisi'),

  });
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
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getDetailRekamMedisByNoRM(filterDataRekamMedis, stateUser.data.token);

      if (response.status === 200) {
        setDataDetailRekamMedis(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  useEffect(() => {
    if (stateUser.isRejectedRefreshToken) {
      logout();
    }
  }, [stateUser.isRejectedRefreshToken]);

  // when form modal clicked
  useEffect(() => {
    if (!isFirstRender) {
      setIsShowFormModal(!isShowFormModal);
    }
  }, [dataRak]);

  // when id rekam medis choosen
  useEffect(() => {
    if (filterDataRekamMedis !== '') {
      fetchData();
    }
  }, [filterDataRekamMedis]);

  useEffect(() => {
    setIsFirstRender(false);
    fetchDataRekamMedis();
  }, []);
  const fetchDataPasien = async () => {
    try {
      const response = await getAllPasienNoRMNotInputed(filterDataRekamMedis, stateUser.data.token);

      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataPasien(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataRak = async () => {
    try {
      const response = await getAllRak(stateUser.data.token);

      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataRak(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataRekamMedis = async () => {
    try {
      const response = await getAllRekamMedis(stateUser.data.token);

      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataRekamMedis(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fillFormField = (row) => {
    setFormField({
      ...row,
      no_rm: filterDataRekamMedis,
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),

    });
  };
  const onClickTambahHandler = () => {
    setFormField({ ...initialState, no_rm: filterDataRekamMedis });
    setIsEdit(false);
    fetchDataPasien();
    fetchDataRak();
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);
    setIsEdit(true);
    fetchDataPasien();
    fetchDataRak();

    // setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillFormField(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  const onChangeFilterDataRekamMedis = (e) => {
    setFilterDataRekamMedis(e);
  };
  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      no_rm: filterDataRekamMedis,
    };
    console.log(newFormBody);
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    await postDetailRekamMedis(newFormBody, stateUser.data.token).then((res) => {
      if (res.status === 201) {
        swalCallback(successfullyMessage.post, 'success');
        resetForm();
        fetchData();
        setIsShowFormModal(!isShowFormModal);
      }
    }).catch((error) => {
      setAlertValue({ isOpen: true, color: 'danger', text: 'error' });

      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    });
  };
  const onCloseFormModal = () => {
    setIsEdit(false);
    setIsShowFormModal(!isShowFormModal);
    setFormField({ ...initialState });
  };
  const onCloseDetailModal = () => {
    setIsShowDetailModal(!isShowDetailModal);
    setFormField({ ...initialState });
  };
  const onSubmitEditHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      id_praktek: filterDataRekamMedis,
    };
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    console.log(newFormBody);
    await putDetailRekamMedis(formBody.id_detail_rekam_medis, newFormBody, stateUser.data.token)
      .then((res) => {
        // swal
        if (res.status === 200) {
          swalCallback(successfullyMessage.edit, 'success');

          resetForm();
          fetchData();
          setIsShowFormModal(!isShowFormModal);
        }
      })
      .catch((error) => {
        errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
      });
  };
  const onClickDeleteHandler = (row) => {
    swalConfirmation(
      confirmationMessage.confirm,
      async () => {
        await deleteDetailRekamMedis(row.id_detail_rekam_medis, stateUser.data.token).then((res) => {
          if (res.status === 200) {
            swalCallback(successfullyMessage.delete, 'success');
            fetchData();
          }
        }).catch((error) => {
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        });
      },
    );
  };
  const onClickShowFormHandler = () => {
    setIsEdit(true);
    setIsShowDetailModal(!isShowDetailModal);

    setIsShowFormModal(!isShowFormModal);
  };

  const dataFiltered = dataDetailRekamMedis?.filter(
    (item) => {
      if (item.no_rm && item.no_rm.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nik && item.nik.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.hari_praktek && item.hari_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.jam_praktek && item.jam_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.nama_dokter && item.nama_dokter.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.nama_poli && item.nama_poli.toLowerCase().includes(filterText.toLowerCase())) { return true; }

      false;
    }
    ,
  );
  return {
    filterText,
    setFilterText,
    isEdit,
    setIsEdit,
    resetPaginationToggle,
    setResetPaginationToggle,
    formValidationSchema,
    onClickTambahHandler,
    onClickEditHandler,
    onClickDetailShowHandler,
    onSubmitTambahHandler,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataDetailRekamMedis,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    fetchDataPasien,
    fetchDataRak,
    dataRak,
    dataPasien,
    isLoading,
    alertValue,
    setAlertValue,
    fetchDataRekamMedis,
    dataRekamMedis,
    filterDataRekamMedis,
    onChangeFilterDataRekamMedis,

  };
};

export default useDetailRekamMedis;
