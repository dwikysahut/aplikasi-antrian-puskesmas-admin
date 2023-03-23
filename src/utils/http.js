/* eslint-disable max-len */
import Axios from 'axios';
// import qs from 'qs';

import { URL_BASE } from './CONSTANT';

const options = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
  timeout: 3000,
});

// auth
export const loginUser = (body) => Axios.post(`${URL_BASE}/auth/login`, body);
export const registerUser = (body) => Axios.post(`${URL_BASE}/auth/register`, body);
export const emailVerifyUser = (body) => Axios.post(`${URL_BASE}/auth/email-verify`, body);
export const accountVerifyUser = (body) => Axios.post(`${URL_BASE}/auth/account-verify`, body);
export const forgotPasswordUser = (body) => Axios.post(`${URL_BASE}/auth/forgot-password`, body);
export const refreshToken = (body) => Axios.post(`${URL_BASE}/auth/refresh-token`, body);
export const logoutUser = (body) => Axios.post(`${URL_BASE}/auth/logout`, body);

// kartu keluarga
export const getAllKartuKeluarga = (token) => Axios.get(`${URL_BASE}/kartu-keluarga`, options(token));
export const getKartuKeluargaById = (id, token) => Axios.get(`${URL_BASE}/kartu-keluarga/${id}`, options(token));
export const postKartuKeluarga = (body, token) => Axios.post(`${URL_BASE}/kartu-keluarga`, body, options(token));
export const putKartuKeluarga = (id, body, token) => Axios.put(`${URL_BASE}/kartu-keluarga/${id}`, body, options(token));
export const deleteKartuKeluarga = (id, body, token) => Axios.delete(`${URL_BASE}/kartu-keluarga/${id}`, options(token));

// dokter
export const getAllDokter = (token) => Axios.get(`${URL_BASE}/dokter`, options(token));
export const getDokterById = (id, token) => Axios.get(`${URL_BASE}/dokter/${id}`, options(token));
export const postDokter = (body, token) => Axios.post(`${URL_BASE}/dokter`, body, options(token));
export const putDokter = (id, body, token) => Axios.put(`${URL_BASE}/dokter/${id}`, body, options(token));
export const deleteDokter = (id, token) => Axios.delete(`${URL_BASE}/dokter/${id}`, options(token));

// Tahap Pelayanan
export const getAllTahapPelayanan = (token) => Axios.get(`${URL_BASE}/tahap-pelayanan`, options(token));
export const getTahapPelayananById = (id, token) => Axios.get(`${URL_BASE}/tahap-pelayanan/${id}`, options(token));
export const postTahapPelayanan = (body, token) => Axios.post(`${URL_BASE}/tahap-pelayanan`, body, options(token));
export const putTahapPelayanan = (id, body, token) => Axios.put(`${URL_BASE}/tahap-pelayanan/${id}`, body, options(token));
export const deleteTahapPelayanan = (id, token) => Axios.delete(`${URL_BASE}/tahap-pelayanan/${id}`, options(token));

// Rak
export const getAllRak = (token) => Axios.get(`${URL_BASE}/rak`, options(token));
export const getRakById = (id, token) => Axios.get(`${URL_BASE}/rak/${id}`, options(token));
export const postRak = (body, token) => Axios.post(`${URL_BASE}/rak`, body, options(token));
export const putRak = (id, body, token) => Axios.put(`${URL_BASE}/rak/${id}`, body, options(token));
export const deleteRak = (id, token) => Axios.delete(`${URL_BASE}/rak/${id}`, options(token));

