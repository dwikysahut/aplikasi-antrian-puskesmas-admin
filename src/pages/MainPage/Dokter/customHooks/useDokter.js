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
  dateConvert, errorFetch, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteDokter, getAllDokter, postDokter, putDokter,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  id_dokter: '',
  nama_dokter: '',
  no_telepon: '',
  alamat: '',
  jenis_kelamin: '',

};

const useDokter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataDokter, setDataDokter] = useState([]);
  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertValue, setAlertValue] = useState({ color: '', text: '', isOpen: false });

  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [formField, setFormField] = useState({
    id_dokter: '',
    nama_dokter: '',
    no_telepon: '',
    alamat: '',
    jenis_kelamin: '',
  });

  const stateUser = useSelector(({ reducerUser }) => reducerUser);
  const [filterText, setFilterText] = React.useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const formValidationSchema = yup.object().shape({
    id_dokter: yup.number().required('ID Dokter harus diisi').positive().typeError('ID Dokter harus berisikan angka'),
    nama_dokter: yup.string().required('Nama Dokter harus diisi'),
    no_telepon: yup.string()
      .min(10, 'No.Telepon terdiri dari 10-13 angka')
      .max(13, 'No.Telepon terdiri dari 10-13 angka')
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('No telepon harus diisi')
      .typeError('Nomor Telepon terdiri dari angka'),
    alamat: yup.string().required('Alamat harus diisi'),
    jenis_kelamin: yup.string().required('Jenis Kelamin harus diisi'),

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
      const response = await getAllDokter(stateUser.data.token);

      if (response.status === 200) {
        setDataDokter(response.data.data);
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
  }, []);

  const fillFormField = (row) => {
    setFormField({
      ...row,
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),
    });
  };
  const onClickTambahHandler = () => {
    setIsEdit(false);
    setFormField({ ...initialState });
    setIsShowFormModal(!isShowFormModal);
  };

  const onClickEditHandler = (row) => {
    fillFormField(row);

    setIsEdit(true);
    setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillFormField(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    await postDokter(formBody, stateUser.data.token).then((res) => {
      if (res.status === 201) {
        swalCallback(successfullyMessage.post, 'success');
        resetForm();
        fetchData();
        setIsShowFormModal(!isShowFormModal);
      }
    }).catch((error) => {
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
    delete newFormBody.id_dokter;
    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    await putDokter(formBody.id_dokter, newFormBody, stateUser.data.token)
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
        await deleteDokter(row.id_dokter, stateUser.data.token).then((res) => {
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

  const dataFiltered = dataDokter
    .filter(
      (item) => {
        if (item.id_dokter && item.id_dokter.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.nama_dokter && item.nama_dokter.toLowerCase().includes(filterText.toLowerCase())) { return true; }
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
    dataDokter,
    setDataDokter,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    formField,
    setFormField,
    stateUser,
    fetchData,
    isLoading,
    alertValue,
    setAlertValue,
  };
};

export default useDokter;
