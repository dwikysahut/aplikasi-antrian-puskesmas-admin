/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';

import { useNavigate, Navigate } from 'react-router-dom';

import { Alert } from 'reactstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import MainPicture from '../../../assets/undraw_medical_care_movn.svg';
import Background from '../../../assets/green-background.jpg';
import CustomSpinner from '../../../components/Spinner';
// import { loginUser } from '../../../utils/http';

import { loginUserActionCreator } from '../../../redux/actions/userAction';
// import ErrorForm from '../../../Components/ErrorForm';

import './styles/Login.css';
import LoginForm from './components/LoginForm';
import CustomAlert from '../../../components/Alert';

function Login(props) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ user_id: '', password: '' });
  const [alert, setAlert] = useState({ text: '', isOpen: false, color: '' });
  const [isLogin, setIsLogin] = useState(false);
  const [prepareLogin, setPrepareLogin] = useState(false);

  const loginValidationSchema = yup.object().shape({
    user_id: yup.string().length(16, ({ length }) => `User ID terdiri dari ${length} karakter`)
      .required('User ID Harus Diisi'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password  minimal ${min} digit`)

      .required('Password harus diisi'),

  });

  useEffect(() => {
    if (isLogin && props.isRejected && props.error.message !== '') { setAlert({ isOpen: true, color: 'danger', text: props.error.message }); }
  }, [props.error]);

  useEffect(() => {
    setIsLogin(false);
    setPrepareLogin(true);
  }, []);

  useEffect(() => {
    if (props.isFulfilled && isLogin) {
      setAlert({ isOpen: true, color: 'success', text: props.message });
      setTimeout(() => {
        navigate('/main');
      }, 3000);
    }
  }, [props.isFulfilled, isLogin]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert({ isOpen: false, text: '', color: '' });
      }, 5000);
    }
  }, [alert]);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitHandler = async (values) => {
    setIsLogin(true);

    const formData = {
      user_id: values.user_id,
      password: values.password,
      type: 'web',
    };
    props.loginUserAction(formData).catch((err) => {
      setIsLogin(false);
    }).finally(() => {
      setIsLogin(false);
    });

    // await loginUser(formData).then((res) => {
    //   if (res.data.status === 200) {
    //     setAlert({ isOpen: true, text: res.data.message, color: 'success' });
    //     setTimeout(() => {
    //       navigate('/main');
    //     }, 2000);
    //   }
    // }).catch((err) => {
    //   setIsLoading(false);
    //   setAlert({ isOpen: true, text: err.response.data.message, color: 'danger' });

    //   console.log(err);
    // }).finally(() => {
    //   setIsLoading(false);U
    // });
  };
  if (props.data.token && !prepareLogin) {
    return (<Navigate to="/main" />);
  }
  return (
    <div
      className="container-page"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
      }}
    >
      {props.isLoading && <CustomSpinner />}
      <CustomAlert color={alert.color} text={alert.text} isOpen={alert.isOpen} onDismiss={() => setAlert({ isOpen: false, color: '', text: '' })} />

      <div className="container-login bg-white">
        <div className="wrapper-image">
          <img src={MainPicture} alt="gambar hospital" />
        </div>

        <div className="wrapper-login">
          <div className="wrapper-login__wrapper-text">
            <h1>Selamat Datang</h1>
            <p className="tagline">
              Jangan Lupa Tersenyum dan Selalu Bersyukur . .
              <br />
              Semoga harimu menyenangkan
            </p>
            <Formik
              validateOnChange={false}
              initialValues={{ ...form }}
              validationSchema={loginValidationSchema}
              onSubmit={onSubmitHandler}
            >
              {({
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                isSubmitting,
              }) => (
                <LoginForm error={errors} isSubmitting={isSubmitting} touched={touched} values={values} isValid={isValid} onChangeHandler={handleChange} onSubmitHandler={handleSubmit} />
              )}
            </Formik>
          </div>
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = ({ reducerUser }) => ({
  isRejected: reducerUser.isRejected,
  isFulfilled: reducerUser.isFulfilled,
  isLoading: reducerUser.isLoading,
  data: reducerUser.data,
  message: reducerUser.message,
  error: reducerUser.error,

});

const mapDispatchToProps = (dispatch) => ({
  loginUserAction: (body) => dispatch(loginUserActionCreator(body)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
