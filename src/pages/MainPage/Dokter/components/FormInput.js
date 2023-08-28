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

    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <FormGroup>
        <Label for="ID Dokter">ID Dokter</Label>
        <Input
          id="id_dokter"
          name="id_dokter"
          placeholder="ID Dokter"
          type="text"
          disabled={!!isEdit}
          maxLength={16}
          value={values.id_dokter}
          onChange={onChangeHandler('id_dokter')}
          invalid={error.id_dokter !== undefined}
        />
        { error.id_dokter && (<FormDecline text={error.id_dokter} />)}
      </FormGroup>
      <FormGroup>
        <Label for="nama dokter">Nama Dokter</Label>
        <Input
          id="nama_dokter"
          name="nama_dokter"
          placeholder="Nama Dokter"
          type="text"
          value={values.nama_dokter}
          onChange={onChangeHandler('nama_dokter')}
          invalid={error.nama_dokter !== undefined}
        />
        { error.nama_dokter && (<FormDecline text={error.nama_dokter} />)}
      </FormGroup>
      <FormGroup>
        <Label for="no. telepon">No. Telepon</Label>
        <Input
          id="no_telepon"
          name="no_telepon"
          placeholder="No. Telepon"
          type="number"
          maxLength={13}
          value={values.no_telepon}
          onChange={onChangeHandler('no_telepon')}
          invalid={error.no_telepon !== undefined}
        />

        { error.no_telepon && (<FormDecline text={error.no_telepon} />)}
      </FormGroup>
      <FormGroup>
        <Label for="alamat">Alamat</Label>
        <Input
          id="alamat"
          name="alamat"
          placeholder="Alamat"
          type="textarea"
          value={values.alamat}
          onChange={onChangeHandler('alamat')}
          invalid={error.alamat !== undefined}
        />
        { error.alamat && (<FormDecline text={error.alamat} />)}
      </FormGroup>
      <FormGroup>
        <Label for="jenis kelamin">Jenis Kelamin</Label>
        <Input
          id="jenis_kelamin"
          name="jenis_kelamin"
          placeholder="Jenis Kelamin"
          type="select"
          value={values.jenis_kelamin}
          onChange={onChangeHandler('jenis_kelamin')}
          invalid={error.jenis_kelamin !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          <option value="Laki-laki">
            Laki-laki
          </option>
          <option value="Perempuan">
            Perempuan
          </option>
        </Input>
        { error.jenis_kelamin && (<FormDecline text={error.jenis_kelamin} />)}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