// Informasi
export const getAllInformasi = (token) => Axios.get(`${URL_BASE}/informasi`, options(token));
export const getAllInformasiFromDB = (token) => Axios.get(`${URL_BASE}/informasi/source/db`, options(token));
export const getAllInformasiFromIG = (token) => Axios.get(`${URL_BASE}/informasi/source/instagram`, options(token));
export const getInformasiById = (id, token) => Axios.get(`${URL_BASE}/informasi/${id}`, options(token));
export const postInformasi = (body, token) => Axios.post(`${URL_BASE}/informasi`, body, options(token));
export const putInformasi = (id, body, token) => Axios.put(`${URL_BASE}/informasi/${id}`, body, options(token));
export const deleteInformasi = (id, token) => Axios.delete(`${URL_BASE}/informasi/${id}`, options(token));

// Poli
export const getAllPoli = (token) => Axios.get(`${URL_BASE}/poli`, options(token));
export const getPoliNotInPraktek = (id, token) => Axios.get(`${URL_BASE}/poli/poli-not-in/${id}`, options(token));
export const getPoliById = (id, token) => Axios.get(`${URL_BASE}/poli/${id}`, options(token));
export const postPoli = (body, token) => Axios.post(`${URL_BASE}/poli`, body, options(token));
export const putPoli = (id, body, token) => Axios.put(`${URL_BASE}/poli/${id}`, body, options(token));
export const deletePoli = (id, token) => Axios.delete(`${URL_BASE}/poli/${id}`, options(token));

// Notifikasi
export const getAllNotifikasi = () => Axios.get(`${URL_BASE}/notifikasi`);
export const getNotifikasiById = (id) => Axios.get(`${URL_BASE}/notifikasi/${id}`);
export const postNotifikasi = (body) => Axios.post(`${URL_BASE}/notifikasi`, body);
export const putNotifikasi = (id, body) => Axios.put(`${URL_BASE}/notifikasi/${id}`, body);
export const deleteNotifikasi = (id) => Axios.delete(`${URL_BASE}/notifikasi/${id}`);

// Pasien
export const getAllPasien = (token) => Axios.get(`${URL_BASE}/pasien`, options(token));
export const getPasienById = (id, token) => Axios.get(`${URL_BASE}/pasien/${id}`, options(token));
export const getPasienAntrianById = (id, token) => Axios.get(`${URL_BASE}/pasien/antrian/${id}`, options(token));
export const getAllPasienNoRM = (id, token) => Axios.get(`${URL_BASE}/pasien/rekam-medis/${id}`, options(token));
export const getAllPasienNoRMNotInputed = (id, token) => Axios.get(`${URL_BASE}/pasien/rekam-medis/not-input/${id}`, options(token));
export const postPasien = (body, token) => Axios.post(`${URL_BASE}/pasien`, body, options(token));
export const putPasien = (id, body, token) => Axios.put(`${URL_BASE}/pasien/${id}`, body, options(token));
export const deletePasien = (id, token) => Axios.delete(`${URL_BASE}/pasien/${id}`, options(token));

// Rekam Medis
export const getAllRekamMedis = (token) => Axios.get(`${URL_BASE}/rekam-medis`, options(token));
export const getRekamMedisById = (id, token) => Axios.get(`${URL_BASE}/rekam-medis/${id}`, options(token));
export const postRekamMedis = (body, token) => Axios.post(`${URL_BASE}/rekam-medis`, body, options(token));
export const putRekamMedis = (id, body, token) => Axios.put(`${URL_BASE}/rekam-medis/${id}`, body, options(token));
export const deleteRekamMedis = (id, token) => Axios.delete(`${URL_BASE}/rekam-medis/${id}`, options(token));

// Detail Rekam Medis
export const getAllDetailRekamMedis = (token) => Axios.get(`${URL_BASE}/detail-rekam-medis`, options(token));
export const getDetailRekamMedisByNoRM = (id, token) => Axios.get(`${URL_BASE}/detail-rekam-medis/rekam-medis/${id}`, options(token));
export const postDetailRekamMedis = (body, token) => Axios.post(`${URL_BASE}/detail-rekam-medis`, body, options(token));
export const putDetailRekamMedis = (id, body, token) => Axios.put(`${URL_BASE}/detail-rekam-medis/${id}`, body, options(token));
export const deleteDetailRekamMedis = (id, token) => Axios.delete(`${URL_BASE}/detail-rekam-medis/${id}`, options(token));

