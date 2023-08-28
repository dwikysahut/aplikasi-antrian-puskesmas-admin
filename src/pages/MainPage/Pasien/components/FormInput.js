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
import {
  kecamatan, kelurahan, pekerjaan, pendidikanTerakhir, statusAnggotaKel,
} from '../../../../utils/DATA';

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
const optionsPekerjaan = pekerjaan.map((item) => ({
  label: item.nama,
  value: item.nama,
}));
const optionsStatusKel = statusAnggotaKel.map((item) => ({
  label: item.nama,
  value: item.nama,
}));
function FormInput({
  onChangeHandler, isValid, error, values, touched, isSubmitting,
  closeModal, isEdit, dataRak, dataKartuKeluarga, setFieldValue, checkNik,
}) {
  console.log(values.tanggal_lahir);
  const optionsKK = dataKartuKeluarga.map((item) => ({
    label: item.no_kk,
    value: item.no_kk,
  }));

  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <FormGroup row>
        <Label for="nik">NIK</Label>
        <Col sm={8}>
          <Input
            id="nik"
            name="nik"
            placeholder="NIK"
            type="number"
            disabled={!!isEdit}
            value={values.nik}
            onChange={onChangeHandler('nik')}
            invalid={error.nik !== undefined}
          />
          <span style={{ fontSize: '10px' }}>
            {values.nik?.toString().length > 0 ? values.nik?.toString().length : '0'}
            {' '}
            / 16
          </span>
          { error.nik && (<FormDecline text={error.nik} />)}
        </Col>
        <Col sm={4}>
          {!isEdit
            ? (
              <Button
                color="dark"
                className="w-100"
             // disabled={values.nik?.toString().length !== 16}
                onClick={() => checkNik(values.nik)}
              >
                Cek

              </Button>
            )
            : <></>}

        </Col>

      </FormGroup>
      <FormGroup className="h-100">
        <Label for="no kk">No. Kartu keluarga</Label>
        <CreatableSelect
          customStyles={customStyles}
          data={optionsKK}
          onChange={(e) => {
            setFieldValue('no_kk', e.value);
            setFieldValue('kepala_keluarga', dataKartuKeluarga.filter((item) => item.no_kk === e.value)[0].kepala_keluarga === null
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
        <Label for="kepala_keluarga">Nama Kepala Keluarga</Label>
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
        <Label for="nama">Nama</Label>
        <Input
          id="nama"
          name="nama"
          placeholder="Nama"
          type="text"
          // disabled={!!isEdit}
          value={values.nama}
          onChange={onChangeHandler('nama')}
          invalid={error.nama !== undefined}
        />
        { error.nama && (<FormDecline text={error.nama} />)}
      </FormGroup>

      <FormGroup>
        <Label for="no_telepon">Nomor Telepon</Label>
        <Input
          id="no_telepon"
          name="no_telepon"
          placeholder="No. Telepon"
          type="number"
          value={values.no_telepon}
          onChange={onChangeHandler('no_telepon')}
          invalid={error.no_telepon !== undefined}
        />
        <span style={{ fontSize: '10px' }}>
          {values.no_telepon?.toString().length}
          {' '}
          / (10-13 angka)
        </span>
        { error.no_telepon && (<FormDecline text={error.no_telepon} />)}
      </FormGroup>
      <FormGroup>
        <Label for="bpjs">Status BPJS</Label>
        <Input
          id="bpjs"
          name="bpjs"
          placeholder="Status BPJS"
          type="select"
          value={values.bpjs}
          onChange={onChangeHandler('bpjs')}
          invalid={error.bpjs !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          <option value="1">
            BPJS
          </option>
          <option value="0">
            Non BPJS
          </option>
        </Input>
        { error.bpjs && (<FormDecline text={error.bpjs} />)}
      </FormGroup>
      <FormGroup>
        <Label for="no_kartu_bpjs">No. Kartu BPJS</Label>
        <Input
          id="nomor_kartu_bpjs"
          name="nomor_kartu_bpjs"
          placeholder="No. Kartu BPJS"
          type="number"
          disabled={values.bpjs === '0' || values.bpjs === undefined || values.bpjs === 0}
          value={values.nomor_kartu_bpjs}
          onChange={onChangeHandler('nomor_kartu_bpjs')}
          invalid={error.nomor_kartu_bpjs !== undefined}
        />
        <span style={{ fontSize: '10px' }}>
          {values.nomor_kartu_bpjs?.toString().length > 0 ? values.nomor_kartu_bpjs?.toString().length : '0'}
          {' '}
          karakter
        </span>
        { error.nomor_kartu_bpjs && (<FormDecline text={error.no_kartu_bpjs} />)}
      </FormGroup>
      <FormGroup className="h-100">
        <Label for="pekerjaan">Pekerjaan</Label>
        <CreatableSelect
          customStyles={customStyles}
          data={optionsPekerjaan}
          onChange={(e) => {
            setFieldValue('pekerjaan', e.value);
          }}
          name="pekerjaan"
          value={values.pekerjaan}
        />
        { error.pekerjaan && (<FormDecline text={error.pekerjaan} />)}
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
      <FormGroup row>
        <Col sm={6} className="d-flex flex-column">
          <Col>
            <Label for="rt">RT</Label>
            <Input
              id="rt"
              name="rt"
              placeholder="RT"
              type="number"
              value={values.rt}
              onChange={onChangeHandler('rt')}
              invalid={error.rt !== undefined}
            />
          </Col>
          <Col>
            { error.rt && (<FormDecline text={error.rt} />)}
          </Col>
        </Col>
        <Col sm={6} className="d-flex flex-column">
          <Label for="rw">RW</Label>
          <Input
            id="rw"
            name="rw"
            placeholder="RW"
            type="number"
            value={values.rw}
            onChange={onChangeHandler('rw')}
            invalid={error.rw !== undefined}
          />
          { error.rw && (<FormDecline text={error.rw} />)}
        </Col>
      </FormGroup>
      <FormGroup>
        <Label for="kecamatan">Kecamatan</Label>
        <Input
          id="kecamatan"
          name="kecamatan"
          placeholder="Kecamatan"
          type="select"
          value={values.kecamatan}
          onChange={onChangeHandler('kecamatan')}
          invalid={error.kecamatan !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {kecamatan.map((item) => (
            <option value={item.nama}>
              {item.nama}
            </option>
          ))}

        </Input>
        { error.kecamatan && (<FormDecline text={error.kecamatan} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kelurahan">Kelurahan</Label>
        <Input
          id="kelurahan"
          name="kelurahan"
          placeholder="Kelurahan"
          type="select"
          value={values.kelurahan}
          disabled={!values.kecamatan}
          onChange={onChangeHandler('kelurahan')}
          invalid={error.kelurahan !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {kelurahan.filter((item) => item.kecamatan === values.kecamatan)
            .sort((a, b) => a.nama.localeCompare(b.nama))
            .map((item) => (
              <option value={item.nama}>
                {item.nama}
              </option>
            ))}

        </Input>
        { error.jenis_kelamin && (<FormDecline text={error.jenis_kelamin} />)}
      </FormGroup>
      <FormGroup>
        <Label for="tempat_lahir">Tempat Lahir</Label>
        <Input
          id="tempat_lahir"
          name="tempat_lahir"
          placeholder="Tempat Lahir"
          type="text"
          value={values.tempat_lahir ? values.tempat_lahir : values.ttl?.split(',')[0]}
          onChange={(e) => {
            setFieldValue('tempat_lahir', e.target.value.toString().toUpperCase());
          }}
          invalid={error.tempat_lahir !== undefined}
        />
        { error.tempat_lahir && (<FormDecline text={error.tempat_lahir} />)}
      </FormGroup>
      <FormGroup>
        <Label for="ttl">Tanggal Lahir</Label>
        <Input
          id="tanggal_lahir"
          name="tanggal_lahir"
          placeholder="Tanggal Lahir"
          type="date"
          value={values.tanggal_lahir?.split('/').reverse().join('-')}
          onChange={(e) => setFieldValue('tanggal_lahir', e.target.value)}
          invalid={error.tanggal_lahir !== undefined}
        />
        { error.tanggal_lahir && (<FormDecline text={error.tanggal_lahir} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kuota_daftar">Kuota Daftar</Label>
        <Input
          id="kuota_daftar"
          name="kuota_daftar"
          placeholder="Kuota Daftar"
          type="select"
          value={values.kuota_daftar}
          onChange={onChangeHandler('kuota_daftar')}
          invalid={error.kuota_daftar !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          <option value="1">
            Tersedia
          </option>
          <option value="0">
            Tidak Tersedia
          </option>
        </Input>
        { error.jenis_kelamin && (<FormDecline text={error.jenis_kelamin} />)}
      </FormGroup>
      <FormGroup>
        <Label for="pendidikan_terakhir">Pendidikan Terakhir</Label>
        <Input
          id="pendidikan_terakhir"
          name="pendidikan_terakhir"
          placeholder="Pendidikan Terakhir"
          type="select"
          value={values.pendidikan_terakhir}
          onChange={onChangeHandler('pendidikan_terakhir')}
          invalid={error.pendidikan_terakhir !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {pendidikanTerakhir.map((item) => (
            <option value={item.nama}>
              {item.nama}
            </option>
          ))}

        </Input>
        { error.pendidikan_terakhir && (<FormDecline text={error.pendidikan_terakhir} />)}
      </FormGroup>
      <FormGroup className="h-100">
        <Label for="status_anggota_keluarga">Hubungan Dengan Kepala Keluarga</Label>
        <SelectComponent
          customStyles={customStyles}
          data={optionsStatusKel}
          onChange={(e) => {
            setFieldValue('status_anggota_keluarga', e.value);
          }}
          name="status_anggota_keluarga"
          value={values.status_anggota_keluarga}
        />
        { error.status_anggota_keluarga && (<FormDecline text={error.status_anggota_keluarga} />)}
      </FormGroup>
      <FormGroup row>

        <Col sm={8} className="d-flex flex-column justify-content-center">
          <Label for="foto_kartu_identitas">Foto Kartu Identitas</Label>

          <Input
            id="foto_kartu_identitas"
            name="foto_kartu_identitas"
            placeholder="Identitas"
            type="file"
            accept="image/*"
            onChange={(event) => setFieldValue('foto_kartu_identitas', event.currentTarget.files[0])}
            invalid={!isEdit ? error.gambar !== undefined : false}
          />
        </Col>
        {isEdit
          ? (
            <Col sm={4}>
              <img style={{ width: '100%', height: '100px' }} alt={`kartu-identitas-${values.nik}`} src={values.url_foto_kartu_identitas} />
            </Col>
          )
          : <></>}

        {!isEdit ? error.gambar && (<FormDecline text={error.gambar} />) : null}
      </FormGroup>

    </Form>

  );
}

export default FormInput;
