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
  closeModal, isEdit, setFieldValue,
}) {
  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <FormGroup>
        <Label for="judul_informasi">Judul Informasi</Label>
        <Input
          id="judul_informasi"
          name="judul_informasi"
          placeholder="Judul Informasi"
          type="text"
          value={values.judul_informasi}
          onChange={onChangeHandler('judul_informasi')}
          invalid={error.judul_informasi !== undefined}
        />
        { error.judul_informasi && (<FormDecline text={error.judul_informasi} />)}
      </FormGroup>

      <FormGroup>
        <Label for="isi_informasi">Isi Informasi</Label>
        <Input
          id="isi_informasi"
          name="isi_informasi"
          placeholder="Isi Informasi"
          type="textarea"
          value={values.isi_informasi}
          onChange={onChangeHandler('isi_informasi')}
          invalid={error.isi_informasi !== undefined}
        />
        { error.isi_informasi && (<FormDecline text={error.isi_informasi} />)}
      </FormGroup>

      <FormGroup>
        <Label for="gambar">Gambar</Label>
        <Input
          id="gambar"
          name="gambar"
          placeholder="Gambar"
          type="file"
          accept="image/*"
          // value={values.gambar}
          onChange={(event) => setFieldValue('gambar', event.currentTarget.files[0])}
          invalid={!isEdit ? error.gambar !== undefined : false}
        />
        {!isEdit ? error.gambar && (<FormDecline text={error.gambar} />) : null}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
