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
import CreatableSelect from '../../components/CreatableSelect';

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
  closeModal, isEdit, dataRak, dataKartuKeluarga, setFieldValue,
}) {
  const options = dataKartuKeluarga.map((item) => ({
    label: item.no_kk,
    value: item.no_kk,
  }));

  return (

    <Form>
      <FormGroup>
        <Label for="user_id">User ID</Label>
        <Input
          id="user_id"
          name="user_id"
          placeholder="User ID"
          type="number"
          disabled={!!isEdit}
          value={values.user_id}
          onChange={onChangeHandler('user_id')}
          invalid={error.user_id !== undefined}
        />
        <span style={{ fontSize: '10px' }}>
          {values.user_id?.toString().length > 0 ? values.user_id?.toString().length : '0'}
          {' '}
          / 16
        </span>
        { error.user_id && (<FormDecline text={error.user_id} />)}
      </FormGroup>
      <FormGroup className="h-100">
        <Label for="no kk">No. Kartu keluarga</Label>
        <CreatableSelect
          customStyles={customStyles}
          data={options}
          onChange={(e) => {
            setFieldValue('no_kk', e.value);
            setFieldValue('kepala_keluarga', dataKartuKeluarga.filter((item) => item.no_kk === e.value)[0]?.kepala_keluarga === null || dataKartuKeluarga.filter((item) => item.no_kk === e.value)[0]?.kepala_keluarga === undefined
              ? '' : dataKartuKeluarga.filter((item) => item.no_kk === e.value)[0].kepala_keluarga);
          }}
          name="no_kk"
          value={values.no_kk}
        />
        <span style={{ fontSize: '10px' }}>
          {values.no_kk?.toString().length > 0 ? values.no_kk?.toString().length : '0'}
          {' '}
          / 16
        </span>
        { error.no_kk && (<FormDecline text={error.no_kk} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kepala_keluarga">Kepala Keluarga</Label>
        <Input
          id="kepala_keluarga"
          name="kepala_keluarga"
          placeholder="kepala_keluarga"
          type="text"
          // disabled={!!isEdit}
          value={values.kepala_keluarga}
          onChange={onChangeHandler('kepala_keluarga')}
          invalid={error.kepala_keluarga !== undefined}
        />
        { error.kepala_keluarga && (<FormDecline text={error.kepala_keluarga} />)}
      </FormGroup>
      <FormGroup>
        <Label for="nama_user">Nama User</Label>
        <Input
          id="nama_user"
          name="nama_user"
          placeholder="Nama User"
          type="text"
          // disabled={!!isEdit}
          value={values.nama_user}
          onChange={onChangeHandler('nama_user')}
          invalid={error.nama_user !== undefined}
        />
        { error.nama_user && (<FormDecline text={error.nama_user} />)}
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          // disabled={!!isEdit}
          value={values.email}
          onChange={onChangeHandler('email')}
          invalid={error.email !== undefined}
        />
        { error.email && (<FormDecline text={error.email} />)}
      </FormGroup>

      <FormGroup>
        <Label for="verif_email">Verifikasi Email</Label>
        <Input
          id="verif_email"
          name="verif_email"
          placeholder="Verifikasi Email"
          type="select"
          value={values.verif_email}
          onChange={onChangeHandler('verif_email')}
          invalid={error.verif_email !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          <option value="1">
            Sudah
          </option>
          <option value="0">
            Belum
          </option>

        </Input>
        { error.verif_email && (<FormDecline text={error.verif_email} />)}
      </FormGroup>
      {isEdit
        ? (
          <FormGroup>
            <Label for="verifikasi_akun">Verifikasi Akun</Label>
            <Input
              id="verif_akun"
              name="verif_akun"
              placeholder="Verifikasi Akun"
              type="select"
              value={values.verif_akun}
              onChange={onChangeHandler('verif_akun')}
              invalid={error.verif_akun !== undefined}
            >
              <option value="" hidden>
                Belum Dipilih
              </option>
              <option value="1">
                Tidak
              </option>
              <option value="0">
                Perlu
              </option>

            </Input>
            { error.verif_akun && (<FormDecline text={error.verif_akun} />)}
          </FormGroup>
        ) : <></>}
      <FormGroup>
        <Label for="role">Role</Label>
        <Input
          id="role"
          name="role"
          placeholder="Role"
          type="select"
          value={values.role}
          onChange={onChangeHandler('role')}
          invalid={error.role !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          <option value="1">
            Administrator
          </option>
          <option value="2">
            Petugas
          </option>
          <option value="3">
            Pasien
          </option>

        </Input>
        { error.role && (<FormDecline text={error.role} />)}
      </FormGroup>
      <FormGroup>
        <Label for="no_telepon">Nomor Telepon</Label>
        <Input
          id="no_telepon"
          name="no_telepon"
          placeholder="No. Telepon"
          type="number"
          // disabled={!!isEdit}
          value={values.no_telepon}
          onChange={onChangeHandler('no_telepon')}
          invalid={error.no_telepon !== undefined}
        />
        { error.no_telepon && (<FormDecline text={error.no_telepon} />)}
      </FormGroup>
      <FormGroup>
        <Label for="jenis_kelamin">Jenis Kelamin</Label>
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
      <FormGroup>
        <Label for="tanggal_lahir">Tanggal Lahir</Label>
        <Input
          id="tanggal_lahir"
          name="tanggal_lahir"
          placeholder="Tanggal Lahir"
          type="date"
          value={values.tanggal_lahir ? values.tanggal_lahir.split('/').reverse().join('-') : values.tanggal_lahir}
          onChange={(e) => setFieldValue('tanggal_lahir', e.target.value.split('-').reverse().join('/'))}
          invalid={error.tanggal_lahir !== undefined}
        />
        { error.tanggal_lahir && (<FormDecline text={error.tanggal_lahir} />)}
      </FormGroup>
    </Form>

  );
}

export default FormInput;
