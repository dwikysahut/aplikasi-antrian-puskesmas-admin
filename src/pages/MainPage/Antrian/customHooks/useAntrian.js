/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';

import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {
  confirmationMessage, errorType, successfullyMessage, URL_BASE,
} from '../../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, errorFetch, showAlert, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteAntrian, getAllAntrian, postAntrian, putAntrian, getAllPraktek, getAllUsers, getAllPasien, getAllPoli, getAllAntrianByFilter, getPasienById, getAllKartuKeluarga, getAllRak, getPasienAntrianById, putStatusAntrian,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';

const initialState = {

};

const useAntrian = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataPraktek, setDataPraktek] = useState([]);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [dataKartuKeluarga, setDataKartuKeluarga] = useState([]);
  const [dataPasien, setDataPasien] = useState([]);
  const [dataRak, setDataRak] = useState([]);
  const [dataDetailRM, setDataRM] = useState([]);

  const [stateFilter, setStateFilter] = useState({ tanggal_periksa: '', id_praktek: '' });

  const [isShowButtonModal, setIsShowButtonModal] = useState(false);
  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
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
    //   .test('len', 'NIK terdiri dari 16 digit', (val) => val?.toString().length == 16)
      .required('Poli harus diisi'),

    nama: yup.string()
      .required('Nama harus diisi'),

    no_telepon: yup.string()
      .test('len', 'No.Telepon terdiri 10 - 13 digit', (val) => val?.toString().length <= 13 && val.toString().length >= 10)
      .required('No. Telepon harus diisi'),

    bpjs: yup.string()
      .required('Status BPJS harus diisi'),

    nomor_kartu_bpjs: yup.string()
      .when('bpjs', {
        is: 1 || '1' || true,
        then: yup.string()
          .test('len', 'No. Kartu BPJS terdiri dari 16 digit', (val) => val?.toString().length == 16)

          .required('Nomor kartu BPJS harus diisi'),
      }),
    pekerjaan: yup.string()
      .required('Pekerjaan harus diisi'),
    no_kk: yup.string()
    //   .test('len', 'No. KK terdiri dari 16 digit', (val) => val?.toString().length == 16)
      .required('No. KK  harus diisi'),
    kepala_keluarga: yup.string()
      .required('Nama Kepala Keluarga harus diisi'),
    no_rm: yup.string()
      .nullable(true)
      .required('Nomor Rekam Medis harus diisi'),
    id_rak: yup.string()
      .nullable(true)
      .required('Kode Rak  harus diisi'),
    jenis_kelamin: yup.string()
      .nullable(true)

      .required('Jenis Kelamin harus diisi'),
    alamat: yup.string()
      .required('Alamat harus diisi'),
    rt: yup.string()
      .required('RT harus diisi'),
    rw: yup.string()
      .required('RW harus diisi'),
    kecamatan: yup.string()
      .required('Kecamatan harus diisi'),
    kelurahan: yup.string()
      .required('Kelurahan harus diisi'),
    tempat_lahir: yup.string()
      .required('Tempat Lahir harus diisi'),
    tanggal_lahir: yup.string()
      .required('Tanggal Lahir harus diisi'),
    pendidikan_terakhir: yup.string()
      .required('Pendidikan Terakhir harus diisi'),
    status_anggota_keluarga: yup.string()
      .required('Status Anggota Keluraga harus diisi'),
    id_praktek: yup.string()
      .required('Poli Tujuan harus diisi'),
    // user_id: yup.string()
    //   .required('User ID Tujuan harus diisi'),
    tanggal_periksa: yup.string()
      .required('Tanggal Periksa harus diisi'),
    prioritas: yup.string()
      .required('Tingkat Prioritas Pasien harus diisi'),
    daftar_dengan_bpjs: yup.string()
      .nullable(true)
      .required('Field Belum Dipilih'),
    keluhan: yup.string()
      .required('Keluhan harus diisi'),

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
    console.log(stateFilter);
    if (stateFilter.id_praktek !== '' || stateFilter.tanggal_periksa !== '') {
      await fetchAntrianFilter(queryString.stringify(stateFilter));
    } else {
      await fetchAllAntrian();
    }
  };

  const fetchAllAntrian = async (query) => {
    try {
      setIsLoading(true);
      const response = await getAllAntrian(stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataAntrian(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchAntrianFilter = async (query) => {
    try {
      setIsLoading(true);
      const response = await getAllAntrianByFilter(query, stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataAntrian(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataKartuKeluarga = async (query) => {
    try {
      const response = await getAllKartuKeluarga(stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataKartuKeluarga(response.data.data);
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
        console.log(response.data.data);
        setDataRak(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataPasienById = async (id) => {
    try {
      const response = await getPasienById(id, stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataPasien(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };
  const fetchDataAllPasien = async () => {
    try {
      const response = await getAllPasien(stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        setDataPasien(response.data.data);
      }
    } catch (error) {
      // console.log(error);
      errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
    }
  };

  const fetchDataPraktek = async (id = null) => {
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

  const onFilterChangeHandler = (e) => {
    setStateFilter({ ...stateFilter, [e.target.name]: e.target.value });
  };

  const onFilterSubmitHandler = (e) => {
    let qsQuery = '?';
    if (stateFilter.id_praktek) {
      qsQuery += `id_praktek=${stateFilter.id_praktek}`;
    }
    if (stateFilter.tanggal_periksa) {
      qsQuery += `tanggal_periksa=${stateFilter.tanggal_periksa.split('-').reverse().join('-')}`;
    }
    const recentPath = location.pathname.split('/').filter((item) => item !== '');

    fetchData();
    navigate({
      pathname: `/${recentPath[0]}/${recentPath[1]}`,
      search: `?${createSearchParams({
        ...stateFilter,
      })}`,
    });
    // console.log(`${recentPath[0]}/${recentPath[1]}`);
  };

  const onFilterResetHandler = (e) => {
    setStateFilter({ id_praktek: '', tanggal_periksa: '' });
    const recentPath = location.pathname.split('/').filter((item) => item !== '');
    navigate({
      pathname: `/${recentPath[0]}/${recentPath[1]}`,

    });
  };

  useEffect(() => {
    fetchData();
    fetchDataPraktek();
    // fetchDataRak();
    // fetchDataKartuKeluarga();
    setIsFirstRender(false);
    const socket = io(URL_BASE);
    socket.on('server-addAntrian', () => {
      fetchData();
      fetchDataPraktek();
    });
    console.log(formField);
  }, []);

  useEffect(() => {
    if (!isFirstRender) {
      setIsShowFormModal(!isShowFormModal);
    }
  }, [dataKartuKeluarga]);

  useEffect(() => {
    if (stateUser.isRejectedRefreshToken) {
      logout();
    }
  }, [stateUser.isRejectedRefreshToken]);

  useEffect(() => {
    if (stateFilter.id_praktek == '' && stateFilter.tanggal_periksa == '') {
      fetchData();
    }
  }, [stateFilter]);

  //   useEffect(() => {
  //     if (!isFirstRender) {
  //       setIsShowFormModal(!isShowFormModal);
  //     }
  //   }, [dataPasien]);

  const checkNik = async (nikField) => {
    if (nikField.toString().length < 16) {
      showAlert('danger', 'NIK terdiri dari 16 digit', setAlertValue);
    } else {
      try {
        const response = await getPasienAntrianById(nikField, stateUser.data.token);
        if (response.status == 200) {
          console.log(response.data.data);
          if (response.data.data.kuota_daftar < 1) {
            showAlert('danger', 'Kuota Daftar Pasien Tidak Tersedia', setAlertValue);
          } else {
            showAlert('success', 'Data Pasien tersedia dan dapat melakukan pendaftaran', setAlertValue);
            fillForm(response.data.data);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.status == 404) {
          showAlert('danger', 'Data NIK belum terdaftar', setAlertValue);
        } else {
          console.log(error);
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        }
      }
    }
  };

  const fillForm = (row) => {
    console.log(row.tanggal_periksa);
    setFormField({
      ...row,
      created_at: dateConvert(row.created_at),
      tempat_lahir: row.ttl?.split(',')[0],
      tanggal_lahir: row.ttl?.split(',')[1],
      tanggal_periksa: dateOnlyConvert(row.tanggal_periksa),
      updated_at: dateConvert(row.updated_at),

    });
    console.log(row);
  };
  const onClickTambahHandler = () => {
    setIsEdit(false);
    fetchDataPraktek();
    fetchDataRak();
    fetchDataAllPasien();
    fetchDataKartuKeluarga();
    fillForm({ ...initialState, user_id: stateUser.data.user_id });
  };

  const onClickAksiButtonHandler = (data) => {
    console.log(data);
    fillForm(data);
    setIsShowButtonModal(!isShowButtonModal);
  };

  const onUpdateStatusAntrianHandler = async (isConfirmation, id, value, cb = null) => {
    const body = { status_antrian: value, sumber: 'Web' };
    if (isConfirmation) {
      swalConfirmation('Yakin untuk mengubah status antrian ?', async () => {
        try {
          const response = await putStatusAntrian(id, body, stateUser.data.token);
          if (response.status === 200) {
            showAlert('success', 'Status Antrian berhasil diupdate', setAlertValue);

            // onCloseButtonModal();
            setIsShowButtonModal(false);
            await fetchData();
            if (cb) {
              // onClickEditHandler({ ...formField });
              cb(formField);

              console.log(formField);
            }
          }
          if (response.status === 204) {
            showAlert('danger', 'Update Status gagal, poli dalam keadaan penuh', setAlertValue);
          }
        } catch (error) {
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        }
      });
    } else {
      try {
        const response = await putStatusAntrian(id, body, stateUser.data.token);
        if (response.status === 200) {
          console.log(`status antrian ${value}`);
          showAlert('success', 'Status Antrian berhasil diupdate', setAlertValue);

          // onCloseButtonModal();
          setIsShowButtonModal(false);
          await fetchData();

          if (cb) {
            cb(formField);
            // onClickEditHandler({ ...formField });
            console.log(formField);
          }
        }
        if (response.status === 204) {
          showAlert('danger', 'Update Status gagal, poli dalam keadaan penuh', setAlertValue);
        }
      } catch (error) {
        errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
      }
    }
  };

  const onUpdateStatusHadirHandler = async (isConfirmation, id, value) => {
    const body = { status_hadir: value };
    if (isConfirmation) {
      swalConfirmation('Yakin untuk mengubah status kehadiran ?', async () => {
        try {
          const response = await putStatusAntrian(id, body, stateUser.data.token);
          if (response.status === 200) {
            showAlert('success', 'Status kehadiran berhasil diupdate', setAlertValue);

            // onCloseButtonModal();
            fetchData();
            fillForm(response.data.data);
          }
        } catch (error) {
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        }
      });
    } else {
      try {
        const response = await putStatusAntrian(id, body, stateUser.data.token);
        if (response.status === 200) {
          showAlert('success', 'Status kehadiran berhasil diupdate', setAlertValue);

          fetchData();
          onClickAksiButtonHandler(dataAntrian.filter((item) => item.id_antrian == id)[0]);

          // swalCallback('Status kehadiran berhasil diupdate', 'success');
          // onCloseButtonModal();
          // fetchData();
          // onClickAksiButtonHandler(dataAntrian.filter((item) => item.id_antrian == id));
        }
      } catch (error) {
        errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
      }
    }
  };

  const onClickEditHandler = (row) => {
    // fillForm(row);
    // pakai ini agar tidak convert date 2 kali di fillform
    setFormField(row);
    setIsEdit(true);
    fetchDataPraktek();
    fetchDataRak();
    fetchDataAllPasien();
    fetchDataKartuKeluarga();
    // setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillForm(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    const newFormBody = {
      ...formBody,
      user_id: stateUser.data.user_id,
      sumber: 'Web',
      ttl: `${formBody.tempat_lahir},${formBody.tanggal_lahir}`,
    };
    console.log(newFormBody);
    await postAntrian(newFormBody, stateUser.data.token).then((res) => {
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

  const onCloseButtonModal = () => {
    setIsShowButtonModal(!isShowButtonModal);
    setFormField({ ...initialState });
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
    console.log(formBody);
    const newFormBody = {
      ...formBody,
      status_antrian: formBody.status_antrian + 1,
    };

    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    console.log(newFormBody);
    await putAntrian(formBody.id_antrian, newFormBody, stateUser.data.token)
      .then((res) => {
        console.log(res);
        // swal
        if (res.status === 200) {
          swalCallback(successfullyMessage.edit, 'success');
          // di +1 lagi agar yang awalnya 1 (krn tidak ambil  perubahan terbaru)
          // menjadi 2 dari atas dan menjadi 3 setelah proses berikut
          onUpdateStatusAntrianHandler(false, newFormBody.id_antrian, newFormBody.status_antrian + 1);
          onCloseButtonModal();

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
        await deleteAntrian(row.no_rm, stateUser.data.token).then((res) => {
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
    console.log(formField);

    setIsShowFormModal(!isShowFormModal);
  };

  const dataFiltered = dataAntrian?.filter(
    (item) => {
      if (item.id_antrian && item.id_antrian.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nik && item.nik.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.tanggal_periksa && item.tanggal_periksa.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nomor_antrian && item.nomor_antrian.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.no_kk && item.no_kk.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nama && item.nama.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
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
    onClickAksiButtonHandler,
    dataAntrian,
    dataFiltered,
    dataPasien,
    dataKartuKeluarga,
    dataPraktek,
    dataRak,
    dataDetailRM,
    setDataPraktek,
    isShowFormModal,
    setIsShowFormModal,
    isShowDetailModal,
    setIsShowDetailModal,
    setIsShowButtonModal,
    isShowButtonModal,
    onCloseButtonModal,

    formField,
    setFormField,
    stateUser,
    fetchData,
    isLoading,
    alertValue,
    setAlertValue,
    stateFilter,
    onFilterChangeHandler,
    onFilterSubmitHandler,
    onFilterResetHandler,
    checkNik,
    onUpdateStatusAntrianHandler,
    onUpdateStatusHadirHandler,
  };
};

export default useAntrian;
