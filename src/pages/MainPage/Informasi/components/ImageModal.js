/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import '../styles/Form.css';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Formik } from 'formik';
import FormInput from './FormInput';
import { URL_BASE_IMAGE } from '../../../../utils/CONSTANT';

function ImageModal({
  isShow, setIsShow, onClose, image,
}) {
  console.log(image);
  return (

    <Modal
      isOpen={isShow}
      toggle={() => {
        setIsShow(!isShow);
        console.log('click');
      }}
      onClose={() => {
        setIsShow(!isShow);
        console.log('click2');
      }}
      size="lg"
      style={{ maxWidth: '700px', width: '100%' }}
    >
      <ModalHeader toggle={() => setIsShow(!isShow)}>{image}</ModalHeader>
      <ModalBody style={{ height: '70vh', overflowY: 'scroll' }}>
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          <img style={{ width: '100%' }} alt={`gambar-${image}`} src={`${URL_BASE_IMAGE}/public/image/${image}`} />
        </div>
      </ModalBody>
      <ModalFooter />

    </Modal>

  );
}

export default ImageModal;
