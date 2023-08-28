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
  closeModal, isEdit, dataPoli, setFieldValue,
}) {
  const options = dataPoli.map((item) => ({
    label: item.nama_poli,
    value: item.id_poli,
  }));
  console.log(options);
  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>

      <FormGroup>
        <Label for="id_poli">Poli</Label>
        <Input
          id="id_poli"
          name="id_poli"
          placeholder="Poli"
          type="select"
          value={values.id_poli}
          onChange={onChangeHandler('id_poli')}
          invalid={error.id_poli !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>

          {dataPoli?.length > 0 ? dataPoli.map((item) => (
            <option key={item.id_poli} value={item.id_poli}>
              {item.nama_poli}
            </option>
          ))
            : (
              <option value="">
                Tidak ada data poli tersedia
              </option>
            )}

        </Input>

        { error.id_poli && (<FormDecline text={error.id_poli} />)}
      </FormGroup>
      <FormGroup>
        <Label for="status_operasional">Status Operasional</Label>
        <Input
          id="status_operasional"
          name="status_operasional"
          placeholder="Status Operasional"
          type="select"

          value={values.status_operasional}
          onChange={onChangeHandler('status_operasional')}
          invalid={error.status_operasional !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>

          <option value="0">
            Tutup
          </option>
          <option value="1">
            Buka
          </option>

        </Input>

        { error.status_operasional && (<FormDecline text={error.status_operasional} />)}
      </FormGroup>
      <FormGroup>
        <Label for="waktu_pelayanan">Rata-rata Waktu Pelayanan</Label>
        <Input
          id="waktu_pelayanan"
          name="waktu_pelayanan"
          placeholder="Waktu Pelayanan"
          type="number"

          value={values.waktu_pelayanan}
          onChange={onChangeHandler('waktu_pelayanan')}
          invalid={error.waktu_pelayanan !== undefined}
        />
        { error.waktu_pelayanan && (<FormDecline text={error.waktu_pelayanan} />)}
      </FormGroup>
      <FormGroup>
        <Label for="kuota_booking">Kuota Booking</Label>
        <Input
          id="kuota_booking"
          name="kuota_booking"
          placeholder="Kuota Booking Pelayanan"
          type="number"
          value={values.kuota_booking}
          onChange={onChangeHandler('kuota_booking')}
          invalid={error.kuota_booking !== undefined}
        />
        { error.kuota_booking && (<FormDecline text={error.kuota_booking} />)}
      </FormGroup>
      <FormGroup>
        <Label for="jumlah_pelayanan">Jumlah Pelayanan Tersedia</Label>
        <Input
          id="jumlah_pelayanan"
          name="jumlah_pelayanan"
          placeholder="Jumlah Pelayanan Tersedia"
          type="number"
          value={values.jumlah_pelayanan}
          onChange={onChangeHandler('jumlah_pelayanan')}
          invalid={error.jumlah_pelayanan !== undefined}
        />
        { error.jumlah_pelayanan && (<FormDecline text={error.jumlah_pelayanan} />)}
      </FormGroup>
      {/* <FormGroup>
        <Label for="kode rak">Kode Rak</Label>
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
            <option key={item.id_rak} value={item.id_rak}>
              {item.kode_rak}
            </option>
          ))}

        </Input>
        { error.id_rak && (<FormDecline text={error.id_rak} />)}
      </FormGroup> */}

    </Form>

  );
}

export default FormInput;
