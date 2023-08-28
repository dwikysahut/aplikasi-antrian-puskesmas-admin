import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { errorType } from './CONSTANT';

const MySwal = withReactContent(Swal);

const showAlert = (type, text, fn) => {
  fn({ isOpen: true, color: type, text });
  setTimeout(() => {
    fn({ isOpen: false, color: text, text });
  }, 2000);
};

const swalCallback = (text, type, callback = null) => {
  MySwal.fire({
    // title: <p>{text}</p>,
    icon: type,
    text,
  }).then(async () => {
    if (callback !== null) {
      await callback();
    }
  });
};
const swalConfirmation = (text, action = null) => {
  MySwal.fire({
    // title: <p>{text}</p>,
    icon: 'warning',
    text,
    confirmButtonColor: '#d33',

    confirmButtosnText: 'Ya',
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: 'Tidak',
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (action !== null) {
        await action();
      }
    }
  });
};

const errorFetch = async (error, navigate, setAlertValue, logout = null, refreshTokenFunction = null) => {
  if (error.response) {
    if (error.response.data.message === errorType.NO_ACCESS) {
      navigate('/unauthorize');
    } else if (error.response.data.message === errorType.TOKEN_ERROR) {
      setAlertValue({ isOpen: true, color: 'danger', text: 'Token Error' });
      setTimeout(async () => {
        setAlertValue({ isOpen: false, color: 'danger', text: 'Token Error' });
        await logout();
      }, 2000);
      // navigate('/login');
    } else if (error.response.data.message === errorType.TOKEN_EXPIRED) {
      console.log('authrefresh');
      setAlertValue({ isOpen: true, color: 'danger', text: 'Token Expired' });
      setTimeout(async () => {
        setAlertValue({ isOpen: false, color: 'danger', text: 'Token Expired' });
        await refreshTokenFunction();
      }, 2000);
    } else if (error.response.data.status === 500) {
      setAlertValue({ isOpen: true, color: 'danger', text: 'Internal Server Error' });
      setTimeout(() => {
        setAlertValue({ isOpen: false, color: 'danger', text: error.response.data.message });
      }, 3000);
    } else {
      setAlertValue({ isOpen: true, color: 'danger', text: error.response.data.message });
      setTimeout(() => {
        setAlertValue({ isOpen: false, color: 'danger', text: error.response.data.message });
      }, 3000);
    }
  } else if (error.code === 'ERR_NETWORK') {
    setAlertValue({ isOpen: true, color: 'danger', text: 'Network Error' });
    setTimeout(() => {
      setAlertValue({ isOpen: false, color: 'danger', text: 'Network Error' });
    }, 3000);
  } else {
    console.log('unhandled');
    setAlertValue({ isOpen: true, color: 'danger', text: error.message });
    setTimeout(() => {
      setAlertValue({ isOpen: false, color: 'danger', text: error.message });
    }, 3000);
  }
};

const dateConvert = (date) => {
  let newDate;
  if (date == null) {
    newDate = new Date();
  } else {
    newDate = new Date(date);
  }

  return `${newDate.getDate()
  }/${newDate.getMonth() + 1
  }/${newDate.getFullYear()
  } ${newDate.getHours().toString().length < 2 ? `0${newDate.getHours()}` : newDate.getHours()
  }:${newDate.getMinutes().toString().length < 2 ? `0${newDate.getMinutes()}` : newDate.getMinutes()
  }:${newDate.getSeconds().toString().length < 2 ? `0${newDate.getSeconds()}` : newDate.getSeconds()
  }`;
};
const dateOnlyConvert = (date) => {
  let newDate;
  if (date == null) {
    newDate = new Date();
  } else {
    newDate = new Date(date);
  }

  return `${newDate.getDate().toString().length < 2 ? `0${newDate.getDate()}` : newDate.getDate()
  }/${(newDate.getMonth() + 1).toString().length < 2 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
  }/${newDate.getFullYear()
  }`;
};
export {
  swalCallback, swalConfirmation, dateConvert, errorFetch, dateOnlyConvert, showAlert,
};
