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

const poliColor = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

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
  swalType,
  poliColor,
  successfullyMessage,
  failedMessage,
  confirmationMessage,
  errorType,
  URL_BASE,
  URL_BASE_IMAGE,
};
