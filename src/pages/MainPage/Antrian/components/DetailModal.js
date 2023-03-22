/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Formik } from 'formik';
import DetailText from './DetailText';

function DetailModal({
  isShow, onToggleHandler, onClickEditHandler,
  data, title,
}) {
  return (

    <Modal
      isOpen={isShow}
      toggle={onToggleHandler}
    >
      <ModalHeader toggle={onToggleHandler}>{title}</ModalHeader>
      <ModalBody style={{ height: '70vh', overflowY: 'scroll' }}>
        <DetailText data={data} />
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          className="w-20 mt-3"
          onClick={onClickEditHandler}
        >
          Edit
        </Button>
        <Button
          outline
          className="w-20 mt-3"
          onClick={onToggleHandler}
        >
          Cancel

        </Button>
      </ModalFooter>

    </Modal>

  );
}

export default DetailModal;
