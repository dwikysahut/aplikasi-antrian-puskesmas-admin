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
  dateConvert, dateOnlyConvert, errorFetch, swalCallback, swalConfirmation, showAlert,
} from '../../../../utils/functionHelper';
import {
  deletePasien, getAllPasien, getPasienById, postPasien, putPasien, getAllKartuKeluarga,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

import storage from '../../../../utils/firebaseConfig';

const initialState = {
  nik: '',
  no_kk: '',
  // id_rak: '',
  // kode_rak: '',
  nama: '',
  ttl: '',
  jenis_kelamin: '',
  rt: '',
  rw: '',
  kelurahan: '',
  kecamatan: '',
  no_telepon: '',
  bpjs: '',
  no_kartu_bpjs: '',
  pekerjaan: '',
  kuota_daftar: '',
  url_foto_kartu_identitas: '',
  pendidikan_terakhir: '',
  status_anggota_kel: '',
  tanggal_lahir: '',
  tempat_lahir: '',

};

const usePasien = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataPasien, setDataPasien] = useState([]);
  const [dataKartuKeluarga, setDataKartuKeluarga] = useState([]);

  const [isFirstRender, setIsFirstRender] = useState(true);

  const [isShowImageModal, setIsShowImageModal] = useState(false);
  const [dataImage, setDataImage] = useState({});

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
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'No. KK tediri dari 16 angka', (val) => val?.toString().length >= 16)
      .test('len', 'NIK terdiri dari 16 angka', (val) => val?.toString().length === 16)
      .required('NIK harus diisi')
      .typeError('NIK terdiri dari angka'),
    no_kk: yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'No. KK terdiri dari 16 angka', (val) => val?.toString().length === 16)
      .required('No. KK harus diisi')
      .typeError('No. KK terdiri dari angka'),
    // no_kk: yup.number()
    //   .test('len', 'No. KK terdiri dari 16 angka', (val) => val?.toString().length === 16)
    //   .required('No. Kartu Keluarga harus diisi'),
    kepala_keluarga: yup.string()
      .required('Nama Kepala Keluarga diisi'),
    nama: yup.string()
      .required('Nama harus diisi'),
    tempat_lahir: yup.string()
      .required('Tempat Lahir harus diisi'),
    tanggal_lahir: yup.string()
      .required('Tempat Lahir harus diisi'),
    jenis_kelamin: yup.string()
      .required('Jenis Kelamin tidak boleh kosong'),
    alamat: yup.string()
      .required('Alamat harus diisi'),
    rt: yup.string()
      .required('RT harus diisi'),
    rw: yup.string()
      .required('RW harus diisi'),
    kelurahan: yup.string()
      .required('Kelurahan harus diisi'),
    kecamatan: yup.string()
      .required('Kecamatan harus diisi'),
    no_telepon: yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'No. Telp terdiri dari 10-13 angka', (val) => val?.toString().length >= 10 && val?.toString().length <= 13)
      .required('No. Telp harus diisi')
      .typeError('No. Telp terdiri dari angka'),
    bpjs: yup.string()
      .required('Status BPJS tidak boleh kosong'),
    pekerjaan: yup.string()
      .required('Pekerjaan harus diisi'),
    kuota_daftar: yup.string()
      .required('Kuota Daftar tidak boleh kosong'),
    pendidikan_terakhir: yup.string()
      .required('Pendidikan Terakhir tidak boleh kosong'),
    status_anggota_keluarga: yup.string()
      .required('Hubungan dengan Kepala Keluarga tidak boleh kosong'),
    // no_telepon: yup.number()
    //   .test('len', 'No. Telepon terdiri dari 10 - 13 angka', (val) => val?.toString().length >= 10 && val?.toString().length <= 13)
    //   .required('No. Kartu Keluarga harus diisi'),
    // role: yup.string()
    //   .required('Role harus dipilih'),
    // email: yup.string()
    //   .required('Email harus diisi'),
    // verif_email: yup.string()
    //   .required('Verifikasi Email harus dipilih'),
    // jenis_kelamin: yup.string()
    //   .required('Jenis Kelamin harus dipilih'),
    // tanggal_lahir: yup.string()
    //   .required('Tanggal lahir harus dipilih'),
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
      const response = await getAllPasien(stateUser.data.token);

      if (response.status === 200) {
        console.log(response);
        setDataPasien(response.data.data);

        setIsLoading(false);
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

  const checkNik = async (nik) => {
    if (nik.toString().length !== 16) {
      showAlert('danger', 'NIK terdiri dari 16 digit', setAlertValue);
    } else {
      try {
        const response = await getPasienById(nik, stateUser.data.token);

        if (response.status === 200) {
          showAlert('danger', 'NIK Sudah Terdaftar', setAlertValue);
          // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
          setIsEdit(true);
          fillFormField(response.data.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.status == 404) {
          showAlert('success', 'NIK Belum Tersedia dan Dapat Digunakan', setAlertValue);
        } else {
          console.log(error);
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        }
      }
    }
  };

  useEffect(() => {
    if (stateUser.isRejectedRefreshToken) {
      logout();
    }
  }, [stateUser.isRejectedRefreshToken]);

  useEffect(() => {
    if (!isFirstRender) {
      setIsShowFormModal(!isShowFormModal);
    }
  }, [dataKartuKeluarga]);

  useEffect(() => {
    setIsFirstRender(false);
    fetchData();
  }, []);

  const fillFormField = (row) => {
    console.log(isEdit);
    setFormField({
      ...row,
      status_bpjs: row.bpjs === 1 ? 'BPJS' : 'NON BPJS',
      tanggal_lahir: row.ttl.split(',')[1],
      tempat_lahir: row.ttl?.split(',')[0],
      created_at: dateConvert(row.created_at),
      updated_at: dateConvert(row.updated_at),

    });
  };

  const onClickTambahHandler = () => {
    setIsEdit(false);
    setFormField({ ...initialState });
    fetchDataKartuKeluarga();
  };

  const onClickEditHandler = (row) => {
    setIsEdit(true);
    fillFormField(row);
    fetchDataKartuKeluarga();
  };
  const onClickDetailShowHandler = useCallback((row) => {
    setIsEdit(false);
    setIsShowDetailModal(true);
    fillFormField(row);
  }, [formField, isShowDetailModal, isEdit]);

  const onClickImageShowHandler = (row) => {
    setIsShowImageModal(!isShowImageModal);
    setDataImage({ nik: row.nik, image: row.url_foto_kartu_identitas });
  };

  // const showAlert = (type, text) => {
  //   setAlertValue({ isOpen: true, color: type, text });
  //   setTimeout(() => {
  //     setAlertValue({ isOpen: false, color: text, text });
  //   }, 2000);
  // };
  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    await actionWithUpload(formBody, postPasien, resetForm);
  };

  const actionWithUpload = async (formBody, action, resetForm = () => {}, editAction = false) => {
    const newFormBody = {
      ...formBody,
      ttl: `${formBody.tempat_lahir.toString().toUpperCase()},${formBody.tanggal_lahir.split('-').reverse().join('/')}`,
    };
    // upload
    const fetchAction = () => (editAction ? action(newFormBody.nik, newFormBody, stateUser.data.token) : action(newFormBody, stateUser.data.token));

    if (newFormBody.foto_kartu_identitas) { // 3 mb
      if (newFormBody.foto_kartu_identitas.size > 3000000) { // 3 mb
        setAlertValue({ isOpen: true, color: 'danger', text: 'Ukuran File Maksimal 3 Mb' });
        setTimeout(() => {
          setAlertValue({ isOpen: false, color: 'danger', text: 'Ukuran File Maksimal 3 Mb' });
        }, 2000);
      } else {
        const storageRef = storage.ref(`/images/foto-kartu-identitas-${newFormBody.nik}`);

        setAlertValue({ color: 'warning', text: 'sedang diproses...', isOpen: true });

        storageRef.put(newFormBody.foto_kartu_identitas).then(async () => {
          const url = await storageRef.getDownloadURL();
          newFormBody.url_foto_kartu_identitas = url;

          await fetchAction().then((res) => {
            console.log(res);
            if (res.status === 201 || res.status === 200) {
              setAlertValue({ ...alertValue, isOpen: false });

              swalCallback(editAction ? successfullyMessage.edit : successfullyMessage.post, 'success');

              resetForm();
              fetchData();
              setIsShowFormModal(!isShowFormModal);
            }
          }).catch((error) => {
            errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
          }).catch(() => {
            showAlert('danger', 'Upload Gambar Gagal', setAlertValue);
          });
        });
      }
    } else {
      setAlertValue({ color: 'warning', text: 'sedang diproses...', isOpen: true });

      await fetchAction().then((res) => {
        console.log(res);
        if (res.status === 201 || res.status === 200) {
          setAlertValue({ ...alertValue, isOpen: false });

          swalCallback(editAction ? successfullyMessage.edit : successfullyMessage.post, 'success');

          resetForm();
          fetchData();
          setIsShowFormModal(!isShowFormModal);
        }
      }).catch((error) => {
        errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
      });
    }
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
    await actionWithUpload(formBody, putPasien, resetForm, true);
  };

  const onClickDeleteHandler = (row) => {
    swalConfirmation(
      confirmationMessage.confirm,
      async () => {
        const storageRef = storage.ref(`/images/foto-kartu-identitas-${row.nik}`);
        if (row.url_foto_kartu_identitas) {
          try {
            await storageRef.delete();
          } catch (error) {
            setAlertValue({ color: 'danger', text: 'Oops.. Terjadi kesalahan penghapusan gambar' });
          }
        }
        await deletePasien(row.nik, stateUser.data.token).then((res) => {
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

  // for open edit from detail
  const onClickShowFormHandler = () => {
    setIsEdit(true);
    setIsShowDetailModal(!isShowDetailModal);

    setIsShowFormModal(!isShowFormModal);
  };

  const dataFiltered = dataPasien
    .filter(
      (item) => {
        if (item.nik && item.nik.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.no_kk && item.no_kk.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.jenis_kelamin && item.jenis_kelamin.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.jenis_kelamin && item.jenis_kelamin.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.ttl && item.ttl.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.alamat && item.alamat.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.rt && item.rt.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.rw && item.rw.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.kelurahan && item.kelurahan.toLowerCase().includes(filterText.toLowerCase())) { return true; }
        if (item.kecamatan && item.kecamatan.toLowerCase().includes(filterText.toLowerCase())) { return true; }

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
    checkNik,
    onClickImageShowHandler,
    dataImage,
    isShowImageModal,
    setIsShowImageModal,

  };
};

export default usePasien;
