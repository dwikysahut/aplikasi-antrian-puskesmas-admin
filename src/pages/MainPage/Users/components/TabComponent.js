/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Users.css';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Formik } from 'formik';
import FormInput from './FormInput';

function TabComponent({
  onClickHandler, tabValue,
}) {
  return (
    <div className="d-flex">
      <ul className="tab-view">
        <li className={`tab-view__item ${tabValue == 'List' && 'active'}`} onClick={() => onClickHandler('List')}>List User</li>
        <li
          style={{
            border: '1px solid black', padding: 0, height: '100%', flex: 'auto',
          }}
        />
        <li
          className={`tab-view__item ${tabValue == 'Verifikasi' && 'active'}`}
          onClick={() => onClickHandler('Verifikasi')}
        >
          Akun Perlu Verifikasi

        </li>
      </ul>

    </div>

  );
}

export default TabComponent;
