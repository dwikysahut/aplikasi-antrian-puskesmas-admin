/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { confirmationMessage, errorType, successfullyMessage } from '../../../../utils/CONSTANT';
import {
  dateConvert, errorFetch, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteDetailPraktek, getAllDetailPraktek, getDetailPraktekByIdPraktek, postDetailPraktek, putDetailPraktek, getAllDokter, getAllPraktek,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  id_detail_praktek: '',
  id_praktek: '',
  id_dokter: '',
  nama_dokter: '',
  id_poli: '',
  nama_poli: '',
  // hari_praktek: '',
  // jam_praktek: '',
  status_operasional: '',
  created_at: '',
  updated_at: '',

};

const useDetailPraktek = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFirstRender, setIsFirstRender] = useState(true);

  const [dataDetailPraktek, setDataDetailPraktek] = useState([]);

  const params = useLocation();

  const [dataDokter, setDataDokter] = useState([]);
  const [dataPraktek, setDataPraktek] = useState([]);
  const [filterDataPraktek, setFilterDataPraktek] = useState(params.state?.id ? params.state.id : '');

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
    id_dokter: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Dokter tidak boleh kosong'),
    // hari_praktek: yup.string()
    //   // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
    //   .required('Hari Praktek tidak boleh kosong'),
    status_operasional: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Status Operasional tidak boleh kosong'),
    // waktu_mulai_praktek: yup.string()
    //   // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
    //   .required('Waktu Mulai Praktek harus diisi'),
    // waktu_selesai_praktek: yup.string()
    //   // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
    //   .required('Waktu Selesai Praktek harus diisi'),
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
      const response = await getDetailPraktekByIdPraktek(filterDataPraktek, stateUser.data.token);

      if (response.status === 200) {
        setDataDetailPraktek(response.data.data);
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
  }, [dataDokter]);

  // when id praktek choosen
  useEffect(() => {
    if (filterDataPraktek !== '') {
      console.log(filterDataPraktek);
      fetchData();
    }
  }, [filterDataPraktek]);

  useEffect(() => {
    // fetchData();
    setIsFirstRender(false);
    fetchDataPraktek();
  }, []);
  const fetchDataDokter = async () => {
    try {
      const response = await getAllDokter(stateUser.data.token);

      if (response.status === 200) {
        const { data } = response.data;
        const dataDokterFilter = data.filter((item) => !dataDetailPraktek.some((itemCompare) => item.id_dokter == itemCompare.id_dokter));

        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataDokter(dataDokterFilter);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataPraktek = async () => {
    try {
      const response = await getAllPraktek(stateUser.data.token);

      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataPraktek(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fillFormField = (row) => {
    setFormField({
      ...row,
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),
      // waktu_mulai_praktek: row.jam_praktek?.split('-')[0].split('.').join(':'),
      // waktu_selesai_praktek: row.jam_praktek?.split('-')[1].split('.').join(':'),

    });
  };
  const onClickTambahHandler = () => {
    setFormField({ ...initialState });
    setIsEdit(false);
    fetchDataDokter();
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);

    setIsEdit(true);
    fetchDataDokter();

    // setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillFormField(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  const onChangeFilterDataPraktek = (e) => {
    setFilterDataPraktek(e.target.value);
  };
  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      id_praktek: filterDataPraktek,
      // jam_praktek: `${formBody.waktu_mulai_praktek.split(':').join('.')}-${formBody.waktu_selesai_praktek.split(':').join('.')}`,
    };
    console.log(newFormBody);
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    await postDetailPraktek(newFormBody, stateUser.data.token).then((res) => {
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
      id_praktek: filterDataPraktek,
      // jam_praktek: `${formBody.waktu_mulai_praktek.split(':').join('.')}-${formBody.waktu_selesai_praktek.split(':').join('.')}`,
    };
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    console.log(newFormBody);
    await putDetailPraktek(formBody.id_detail_praktek, newFormBody, stateUser.data.token)
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
        await deleteDetailPraktek(row.id_detail_praktek, stateUser.data.token).then((res) => {
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

  const dataFiltered = dataDetailPraktek?.filter(
    (item) => {
      if (item.status_operasional && item.status_operasional.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.id_praktek && item.id_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.hari_praktek && item.hari_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.jam_praktek && item.jam_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nama_dokter && item.nama_dokter.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nama_poli && item.nama_poli.toLowerCase().includes(filterText.toLowerCase())) { return true; }

      return false;
    },
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
    dataDetailPraktek,
    setDataDetailPraktek,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    fetchDataDokter,
    dataDokter,
    isLoading,
    alertValue,
    setAlertValue,
    fetchDataPraktek,
    dataPraktek,
    filterDataPraktek,
    onChangeFilterDataPraktek,

  };
};

export default useDetailPraktek;
