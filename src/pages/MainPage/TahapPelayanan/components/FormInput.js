/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, Row, Col,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import FormDecline from '../../../../components/FormFeedback/FormDecline';

function FormInput({
  onChangeHandler, isValid, error, values, touched, isSubmitting,
  closeModal, isEdit,
}) {
  return (

    <Form>
      {/* <FormGroup>
        <Label for="ID Tahap Pelayanan">ID Tahap Pelayanan</Label>
        <Input
          id="id_tahap_pelayanan"
          name="id_tahap_pelayanan"
          placeholder="ID Tahap Pelayanan"
          type="text"
          disabled={!!isEdit}
          maxLength={16}
          value={values.id_tahap_pelayanan}
          onChange={onChangeHandler('id_tahap_pelayanan')}
          invalid={error.id_tahap_pelayanan !== undefined}
        />
        { error.id_tahap_pelayanan && (<FormDecline text={error.id_tahap_pelayanan} />)}
      </FormGroup> */}
      <FormGroup>
        <Label for="Nama Tahap Pelayanan">Nama Tahap Pelayanan</Label>
        <Input
          id="nama_tahap_pelayanan"
          name="nama_tahap_pelayanan"
          placeholder="Nama Tahap Pelayanan"
          type="text"
          value={values.nama_tahap_pelayanan}
          onChange={onChangeHandler('nama_tahap_pelayanan')}
          invalid={error.nama_tahap_pelayanan !== undefined}
        />
        { error.nama_tahap_pelayanan && (<FormDecline text={error.nama_tahap_pelayanan} />)}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
