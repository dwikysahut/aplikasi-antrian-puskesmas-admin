/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { confirmationMessage, errorType, successfullyMessage } from '../../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, errorFetch, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteUser, getAllUsers, postUser, putUser, getAllKartuKeluarga, accountVerifyUser,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  user_id: '',
  nama_user: '',
  no_kk: '',
  email: '',
  verif_email: '',
  role: '',
  no_telepon: '',
  jenis_kelamin: '',
  tanggal_lahir: '',

};

const useUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataUsers, setDataUsers] = useState([]);
  const [dataRak, setDataRak] = useState([]);
  const [dataKartuKeluarga, setDataKartuKeluarga] = useState([]);

  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState('List');
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
    user_id: yup.number()
      .test('len', 'User ID/NIK terdiri dari 16 angka', (val) => val?.toString().length === 16)
      .required('User ID harus diisi')
      .typeError('No. Rekam Medis terdiri dari angka'),

    nama_user: yup.string()
      .required('Nama User harus diisi'),
    no_telepon: yup.number()
      .test('len', 'No. Telepon terdiri dari 10 - 13 angka', (val) => val?.toString().length >= 10 && val?.toString().length <= 13)
      .required('No. Kartu Keluarga harus diisi'),
    role: yup.string()
      .required('Role harus dipilih'),
    no_kk: yup.number()
      .when('role', {
        is: (role) => role && parseInt(role, 10) == 3,
        then: yup.number().test('len', 'No. KK terdiri dari 16 angka', (val) => val?.toString().length === 16)
          .required('No. Kartu Keluarga harus diisi'),
      }),

    kepala_keluarga: yup.string().when('role', {
      is: (role) => role && parseInt(role, 10) == 3,
      then: yup.string().required('Nama Kepala Keluarga harus diisi'),
    }),

    email: yup.string()
      .required('Email harus diisi'),
    verif_email: yup.string()
      .required('Verifikasi Email harus dipilih'),
    jenis_kelamin: yup.string()
      .required('Jenis Kelamin harus dipilih'),
    tanggal_lahir: yup.string()
      .required('Tanggal lahir harus dipilih'),
    // id_rak: yup.string().required('Kode Rak harus Diisi'),

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
      const response = await getAllUsers(stateUser.data.token);

      if (response.status === 200) {
        setDataUsers(response.data.data);

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

  useEffect(() => {
    fetchData();
    fetchDataKartuKeluarga();
  }, []);

  const fetchDataKartuKeluarga = async () => {
    try {
      const response = await getAllKartuKeluarga(stateUser.data.token);

      if (response.status === 200) {
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataKartuKeluarga(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fillFormField = (row) => {
    console.log(row.verifikasi_email);
    row.verifikasi_email_pengguna = parseInt(row.verif_email, 10) === 1 ? 'Sudah' : 'Belum';
    row.verifikasi_akun_pengguna = parseInt(row.verif_akun, 10) === 1 ? 'Sudah' : 'Belum';
    row.role_akun = row.role === 1 ? 'Administrator' : (row.role === 2 ? 'Petugas' : 'Pasien');
    setFormField({
      ...row,

      tanggal_lahir: dateOnlyConvert(row.tanggal_lahir),
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),

    });
  };
  const onClickTambahHandler = () => {
    fetchDataKartuKeluarga();

    setIsEdit(false);
    setFormField({ ...initialState });
    setIsShowFormModal(!isShowFormModal);
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);
    fetchDataKartuKeluarga();
    setIsEdit(true);
    setIsShowFormModal(!isShowFormModal);
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
    await postUser(newFormBody, stateUser.data.token).then((res) => {
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
    delete newFormBody.user_id;

    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    delete newFormBody.verifikasi_email_pengguna;
    delete newFormBody.verifikasi_akun_pengguna;
    delete newFormBody.role_akun;
    console.log(newFormBody);
    await putUser(formBody.user_id, newFormBody, stateUser.data.token)
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
        await deleteUser(row.user_id, stateUser.data.token).then((res) => {
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
  const onClickVerifikasiHandler = async (row, value) => {
    const formBody = {
      verif_akun: value,
      user_id: row.user_id,
    };
    try {
      const response = await accountVerifyUser(formBody);
      if (response.status == 200) {
        swalCallback(response.data.message, 'success');
        fetchData();
      }
    } catch (error) {
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };

  const onClickTabHandler = (value) => {
    setTabValue(value);
  };
  const dataFiltered = dataUsers
    .filter(
      (item) => {
        if (item.user_id && item.user_id.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.no_kk && item.no_kk.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.jenis_kelamin && item.jenis_kelamin.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.nama_user && item.nama_user.toLowerCase().includes(filterText.toLowerCase())) { return true; }

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
    dataRak,
    dataUsers,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataRekamMedis: dataUsers,
    setDataUsers,
    dataKartuKeluarga,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    fetchDataKartuKeluarga,
    isLoading,
    alertValue,
    setAlertValue,
    onClickVerifikasiHandler,
    tabValue,
    onClickTabHandler,

  };
};

export default useUsers;
