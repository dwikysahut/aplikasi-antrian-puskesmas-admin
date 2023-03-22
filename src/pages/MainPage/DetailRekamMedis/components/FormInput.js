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
import SelectComponent from '../../components/SelectComponent';
import { hari } from '../../../../utils/DATA';

const customStyles = {
  control: (base, state) => ({
    ...base,

  }),
  otion: (base, state) => ({
    ...base,
    zIndex: 10000,
    height: '100px',
    position: 'absolute',
  }),
};
function FormInput({
  onChangeHandler, isValid, error, values, touched, isSubmitting,
  closeModal, isEdit, dataRak, setFieldValue, dataPasien,
}) {
  const optionsRak = dataRak.map((item) => ({
    label: item.kode_rak,
    value: item.id_rak,
  }));
  const optionsPasien = dataPasien.map((item) => ({
    label: item.nik,
    value: item.nik,
  }));
  console.log(values);
  return (

    <Form>

      <FormGroup>
        <Label for="no_rm">No. RM</Label>
        <Input
          id="no_rm"
          name="no_rm"
          type="text"
          disabled
          value={values.no_rm}
          onChange={onChangeHandler('no_rm')}
          invalid={error.no_rm !== undefined}
        />

        { error.no_rm && (<FormDecline text={error.no_rm} />)}
      </FormGroup>
      <FormGroup>
        <Label for="nik">NIK</Label>
        <SelectComponent
          customStyles={customStyles}
          data={optionsPasien}
          onChange={(e) => {
            setFieldValue('nik', e.value);
          }}
          name="nik"
          value={values.nik}
        />

        { error.nik && (<FormDecline text={error.nik} />)}
      </FormGroup>
      <FormGroup>
        <Label for="id_rak">Kode Rak</Label>
        <SelectComponent
          customStyles={customStyles}
          data={optionsRak}
          onChange={(e) => {
            setFieldValue('id_rak', e.value);
          }}
          name="id_rak"
          value={values.kode_rak}
        />

        { error.id_rak && (<FormDecline text={error.id_rak} />)}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
