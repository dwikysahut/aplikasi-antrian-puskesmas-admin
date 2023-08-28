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
  closeModal, isEdit, dataDokter, setFieldValue,
}) {
  console.log(dataDokter);
  return (

    <Form onSubmit={(e) => { e.preventDefault(); }}>

      <FormGroup>
        <Label for="id_dokter">Dokter</Label>
        <Input
          id="id_dokter"
          name="id_dokter"
          type="select"
          value={values.id_dokter}
          onChange={onChangeHandler('id_dokter')}
          invalid={error.id_dokter !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {dataDokter?.map((item) => (
            <option key={item.id_dokter} value={item.id_dokter}>
              {item.nama_dokter}
            </option>
          ))}

        </Input>

        { error.id_dokter && (<FormDecline text={error.id_dokter} />)}
      </FormGroup>
      {/* <FormGroup>
        <Label for="hari_praktek">Hari Praktek</Label>
        <Input
          id="hari_praktek"
          name="hari_praktek"
          type="select"
          value={values.hari_praktek}
          onChange={onChangeHandler('hari_praktek')}
          invalid={error.hari_praktek !== undefined}
        >
          <option value="" hidden>
            Belum Dipilih
          </option>
          {hari?.map((item) => (
            <option key={item.nama} value={item.nama}>
              {item.nama}
            </option>
          ))}

        </Input>

        { error.hari_praktek && (<FormDecline text={error.hari_praktek} />)}
      </FormGroup> */}
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
            Tidak Aktif
          </option>
          <option value="1">
            Aktif
          </option>

        </Input>

        { error.status_operasional && (<FormDecline text={error.status_operasional} />)}
      </FormGroup>

      {/* <FormGroup row>
        <Col sm={6}>
          <Label for="waktu_mulai_praktek">Waktu Mulai Praktek</Label>
          <Input
            id="waktu_mulai_praktek"
            name="waktu_mulai_praktek"
            placeholder="Waktu Mulai Praktek"
            type="time"

            value={values.waktu_mulai_praktek}
            onChange={onChangeHandler('waktu_mulai_praktek')}
            invalid={error.waktu_mulai_praktek !== undefined}
          />
          { error.waktu_mulai_praktek && (<FormDecline text={error.waktu_mulai_praktek} />)}
        </Col>
        <Col sm={6}>
          <Label for="waktu_selesai_praktek">Waktu Selesai Praktek</Label>
          <Input
            id="waktu_selesai_praktek"
            name="waktu_selesai_praktek"
            placeholder="Waktu Selesai Praktek"
            type="time"

            value={values.waktu_selesai_praktek}
            onChange={onChangeHandler('waktu_selesai_praktek')}
            invalid={error.waktu_selesai_praktek !== undefined}
          />
          { error.waktu_selesai_praktek && (<FormDecline text={error.waktu_selesai_praktek} />)}
        </Col>
      </FormGroup> */}

    </Form>

  );
}

export default FormInput;
