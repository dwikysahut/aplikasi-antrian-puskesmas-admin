/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {
  useState, useCallback, useMemo, useEffect, useRef,
} from 'react';

import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createSearchParams, useLocation, useNavigate, useSearchParams,
} from 'react-router-dom';
import queryString from 'query-string';
import { useSpeechSynthesis } from 'react-speech-kit';
import {
  confirmationMessage, errorType, successfullyMessage, URL_BASE,
} from '../../../../utils/CONSTANT';
import {
  dateConvert, dateOnlyConvert, errorFetch, showAlert, swalCallback, swalConfirmation,
} from '../../../../utils/functionHelper';
import {
  deleteAntrian, getAllAntrian, postAntrian, putAntrian, getAllPraktek, getAllUsers, getAllPasien, getAllPoli, getAllAntrianByFilter, getPasienById, getAllKartuKeluarga, getAllRak, getPasienAntrianById, putStatusAntrian, publishNotifikasi,
} from '../../../../utils/http';
import { logoutUserActionCreator, refreshTokenActionCreator } from '../../../../redux/actions/userAction';
import { speechText, statusAntrian } from '../../../../utils/DATA';
import socketInstance from '../../../../utils/SocketIoConfig';

const initialState = {

  alamat:
  '',

  bpjs:
  '',

  daftar_dengan_bpjs:
  0,

  id_rak:
  '',
  jenis_kelamin:
  '',
  kecamatan:
  '',
  keluhan:
  '',
  kelurahan:
  '',
  kepala_keluarga:
  '',

  kode_rak:
  '',

  nama:
  '',

  no_kk:
  '',
  no_rm:
  '',
  no_telepon:
  '',
  nomor_kartu_bpjs:
  '',
  pekerjaan:
  '',
  pendidikan_terakhir:
  '',
  prioritas:
  '',
  keluhan:
  '',
  id_praktek:
  '',

  rt:
  '',
  rw:
  '',
  status_anggota_keluarga:
  '',
  tanggal_lahir:
  '',
  tempat_lahir:
  '',

  ttl:
  '',
  url_foto_kartu_identitas:
  '',

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
  const [isChecked, setIsChecked] = useState(false);
  const [dataDetailRM, setDataRM] = useState([]);
  const [tabValue, setTabValue] = useState('List');
  // const [socket, setSocket] = useState(io(URL_BASE));
  const [stateFilter, setStateFilter] = useState({ tanggal_periksa: '', id_praktek: '', isSocket: true });
  const socketRef = useRef();
  const [isShowButtonModal, setIsShowButtonModal] = useState(false);
  const [isShowFormModal, setIsShowFormModal] = useState(false);
  const [isFilterSubmitClicked, setIsFilterSubmitClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRenderSocket, setIsRenderSocket] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [alertValue, setAlertValue] = useState({ color: '', text: '', isOpen: false });
  const [searchParams] = useSearchParams();

  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [formField, setFormField] = useState({
    ...initialState,

  });

  const stateUser = useSelector(({ reducerUser }) => reducerUser);
  const [filterText, setFilterText] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const { speak, voices, rate } = useSpeechSynthesis();

  const formValidationSchema = yup.object().shape({
    nik: yup.string()
      .test('len', 'NIK terdiri dari 16 digit', (val) => val?.toString().length >= 16)
      .nullable(true)
      .required('NIK harus diisi'),

    nama: yup.string()
      .nullable(true)
      .required('Nama harus diisi'),

    no_telepon: yup.string()
      .test('len', 'No.Telepon terdiri 10 - 13 digit', (val) => val?.toString().length <= 13 && val.toString().length >= 10)
      .nullable(true)

      .required('No. Telepon harus diisi'),

    bpjs: yup.string()
      .nullable(true)
      .required('Status BPJS harus diisi'),

    nomor_kartu_bpjs: yup.string()
      .when('bpjs', {
        is: (value) => value && value === '1',
        then: yup.string()
          .test('len', 'No. Kartu BPJS terdiri dari 16 digit', (val) => val?.toString().length == 16)

          .required('Nomor kartu BPJS harus diisi'),
      }).nullable(true),
    pekerjaan: yup.string()
      .nullable(true)
      .required('Pekerjaan harus diisi'),
    no_kk: yup.string()
      .nullable(true)
    //   .test('len', 'No. KK terdiri dari 16 digit', (val) => val?.toString().length == 16)
      .required('No. KK  harus diisi'),
    kepala_keluarga: yup.string()
      .nullable()
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
      .nullable(true)
      .required('Alamat harus diisi'),
    rt: yup.string()
      .nullable(true)
      .required('RT harus diisi'),
    rw: yup.string()
      .nullable(true)
      .required('RW harus diisi'),
    kecamatan: yup.string()
      .nullable(true)
      .required('Kecamatan harus diisi'),
    kelurahan: yup.string()
      .nullable(true)
      .required('Kelurahan harus diisi'),
    tempat_lahir: yup.string()
      .nullable(true)
      .required('Tempat Lahir harus diisi'),
    tanggal_lahir: yup.string()
      .nullable(true)
      .required('Tanggal Lahir harus diisi'),
    pendidikan_terakhir: yup.string()
      .nullable(true)
      .required('Pendidikan Terakhir harus diisi'),
    status_anggota_keluarga: yup.string()
      .nullable(true)
      .required('Status Anggota Keluraga harus diisi'),
    id_praktek: yup.string()
      .nullable(true)
      .required('Poli Tujuan harus dipilih'),
    // user_id: yup.string()
    //   .required('User ID Tujuan harus diisi'),
    tanggal_periksa: yup.string()
      .nullable(true)
      .required('Tanggal Periksa harus diisi'),
    prioritas: yup.string()
      .nullable(true)
      .required('Tingkat Prioritas Pasien harus dipilih'),
    daftar_dengan_bpjs: yup.string()
      .nullable(true)
      .required('Field Belum Dipilih'),
    keluhan: yup.string()
      .nullable(true)
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
    console.log('fetch');
    if (stateFilter.id_praktek !== '' || stateFilter.tanggal_periksa !== '') {
      const newStateFilter = {
        id_praktek: stateFilter.id_praktek || '',
        tanggal_periksa: stateFilter.tanggal_periksa || '',
        // query: 'status_antrian = 4 OR',
      };
      await fetchAntrianFilter(queryString.stringify(newStateFilter));
    } else {
      await fetchAllAntrian();
    }
  };

  const fetchAllAntrian = async (query) => {
    try {
      if (isFirstRender) {
        setIsLoading(true);
      }
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
      if (isFirstRender) {
        setIsLoading(true);
      }
      const response = await getAllAntrianByFilter(query, stateUser.data.token);

      if (response.status === 200) {
        console.log(response.data.data);
        console.log(response.data.data.filter((item) => item.id_praktek == 2 && item.status_antrian == 4));
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
        console.log(response.data.data);
        // const filteredResponse = response.data.data.filter((item) => item.no_rm == null);
        setDataPraktek(response.data.data.sort((a, b) => a.id_praktek - b.id_praktek));
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
    const recentPath = location.pathname.split('/').filter((item) => item !== '');
    const newStateFilter = {

      tanggal_periksa: stateFilter.tanggal_periksa || '',
      id_praktek: stateFilter.id_praktek || '',
    };
    fetchData();
    navigate({
      pathname: `/${recentPath[0]}/${recentPath[1]}`,
      search: `?${createSearchParams({
        ...newStateFilter,
      })}`,
    });
    setIsFilterSubmitClicked(true);
    setResetPaginationToggle(!resetPaginationToggle);

    // console.log(`${recentPath[0]}/${recentPath[1]}`);
  };

  const onFilterResetHandler = (e) => {
    setStateFilter({ id_praktek: '', tanggal_periksa: '' });
    setIsFilterSubmitClicked(false);
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
    socketRef.current = socketInstance();
    // socket.emit('user-connected', stateUser.data.user_id, '', 'web');
    socketRef.current.on('server-addAntrian', (result) => {
      console.log('fetch baru');

      // console.log(searchParams.get('tanggal_periksa'));
      // setStateFilter({ tanggal_periksa: searchParams.get('tanggal_periksa'), id_praktek: searchParams.get('id_praktek') });

      // menandakan bahwa ada event dari socket maka set is socket true dan agar mendapatkan state filter sebelumnya
      setStateFilter((prevState) => ({ ...prevState, isSocket: true }));
      // setIsRenderSocket(true);

      // fetchDataPraktek();
    });
    socketRef.current.on('server-editAntrian', ({ result }) => {
      console.log('edit nih');

      setStateFilter((prevState) => ({ ...prevState, isSocket: true }));

      // setDataAntrian(dataAntrian.map(item=>item.id_antrian==result.id_antrian?{...result}:{...item}))
      // fetchDataPraktek();
    });
    socketRef.current.on('server-swapAntrian', ({ result }) => {
      console.log('edit nih');

      setStateFilter((prevState) => ({ ...prevState, isSocket: true }));

      // setDataAntrian(dataAntrian.map(item=>item.id_antrian==result.id_antrian?{...result}:{...item}))
      // fetchDataPraktek();
    });

    return () => {
      socketRef.current.off('server-addAntrian');
      socketRef.current.off('server-editAntrian');
    };
  }, []);

  useEffect(() => {
    // saat ada event dari socket maka fetch data
    if (stateFilter.isSocket) {
      fetchData();
      //
      setStateFilter((prevState) => ({ ...prevState, isSocket: false }));
    }
  //   if (socketRef.current && stateFilter) {
  //     socketRef.current.on('server-addAntrian', (result) => {
  //       console.log('fetch baru');
  //       console.log(stateFilter);
  //       // console.log(searchParams.get('tanggal_periksa'));
  //       // setStateFilter({ tanggal_periksa: searchParams.get('tanggal_periksa'), id_praktek: searchParams.get('id_praktek') });
  //       // setIsRenderSocket(true);
  //       fetchData();
  //     // fetchDataPraktek();
  //     });
  //     socketRef.current.on('server-editAntrian', ({ result }) => {
  //       console.log('edit nih');
  //       fetchData();
  //     // setDataAntrian(dataAntrian.map(item=>item.id_antrian==result.id_antrian?{...result}:{...item}))
  //     // fetchDataPraktek();
  //     });
  //   }
  }, [stateFilter]);
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
          console.log(formField);
          // if (response.data.data.kuota_daftar < 1) {
          //   showAlert('danger', 'Kuota Daftar Pasien Tidak Tersedia', setAlertValue);
          //   // setFormField((prevState) => ({ ...prevState, ...initialState }));
          //   fillForm({ ...initialState });
          // } else {
          showAlert('success', 'Data Pasien tersedia dan dapat melakukan pendaftaran', setAlertValue);
          setIsChecked(true);
          fillForm(response.data.data);
          // }
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.status == 404) {
          showAlert('warning', 'Data dengan NIK tersebut belum pernah terdaftar sebagai pasien', setAlertValue);
          setIsChecked(true);
          setFormField((prevState) => ({ ...prevState }));
          // try {
          //   const response = await getPasienById(nikField, stateUser.data.token);
          //   fillForm(response.data.data);

          // } catch (err) {
          //   console.log(err);
          //   showAlert('danger', 'Data Pasien tidak ditemukan', setAlertValue);
          // }
        } else {
          console.log(error);
          errorFetch(error, navigate, setAlertValue, logout, authRefreshToken);
        }
      }
    }
  };

  const convertJsonToObjectForm = (row) => ({
    ...row,
    created_at: dateConvert(row.created_at),
    tempat_lahir: row.ttl?.split(',')[0],
    tanggal_lahir: row.ttl?.split(',')[1],

    updated_at: dateConvert(row.updated_at),
    daftar_dengan_bpjs: initialState?.daftar_dengan_bpjs || 0,

  });
  const fillForm = (row) => {
    const formData = convertJsonToObjectForm(row);
    if (!isEdit) {
      formData.tanggal_periksa = dateOnlyConvert(row.tanggal_periksa || null);
    }
    console.log(row.tanggal_periksa);
    setFormField((prevState) => ({ ...prevState, ...formData }));
    console.log(row);
  };
  const onClickTambahHandler = () => {
    setIsEdit(false);
    // fetchDataPraktek();
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
            // await fetchData();
            console.log(formField);

            if (cb) {
              cb(convertJsonToObjectForm(response.data.data));
              // onClickEditHandler({ ...formField });
              console.log(response.data.data);
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
          // await fetchData();

          if (cb) {
            cb(convertJsonToObjectForm(response.data.data));
            // onClickEditHandler({ ...formField });
            console.log(response.data.data);
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
            // fetchData();
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

          // fetchData();
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
    // pakai ini(setformfield) agar tidak convert date 2 kali di fillform
    console.log(row);
    if (row.tanggal_periksa.split('/').length > 1) setFormField(row);
    else fillForm(row);

    setIsEdit(true);
    fetchDataPraktek();
    fetchDataRak();
    fetchDataAllPasien();
    // parameter kartu keluarga sebagai tolak ukur di use effect kapan form modal true
    fetchDataKartuKeluarga();
    // setIsShowFormModal(!isShowFormModal);
  };
  const onClickDetailShowHandler = useCallback((row) => {
    fillForm(row);
    setIsShowDetailModal(!isShowDetailModal);
  }, [formField, isShowDetailModal]);

  // post
  const onSubmitTambahHandler = async (formBody, { resetForm }) => {
    if (!isChecked) {
      return showAlert('danger', 'Pastikan klik tombol Cek NIK dan Kuota Pasien Tersedia', setAlertValue);
    }
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
        setFormField({ ...initialState });
        // setIsEdit(false);
        setIsChecked(false);
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
    if (!isChecked) {
      return showAlert('danger', 'Pastikan klik tombol Cek NIK dan Kuota Pasien Tersedia', setAlertValue);
    }
    const newFormBody = {
      ...formBody,
      status_antrian: formBody.status_antrian + 1,
      ttl: `${formBody.tempat_lahir},${formBody.tanggal_lahir}`,

    };

    delete newFormBody.created_at;
    delete newFormBody.updated_at;
    console.log(newFormBody);
    await putAntrian(formBody.id_antrian, newFormBody, stateUser.data.token)
      .then((res) => {
        console.log(res);
        // swal
        if (res.status === 200) {
          // swalCallback(successfullyMessage.edit, 'success');
          console.log(newFormBody);
          // di +1 lagi agar yang awalnya 1 (krn tidak ambil  perubahan terbaru)
          // menjadi 2 dari atas dan menjadi 3 setelah proses berikut
          onUpdateStatusAntrianHandler(false, newFormBody.id_antrian, newFormBody.status_antrian);
          onCloseButtonModal();
          setIsEdit(false);
          setIsChecked(false);

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
  const onClickTabHandler = (value) => {
    setTabValue(value);
  };

  const panggilHandler = async (type, data) => {
    try {
      const setDataPublish = {
        title: '',
        body: '',
        user_id: data.user_id,
      };

      let sentences = `${speechText.opening} ${data.nomor_antrian.split('-')[0]}, ${data.nomor_antrian.split('-')[1]}. ${speechText.verb}`;
      if (type == 'poli') {
        setDataPublish.title = 'Panggilan menuju Poli';
        setDataPublish.body = `Nomor Antrian ${data.nomor_antrian} milik anda telah dipanggil, silahkan menuju poli`;
        sentences += speechText.poli;
      } else {
        setDataPublish.title = 'Panggilan menuju Loket Pendaftaran';
        setDataPublish.body = `Nomor Antrian ${data.nomor_antrian} milik anda telah dipanggil, silahkan menuju loket pendaftaran`;

        sentences += speechText.loket;
      }
      const response = await publishNotifikasi(setDataPublish, stateUser.data.token);
      if (response.status == 201) {
        console.log('berhasil');
      }
      speak({
        text: sentences,
        voice: voices[56],
        rate: 0.8,
        pitch: 1.1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const dataFiltered = dataAntrian?.filter(
    (item) => {
      if (item.id_antrian && item.id_antrian.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.nik && item.nik.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.tanggal_periksa && item.tanggal_periksa.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.user_id && item.user_id.toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
      if (item.status_antrian && statusAntrian[item.status_antrian - 1].toString().toLowerCase().includes(filterText.toLowerCase())) { return true; }
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
    isChecked,
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
    onClickTabHandler,
    tabValue,
    isFirstRender,
    isFilterSubmitClicked,
    panggilHandler,
  };
};

export default useAntrian;
