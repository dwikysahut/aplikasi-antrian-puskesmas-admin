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
  closeModal, isEdit, dataKartuKeluarga,
}) {
  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <FormGroup>
        <Label for="No. Kartu Keluarga">No. Kartu Keluarga</Label>
        <Input
          id="no_kk"
          name="no_kk"
          placeholder="No. Kartu Keluarga"
          type="text"
          disabled={!!isEdit}
          maxLength={16}
          value={values.no_kk}
          onChange={onChangeHandler('no_kk')}
          invalid={error.no_kk !== undefined}
        />
        <span style={{ fontSize: '10px' }}>
          {values.no_kk?.toString().length > 0 ? values.no_kk?.toString().length : '0'}
          {' '}
          / 16
        </span>
        { error.no_kk && (<FormDecline text={error.no_kk} />)}
      </FormGroup>
      <FormGroup>
        <Label for="no. rm">No. Rekam Medis</Label>
        <Input
          id="no_rm"
          name="no_rm"
          disabled={dataKartuKeluarga.filter((item) => item.no_kk == values.no_kk)[0] && dataKartuKeluarga.filter((item) => item.no_kk == values.no_kk)[0].no_rm !== null}
          placeholder="No. Rekam Medis"
          type="number"
          value={values.no_rm}
          onChange={onChangeHandler('no_rm')}
          invalid={error.no_rm !== undefined}
        />
        <span style={{ fontSize: '10px' }}>
          {values.no_rm?.toString().length > 0 ? values.no_rm?.toString().length : '0'}
          {' '}
          {' '}
          digit

        </span>
        { error.no_rm && (<FormDecline text={error.no_rm} />)}
      </FormGroup>
      <FormGroup>
        <Label for="Kepala Keluarga">Nama Kepala Keluarga</Label>
        <Input
          id="kepala_keluarga"
          name="kepala_keluarga"
          placeholder="Nama Kepala Keluarga"
          type="text"
          value={values.kepala_keluarga}
          onChange={onChangeHandler('kepala_keluarga')}
          invalid={error.kepala_keluarga !== undefined}
        />

        { error.kepala_keluarga && (<FormDecline text={error.kepala_keluarga} />)}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
