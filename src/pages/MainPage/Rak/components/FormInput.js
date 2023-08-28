/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, FormGroup, Label, Input, Button, Row, Col,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import { number } from 'yup';
import FormDecline from '../../../../components/FormFeedback/FormDecline';

const alphabetRak = [
  {
    kode: 'A',
  },
  {
    kode: 'B',
  },
  {
    kode: 'C',
  },
  {
    kode: 'D',
  },
  {
    kode: 'E',
  },
  {
    kode: 'F',
  },
  {
    kode: 'G',
  },
  {
    kode: 'H',
  },
  {
    kode: 'I',
  },
  {
    kode: 'J',
  },
  {
    kode: 'K',
  },
  {
    kode: 'L',
  },
  {
    kode: 'M',
  },
  {
    kode: 'N',
  },
  {
    kode: 'O',
  },
  {
    kode: 'P',
  },
  {
    kode: 'Q',
  },
  {
    kode: 'R',
  },
  {
    kode: 'S',
  },
  {
    kode: 'T',
  },
  {
    kode: 'U',
  },
  {
    kode: 'V',
  },
  {
    kode: 'W',
  },
  {
    kode: 'X',
  },
  {
    kode: 'Y',
  },
  {
    kode: 'Z',
  },
];

function FormInput({
  onChangeHandler, isValid, error, values, touched, isSubmitting,
  closeModal, isEdit, setFieldValue,
}) {
  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>

      {/* <FormGroup>
        <Label for="Kode Rak">Kode Rak</Label>
        <Input
          id="kode_rak"
          name="kode_rak"
          placeholder="Kode Rak"
          type="text"
          value={values.kode_rak}
          onChange={onChangeHandler('kode_rak')}
          invalid={error.kode_rak !== undefined}
        />
        { error.kode_rak && (<FormDecline text={error.kode_rak} />)}
      </FormGroup> */}
      <FormGroup>
        <Label for="kode rak">Kode Rak (Alfabet)</Label>
        <Input
          id="alphabet_rak"
          name="alphabet_rak"
          placeholder="Kode Rak"
          type="select"
          value={values.alphabet_rak}
          onChange={onChangeHandler('alphabet_rak')}
          invalid={error.alphabet_rak !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {alphabetRak.map((item) => (
            <option key={item.kode} value={item.kode}>
              {item.kode}
            </option>
          ))}

        </Input>
        { error.alphabet_rak && (<FormDecline text={error.alphabet_rak} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kode rak">Kode Rak (Nomor)</Label>
        <Input
          id="number_rak"
          name="number_rak"
          placeholder="Kode Rak"
          type="number"
          value={values.number_rak}
          onChange={onChangeHandler('number_rak')}
          invalid={error.number_rak !== undefined}
        />
        { error.number_rak && (<FormDecline text={error.number_rak} />)}
      </FormGroup>
    </Form>

  );
}

export default FormInput;
