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
  deleteInformasi, getAllInformasiFromDB, postInformasi, putInformasi, getAllRak, getAllKartuKeluarga,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {
  id_informasi: '',
  judul_informasi: '',
  isi_informasi: '',
  gambar: '',
  created_at: '',
  updated_at: '',

};

const useInformasi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataInformasi, setDataInformasi] = useState([]);
  const [dataRak, setDataRak] = useState([]);
  const [dataKartuKeluarga, setDataKartuKeluarga] = useState([]);

  const [isShowFormModal, setIsShowFormModal] = useState(false);

  const [isShowImageModal, setIsShowImageModal] = useState(false);
  const [dataImage, setDataImage] = useState('');

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
    judul_informasi: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('Judul Informasi harus diisi'),
    isi_informasi: yup.string()
      // .test('len', 'No.Telepon terdiri dari 10-13 angka', (val) => val.toString().length <= 13 && val.toString().length >= 10)
      .required('No. Kartu Keluarga harus diisi'),

    gambar: !isEdit ? yup.mixed()
      .nullable()
      .required('Gambar harus diisi')
      .test(
        'FILE_SIZE',
        'file terlalu besar',
        (value) => (
          value && (value.size / 1024 / 1024) <= 1
        ),
      )
      : yup.mixed()
        .nullable()
        .notRequired(),

    // .test(
    //   'FILE_FORMAT',
    //   'Uploaded file has unsupported format.',
    //   (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)),

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
      const response = await getAllInformasiFromDB(stateUser.data.token);

      if (response.status === 200) {
        setDataInformasi(response.data.data);

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

  const onClickImageShowHandler = (image) => {
    setIsShowImageModal(!isShowImageModal);
    setDataImage(image);
  };
  const fetchDataRak = async () => {
    try {
      // setIsLoading(true);
      const response = await getAllRak(stateUser.data.token);

      if (response.status === 200) {
        setDataRak(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
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
    fetchDataRak();
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
    const formData = new FormData();
    formData.append('judul_informasi', formBody.judul_informasi);
    formData.append('isi_informasi', formBody.isi_informasi);
    formData.append('gambar', formBody.gambar);

    await postInformasi(formData, stateUser.data.token).then((res) => {
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
    const formData = new FormData();
    formData.append('judul_informasi', formBody.judul_informasi);
    formData.append('isi_informasi', formBody.isi_informasi);
    if (formBody.gambar) {
      formData.append('gambar', formBody.gambar);
    }
    await putInformasi(formBody.id_informasi, formData, stateUser.data.token)
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
        await deleteInformasi(row.id_informasi, stateUser.data.token).then((res) => {
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

  const dataFiltered = dataInformasi
    .filter(
      (item) => {
        if (item.judul_informasi && item.judul_informasi.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.isi_informasi && item.isi_informasi.toLowerCase().includes(filterText.toLowerCase())) { return true; }

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
    fetchDataRak,
    onCloseFormModal,
    onCloseDetailModal,
    onSubmitEditHandler,
    onClickDeleteHandler,
    onClickShowFormHandler,
    dataFiltered,
    dataInformasi,
    setDataInformasi,
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
    isShowImageModal,
    setIsShowImageModal,
    dataImage,
    onClickImageShowHandler,

  };
};

export default useInformasi;
