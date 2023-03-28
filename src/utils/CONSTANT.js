const swalType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};
const successfullyMessage = {
  post: 'Berhasil Menambahkan data',
  edit: 'Berhasil Mengubah data',
  delete: 'Berhasil Menghapus data',

};
const failedMessage = {
  post: 'Gagal Menambahkan data',
  edit: 'Gagal Mengubah data',
  delete: 'Gagal Menghapus data',

};
const confirmationMessage = {
  confirm: 'Yakin Menghapus data ?',

};

const errorType = {
  TOKEN_ERROR: 'JsonWebTokenError',
  TOKEN_EXPIRED: 'TokenExpiredError',
  NO_ACCESS: "You don't have access",
  TOKEN_DELETED: 'Token Null, Please Login',
};

// const URL_BASE = process.env.REACT_APP_API;
const URL_BASE = process.env.REACT_APP_API;
const URL_BASE_IMAGE = process.env.REACT_APP_API;

export {
  swalType, successfullyMessage, failedMessage, confirmationMessage, errorType, URL_BASE, URL_BASE_IMAGE,
};