// Praktek
export const getAllPraktek = (token = null) => Axios.get(`${URL_BASE}/praktek`, options(token));
export const getPraktekById = (id, token) => Axios.get(`${URL_BASE}/praktek/${id}`, options(token));
export const postPraktek = (body, token) => Axios.post(`${URL_BASE}/praktek`, body, options(token));
export const putPraktek = (id, body, token) => Axios.put(`${URL_BASE}/praktek/${id}`, body, options(token));
export const deletePraktek = (id, token) => Axios.delete(`${URL_BASE}/praktek/${id}`, options(token));

// Detail Praktek
export const getAllDetailPraktek = (token) => Axios.get(`${URL_BASE}/detail-praktek`, options(token));
export const getDetailPraktekById = (id, token) => Axios.get(`${URL_BASE}/detail-praktek/${id}`, options(token));
export const getDetailPraktekByIdPraktek = (id, token) => Axios.get(`${URL_BASE}/detail-praktek/praktek/${id}`, options(token));
export const postDetailPraktek = (body, token) => Axios.post(`${URL_BASE}/detail-praktek`, body, options(token));
export const putDetailPraktek = (id, body, token) => Axios.put(`${URL_BASE}/detail-praktek/${id}`, body, options(token));
export const deleteDetailPraktek = (id, token) => Axios.delete(`${URL_BASE}/detail-praktek/${id}`, options(token));

//  Antrian
export const getAllAntrian = (token = null) => Axios.get(`${URL_BASE}/antrian`, options(token));
export const getAllAntrianByFilter = (query, token = null) => Axios.get(`${URL_BASE}/antrian?${query}`, options(token));
export const getAntrianById = (id, token) => Axios.get(`${URL_BASE}/antrian/${id}`, options(token));
export const postAntrian = (body, token) => Axios.post(`${URL_BASE}/antrian`, body, options(token));
export const putAntrian = (id, body, token) => Axios.put(`${URL_BASE}/antrian/${id}`, body, options(token));
export const putStatusAntrian = (id, body, token) => Axios.put(`${URL_BASE}/antrian/status/${id}`, body, options(token));
export const deleteAntrian = (id, token) => Axios.delete(`${URL_BASE}/antrian/${id}`, options(token));

// Detail Antrian
export const getAllDetailAntrian = (token) => Axios.get(`${URL_BASE}/detail-antrian`, options(token));
export const getDetailAntrianById = (id, token) => Axios.get(`${URL_BASE}/detail-antrian/${id}`, options(token));
export const getDetailAntrianByIdAntrian = (id, token) => Axios.get(`${URL_BASE}/detail-antrian/antrian/${id}`, options(token));
export const postDetailAntrian = (body, token) => Axios.post(`${URL_BASE}/detail-antrian`, body, options(token));
export const putDetailAntrian = (id, body, token) => Axios.put(`${URL_BASE}/detail-antrian/${id}`, body, options(token));
export const deleteDetailAntrian = (id, token) => Axios.delete(`${URL_BASE}/detail-antrian/${id}`, options(token));

// Users
export const getAllUsers = (token) => Axios.get(`${URL_BASE}/users`, options(token));
export const getUserById = (id, token) => Axios.get(`${URL_BASE}/users/${id}`, options(token));
export const postUser = (body, token) => Axios.post(`${URL_BASE}/users`, body, options(token));
export const putUser = (id, body, token) => Axios.put(`${URL_BASE}/users/${id}`, body, options(token));
export const deleteUser = (id, token) => Axios.delete(`${URL_BASE}/users/${id}`, options(token));

// data
export const getAllDataCount = (token) => Axios.get(`${URL_BASE}/data/count`, options(token));
export const getAllDataAntrianByMonth = (token) => Axios.get(`${URL_BASE}/data/antrian`, options(token));
