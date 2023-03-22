/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmationMessage, errorType, successfullyMessage } from '../../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, errorFetch, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteDetailAntrian, getAllDetailAntrian, postDetailAntrian, putDetailAntrian, getAllPraktek, getAllUsers, getAllPasien, getAllPoli, getDetailAntrianByIdAntrian, getAllTahapPelayanan, getAllAntrian,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  id_detail_antrian: '',
  id_tahap_pelayanan: '',
  id_antrian: '',
  total_dokter: '',
  waktu_mulai_pelayanan: '',
  waktu_selesai_pelayanan: '',
  created_at: '',
  updated_at: '',
  nomor_antrian: '',
  urutan: '',
  status_hadir: '',
  status_antrian: '',
  nama_tahap_pelayanan: '',

};

const useDetailAntrian = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataPraktek, setDataPraktek] = useState([]);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [dataDetailAntrian, setDataDetailAntrian] = useState([]);

  const [dataTahapPelayanan, setDataTahapPelayanan] = useState([]);

  const params = useLocation();
  const [filterDataAntrian, setFilterDataAntrian] = useState(params.state?.id ? params.state.id : '');

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
    id_poli: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Poli tidak boleh kosong'),
    status_operasional: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Status Operasional tidak boleh kosong'),
    waktu_pelayanan: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Waktu Pelayanan harus diisi'),
    kuota_booking: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Kuota Booking harus diisi'),
    jumlah_pelayanan: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Jumlah Pelayanan Tersedia harus diisi'),
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
  useEffect(() => {
    if (stateUser.isRejectedRefreshToken) {
      logout();
    }
  }, [stateUser.isRejectedRefreshToken]);

  useEffect(() => {
    if (filterDataAntrian !== '') {
      fetchData();
    }
  }, [filterDataAntrian]);

  useEffect(() => {
    fetchDataAntrian();
  }, []);

  useEffect(() => {
    if (dataTahapPelayanan?.length > 0) {
      setIsShowFormModal(!isShowFormModal);
    }
  }, [dataTahapPelayanan]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getDetailAntrianByIdAntrian(filterDataAntrian, stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataDetailAntrian(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };

  const fetchDataAntrian = async () => {
    try {
      const response = await getAllAntrian(stateUser.data.token);
      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataAntrian(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };

  const fetchDataTahapPelayanan = async () => {
    try {
      const response = await getAllTahapPelayanan(stateUser.data.token);
      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataTahapPelayanan(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fillFormField = (row) => {
    setFormField({
      ...row,
      tanggal_periksa: dateOnlyConvert(row.tanggal_periksa),
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),

    });
  };
  const onClickTambahHandler = () => {
    setIsEdit(false);
    fetchDataTahapPelayanan();
    setFormField({ ...initialState });
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);

    setIsEdit(true);
    fetchDataTahapPelayanan(row.id_poli);
    // setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillFormField(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    console.log(formBody);
    const newFormBody = {
      ...formBody,
    };
    delete newFormBody.kode_rak;
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    await postDetailAntrian(newFormBody, stateUser.data.token).then((res) => {
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
    };

    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    console.log(newFormBody);
    await putDetailAntrian(formBody.id_praktek, newFormBody, stateUser.data.token)
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
        await deleteDetailAntrian(row.no_rm, stateUser.data.token).then((res) => {
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

  const dataFiltered = dataDetailAntrian?.filter(
    (item) => {
      if (item.id_antrian && item.id_antrian.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nomor_antrian && item.nomor_antrian.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.id_praktek && item.id_praktek.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }

      // if (item.dokter_tersedia && item.dokter_tersedia.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      // if (item.nama_poli && item.nama_poli.toLowerCase().includes(filterText.toLowerCase())) { return true; }

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
    dataPraktek,
    setDataPraktek,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchDataAntrian,
    filterDataAntrian,
    dataAntrian,
    dataTahapPelayanan,
    isLoading,
    alertValue,
    setAlertValue,
    setFilterDataAntrian,
  };
};

export default useDetailAntrian;
