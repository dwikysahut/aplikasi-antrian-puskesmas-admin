/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { Formik } from 'formik';
import DetailText from './DetailText';

function DetailModalPasien({
  onClickImage,
  isShow, onToggleHandler, onClickEditHandler,
  data, title,
}) {
  return (
    <div>

      <Modal
        isOpen={isShow}
        toggle={onToggleHandler}
      >
        <ModalHeader toggle={onToggleHandler}>{title}</ModalHeader>
        <ModalBody style={{ height: '70vh', overflowY: 'scroll' }}>
          <DetailText data={data} onClickImage={onClickImage} />
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

    </div>

  );
}

export default DetailModalPasien;
