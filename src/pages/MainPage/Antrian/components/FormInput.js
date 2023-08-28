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
  pekerjaan, statusAnggotaKel, kecamatan, kelurahan, pendidikanTerakhir, prioritas,
} from '../../../../utils/DATA';

const customStyles = {
  control: (base, state) => ({
    ...base,

  }),
  option: (base, state) => ({
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
  closeModal, isEdit, dataPoli, setFieldValue, dataPraktek, dataPasien, dataKartuKeluarga,
  dataRak, checkNik, handleReset,
}) {
  const optionsNik = dataPasien?.map((item) => ({
    label: item.nik,
    value: item.nik,
  }));
  const optionsPraktek = dataPraktek?.filter((item) => item.status_operasional == 1).map((item) => ({
    label: item.nama_poli,
    value: item.id_praktek,
  }));
  const optionsKK = dataKartuKeluarga?.map((item) => ({
    label: item.no_kk,
    value: item.no_kk,
  }));
  console.log(values);
  return (
    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <Row>
        <Col>
          <FormGroup row>
            <Label for="nik">NIK</Label>
            <Col sm={8}>
              <Input
                id="nik"
                name="nik"
                placeholder="NIK"
                type="text"
                maxLength={16}
                // disabled={!!isEdit}
                value={values.nik}
                onChange={onChangeHandler('nik')}
                invalid={error.nik !== undefined}
              />
              {/* <span style={{ fontSize: '10px' }}>
                {values.nik?.toString().length > 0 ? values.nik?.toString().length : '0'}
                {' '}
                / 16
              </span> */}
              { error.nik && (<FormDecline text={error.nik} />)}
            </Col>
            <Col sm={4}>
              <Button
                color="dark"
                className="w-100"
            // disabled={values.nik?.toString().length !== 16}
                onClick={() => {
                  // handleReset();

                  checkNik(values.nik);
                }}
              >
                Cek

              </Button>
            </Col>

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
              <option value="" selected hidden>
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
            <Label for="nomor_kartu_bpjs">No. Kartu BPJS</Label>
            <Input
              id="nomor_kartu_bpjs"
              name="nomor_kartu_bpjs"
              placeholder="No. Kartu BPJS"
              type="number"

              disabled={values.bpjs === '0' || values.bpjs === undefined || values.bpjs === 0 || values.bpjs === ''}
              value={values.nomor_kartu_bpjs}
              onChange={onChangeHandler('nomor_kartu_bpjs')}
              invalid={error.nomor_kartu_bpjs !== undefined}
            />
            <span style={{ fontSize: '10px' }}>
              {values.nomor_kartu_bpjs?.toString().length > 0 ? values.nomor_kartu_bpjs?.toString().length : '0'}
              {' '}
              karakter
            </span>
            { error.nomor_kartu_bpjs && (<FormDecline text={error.nomor_kartu_bpjs} />)}
          </FormGroup>
          <FormGroup>
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
            <Label for="no kk">No. Kartu keluarga</Label>
            <span style={{ fontSize: '10px' }}>
              {values.no_kk?.toString().length > 0 ? values.no_kk?.toString().length : '0'}
              {' '}
              / 16
            </span>
            <CreatableSelect
              customStyles={customStyles}
              data={optionsKK}
              onChange={(e) => {
                setFieldValue('no_kk', e.value);

                const dataSelected = dataKartuKeluarga.filter((item) => item.no_kk === e.value);
                console.log(values.no_rm);

                setFieldValue('kepala_keluarga', dataSelected[0]?.kepala_keluarga === null || dataSelected[0]?.kepala_keluarga === undefined
                  ? '' : dataSelected[0]?.kepala_keluarga);
                setFieldValue('no_rm', dataSelected[0]?.no_rm == null || dataSelected[0]?.no_rm === undefined ? '' : dataSelected[0]?.no_rm);
              }}
              name="no_kk"
              value={values.no_kk}
            />

            { error.no_kk && (<FormDecline text={error.no_kk} />)}
          </FormGroup>

          <FormGroup>
            <Label for="kepala_keluarga">Nama Kepala Keluarga</Label>
            <Input
              id="kepala_keluarga"
              name="kepala_keluarga"
              placeholder="kepala_keluarga"
              type="text"
          // disabled={isEdit?true:false}
              value={values.kepala_keluarga}
              onChange={onChangeHandler('kepala_keluarga')}
              invalid={error.kepala_keluarga !== undefined}

              // atau  isvalid={!(error.kepala_keluarga===undefined)}
            />
            { error.kepala_keluarga && (<FormDecline text={error.kepala_keluarga} />)}
          </FormGroup>
          <FormGroup>
            <Label for="no. rm">No. Rekam Medis</Label>
            <Input
              id="no_rm"
              name="no_rm"
              placeholder="No. Rekam Medis"
              type="text"

              disabled={dataKartuKeluarga.filter((item) => item.no_kk == values.no_kk)[0] && dataKartuKeluarga.filter((item) => item.no_kk == values.no_kk)[0]?.no_rm !== null}
              value={values.no_rm == null ? '' : values.no_rm}
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
            <Label for="id_rak">Kode Rak</Label>
            <Input
              id="id_rak"
              name="id_rak"
              placeholder="Kode Rak"
              type="select"
              value={values.id_rak}
              onChange={onChangeHandler('id_rak')}
              invalid={error.id_rak !== undefined}
            >
              <option value="" hidden>
                Belum Dipilih
              </option>
              {dataRak.map((item) => (
                <option value={item.id_rak}>
                  {item.kode_rak}

                </option>
              ))}

            </Input>

            { error.id_rak && (<FormDecline text={error.id_rak} />)}
          </FormGroup>

        </Col>
        <Col>
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
              onChange={(e) => setFieldValue('tempat_lahir', e.target.value.toString().toUpperCase())}
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
          {/* <FormGroup>
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
      </FormGroup> */}
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
          <FormGroup>
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
            <Label for="foto_kartu_identitas">Foto Kartu Identitas</Label>

            <Col sm={8} className="d-flex flex-column justify-content-center">

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
            {values.url_foto_kartu_identitas
              ? (
                <Col sm={4}>
                  <img style={{ width: '100%', height: '100px' }} alt={`kartu-identitas-${values.nik}`} src={values.url_foto_kartu_identitas} />
                </Col>
              )
              : <></>}

            {!isEdit ? error.gambar && (<FormDecline text={error.gambar} />) : null}
          </FormGroup>
        </Col>
      </Row>
      <Row className="mt-5 border-top">
        <Col className="mt-3">
          <FormGroup>
            <Label for="id_poli">Poli Tujuan</Label>
            <Input
              id="id_praktek"
              name="id_praktek"
              placeholder="Poli"
              type="select"
              value={values.id_praktek}
              onChange={onChangeHandler('id_praktek')}
              invalid={error.id_praktek !== undefined}
            >
              <option value="" selected hidden>
                Belum Dipilih
              </option>

              {dataPraktek?.length > 0 ? dataPraktek?.filter((item) => item.status_operasional == 1).map((item) => (
                <option key={item.id_praktek} value={item.id_praktek}>
                  {`${item.kode_poli}-${item.nama_poli}`}
                </option>
              ))
                : (
                  <option value="">
                    Tidak ada data poli tersedia
                  </option>
                )}

            </Input>

            { error.id_praktek && (<FormDecline text={error.id_praktek} />)}
          </FormGroup>
          <FormGroup>
            <Label for="daftar_dengan_bpjs">Daftar Menggunakan BPJS</Label>
            <Input
              id="daftar_dengan_bpjs"
              name="daftar_dengan_bpjs"
              placeholder="Pilih"
              type="select"
              // disabled={values?.bpjs == 0}
              defaultValue={values?.bpjs == 0 ? '0' : values?.daftar_dengan_bpjs}
              value={values?.bpjs == 0 ? '0' : values?.daftar_dengan_bpjs}

              onChange={onChangeHandler('daftar_dengan_bpjs')}
              invalid={error.daftar_dengan_bpjs !== undefined}
            >
              <option value="" selected hidden>
                Belum Dipilih
              </option>
              <option value="1">
                Ya
              </option>
              <option value="0">
                Tidak
              </option>

            </Input>

            { error.daftar_dengan_bpjs && (<FormDecline text={error.daftar_dengan_bpjs} />)}
          </FormGroup>
          <FormGroup>
            <Label for="user_id">User ID Pendaftar</Label>
            <Input
              id="user_id"
              name="user_id"
              placeholder="User ID"
              type="number"
              disabled
              value={values.user_id}
              onChange={onChangeHandler('user_id')}
              invalid={error.user_id !== undefined}
            />
            { error.user_id && (<FormDecline text={error.user_id} />)}
          </FormGroup>
          <FormGroup>
            <Label for="tanggal_periksa">Tanggal Kunjungan</Label>
            <Input
              id="tanggal_periksa"
              name="tanggal_periksa"
              placeholder="Tanggal Periksa"
              type="date"
              value={values.tanggal_periksa ? values.tanggal_periksa.split('/').reverse().join('-') : values.tanggal_periksa}
              onChange={(e) => {
                console.log(e.target.value);
                setFieldValue('tanggal_periksa', e.target.value.split('-').reverse().join('/'));
              }}
              // onChange={(e) => setFieldValue('tanggal_periksa')}
              invalid={error.tanggal_periksa !== undefined}
            />
            { error.tanggal_periksa && (<FormDecline text={error.tanggal_periksa} />)}
          </FormGroup>

          <FormGroup>
            <Label for="prioritas">Tingkat Prioritas</Label>
            <Input
              id="prioritas"
              name="prioritas"
              placeholder="Prioritas"
              type="select"
              value={values.prioritas}
              onChange={onChangeHandler('prioritas')}
              invalid={error.prioritas !== undefined}
            >
              <option value="" hidden>
                Belum Dipilih
              </option>

              {prioritas.map((item) => (
                <option value={item.id}>
                  {item.id}
                  {' '}
                  -
                  {' '}
                  {item.nama}
                </option>
              ))}
            </Input>
            { error.prioritas && (<FormDecline text={error.prioritas} />)}
          </FormGroup>
          <FormGroup>
            <Label for="keluhan">Keluhan</Label>
            <Input
              id="keluhan"
              name="keluhan"
              placeholder="Keluhan"
              type="textarea"
              rows={5}
              value={values.keluhan}
              onChange={onChangeHandler('keluhan')}
              invalid={error.keluhan !== undefined}
            />
            { error.keluhan && (<FormDecline text={error.keluhan} />)}
          </FormGroup>

        </Col>
      </Row>
    </Form>

  );
}

export default FormInput;
